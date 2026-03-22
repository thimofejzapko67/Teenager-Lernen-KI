import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FREE_TOOLS_ONLY, LOW_COST_TOOLS } from "@/lib/constants/free-tools";

export const metadata: Metadata = {
  title: "Kostenlose Tools - Codelift",
  description: "Entdecke kostenlose und günstige KI-Tools für deine Entwicklung.",
};

function ToolCard({ tool }: { tool: typeof FREE_TOOLS_ONLY[0] }) {
  return (
    <Link
      href={`/learn/free-tools/${tool.id}`}
      className="group relative overflow-hidden rounded-2xl border-2 border-foreground/30 bg-transparent hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
    >
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-5xl">{tool.icon}</span>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {tool.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-2">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}

export default function FreeToolsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Kostenlose Tools
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Entdecke kostenlose und günstige KI-Tools, die deine Entwicklung beschleunigen
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            💰 Kostenlose Tools
          </h2>
          <p className="text-muted-foreground mb-8">
            Volle Funktionalität, null Kosten. Perfekt zum Starten.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_TOOLS_ONLY.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {LOW_COST_TOOLS.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              💎 Geringe Kosten
            </h2>
            <p className="text-muted-foreground mb-8">
              Premium Features zu fairen Preisen für fortgeschrittene Nutzer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LOW_COST_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
