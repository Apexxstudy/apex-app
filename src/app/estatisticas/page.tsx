'use client';

import React from 'react';

export default function EstatisticasPage() {
  const scaleArray = Array.from({ length: 5 }, (_, i) => i + 1);

  const notasTri = [
    { area: "Matemática", nota: 812, acertos: "38/45", cor: "from-blue-500 to-indigo-600", peso: "71%" },
    { area: "Ciências da Natureza", nota: 765, acertos: "34/45", cor: "from-emerald-500 to-teal-600", peso: "58%" },
    { area: "Ciências Humanas", nota: 781, acertos: "39/45", cor: "from-amber-500 to-orange-600", peso: "64%" },
    { area: "Linguagens e Códigos", nota: 734, acertos: "36/45", cor: "from-violet-500 to-purple-600", peso: "52%" },
    { area: "Redação (Média Corretore)", nota: 920, acertos: "Grade 100%", cor: "from-rose-500 to-pink-600", peso: "92%" },
  ];

  const notaFinalPrevista = 802;

  const diasConsistencia = Array.from({ length: 12 }, (_, i) => ({
    dia: i + 10,
    horas: i % 3 === 0 ? "3.2h" : i % 2 === 0 ? "2.5h" : "1.8h",
    altura: i % 3 === 0 ? "h-24" : i % 2 === 0 ? "h-16" : "h-12"
  }));

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4 md:p-8 selection:bg-orange-500/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-8">
        <header className="border-b border-zinc-900 pb-6">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block mb-1">Módulo Analítico</span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100">Métricas de Alta Performance</h1>
          <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">Dados puros de evolução estruturados pelo motor preditivo do Apex.</p>
        </header>

        <section className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-6 text-center space-y-2 md:border-r md:border-zinc-900">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Nota Final Prevista</span>
            <h2 className="text-6xl font-black tracking-tighter text-orange-500">{notaFinalPrevista}</h2>
            <p className="text-xs text-zinc-400 font-medium">Projeção atualizada com base na TRI adaptativa.</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Desempenho por Área</h3>
            {notasTri.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-300 font-bold">{item.area} <span className="text-zinc-600 font-mono text-[10px]">({item.acertos})</span></span>
                  <span className="font-mono text-zinc-400">{item.nota} pts</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 border border-zinc-900/60 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${item.cor} rounded-full transition-all duration-500`} style={{ width: item.peso }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-md space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Carga Horária Semanal</h3>
              <p className="text-[11px] text-zinc-600 font-medium mt-0.5">Histórico volumétrico dos últimos blocos de foco.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10 font-bold">🔥 Consistência: 94%</span>
          </div>

          <div className="flex items-end justify-between h-32 pt-4 px-2 border-b border-zinc-900 gap-2 overflow-x-auto">
            {diasConsistencia.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                <span className="absolute bottom-full mb-2 bg-zinc-900 border border-zinc-800 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono text-zinc-300 pointer-events-none whitespace-nowrap z-10">{item.horas}</span>
                <div className={`w-full ${item.altura} rounded-t-md bg-zinc-800/50 group-hover:bg-gradient-to-t group-hover:from-orange-600 group-hover:to-amber-500 border border-zinc-900 transition-all duration-300`} />
                <span className="text-[10px] font-mono text-zinc-600 font-bold mb-1">{item.dia}/07</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
