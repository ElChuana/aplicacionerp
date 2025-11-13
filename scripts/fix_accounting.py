#!/usr/bin/env python3
"""
Script para corregir los movimientos bancarios con la convención contable correcta:
- DEBIT: Egresos (positivo) o NULL
- CREDIT: Ingresos (positivo) o NULL
- Nunca valores negativos
"""

import re

def fix_accounting_line(line):
    """
    Corrige una línea de INSERT de movimiento bancario
    """
    # Si no es un INSERT INTO bank_movements, devolver sin cambios
    if 'INSERT INTO bank_movements' not in line:
        return line
    
    # Buscar patrones: debit, credit en el VALUES
    # Formato: ..., 'DESCRIPCION', DEBIT_VALUE, CREDIT_VALUE, 'CLP', ...
    # Buscar patrones: debit=-XXXXX, NULL,  (ingreso mal registrado como debit negativo)
    # Debe convertirse a: NULL, XXXXX.X (credit positivo)
    match_negative_debit = re.search(r"'[^']*',\s*(-\d+\.?\d*),\s*NULL,\s*'CLP'", line)
    if match_negative_debit:
        negative_value = match_negative_debit.group(1)
        positive_value = negative_value[1:]  # Quitar el signo negativo
        # Reemplazar solo la primera ocurrencia del patrón completo
        old_pattern = f"{negative_value}, NULL, 'CLP'"
        new_pattern = f"NULL, {positive_value}, 'CLP'"
        line = line.replace(old_pattern, new_pattern, 1)
        return line
    
    # Buscar patrones: NULL, XXXXX,  (egreso mal registrado como credit positivo)
    # Debe convertirse a: XXXXX.X, NULL (debit positivo)
    match_positive_credit = re.search(r"'[^']*',\s*NULL,\s*(\d+\.?\d*),\s*'CLP'", line)
    if match_positive_credit:
        positive_value = match_positive_credit.group(1)
        # Solo cambiar si el valor es mayor a 0 (hay algunos con 0 que están bien)
        if float(positive_value) > 0:
            old_pattern = f"NULL, {positive_value}, 'CLP'"
            new_pattern = f"{positive_value}, NULL, 'CLP'"
            line = line.replace(old_pattern, new_pattern, 1)
            return line
    
    # Buscar patrones: debit=0, NULL o debit=0.0, NULL
    # Estos ya están OK (es un movimiento sin monto, raro pero válido)
    
    return line

def main():
    input_file = '/Users/juana/Documents/ERP Inmobiliaria/erp-inmobiliario/prisma/import_movements_no_conflict.sql'
    output_file = '/Users/juana/Documents/ERP Inmobiliaria/erp-inmobiliario/prisma/import_movements_corrected.sql'
    
    print(f"Leyendo archivo: {input_file}")
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"Total de líneas leídas: {len(lines)}")
    
    corrected_lines = []
    inserts_found = 0
    inserts_corrected = 0
    
    for i, line in enumerate(lines, 1):
        if 'INSERT INTO bank_movements' in line:
            inserts_found += 1
            original_line = line
            corrected_line = fix_accounting_line(line)
            
            if corrected_line != original_line:
                inserts_corrected += 1
            
            corrected_lines.append(corrected_line)
        else:
            corrected_lines.append(line)
    
    print(f"INSERTs encontrados: {inserts_found}")
    print(f"INSERTs corregidos: {inserts_corrected}")
    
    print(f"Escribiendo archivo corregido: {output_file}")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(corrected_lines)
    
    print(f"✓ Archivo corregido creado exitosamente")
    print(f"✓ Total de líneas escritas: {len(corrected_lines)}")

if __name__ == '__main__':
    main()
