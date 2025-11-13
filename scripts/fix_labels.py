#!/usr/bin/env python3
"""
Corrige palabras mal escritas (códigos y nombres) en subcuentas y centros de costos
para el archivo prisma/import_movements_corrected.sql
"""
from pathlib import Path

SRC = Path('/Users/juana/Documents/ERP Inmobiliaria/erp-inmobiliario/prisma/import_movements_corrected.sql')

# Mapeos de códigos (clave -> valor)
CODE_MAP = {
    # Cost centers codes
    "administraci-n": "administracion",
    "gastos-fi0cieros": "gastos-financieros",

    # Sub-account codes
    "mec-nica-de-suelo": "mecanica-de-suelo",
    "c-lculo": "calculo",
    "pavimentaci-n": "pavimentacion",
    "el-ctrico": "electrico",
    "urbanizaci-n": "urbanizacion",
    "gesti-n-de-certificados": "gestion-de-certificados",
    "comisi-n-corretaje": "comision-corretaje",
    "demolici-n-cerramiento": "demolicion-cerramiento",
    "desratizaci-n": "desratizacion",
    "servicios-b-sicos": "servicios-basicos",
    "gastos-legales-escrituraci-n": "gastos-legales-escrituracion",
    "p-liza-de-seguros": "poliza-de-seguros",
    "asesor-a-fi0ciera": "asesoria-financiera",
    "int-p-liza-vta-verde": "int-poliza-vta-verde",
    "int-p-liza-kkpp": "int-poliza-kkpp",
    "com-fi0ciera": "comision-financiera",
    "do-a-catalina": "dona-catalina",
    "devoluci-n-contrato-mutuo": "devolucion-contrato-mutuo",
    "pr-stamo-l-nea-cr-dito": "prestamo-linea-credito",
}

# Mapeos de nombres (legibles) donde hay 0 o guiones raros
NAME_MAP = {
    "Gastos Fi0cieros": "Gastos Financieros",
    "Com Fi0ciera": "Comisión Financiera",
    "Asesoría Fi0ciera": "Asesoría Financiera",
    # También normalizar un espacio extra observado en 'IVA '
    "IVA ": "IVA",
}

def apply_mappings(text: str) -> str:
    # Reemplazos de códigos en todo el archivo (en values y en WHERE code='...')
    for wrong, right in CODE_MAP.items():
        text = text.replace(f"code='{wrong}'", f"code='{right}'")
        text = text.replace(f"VALUES ('{wrong}',", f"VALUES ('{right}',")
        text = text.replace(f"VALUES ((SELECT id FROM cost_centers WHERE code='{wrong}')", f"VALUES ((SELECT id FROM cost_centers WHERE code='{right}')")
        # Subcuentas: patrón VALUES (..., 'code', 'name')
        text = text.replace(f", '{wrong}', '", f", '{right}', '")
    # Reemplazos de nombres
    for wrong, right in NAME_MAP.items():
        text = text.replace(f", '{wrong}');", f", '{right}');")
        text = text.replace(f", '{wrong}')", f", '{right}')")
    return text


def main():
    original = SRC.read_text(encoding='utf-8')
    updated = apply_mappings(original)
    # Solo escribir si hubo cambios
    if updated != original:
        SRC.write_text(updated, encoding='utf-8')
        print("✓ Reemplazos aplicados en import_movements_corrected.sql")
    else:
        print("No se encontraron cambios a aplicar")

if __name__ == '__main__':
    main()
