import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set. Please configure your API key to use AI features.");
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

export async function getChatCompletion(
  message: string,
  context?: any
): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant integrated into AIRSPACE, a futuristic holographic interface with hand-tracking controls. You help users with:

1. Analyzing 3D designs and suggesting improvements
2. Organizing mind maps and idea structures  
3. Providing creative suggestions for building in the air
4. Explaining how to use gesture controls
5. Generating ideas and expanding on concepts

Be concise, creative, and helpful. Use a slightly futuristic tone but remain clear and friendly.`;

    let userMessage = message;
    
    // Add context if provided
    if (context) {
      const contextInfo = [];
      if (context.objects3D && context.objects3D.length > 0) {
        contextInfo.push(`Current 3D scene has ${context.objects3D.length} objects.`);
      }
      if (context.mindMapNodes && context.mindMapNodes.length > 0) {
        contextInfo.push(`Mind map has ${context.mindMapNodes.length} nodes.`);
      }
      if (context.currentApp) {
        contextInfo.push(`User is currently in ${context.currentApp} app.`);
      }
      
      if (contextInfo.length > 0) {
        userMessage = `${contextInfo.join(' ')}\n\nUser: ${message}`;
      }
    }

    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get AI response");
  }
}

export async function analyzeWorkspace(
  objects3D: any[],
  mindMapNodes: any[]
): Promise<string> {
  try {
    const prompt = `Analyze this AIRSPACE workspace and provide insights:

3D Objects: ${objects3D.length} items
Mind Map Nodes: ${mindMapNodes.length} ideas

Provide:
1. A brief summary of what the user is building
2. Suggestions for improvements or next steps
3. Creative ideas to expand their work

Keep it concise and actionable.`;

    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "user", content: prompt },
      ],
      max_completion_tokens: 400,
    });

    return response.choices[0].message.content || "Unable to analyze workspace.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to analyze workspace");
  }
}
