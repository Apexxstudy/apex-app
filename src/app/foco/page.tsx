'use client';

import React, { useState, useEffect } from 'react';

export default function FocoPage() {
  // Estados do cronômetro (padrão 25 minutos de Deep Work)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  // Efeito para rodar o cronômetro em tempo real
  useEffect(() => {
    let interval: any = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
        // Ganha 1 de XP simulado a cada 10 segundos de foco ativo
        if (secondsLeft % 10 === 0 && !isBreak) {
          setXpGained((prev) => prev + 1);
        }
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert(isBreak ? "Pausa concluída! Hora de voltar ao Deep Work." : "Bloco de foco concluído! Você acumulou bônus de XP.");
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, isBreak]);

  // Funções de controle
  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const switchMode = (toBreak: boolean) => {
    setIsActive(false);
    setIsBreak(toBreak);
    setSecondsLeft(toBreak ? 5 * 60 : 25 * 60);
  };

  // Formatação do tempo para o padrão MM:SS
  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col items-center justify-center p-6 selection:bg-orange-500/30 relative overflow-hidden">
      {/* Luz de fundo dinâmica que muda de cor se estiver em pausa ou foco */}
      <div className={`absolute h-[400px] w-[400px] rounded-full blur-[140px] pointer-events-none opacity-10 transition-all duration-700 ${isBreak ? 'bg-blue-500 top-1/4' : 'bg-orange-500 top-1/4'}`} />

      <div className="w-full max-w-md bg-zinc-900/20 border border-zinc-800/60 backdrop-blur-md rounded-2xl p-8 text-center space-y-8 relative">
        
        {/* Switcher de Modo Aesthetic */}
        <div className="grid grid-cols-2 p-1 bg-zinc-950 border border-zinc-900 rounded-xl max-w-[240px] mx-auto">
          <button 
            type="button"
            onClick={() => switchMode(false)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${!isBreak ? 'bg-zinc-900 text-orange-400 border border-zinc-800/60 shadow-sm' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            Deep Work
          </button>
          <button 
            type="button"
            onClick={() => switchMode(true)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${isBreak ? 'bg-zinc-900 text-blue-400 border border-zinc-800/60 shadow-sm' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            Pausa Curta
          </button>
        </div>

        {/* Display do Cronômetro Central */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block">
            {isBreak ? "Recuperando Energia" : "Carga de Conhecimento Ativa"}
          </span>
          <h1 className="text-7xl font-mono font-black tracking-tighter bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
            {formatTime()}
          </h1>
        </div>

        {/* Painel de Recompensa RPG em Tempo Real */}
        {!isBreak && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/5 border border-orange-500/10 rounded-full text-xs font-mono text-orange-400 mx-auto animate-pulse">
            <span>🔥 +{xpGained} XP acumulados neste bloco</span>
          </div>
        )}

        {/* Botões de Ação Principal */}
        <div className="flex items-center justify-center gap-4 max-w-[280px] mx-auto">
          <button
            type="button"
            onClick={toggleTimer}
            className={`flex-1 h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isActive ? 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200'}`}
          >
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          
          <button
            type="button"
            onClick={resetTimer}
            className="h-12 w-12 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:border-zinc-800 transition-all"
            title="Reiniciar Bloco"
          >
            ↻
          </button>
        </div>

        {/* Informações Auxiliares do Bloco */}
        <div className="pt-4 border-t border-zinc-900 text-left space-y-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Matéria em foco</span>
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-zinc-300">Química (Funções Orgânicas)</span>
            <span className="text-xs text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">Bloco 1/2</span>
          </div>
        </div>

      </div>
    </main>
  );
}
