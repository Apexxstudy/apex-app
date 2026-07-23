'use client';

import React, { useState } from 'react';

export default function RevisaoPage() {
  // Controle se o card atual está virado revelando a resposta
  const [isFlipped, setIsFlipped] = useState(false);
  // Contador para saber em qual card da fila o usuário está
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  // Lista simulada de flashcards prioritários baseados nos erros do Eduardo
  const flashcards = [
    {
      id: 1,
      materia: "Química",
      assunto: "Funções Oxigenadas",
      pergunta: "Qual é o grupo funcional característico dos Ésteres e como eles se diferenciam dos Ácidos Carboxílicos?",
      resposta: "Os ésteres possuem o grupo funcional R-COO-R' (uma carbonila ligada a um oxigênio que se conecta a outra cadeia de carbonos). Nos ácidos carboxílicos, o oxigênio se liga a um hidrogênio (R-COOH)."
    },
    {
      id: 2,
      materia: "Biologia",
      assunto: "Citologia",
      pergunta: "Qual organela celular é responsável pela beta-oxidação de ácidos graxos de cadeia muito longa e possui a enzima catalase?",
      resposta: "Peroxissomos. Eles quebram esses ácidos graxos e usam a catalase para transformar o peróxido de hidrogênio (tóxico) resultante em água e oxigênio."
    }
  ];

  const currentCard = flashcards[currentCardIdx];

  const handleNextCard = (feedbackScore: string) => {
    // Aqui no Passo 9 a IA vai ler se você marcou Errei/Difícil para recalcular o tempo do card
    console.log(`Feedback do card ${currentCard.id}: ${feedbackScore}`);
    
    setIsFlipped(false);
    setTimeout(() => {
      if (currentCardIdx < flashcards.length - 1) {
        setCurrentCardIdx(prev => prev + 1);
      } else {
        // Reseta para o primeiro apenas para manter o MVP funcional sem travar
        setCurrentCardIdx(0);
        alert("Fila de revisões concluída! Seu histórico de retenção foi atualizado.");
      }
    }, 200);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4 md:p-8 flex flex-col justify-center relative select-none">
      {/* Background sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative max-w-xl mx-auto w-full space-y-6">
        
        {/* PROGRESSO DA SESSÃO */}
        <div className="flex justify-between items-center text-xs font-mono text-zinc-500 bg-zinc-900/10 border border-zinc-900 p-3 rounded-xl">
          <span>FILA DE MEMORIZAÇÃO ESPAÇADA</span>
          <span className="text-zinc-400 font-bold">{currentCardIdx + 1} / {flashcards.length} CARDS</span>
        </div>

        {/* 🎴 O FLASHCARD AESTHETIC COM INTERAÇÃO */}
        <div 
          onClick={() => !isFlipped && setIsFlipped(true)}
          className={`w-full min-h-[280px] rounded-2xl border p-6 md:p-8 backdrop-blur-md cursor-pointer flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${isFlipped ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-900/20 border-zinc-800/60 hover:border-zinc-700/80'}`}
        >
          {/* Header Interno do Card */}
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] font-bold text-orange-400 bg-orange-500/5 px-2.5 py-0.5 rounded border border-orange-500/10 uppercase tracking-wider">
              {currentCard.materia}
            </span>
            <span className="text-xs font-medium font-mono text-zinc-500">{currentCard.assunto}</span>
          </div>

          {/* Texto Central Dinâmico (Muda se estiver revelado ou não) */}
          <div className="my-6 space-y-2">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">
              {isFlipped ? "RESPOSTA DO CÉREBRO" : "PERGUNTA"}
            </span>
            <p className="text-base md:text-lg leading-relaxed text-zinc-200 font-medium">
              {isFlipped ? currentCard.resposta : currentCard.pergunta}
            </p>
          </div>

          {/* Rodapé de Instrução Sutil */}
          {!isFlipped && (
            <div className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-widest animate-pulse pt-2 border-t border-zinc-900/60">
              Clique no card para revelar a resposta
            </div>
          )}
        </div>

        {/* 📊 BOTÕES DE FEEDBACK TRI/REVISÃO (Só aparecem após o flip) */}
        {isFlipped && (
          <div className="grid grid-cols-3 gap-3 animate-fadeIn">
            <button
              type="button"
              onClick={() => handleNextCard('errei')}
              className="h-12 rounded-xl bg-zinc-900/60 hover:bg-rose-500/10 border border-zinc-800/80 hover:border-rose-500/40 text-xs font-black uppercase tracking-wider text-rose-400 transition-all active:scale-[0.98]"
            >
              ❌ Errei
            </button>
            <button
              type="button"
              onClick={() => handleNextCard('dificil')}
              className="h-12 rounded-xl bg-zinc-900/60 hover:bg-amber-500/10 border border-zinc-800/80 hover:border-amber-500/40 text-xs font-black uppercase tracking-wider text-amber-400 transition-all active:scale-[0.98]"
            >
              ⏳ Difícil
            </button>
            <button
              type="button"
              onClick={() => handleNextCard('facil')}
              className="h-12 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-emerald-400 border border-transparent text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98]"
            >
              ⚡ Fácil
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
