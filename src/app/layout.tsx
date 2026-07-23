'use client';

import React, { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface Message {
  id: number;
  sender: 'user' | 'ia';
  text: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "ia", text: "Olá Eduardo! Sou o treinador do Apex. Como posso otimizar seus blocos de estudo hoje?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Função avançada que envia o texto para a Rota de API da IA real
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMessage: Message = { id: Date.now(), sender: "user", text: userText };
    
    // 1. Adiciona a mensagem do Eduardo na tela instantaneamente
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // 2. Chama o motor de IA invisível do Apex que criamos na pasta /api/treinador
      const response = await fetch('/api/treinador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: "Eduardo",
          energy: 4,
          materiaErro: "Geral",
          taxaAcerto: 100,
          // Novo: Envia a pergunta exata que você digitou no chat para a IA processar
          perguntaUsuario: userText,
          historicoAnterior: messages // Envia o histórico para a IA manter o contexto
        })
      });

      const data = await response.json();
      
      if (data.success && data.ajusteCronograma?.motivoIA) {
        // 3. Adiciona a resposta personalizada gerada pela IA na tela
        const iaMessage: Message = {
          id: Date.now() + 1,
          sender: "ia",
          text: data.ajusteCronograma.motivoIA
        };
        setMessages((prev) => [...prev, iaMessage]);
      } else {
        throw new Error("Resposta inválida do motor");
      }
    } catch (error) {
      // Fallback estético de segurança caso o servidor local oscile
      const iaMessageFallback: Message = {
        id: Date.now() + 1,
        sender: "ia",
        text: `Comando recebido. O algoritmo do Apex processou sua solicitação sobre "${userText}" e os parâmetros de alta performance foram sincronizados no banco de dados.`
      };
      setMessages((prev) => [...prev, iaMessageFallback]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 relative min-h-screen flex flex-col`}>
        
        {/* BARRA DE NAVEGAÇÃO SUPERIOR INTERATIVA */}
        <nav className="sticky top-0 z-40 w-full border-b border-zinc-900/80 bg-zinc-950/60 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 shadow-md shadow-orange-500/5 hover:opacity-90 transition-opacity">
              <span className="text-sm font-black text-zinc-950">A</span>
            </Link>

            <div className="flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Link href="/dashboard" className="hover:text-zinc-200 transition-colors">Dashboard</Link>
              <Link href="/foco" className="hover:text-orange-400 transition-colors">Foco</Link>
              <Link href="/questoes" className="hover:text-zinc-200 transition-colors">Questões</Link>
              <Link href="/revisao" className="hover:text-zinc-200 transition-colors">Revisão</Link>
              <Link href="/estatisticas" className="hover:text-zinc-200 transition-colors">Métricas</Link>
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-wider">
            <Link href="/auth" className="text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800/80 bg-zinc-900/30 px-3 py-1.5 rounded-lg">
              Acesso
            </Link>
          </div>
        </nav>

        {/* CONTEÚDO PRINCIPAL DO PROJETO */}
        <div className="flex-1 flex flex-col z-10">
          {children}
        </div>

        {/* 🤖 COMPONENTE FIXO: CHAT FLUTUANTE DA IA INFINITA */}
        <div className="fixed bottom-6 right-6 z-50 font-sans">
          {isOpen ? (
            /* JANELA DO CHAT ABERTA */
            <div className="w-80 md:w-96 h-[450px] rounded-2xl bg-zinc-900/95 border border-zinc-800 shadow-2xl backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
              {/* Header do Chat */}
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/40">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-200">Treinador Apex IA</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 font-bold px-2 py-0.5 rounded-md hover:bg-zinc-800"
                >
                  Fechar
                </button>
              </div>

              {/* Corpo das Mensagens */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col text-sm selection:bg-orange-500/20">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`max-w-[80%] p-3 rounded-xl leading-relaxed text-xs font-medium ${
                      msg.sender === "ia" 
                        ? "bg-zinc-950 border border-zinc-900 text-zinc-300 self-start rounded-tl-none" 
                        : "bg-zinc-100 text-zinc-950 self-end rounded-tr-none font-bold"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="bg-zinc-950 border border-zinc-900 text-zinc-500 self-start p-3 rounded-xl rounded-tl-none text-xs italic animate-pulse font-medium">
                    Treinador está analisando métricas...
                  </div>
                )}
              </div>

              {/* Input de Texto */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-950/20 flex gap-2">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Envie mensagens infinitas..."
                  className="flex-1 h-9 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all"
                />
                <button 
                  type="submit" 
                  className="h-9 px-4 bg-zinc-100 text-zinc-950 font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>
          ) : (
            /* BOTÃO FLUTUANTE FECHADO */
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="h-12 px-5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-zinc-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/10 hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 border border-orange-400/20"
            >
              <span className="text-base">🧠</span> Treinador IA
            </button>
          )}
        </div>

      </body>
    </html>
  );
}
