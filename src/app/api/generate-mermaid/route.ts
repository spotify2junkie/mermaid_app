import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { inputText, diagramType } = await request.json();

    // Validate input
    if (!inputText || !diagramType) {
      return NextResponse.json(
        { error: 'Input text and diagram type are required' },
        { status: 400 }
      );
    }

    // Access the LLM API key from environment variables
    const apiKey = process.env.LLM_API_KEY;
    if (!apiKey) {
      console.error('LLM API key is not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Craft the prompt for the LLM based on diagram type
    const prompt = craftPrompt(inputText, diagramType);

    // Call the LLM API
    const mermaidCode = await callLLMAPI(prompt, apiKey);

    // Return the Mermaid code in the response
    return NextResponse.json({ mermaidCode });
  } catch (error) {
    console.error('Error generating Mermaid diagram:', error);
    return NextResponse.json(
      { error: 'Failed to generate diagram' },
      { status: 500 }
    );
  }
}

// Function to craft the prompt for the LLM
function craftPrompt(inputText: string, diagramType: string): string {
  let systemPrompt = '';

  if (diagramType === 'Structure') {
    systemPrompt = `
You are a Mermaid diagram generator. Generate a Mermaid flowchart or graph diagram based on the provided text.
The output should ONLY include valid Mermaid syntax with no additional text, no markdown code fences, and no explanations.
Generate a structural diagram that clearly shows the relationships and hierarchy between different elements.
`;
  } else if (diagramType === 'Time-Structure') {
    systemPrompt = `
You are a Mermaid diagram generator. Generate a Mermaid timeline diagram (gantt or timeline) based on the provided text.
The output should ONLY include valid Mermaid syntax with no additional text, no markdown code fences, and no explanations.
Generate a time-based diagram that clearly shows the sequence and duration of events or tasks.
`;
  } else if (diagramType === 'Concept Map') {
    systemPrompt = `
You are a Mermaid diagram generator. Generate a Mermaid flowchart diagram representing a concept map based on the provided text.
The output should ONLY include valid Mermaid syntax with no additional text, no markdown code fences, and no explanations.
Generate a concept map that clearly shows the relationships between different ideas or concepts.
`;
  }

  return `${systemPrompt}\n\nText to diagram:\n${inputText}`;
}

// Function to call the LLM API
async function callLLMAPI(prompt: string, apiKey: string): Promise<string> {
  // This is a placeholder for the actual API call
  // Replace this with your actual LLM API integration

  // Example for OpenAI API:
  try {
    const response = await fetch(process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You generate Mermaid diagrams based on text. Return ONLY valid Mermaid syntax with no additional text or explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`LLM API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Extract just the Mermaid code from the LLM response
    // This assumes the LLM might still include some formatting despite our instructions
    let mermaidCode = data.choices[0].message.content.trim();

    // Remove any markdown code blocks if present
    if (mermaidCode.startsWith('```mermaid')) {
      mermaidCode = mermaidCode.replace(/^```mermaid\n/, '').replace(/```$/, '');
    } else if (mermaidCode.startsWith('```')) {
      mermaidCode = mermaidCode.replace(/^```\n/, '').replace(/```$/, '');
    }
    console.log(mermaidCode);
    return mermaidCode;
  } catch (error) {
    console.error('Error calling LLM API:', error);
    throw new Error('Failed to generate diagram from LLM');
  }
}