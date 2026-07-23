import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inicializa a API usando a chave armazenada no arquivo .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Recebemos o histórico de mensagens para a IA ter memória da conversa
    const { studentName, perguntaUsuario, historicoMensagens } = body;

    if (!perguntaUsuario) {
      return NextResponse.json({ success: false, error: "Mensagem vazia" }, { status: 400 });
    }

    // Definimos as instruções de comportamento do Treinador Apex
    const instrucaoSistema = {
      role: "system",
      content: `Você é o Treinador IA do Apex, um assistente de estudos altamente inteligente e prestativo para o estudante ${studentName}. 
      Você deve ajudá-lo a gerenciar cronogramas, adaptar cargas horárias quando ele relatar cansaço ou imprevistos, dar dicas de matérias (como Química) e redação. 
      Responda sempre de forma motivadora, curta e direta.`
    };

    // Monta a estrutura de mensagens contendo o contexto passado
    const mensagensParaAPI = [
      instrucaoSistema,
      ...(historicoMensagens || []), // Inclui conversas passadas se o seu front-end enviar
      { role: "user", content: perguntaUsuario }
    ];

    // Faz a chamada real para o motor da inteligência artificial
    const listagemIA = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modelo rápido e econômico
      messages: mensagensParaAPI,
      temperature: 0.7,
    });

    const respostaIA = listagemIA.choices[0].message.content;

    // Retorna a resposta real gerada pela Inteligência Artificial
    return NextResponse.json({
      success: true,
      status: "RECALCULADO",
      ajusteCronograma: {
        motivoIA: respostaIA
      }
    });

  } catch (error: any) {
    console.error("Erro na API Apex:", error);
    return NextResponse.json(
      { success: false, error: "Falha no motor de IA real: " + error.message }, 
      { status: 500 }
    );
  }
}
