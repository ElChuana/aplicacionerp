This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Sincronización UF (CMF Chile)

El sistema requiere valores históricos y diarios de la UF para cálculos y conversión de montos.

### Scripts disponibles

- `npm run sync:uf:full` — descarga y actualiza (upsert) rangos mensuales hasta 10 años atrás.
- `npm run sync:uf:daily` — descarga solo el día anterior (modo incremental, rápido).
- `npm run migrate:uf:railway` — copia todos los registros UF desde la base local (definida en `.env`) hacia la remota de Railway (lee `.env.local`).

Ambos scripts usan la función `syncUfRates` de `lib/uf-sync.ts` y requieren la variable `CMF_API_KEY` en tu entorno (`.env` o variables Railway).

### Programar ejecución diaria en Railway
1. Asegura que en Railway esté definida `CMF_API_KEY` y `DATABASE_URL` apuntando a tu Postgres.
2. Crea un Job programado (Scheduled Task) en el panel de Railway:
	- Comando: `npm run sync:uf:daily`
	- Frecuencia: diaria (por ejemplo 07:00 UTC).
3. Guarda el Job: Railway ejecutará el script y actualizará/incrementará la tabla `uf_rates`.

### Verificación rápida

Para revisar rango y total:
```bash
node -e "const {PrismaClient}=require('@prisma/client');(async()=>{const p=new PrismaClient();const rows=await p.uf_rates.findMany({orderBy:{date:'asc'}});console.log('Total:',rows.length);console.log('Primera:',rows[0]?.date.toISOString().slice(0,10));console.log('Última:',rows[rows.length-1]?.date.toISOString().slice(0,10));process.exit(0)})()"
```

Si faltan días:
1. Corre en local: `npm run sync:uf:full` (usando tu base local) si quieres generar histórico primero.
2. Migra al remoto: `npm run migrate:uf:railway`.
3. Programa el job diario en Railway: `npm run sync:uf:daily`.

