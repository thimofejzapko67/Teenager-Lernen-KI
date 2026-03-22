import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { FREE_TOOLS, FREE_TOOLS_LIST } from "@/lib/constants/free-tools";

interface ToolPageProps {
  params: Promise<{
    tool: string;
  }>;
}

export async function generateStaticParams() {
  return FREE_TOOLS_LIST.map((tool) => ({
    tool: tool.id,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { tool: toolId } = await params;
  const tool = FREE_TOOLS[toolId];
  
  if (!tool) {
    return { title: "Nicht gefunden - Codelift" };
  }

  return {
    title: `${tool.title} - Codelift`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { tool: toolId } = await params;
  const tool = FREE_TOOLS[toolId];

  if (!tool) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link
            href="/learn/free-tools"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu allen Tools
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{tool.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {tool.title}
              </h1>
              <p className="text-muted-foreground mt-1">{tool.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg">
              <span className="font-semibold capitalize">{tool.category === "free" ? "Kostenlos" : "Geringe Kosten"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">📖</span>
                Was ist {tool.title}?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {tool.whatIsIt}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🔗</span>
                Wie integriert es sich ins Setup?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {tool.integration}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">🚀</span>
                Schritt-für-Schritt Einrichtung
              </h2>
              <div className="space-y-4">
                {tool.setupSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-foreground">{step}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Schnellzugriff</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <span>🔗</span>
                    Offizielle Website
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <span>📚</span>
                    Dokumentation
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <span>💻</span>
                    GitHub Repository
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/10 border border-primary/20 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Bereit zum Starten?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Folge der Schritt-für-Schritt Anleitung und beginne noch heute.
                </p>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Jetzt starten
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
