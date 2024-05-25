import { Injectable } from '@angular/core';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { parts } from './prompt/behram';
import { from } from 'rxjs';
import { GeminiConfig } from './chat-form';
import { API_KEY_CONF } from './config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  generateContentWithGeminiPro(
    message: string,
    history: any[],
    geminiConfig: GeminiConfig
  ) {
    const MODEL_NAME = geminiConfig.model;
    const API_KEY = geminiConfig.apiKey || API_KEY_CONF;

    async function response() {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];

      if (geminiConfig) {
        const chat = model.startChat({
          history: [
            {
              role: 'user',
              parts: [{ text: 'Merhaba!' }],
            },
            {
              role: 'model',
              parts: [
                {
                  text: 'Ben insanlara her konuda yardımcı olan bir yapay zeka botuyum. Size nasıl yardımcı olabilirim?',
                },
              ],
            },
            {
              role: 'user',
              parts: [{ text: 'Ben kadınlar hakkında soru sormak istiyorum' }],
            },

            {
              role: 'model',
              parts: [{ text: 'Tabii ki seve seve oluşturabilirim.' }],
            },
          ],
          safetySettings: safetySettings,
        });

        const result = await chat.sendMessage(message);
        const response = result.response;

        return response.text();
      } else {
        parts.push({ text: `input: ${message}` });
        const result = await model.generateContent({
          contents: [{ role: 'user', parts }],
        });

        const response = result.response;
        parts.push({ text: `output: ${response.text()}` });
        return response.text();
      }
    }

    return from(response());
  }
}
