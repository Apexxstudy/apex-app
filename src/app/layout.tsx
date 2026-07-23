import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apex - Become Your Best",
  description: "Plataforma de Alta Performance para Estudantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 relative min-h-screen flex flex-col`}>
        
        {/* BARRA DE NAVEGAÇÃO SUPERIOR INTERATIVA (NAVBAR) */}
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-900/80 bg-zinc-950/60 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
          
          {/* Lado Esquerdo: Logo + Links das Telas */}
          <div className="flex items-center gap-8">
            {/* Logo Clickável (Leva para a Home) */}
            <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 shadow-md shadow-orange-500/5 hover:opacity-90 transition-opacity">
              <span className="text-sm font-black text-zinc-950 font-sans">A</span>
            </Link>

            {/* Links das outras abas em letras menores */}
            <div className="flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Link href="/dashboard" className="hover:text-zinc-200 transition-colors">
                Dashboard
              </Link>
              <Link href="/foco" className="hover:text-orange-400 transition-colors">
                Foco
              </Link>
              <Link href="/questoes" className="hover:text-zinc-200 transition-colors">
                Questões
              </Link>
              <Link href="/revisao" className="hover:text-zinc-200 transition-colors">
                Revisão
              </Link>
              <Link href="/estatisticas" className="hover:text-zinc-200 transition-colors">
                Métricas
              </Link>
            </div>
          </div>

          {/* Lado Direito: Link de Login/Acesso */}
          <div className="text-xs font-bold uppercase tracking-wider">
            <Link href="/auth" className="text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800/80 bg-zinc-900/30 px-3 py-1.5 rounded-lg">
              Acesso
            </Link>
          </div>
        </nav>

        {/* Conteúdo das páginas (Dashboard, Foco, etc.) renderizado logo abaixo do menu */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

      </body>
    </html>
  );
}
