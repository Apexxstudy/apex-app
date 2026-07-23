'use client';

import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // A conexão com o Firebase será feita no Passo 5.
    alert(`Simulação: Autenticando com sucesso no Apex!`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-50 font-sans selection:bg-orange-500/30">
      {/* Background decorativo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative w-full max-w-sm rounded-2xl bg-zinc-900/40 p-8 border border-zinc-800/60 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-zinc-800">
        
        {/* Header da Tela */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 shadow-lg shadow-orange-500/10">
            <span className="text-xl font-black text-zinc-950">A</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-100">
            {isLogin ? 'Bem-vindo ao Apex' : 'Inicie sua jornada'}
          </h1>
          <p className="mt-1 text-xs text-zinc-500 tracking-wide uppercase font-semibold">
            {isLogin ? '"Become your best."' : 'A alta performance começa aqui'}
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5 animate-fadeIn">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Nome Completo</label>
              <input
                type="text"
                required
                placeholder="Eduardo..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/30 transition-all font-medium"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">E-mail</label>
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/30 transition-all font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Senha</label>
              {isLogin && (
                <button type="button" className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
                  Esqueceu?
                </button>
              )}
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/30 transition-all font-medium"
            />
          </div>

          {/* Botão de Ação Principal */}
          <button
            type="submit"
            className="w-full h-11 mt-2 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-bold shadow-md hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200"
          >
            {isLogin ? 'Entrar no Sistema' : 'Criar Conta Premium'}
          </button>
        </form>

        {/* Alternador de Estado */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-semibold text-zinc-400 hover:text-orange-400 transition-colors"
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já possui uma conta? Entre por aqui'}
          </button>
        </div>

      </div>
    </main>
  );
}
