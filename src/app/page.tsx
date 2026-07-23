'use client';

import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-50 font-sans">
      {/* Container Principal */}
      <div className="w-full max-w-md rounded-2xl bg-zinc-900/50 p-8 text-center border border-zinc-800/80 backdrop-blur-sm shadow-2xl">
        
        {/* Logo Estilizada */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 shadow-lg shadow-orange-500/10">
          <span className="text-2xl font-black tracking-wider text-zinc-950">A</span>
        </div>

        {/* Cabeçalho */}
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Apex
        </h1>
        <p className="mt-2 text-sm font-medium tracking-wide text-zinc-400 italic">
          "Become your best."
        </p>

        {/* Divisor */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Status Inicial do Sistema */}
        <div className="space-y-3 rounded-xl bg-zinc-950/40 p-4 text-left border border-zinc-900">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-500 uppercase tracking-wider">Status do MVP</span>
            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/20 animate-pulse">
              PASSO 1 OK
            </span>
          </div>
          <p className="text-sm font-medium text-zinc-300">
            Arquitetura básica inicial configurada com sucesso. Pronto para o próximo módulo.
          </p>
        </div>

        {/* Alerta de Próxima Etapa */}
        <p className="mt-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest animate-bounce">
          Aguardando tela de login...
        </p>
      </div>
    </main>
  );
}
