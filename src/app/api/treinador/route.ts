import { NextResponse } from 'next/server';

// Rota de API do Next.js que processa as decisões do Treinador IA
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, sleepHours, energy, materiaErro, taxaAcerto } = body;

    console.log(`[Apex IA] Processando dados para ${studentName}. Erro em: ${materiaErro}`);

    // Algoritmo de decisão inteligente do Apex (Baseado nas regras do PRD)
    let prioridade = "NORMAL";
    let tempoAdicionalMinutos = 0;
    let motivoIA = "Desempenho dentro da meta estabelecida. Cronograma padrão mantido.";
    let novoCardRedacao = null;

    // Regra 1 do PRD: Se a taxa de acerto cair abaixo de 65%, a IA adapta o cronograma
    if (taxaAcerto < 65) {
      prioridade = "CRÍTICA";
      tempoAdicionalMinutos = 15;
      motivoIA = `Sua taxa de acerto em ${materiaErro} caiu para ${taxaAcerto}%. O Treinador reduziu carga de matérias dominadas e adicionou um bloco de revisão focado de ${tempoAdicionalMinutos} min.`;
    }

    // Regra 2 (Bônus): Se a energia do ritual matinal for baixa (1 ou 2), a IA sugere pegar leve
    if (energy <= 2) {
      motivoIA += " Notamos também que sua energia está baixa hoje. Reduzimos o ritmo dos blocos teóricos longos.";
    }

    // Estrutura de resposta simulando o processamento do Claude/GPT
    return NextResponse.json({
      success: true,
      status: "RECALCULADO",
      prioridade,
      ajusteCronograma: {
        materia: materiaErro,
        tempoAdicionalMinutos,
        motivoIA
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Falha no motor de IA" }, { status: 500 });
  }
}
