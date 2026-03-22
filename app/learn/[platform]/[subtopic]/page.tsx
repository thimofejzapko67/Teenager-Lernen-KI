import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, Trophy, Target } from "lucide-react";
import { Suspense } from "react";
import { QuestPath, QuestPathSkeleton } from "@/components/learn/quest-path";
import { SUBTOPICS } from "@/lib/constants/quests";
import type { Metadata } from "next";

interface SubtopicPageProps {
  params: Promise<{
    platform: string;
    subtopic: string;
  }>;
}

export async function generateStaticParams() {
  const platforms = ["web-dev", "app-dev", "security"];
  const subtopics = Object.keys(SUBTOPICS);

  return platforms.flatMap((platform) =>
    subtopics.map((subtopic) => ({
      platform,
      subtopic,
    }))
  );
}

export async function generateMetadata({ params }: SubtopicPageProps): Promise<Metadata> {
  const { subtopic } = await params;
  const subtopicData = SUBTOPICS[subtopic];

  if (!subtopicData) {
    return { title: "Nicht gefunden - Codelift" };
  }

  return {
    title: `${subtopicData.title} - Codelift`,
    description: subtopicData.description,
  };
}

function SubtopicExplanation({ explanation }: { explanation: string }) {
  // Convert markdown-like content to HTML-like structure
  const lines = explanation.split("\n");
  const content: React.ReactElement[] = [];
  let currentList: string[] = [];
  let inCodeBlock = false;
  let currentCode: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        content.push(
          <pre key={`code-${i}`} className="bg-surface rounded-xl p-4 my-4 overflow-x-auto border border-border">
            <code className="text-sm font-mono">{currentCode.join("\n")}</code>
          </pre>
        );
        currentCode = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      currentCode.push(line);
      continue;
    }

    // Headers
    if (line.startsWith("### ")) {
      content.push(
        <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-foreground">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      content.push(
        <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-foreground">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      content.push(
        <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-foreground">
          {line.replace("# ", "")}
        </h1>
      );
    }
    // List items
    else if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      currentList.push(line.replace(/^[-*]\s*/, ""));
    } else if (/^\d+\.\s/.test(line.trim())) {
      currentList.push(line.replace(/^\d+\.\s*/, ""));
    }
    // Table row
    else if (line.startsWith("|")) {
      // Simple table handling - could be enhanced
      if (!line.includes("---")) {
        const cells = line.split("|").filter((c) => c.trim());
        if (content.length > 0 && content[content.length - 1].type === "table") {
          // Add to existing table
        } else {
          content.push(
            <div key={i} className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    {cells.map((cell, j) => (
                      <td
                        key={j}
                        className="border border-border p-2 text-sm"
                      >
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      }
    }
    // Regular paragraph
    else if (line.trim()) {
      // Flush any pending list
      if (currentList.length > 0) {
        content.push(
          <ul key={`list-${i}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
            {currentList.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }

      // Handle bold text
      const formattedText = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      content.push(
        <p
          key={i}
          className="my-3 text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    }
  }

  // Flush remaining list
  if (currentList.length > 0) {
    content.push(
      <ul className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
        {currentList.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }

  return <div className="prose prose-invert max-w-none">{content}</div>;
}

export default async function SubtopicPage({ params }: SubtopicPageProps) {
  const { platform, subtopic } = await params;

  const subtopicData = SUBTOPICS[subtopic];

  if (!subtopicData) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <Link
            href={`/learn/${platform}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu {platform}
          </Link>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl border border-border/60">
                {subtopicData.icon}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
                {subtopicData.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {subtopicData.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{subtopicData.xpTotal}</span>
                  <span className="text-muted-foreground text-sm">XP gesamt</span>
                </div>
                <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{subtopicData.quests.length}</span>
                  <span className="text-muted-foreground text-sm">Quests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-bold">Was du lernen wirst</h2>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl p-6 md:p-8">
            <SubtopicExplanation explanation={subtopicData.explanation} />
          </div>
        </div>
      </section>

      {/* Quest Path Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Dein Quest-Pfad
            </h2>
            <p className="text-muted-foreground">
              Starte mit dem ersten Quest und schalte die nächsten frei
            </p>
          </div>

          <Suspense fallback={<QuestPathSkeleton count={subtopicData.quests.length} />}>
            {subtopicData.quests.length > 0 ? (
              <QuestPath quests={subtopicData.quests} platform={platform} subtopic={subtopic} />
            ) : (
              <div className="text-center py-20 bg-card/40 rounded-2xl border border-border/60">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quests kommen bald!</h3>
                <p className="text-muted-foreground">
                  Wir arbeiten an tollen Quests für dieses Thema.
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
