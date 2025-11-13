#!/usr/bin/env python3
"""
Script para importar movimientos bancarios de Los Alerces desde Excel
- Crea centros de costo y subcuentas automáticamente
- Valida datos antes de importar
- Modo dry-run para previsualización
"""

import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime
import sys
import os
from typing import Dict, List, Tuple

# Configuración de base de datos
DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'erpdb',
    'user': 'juana',
    'password': '129671'
}

# Configuración del proyecto
COMPANY_ID = 1  # Inmobiliaria Los Alerces
PROJECT_ID = 1  # Los Alerces
BANK_ACCOUNT_ID = 1  # Kleber
EXCEL_FILE = '12222.xlsx'

class MovementsImporter:
    def __init__(self, dry_run=True):
        self.dry_run = dry_run
        self.conn = None
        self.cursor = None
        self.cost_centers_cache = {}
        self.sub_accounts_cache = {}
        self.stats = {
            'total_rows': 0,
            'valid_rows': 0,
            'invalid_rows': 0,
            'duplicates': 0,
            'cost_centers_created': 0,
            'sub_accounts_created': 0,
            'movements_inserted': 0
        }
        
    def connect(self):
        """Conectar a la base de datos"""
        try:
            self.conn = psycopg2.connect(**DB_CONFIG)
            self.cursor = self.conn.cursor()
            print("✅ Conectado a la base de datos")
        except Exception as e:
            print(f"❌ Error conectando a la base de datos: {e}")
            sys.exit(1)
    
    def close(self):
        """Cerrar conexión"""
        if self.cursor:
            self.cursor.close()
        if self.conn:
            if self.dry_run:
                self.conn.rollback()
                print("\n🔄 Modo dry-run: cambios revertidos")
            else:
                self.conn.commit()
                print("\n✅ Cambios guardados en la base de datos")
            self.conn.close()
    
    def load_existing_cost_centers(self):
        """Cargar centros de costo existentes"""
        self.cursor.execute("SELECT id, code, name FROM cost_centers")
        for row in self.cursor.fetchall():
            cc_id, code, name = row
            self.cost_centers_cache[code.lower()] = cc_id
            self.cost_centers_cache[name.lower()] = cc_id
        print(f"📊 Cargados {len(set(self.cost_centers_cache.values()))} centros de costo")
    
    def load_existing_sub_accounts(self):
        """Cargar subcuentas existentes"""
        self.cursor.execute("""
            SELECT sa.id, sa.code, sa.name, sa.cost_center_id, cc.code as cc_code
            FROM sub_accounts sa
            JOIN cost_centers cc ON sa.cost_center_id = cc.id
        """)
        for row in self.cursor.fetchall():
            sa_id, code, name, cc_id, cc_code = row
            key = f"{cc_code}:{name}".lower()
            self.sub_accounts_cache[key] = (sa_id, cc_id)
        print(f"📊 Cargadas {len(self.sub_accounts_cache)} subcuentas")
    
    def normalize_text(self, text):
        """Normalizar texto para usar como código"""
        if pd.isna(text) or text is None:
            return None
        text = str(text).strip().lower()
        text = text.replace(' ', '-')
        text = ''.join(c for c in text if c.isalnum() or c == '-')
        return text[:100] if text else None
    
    def get_or_create_cost_center(self, name):
        """Obtener o crear centro de costo"""
        if pd.isna(name) or not name:
            return None
        
        name = str(name).strip()
        name_lower = name.lower()
        
        # Buscar en caché
        if name_lower in self.cost_centers_cache:
            return self.cost_centers_cache[name_lower]
        
        # Crear nuevo centro de costo
        code = self.normalize_text(name)
        if not code:
            return None
        
        # Verificar si ya existe por código
        self.cursor.execute("SELECT id FROM cost_centers WHERE code = %s", (code,))
        row = self.cursor.fetchone()
        
        if row:
            cc_id = row[0]
        else:
            self.cursor.execute("""
                INSERT INTO cost_centers (code, name, parent_id)
                VALUES (%s, %s, NULL)
                RETURNING id
            """, (code, name))
            cc_id = self.cursor.fetchone()[0]
            self.stats['cost_centers_created'] += 1
            print(f"  ➕ Centro de costo creado: '{name}' (ID: {cc_id})")
        
        self.cost_centers_cache[name_lower] = cc_id
        self.cost_centers_cache[code] = cc_id
        return cc_id
    
    def get_or_create_sub_account(self, cost_center_id, sub_account_name, cc_code):
        """Obtener o crear subcuenta"""
        if not cost_center_id or pd.isna(sub_account_name) or not sub_account_name:
            return None
        
        sub_account_name = str(sub_account_name).strip()
        key = f"{cc_code}:{sub_account_name}".lower()
        
        # Buscar en caché
        if key in self.sub_accounts_cache:
            return self.sub_accounts_cache[key][0]
        
        # Crear nueva subcuenta
        code = self.normalize_text(sub_account_name)
        if not code:
            return None
        
        # Verificar si ya existe
        self.cursor.execute("""
            SELECT id FROM sub_accounts 
            WHERE cost_center_id = %s AND (code = %s OR name = %s)
        """, (cost_center_id, code, sub_account_name))
        row = self.cursor.fetchone()
        
        if row:
            sa_id = row[0]
        else:
            self.cursor.execute("""
                INSERT INTO sub_accounts (cost_center_id, code, name)
                VALUES (%s, %s, %s)
                RETURNING id
            """, (cost_center_id, code, sub_account_name))
            sa_id = self.cursor.fetchone()[0]
            self.stats['sub_accounts_created'] += 1
            print(f"    ➕ Subcuenta creada: '{sub_account_name}' (ID: {sa_id})")
        
        self.sub_accounts_cache[key] = (sa_id, cost_center_id)
        return sa_id
    
    def parse_date(self, date_value):
        """Parsear fecha del Excel"""
        if pd.isna(date_value):
            return None
        
        if isinstance(date_value, datetime):
            return date_value.date()
        
        try:
            return pd.to_datetime(date_value).date()
        except:
            return None
    
    def check_duplicate(self, bank_date, amount, description):
        """Verificar si el movimiento ya existe"""
        self.cursor.execute("""
            SELECT id FROM bank_movements 
            WHERE bank_account_id = %s 
            AND bank_date = %s 
            AND (
                (debit IS NOT NULL AND debit = %s) OR
                (credit IS NOT NULL AND credit = %s)
            )
            AND description = %s
            LIMIT 1
        """, (BANK_ACCOUNT_ID, bank_date, abs(amount) if amount < 0 else None, 
              amount if amount > 0 else None, description))
        
        return self.cursor.fetchone() is not None
    
    def delete_existing_movements(self):
        """Eliminar todos los movimientos existentes del proyecto Los Alerces"""
        print(f"\n🗑️  Eliminando movimientos existentes del proyecto Los Alerces...")
        
        # Contar movimientos actuales
        self.cursor.execute("""
            SELECT COUNT(*) FROM bank_movements 
            WHERE project_id = %s AND bank_account_id = %s
        """, (PROJECT_ID, BANK_ACCOUNT_ID))
        count = self.cursor.fetchone()[0]
        
        if count > 0:
            print(f"   Encontrados {count:,} movimientos a eliminar")
            
            # Eliminar movimientos
            self.cursor.execute("""
                DELETE FROM bank_movements 
                WHERE project_id = %s AND bank_account_id = %s
            """, (PROJECT_ID, BANK_ACCOUNT_ID))
            
            print(f"   ✅ {count:,} movimientos eliminados")
        else:
            print(f"   ℹ️  No hay movimientos existentes")
    
    def process_excel(self):
        """Procesar archivo Excel"""
        print(f"\n📂 Leyendo archivo: {EXCEL_FILE}")
        
        try:
            df = pd.read_excel(EXCEL_FILE)
        except Exception as e:
            print(f"❌ Error leyendo Excel: {e}")
            return False
        
        self.stats['total_rows'] = len(df)
        print(f"📊 Total de filas: {self.stats['total_rows']}")
        
        # Eliminar movimientos existentes
        self.delete_existing_movements()
        
        # Cargar datos existentes
        self.load_existing_cost_centers()
        self.load_existing_sub_accounts()
        
        print(f"\n{'='*80}")
        print("PROCESANDO MOVIMIENTOS")
        print(f"{'='*80}\n")
        
        movements_to_insert = []
        
        for idx, row in df.iterrows():
            # Validar fecha
            bank_date = self.parse_date(row['Fecha giro'])
            if not bank_date:
                self.stats['invalid_rows'] += 1
                print(f"⚠️  Fila {idx+2}: Fecha inválida")
                continue
            
            # Validar monto
            amount = row['Total Transferencia']
            if pd.isna(amount) or amount == 0:
                self.stats['invalid_rows'] += 1
                continue
            
            # Descripción
            description = row['Concepto'] if not pd.isna(row['Concepto']) else row['Proveedor']
            if pd.isna(description):
                description = "Sin descripción"
            description = str(description).strip()[:500]
            
            # Procesar centro de costo
            cc_name = row['Centro Costo (cuenta)']
            cc_id = self.get_or_create_cost_center(cc_name) if not pd.isna(cc_name) else None
            
            # Procesar subcuenta
            sa_id = None
            if cc_id and not pd.isna(row['Subcuenta']):
                cc_code = self.normalize_text(cc_name)
                sa_id = self.get_or_create_sub_account(cc_id, row['Subcuenta'], cc_code)
            
            # Separar débito/crédito
            # Negativo en Excel = Ingreso/Abono → DÉBITO
            # Positivo en Excel = Gasto/Cargo → CRÉDITO
            debit = abs(amount) if amount < 0 else None
            credit = amount if amount > 0 else None
            
            movements_to_insert.append((
                BANK_ACCOUNT_ID,
                PROJECT_ID,
                bank_date,
                description,
                debit,
                credit,
                'CLP',
                None,  # exchange_rate_date
                'excel_import',
                sa_id,
                None  # created_by
            ))
            
            self.stats['valid_rows'] += 1
            
            # Mostrar progreso cada 500 filas
            if (idx + 1) % 500 == 0:
                print(f"  ⏳ Procesadas {idx + 1} filas...")
        
        # Insertar movimientos
        if movements_to_insert:
            print(f"\n📥 Insertando {len(movements_to_insert)} movimientos...")
            execute_values(self.cursor, """
                INSERT INTO bank_movements 
                (bank_account_id, project_id, bank_date, description, debit, credit, 
                 currency, exchange_rate_date, source, sub_account_id, created_by)
                VALUES %s
            """, movements_to_insert)
            self.stats['movements_inserted'] = len(movements_to_insert)
        
        return True
    
    def print_summary(self):
        """Imprimir resumen de la importación"""
        print(f"\n{'='*80}")
        print("RESUMEN DE IMPORTACIÓN")
        print(f"{'='*80}")
        print(f"Total filas procesadas:        {self.stats['total_rows']:,}")
        print(f"Filas válidas:                 {self.stats['valid_rows']:,}")
        print(f"Filas inválidas:               {self.stats['invalid_rows']:,}")
        print(f"Duplicados omitidos:           {self.stats['duplicates']:,}")
        print(f"Centros de costo creados:      {self.stats['cost_centers_created']:,}")
        print(f"Subcuentas creadas:            {self.stats['sub_accounts_created']:,}")
        print(f"Movimientos insertados:        {self.stats['movements_inserted']:,}")
        print(f"{'='*80}\n")

def main():
    """Función principal"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Importar movimientos de Los Alerces desde Excel')
    parser.add_argument('--execute', action='store_true', 
                        help='Ejecutar la importación (por defecto es dry-run)')
    args = parser.parse_args()
    
    dry_run = not args.execute
    
    if dry_run:
        print("🔍 MODO DRY-RUN: No se guardarán cambios")
        print("   Para ejecutar de verdad, usa: --execute\n")
    else:
        print("⚠️  MODO EJECUCIÓN: Los cambios se guardarán en la base de datos")
        response = input("¿Estás seguro? (escribe 'SI' para continuar): ")
        if response != 'SI':
            print("❌ Importación cancelada")
            return
        print()
    
    importer = MovementsImporter(dry_run=dry_run)
    
    try:
        importer.connect()
        success = importer.process_excel()
        
        if success:
            importer.print_summary()
            
            if dry_run:
                print("💡 Para guardar los cambios, ejecuta:")
                print("   python3 scripts/import-alerces-movements.py --execute\n")
        else:
            print("❌ La importación falló")
            
    except Exception as e:
        print(f"\n❌ Error durante la importación: {e}")
        import traceback
        traceback.print_exc()
    finally:
        importer.close()

if __name__ == '__main__':
    main()
