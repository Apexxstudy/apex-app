'use client';

import React, { useState } from 'react';

export default function QuestoesPage() {
  // Estado para armazenar a alternativa selecionada pelo usuário
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // Estado para controlar se o usuário já clicou em "Verificar Resposta"
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Dados mockados (simulados) de uma questão real do ENEM de Química
  const questaoData = {
    id: 1042,
    vestibular: "ENEM 2023",
    materia: "Química",
    assunto: "Funções Orgânicas Oxigenadas",
    enunciado: "O aroma característico da banana deve-se principalmente à presença de um éster estrutural, conhecido comercialmente como óleo de banana, cuja estrutura química apresenta uma cadeia carbônica ramificada de cinco carbonos acoplada ao grupo funcional. Esse composto orgânico pertence a qual das seguintes subdivisões funcionais?",
    alternativas: [
      { id: "A", texto: "Álcool de cadeia longa." },
      { id: "B", texto: "Cetona alifática simétrica." },
      { id: "C", texto: "Éster de ácido carboxílico." },
      { id: "D", texto: "Aldeído insaturado." },
      { id: "E", texto: "Éter cíclico ramificado." }
    ],
    correta: "C",
    explicacao: "O aroma de banana é gerado pelo acetato de isoamila, que quimicamente é um éster produzido a partir da reação de esterificação entre o ácido acético e o álcool isoamílico."
  };

  const handleSelect = (id: string) => {
    if (!hasSubmitted) {
      setSelectedOption(id);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setHasSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4 md:p-8 selection:bg-orange-500/30 relative flex flex-col justify-center">
      {/* Background decorativo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto w-full space-y-6">
        
        {/* BARRA SUPERIOR DE CONTEXTO */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/20 border border-zinc-800/40 p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/5 px-2.5 py-1 rounded-md border border-orange-500/10">
              Questão #{questaoData.id}
            </span>
            <span className="text-xs font-bold text-zinc-400 font-mono">{questaoData.vestibular}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-medium">{questaoData.materia}</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400 font-bold">{questaoData.assunto}</span>
          </div>
        </div>

        {/* CARD CENTRAL DA QUESTÃO */}
        <section className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-md space-y-6">
          
          {/* Texto do Enunciado */}
          <p className="text-base md:text-lg leading-relaxed text-zinc-200 font-medium">
            {questaoData.enunciado}
          </p>

          {/* Listagem das Alternativas Estilizadas */}
          <div className="space-y-3 pt-2">
            {questaoData.alternativas.map((item) => {
              // Lógica de cores baseada nas ações do usuário
              const isSelected = selectedOption === item.id;
              const isCorrectAnswer = item.id === questaoData.correta;
              
              let optionStyle = "bg-zinc-950/40 border-zinc-900/80 hover:border-zinc-800 text-zinc-300";
              
              if (isSelected && !hasSubmitted) {
                optionStyle = "bg-orange-500/5 border-orange-500 text-orange-400";
              } else if (hasSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = "bg-emerald-500/10 border-emerald-500/80 text-emerald-400 font-bold";
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = "bg-rose-500/10 border-rose-500/80 text-rose-400 line-through";
                } else {
                  optionStyle = "bg-zinc-950/20 border-zinc-900/40 text-zinc-600 pointer-events-none";
                }
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-4 rounded-xl border flex items-start gap-4 transition-all duration-200 ${optionStyle}`}
                >
                  <span className={`h-6 w-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center border shrink-0 transition-colors ${isSelected && !hasSubmitted ? 'bg-orange-500 text-zinc-950 border-orange-500' : hasSubmitted && isCorrectAnswer ? 'bg-emerald-500 text-zinc-950 border-emerald-500' : hasSubmitted && isSelected ? 'bg-rose-500 text-zinc-950 border-rose-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                    {item.id}
                  </span>
                  <span className="text-sm font-medium pt-0.5">{item.texto}</span>
                </button>
              );
            })}
          </div>

          {/* Botão de Validação de Resposta */}
          {!hasSubmitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedOption ? 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200 active:scale-[0.99]' : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'}`}
            >
              Verificar Resposta
            </button>
          ) : (
            <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2 animate-fadeIn">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                🧠 Resolução do Treinador IA
              </span>
              <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                {questaoData.explicacao}
              </p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
