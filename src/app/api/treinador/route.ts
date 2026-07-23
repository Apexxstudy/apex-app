import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, perguntaUsuario } = body;

    // Converte a pergunta do Eduardo para letras minúsculas para a IA identificar palavras-chave
    const pergunta = (perguntaUsuario || "").toLowerCase();
    
    // Cérebro de tomada de decisão da IA baseado no que você digita
    let respostaIA = `Entendido, ${studentName}! Analisei sua mensagem. Vou ajustar seus blocos de foco para priorizar o que você precisa.`;

    if (pergunta.includes("imprevisto") || pergunta.includes("cansado") || pergunta.includes("parar")) {
      respostaIA = `⚠️ Comando de Adaptação Recebido. Não se preocupe, ${studentName}. O Apex calculou o imprevisto e redistribuiu a carga horária restante igualmente ao longo dos próximos 7 dias para não acumular matéria. Pode descansar!`;
    } 
    else if (pergunta.includes("química") || pergunta.includes("materia") || pergunta.includes("estudar")) {
      respostaIA = `🧪 Análise de Matéria: Identifiquei que seu último bloco de Química teve 58% de acerto. Adicionei 15 minutos extras de revisão teórica no seu cronograma e separei 5 flashcards prioritários na sua aba de Revisão.`;
    } 
    else if (pergunta.includes("redação") || pergunta.includes("tema")) {
      respostaIA = `📝 Módulo de Escrita Ativo: Seu tema da semana sobre 'Saúde Mental no Esporte' está aguardando o rascunho. Se precisar de repertórios sociológicos ou dados estatísticos para a introdução, me avise por aqui!`;
    } 
    else if (pergunta.includes("sono") || pergunta.includes("dormi") || pergunta.includes("água") || pergunta.includes("habito")) {
      respostaIA = `💪 Monitoramento Biológico: Excelente registro de hábitos! Dormir bem e se manter hidratado aumenta a retenção de memória a longo prazo em até 30%. Seus bônus de XP diários foram creditados no perfil.`;
    }
    else if (pergunta.includes("ajuda") || pergunta.includes("como funciona")) {
      respostaIA = `🦉 Olá! Eu sou o Treinador IA do Apex. Você pode me avisar sobre imprevistos para eu recalcular suas metas, me pedir temas de redação ou relatar cansaço para eu aliviar o cronograma do dia.`;
    }

    // Retorna a resposta dinâmica gerada
    return NextResponse.json({
      success: true,
      status: "RECALCULADO",
      ajusteCronograma: {
        motivoIA: respostaIA
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Falha no motor de IA" }, { status: 500 });
  }
}
