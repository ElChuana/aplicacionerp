import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { SYSTEM_PROMPT, FUNCTION_DEFINITIONS, RESPONSE_TEMPLATES, isValidQuery } from '../../../lib/chatbot-prompts';
import { AVAILABLE_FUNCTIONS } from '../../../lib/chatbot-functions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Enviar mensaje a Telegram
async function sendMessage(chatId: number, text: string) {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });
    
    if (!response.ok) {
      console.error('Error sending message:', await response.text());
    }
  } catch (error) {
    console.error('Error in sendMessage:', error);
  }
}

// Procesar mensaje del usuario
async function processMessage(chatId: number, message: string) {
  try {
    // Validar que la consulta esté en scope
    if (!isValidQuery(message)) {
      await sendMessage(chatId, RESPONSE_TEMPLATES.outOfScope);
      return;
    }
    
    // Enviar indicador de "escribiendo..."
    await fetch(`${TELEGRAM_API}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        action: 'typing'
      })
    });
    
    // Llamar a OpenAI con function calling
    const messages: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ];
    
    let response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      functions: FUNCTION_DEFINITIONS,
      function_call: 'auto',
      temperature: 0.3
    });
    
    let responseMessage = response.choices[0].message;
    
    // Si el modelo quiere llamar una función
    if (responseMessage.function_call) {
      const functionName = responseMessage.function_call.name;
      const functionArgs = JSON.parse(responseMessage.function_call.arguments);
      
      console.log(`Llamando función: ${functionName}`, functionArgs);
      
      // Asegurar que company_id siempre sea 1 por defecto
      if (!functionArgs.company_id) {
        functionArgs.company_id = 1;
      }
      
      // Ejecutar la función
      const functionToCall = AVAILABLE_FUNCTIONS[functionName];
      
      if (!functionToCall) {
        await sendMessage(chatId, 'Error: Función no disponible');
        return;
      }
      
      const functionResult = await functionToCall(functionArgs);
      
      // Enviar el resultado de la función a OpenAI para que genere respuesta
      messages.push(responseMessage);
      messages.push({
        role: 'function',
        name: functionName,
        content: JSON.stringify(functionResult)
      });
      
      const secondResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.3
      });
      
      const finalAnswer = secondResponse.choices[0].message.content;
      
      if (finalAnswer) {
        await sendMessage(chatId, finalAnswer);
      } else {
        await sendMessage(chatId, RESPONSE_TEMPLATES.noData);
      }
    } else {
      // Respuesta directa sin función
      if (responseMessage.content) {
        await sendMessage(chatId, responseMessage.content);
      } else {
        await sendMessage(chatId, RESPONSE_TEMPLATES.noData);
      }
    }
    
  } catch (error) {
    console.error('Error processing message:', error);
    await sendMessage(chatId, RESPONSE_TEMPLATES.error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const update = req.body;
    
    // Log para debugging
    console.log('Telegram update received:', JSON.stringify(update, null, 2));
    
    // Verificar si es un mensaje
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const messageText = update.message.text;
      
      // Comandos especiales
      if (messageText === '/start') {
        await sendMessage(
          chatId,
          '¡Hola! 👋\n\nSoy el asistente del ERP Inmobiliario.\n\nPuedo ayudarte con:\n\n📊 Centros de costo\n💰 Movimientos bancarios\n📋 Obligaciones\n📈 Resúmenes mensuales\n\n¿Qué te gustaría consultar?'
        );
      } else if (messageText === '/help') {
        await sendMessage(
          chatId,
          '❓ *Ayuda*\n\nPuedes preguntarme cosas como:\n\n• "¿Cuánto se ha gastado este mes?"\n• "Muéstrame los centros de costo"\n• "¿Cuántos movimientos sin asignar hay?"\n• "Dame un resumen de noviembre"\n• "¿Cuál es el total del centro de terreno?"\n\nSolo respondo sobre datos del ERP.'
        );
      } else {
        // Procesar mensaje normal
        await processMessage(chatId, messageText);
      }
    }
    
    // Responder a Telegram inmediatamente
    res.status(200).json({ ok: true });
    
  } catch (error) {
    console.error('Error in webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
