import { GoogleGenAI } from "@google/genai";
import { Project, Client, RevenueData, Contract, Task } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBusinessInsights = async (
  projects: Project[],
  revenue: RevenueData[],
  clients: Client[]
): Promise<string> => {
  try {
    const prompt = `
      作为一家软件开发公司的AI业务顾问，请根据以下数据提供一份简短的执行摘要（不超过300字），重点关注风险、机会和财务健康状况。

      当前数据:
      - 活跃项目数: ${projects.length}
      - 客户总数: ${clients.length}
      - 最近一个月收入 (k): ${revenue[revenue.length - 1].revenue}
      - 最近一个月支出 (k): ${revenue[revenue.length - 1].expenses}
      
      项目详情概要: ${projects.map(p => `${p.name} (${p.status}, 进度: ${p.progress}%)`).join('; ')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "暂时无法生成分析，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服务暂时不可用，请检查网络设置或 API Key。";
  }
};

export const chatWithAssistant = async (message: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        系统指令: 你是 DevPulse 软件公司的智能助手。
        上下文信息: ${context}
        
        用户问题: ${message}
      `,
    });
    return response.text || "我没有理解您的问题。";
  } catch (error) {
    console.error("Chat Error:", error);
    return "连接 AI 助手失败。";
  }
};