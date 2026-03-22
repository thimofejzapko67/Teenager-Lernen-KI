import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, BookOpen, Lightbulb, Code2, Play } from "lucide-react";
import { SUBTOPICS } from "@/lib/constants/quests";

interface QuestPageProps {
  params: Promise<{
    platform: string;
    subtopic: string;
    questId: string;
  }>;
}

export async function generateStaticParams() {
  const params: { platform: string; subtopic: string; questId: string }[] = [];

  for (const [subtopicKey, subtopic] of Object.entries(SUBTOPICS)) {
    for (const quest of subtopic.quests) {
      params.push({
        platform: "web-dev", // Default platform for now
        subtopic: subtopicKey,
        questId: quest.id,
      });
    }
  }

  return params;
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { platform, subtopic, questId } = await params;

  const subtopicData = SUBTOPICS[subtopic];
  const quest = subtopicData?.quests.find((q) => q.id === questId);

  if (!quest) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
          <Link
            href={`/learn/${platform}/${subtopic}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu {subtopicData.title}
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Quest {quest.order}
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium border border-yellow-500/20">
                  +{quest.xpReward} XP
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {quest.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {quest.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
          {/* Main Content - Explanation */}
          <div className="lg:col-span-2">
            <div className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Erklärung</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                {quest.explanation.split("\n").map((line, i) => {
                  // Handle headers
                  if (line.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-lg font-bold mt-6 mb-3 text-foreground">
                        {line.replace("### ", "")}
                      </h3>
                    );
                  } else if (line.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-bold mt-8 mb-4 text-foreground">
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }
                  // Handle code blocks
                  else if (line.trim().startsWith("```")) {
                    return null; // Will be handled separately
                  }
                  // Handle list items
                  else if (line.trim().startsWith("- ")) {
                    return (
                      <li key={i} className="text-muted-foreground ml-4">
                        {line.replace(/^- /, "")}
                      </li>
                    );
                  }
                  // Handle code lines (between ``` blocks)
                  else if (line.startsWith("    ") || line.trim().startsWith("<") || line.trim().startsWith("//") || line.trim().startsWith("const") || line.trim().startsWith("function") || line.trim().startsWith("import") || line.trim().startsWith("export") || line.trim().startsWith("return") || line.trim().startsWith("{") || line.trim().startsWith("}")) {
                    return (
                      <pre key={i} className="bg-surface rounded-lg p-3 my-3 overflow-x-auto border border-border">
                        <code className="text-sm font-mono">{line}</code>
                      </pre>
                    );
                  }
                  // Regular paragraphs
                  else if (line.trim()) {
                    // Handle bold text
                    const formattedText = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                    return (
                      <p
                        key={i}
                        className="text-muted-foreground leading-relaxed mb-3"
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Tasks */}
          <div className="lg:col-span-1">
            <div className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl p-6 sticky top-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold">Aufgaben</h2>
              </div>

              <div className="space-y-4">
                {quest.tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{task.question}</h4>

                        {task.type === "multiple-choice" && task.options && (
                          <div className="space-y-2 mt-3">
                            {task.options.map((option, optIndex) => (
                              <button
                                key={optIndex}
                                className="w-full text-left p-3 rounded-lg bg-card/60 border border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm"
                              >
                                <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                                {option}
                              </button>
                            ))}
                          </div>
                        )}

                        {task.type === "code" && (
                          <div className="mt-3">
                            <div className="bg-surface rounded-lg p-3 border border-border">
                              <pre className="text-sm font-mono text-muted-foreground">
                                <code>{task.codeTemplate}</code>
                              </pre>
                            </div>
                          </div>
                        )}

                        {task.hint && (
                          <div className="mt-3 flex items-start gap-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{task.hint}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="#"
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Quiz starten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
