'use client';

import React, { useState } from 'react';

export default function DashboardPage() {
  // Estados para simular o Ritual Matinal integrado
  const [showRitual, setShowRitual] = useState(true);
  const [sleepHours, setSleepHours] = useState('7.5');
  const [energy, setEnergy] = useState(4);

  // Estados para o Checklist de Hábitos Otimizados (Caixa de Hábitos)
  const [habits, setHabits] = useState([
    { id: 1, name: "Treino Concluído (Foco Físico) 💪", done: false },
    { id: 2, name: "Meta de Hidratação Batida (3L) 💧", done: false },
    { id: 3, name: "30 min de Leitura Ativa 📚", done: false },
    { id: 4, name: "Sem Telas 30 min Antes de Dormir 📵", done: false },
  ]);

  // Dados mockados (simulados) do estudante
  const studentName = "Eduardo";
  const daysToEnem = 857;
  const targetScore = 810;
  const yesterdayStudyTime = "2h18";

  // Função para marcar/desmarcar hábitos
  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4 md:p-8 selection:bg-orange-500/30 relative">
      {/* Background sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto space-y-8">
        
        {/* BARRA SUPERIOR / HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              Bom dia, {studentName}.
            </h1>
            <p className="text-sm text-zinc-500 font-medium mt-1">
              "Become your best." — Seu treinador pessoal está pronto.
            </p>
          </div>
          
          {/* Contador de Dias Minimalista */}
          <div className="flex gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl px-4 py-2.5 text-center backdrop-blur-sm">
              <span className="block text-xl font-black text-orange-500 tracking-tight">{daysToEnem}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Dias p/ o ENEM</span>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl px-4 py-2.5 text-center backdrop-blur-sm">
              <span className="block text-xl font-black text-zinc-100 tracking-tight">{targetScore}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Meta de Média</span>
            </div>
          </div>
        </header>

        {/* 🌅 POPUP INTEGRADO: RITUAL MATINAL (CHECK-IN) */}
        {showRitual && (
          <section className="bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 border border-orange-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-md bg-orange-500/10 px-2 py-0.5 text-xs font-bold text-orange-400 ring-1 ring-inset ring-orange-500/20 mb-3 uppercase tracking-wider">
                Ritual Matinal
              </span>
              <h2 className="text-lg font-bold text-zinc-200">Como está sua barra de energia para os blocos de hoje?</h2>
              
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Horas de Sono:</span>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={sleepHours} 
                    onChange={(e) => setSleepHours(e.target.value)}
                    className="w-20 h-9 bg-zinc-950 border border-zinc-800 rounded-lg px-2 text-center text-sm font-semibold text-orange-400 focus:outline-none focus:border-orange-500"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Foco/Energia (1-5):</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                      <button 
                        key={num}
                        type="button"
                        onClick={() => setEnergy(num)}
                        className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${energy === num ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setShowRitual(false)}
                  className="h-9 px-5 bg-zinc-100 text-zinc-950 text-xs font-bold rounded-lg hover:bg-zinc-200 transition-all self-end mt-2 md:mt-0"
                >
                  Confirmar Carga do Dia
                </button>
              </div>
            </div>
          </section>
        )}

        {/* GRID CENTRAL DO DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* COLUNA ESQUERDA: RELATÓRIO DO TREINADOR, CRONOGRAMA E REDAÇÃO */}
          <div className="md:col-span-2 space-y-6">
            
            {/* O CARD DO TREINADOR */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
                Análise do Treinador IA
              </h3>
              
              <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-900 space-y-3">
                <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-medium">
                  Eduardo, você registrou <span className="text-zinc-100 font-bold">{sleepHours}h</span> de sono. Seus estudos de ontem somaram <span className="text-zinc-100 font-bold">{yesterdayStudyTime}</span>.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-medium border-l-2 border-orange-500/50 pl-3">
                  ⚠️ <span className="text-orange-400 font-bold">Prioridade Crítica:</span> Sua taxa de acerto em <span className="underline decoration-orange-500/40 font-semibold text-zinc-100">Química (Funções Orgânicas)</span> caiu para 58%. O algoritmo recalculou suas revisões.
                </p>
              </div>

              {/* Botão de Ação Primária */}
              <button type="button" className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:opacity-90 active:scale-[0.99] transition-all">
                Iniciar Bloco de Alta Performance
              </button>
            </div>

            {/* CRONOGRAMA ADAPTATIVO DO DIA */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cronograma do Dia</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-zinc-950/40 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                  <div>
                    <span className="text-xs font-bold text-orange-500/90 block mb-0.5">Química</span>
                    <h4 className="text-sm font-bold text-zinc-200">Revisão: Funções Orgânicas Oxigenadas</h4>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800/40">15 min</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-zinc-950/40 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                  <div>
                    <span className="text-xs font-bold text-blue-400 block mb-0.5">Matemática</span>
                    <h4 className="text-sm font-bold text-zinc-200">Teoria + Fixação: Funções de 2º Grau</h4>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800/40">60 min</span>
                </div>
              </div>
            </div>

            {/* 📝 NOVO CARD: CAIXA DE REDAÇÃO DA SEMANA */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Fila de Produção: Redação</h3>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-bold ring-1 ring-amber-500/20">Em Andamento</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-900 space-y-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Tema Proposto da Semana</span>
                <p className="text-sm leading-relaxed text-zinc-300">
                  A influência das redes sociais sobre as escolhas de carreira dos jovens no século XXI.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-zinc-500">Tempo definido</span>
                  <span className="text-xs font-semibold text-orange-400">45 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: CHECKLIST E INDICADORES */}
          <aside className="space-y-6">
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Checklist de Hábitos</h3>
              <div className="space-y-3">
                {habits.map((habit) => (
                  <button
                    key={habit.id}
                    type="button"
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${habit.done ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700'}`}
                  >
                    <span>{habit.name}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{habit.done ? 'Feito' : 'Pendente'}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
