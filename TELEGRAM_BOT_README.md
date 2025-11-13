# Bot de Telegram para ERP Inmobiliario

Bot de asistente con IA que consulta datos del ERP a través de Telegram.

## 🚀 Configuración Rápida

### 1. Crear el Bot en Telegram

1. Abre Telegram y busca `@BotFather`
2. Envía el comando `/newbot`
3. Elige un nombre para tu bot (ej: "ERP Inmobiliario Assistant")
4. Elige un username (debe terminar en "bot", ej: "erp_inmobiliario_bot")
5. BotFather te dará un **token** como este: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
6. **Guarda este token**, lo necesitarás

### 2. Configurar Variables de Entorno

Agrega estas líneas a tu archivo `.env`:

```env
OPENAI_API_KEY="sk-tu-clave-de-openai-aqui"
TELEGRAM_BOT_TOKEN="el-token-que-te-dio-botfather"
```

### 3. Instalar ngrok (si no lo tienes)

```bash
brew install ngrok
```

### 4. Iniciar el Servidor

```bash
# Terminal 1: Inicia tu servidor Next.js
npm run dev
```

### 5. Exponer con ngrok

```bash
# Terminal 2: Expone tu servidor local
ngrok http 3000

# Copia la URL HTTPS que te da (ej: https://abc123.ngrok.io)
```

### 6. Configurar el Webhook

```bash
# Reemplaza <TU_TOKEN> y <TU_URL_NGROK>
curl -X POST "https://api.telegram.org/bot<TU_TOKEN>/setWebhook" \
  -d "url=<TU_URL_NGROK>/api/webhook/telegram"

# Ejemplo:
# curl -X POST "https://api.telegram.org/bot123456:ABC/setWebhook" \
#   -d "url=https://abc123.ngrok.io/api/webhook/telegram"
```

Deberías ver: `{"ok":true,"result":true,"description":"Webhook was set"}`

### 7. ¡Prueba tu Bot!

1. Busca tu bot en Telegram por el username que elegiste
2. Envía `/start`
3. Prueba preguntas como:
   - "¿Cuánto se ha gastado este mes?"
   - "Muéstrame los centros de costo"
   - "¿Cuántos movimientos sin asignar hay?"

## 💬 Comandos Disponibles

- `/start` - Mensaje de bienvenida
- `/help` - Ayuda sobre qué puedes preguntar

## 🔍 Ejemplos de Preguntas

El bot responde **solo sobre datos del ERP**:

✅ **Válidas:**
- "¿Cuál es el total del centro de terreno?"
- "Dame un resumen de noviembre 2025"
- "¿Cuántos movimientos hay sin asignar?"
- "Muéstrame las obligaciones pendientes"
- "¿Cuánto se gastó en marketing?"

❌ **Fuera de alcance:**
- "¿Qué es el IVA?" (no da asesoría)
- "¿Cómo está el clima?" (solo ERP)
- "Cuéntame un chiste" (no es un chatbot general)

## 🔒 Seguridad

- El bot solo responde sobre datos del ERP
- Las consultas SQL están predefinidas y seguras
- No acepta consultas SQL directas
- Solo trabaja con company_id = 1
- Valida que las preguntas estén en el alcance

## 🛠️ Troubleshooting

### El bot no responde

1. Verifica que ngrok esté corriendo
2. Verifica que npm run dev esté corriendo
3. Revisa los logs en la terminal
4. Verifica el webhook: 
   ```bash
   curl "https://api.telegram.org/bot<TU_TOKEN>/getWebhookInfo"
   ```

### Error de OpenAI

- Verifica que `OPENAI_API_KEY` esté en `.env`
- Verifica que tengas saldo en tu cuenta de OpenAI

### Error de base de datos

- Verifica que PostgreSQL esté corriendo
- Verifica que `DATABASE_URL` sea correcta en `.env`

## 📊 Funciones Disponibles

El bot puede:
- ✅ Consultar centros de costo y sus totales
- ✅ Ver detalles de un centro específico
- ✅ Listar movimientos bancarios
- ✅ Consultar obligaciones
- ✅ Generar resúmenes mensuales

## 💰 Costos

- **Telegram**: Gratis (0 costo)
- **OpenAI GPT-4o-mini**: ~$0.0004 por consulta
- **Estimado mensual**: $5-10 USD con uso moderado

## 🔄 Actualizar el Bot

Si cambias código del bot:

1. El servidor Next.js recargará automáticamente
2. No necesitas reiniciar ngrok
3. Prueba enviando un mensaje nuevo

## 📝 Notas

- ngrok genera una URL nueva cada vez que lo inicias (plan gratuito)
- Si reinicias ngrok, debes reconfigurar el webhook
- Para producción, considera un dominio fijo
