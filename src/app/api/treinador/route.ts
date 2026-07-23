import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializa a API do Google usando a sua chave secreta
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Recebemos o histórico para a IA conseguir manter o contexto do papo
    const { studentName, perguntaUsuario, historicoMensagens } = body;

    if (!perguntaUsuario) {
      return NextResponse.json({ success: false, error: "Mensagem vazia" }, { status: 400 });
    }

    // Configura o modelo mais indicado e rápido do Gemini
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      // Definimos o comportamento de "personalidade" do Treinador Apex aqui
      systemInstruction: `Você é o Treinador IA do Apex, um assistente de estudos altamente inteligente e prestativo para o estudante ${studentName}. 
      Você deve ajudá-lo a gerenciar cronogramas, adaptar cargas horárias quando ele relatar cansaço ou imprevistos, dar dicas de matérias (como Química) e redação. 
      Responda sempre de forma motivadora, amigável, curta e direta.`
    });

    // Formatamos o histórico para o padrão que o SDK do Google exige (role e parts)
    const historicoFormatado = (historicoMensagens || []).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Cria e inicia uma sessão de chat com a memória do histórico
    const chat = model.startChat({
      history: historicoFormatado
    });

    // Envia a nova pergunta do usuário e recebe o objeto de resposta
    const resultado = await chat.sendMessage(perguntaUsuario);
    const respostaIA = resultado.response.text();

    // Devolve o JSON na estrutura exata que o seu site original espera ler
    return NextResponse.json({
      success: true,
      status: "RECALCULADO",
      ajusteCronograma: {
        motivoIA: respostaIA
      }
    });

  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    return NextResponse.json(
      { success: false, error: "Falha no motor do Gemini: " + error.message }, 
      { status: 500 }
    );
  }
}
