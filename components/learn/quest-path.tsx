"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle, Play, ChevronDown, ChevronUp, Sparkles, BookOpen, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Quest } from "@/types/quests";

interface QuestNodeProps {
  quest: Quest;
  index: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  platform: string;
  subtopic: string;
}

function QuestNode({ quest, index, isUnlocked, isCompleted, platform, subtopic }: QuestNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative"
    >
      {/* Connection Line */}
      {index > 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-1 h-8 bg-gradient-to-b from-primary/50 to-primary/20" />
      )}

      {/* Quest Node */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={() => isUnlocked && setIsExpanded(!isExpanded)}
          whileHover={isUnlocked ? { scale: 1.05 } : {}}
          whileTap={isUnlocked ? { scale: 0.95 } : {}}
          className={cn(
            "relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg",
            isCompleted
              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30"
              : isUnlocked
              ? "bg-gradient-to-br from-primary to-secondary text-white shadow-primary/30 hover:shadow-primary/50 cursor-pointer"
              : "bg-surface border-2 border-border text-muted-foreground cursor-not-allowed opacity-60"
          )}
        >
          {isCompleted ? (
            <CheckCircle className="w-10 h-10 mb-1" />
          ) : isUnlocked ? (
            <>
              <Play className="w-10 h-10 mb-1" />
              <span className="text-xs font-medium">Quest {index + 1}</span>
            </>
          ) : (
            <>
              <Lock className="w-8 h-8 mb-1" />
              <span className="text-xs">Quest {index + 1}</span>
            </>
          )}
        </motion.button>

        {/* Quest Info */}
        <div className="mt-3 text-center max-w-[200px]">
          <h3 className={cn(
            "font-semibold text-sm mb-1",
            isUnlocked ? "text-foreground" : "text-muted-foreground"
          )}>
            {quest.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            +{quest.xpReward} XP
          </p>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && isUnlocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mt-4 overflow-hidden"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Was du lernst:
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {quest.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Code2 className="w-4 h-4" />
                  <span>{quest.tasks.length} Aufgaben</span>
                </div>

                <Link
                  href={`/learn/${platform}/${subtopic}/${quest.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Quest starten
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface QuestPathProps {
  quests: Quest[];
  completedQuests?: string[];
  platform?: string;
  subtopic?: string;
}

export function QuestPath({ quests, completedQuests = [], platform = "web-dev", subtopic = "frontend" }: QuestPathProps) {
  return (
    <div className="py-12">
      {/* Path Container */}
      <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto">
        {quests.map((quest, index) => {
          // Quest is unlocked if previous quest is completed or it's the first quest
          const isUnlocked = index === 0 || completedQuests.includes(quests[index - 1].id);
          const isCompleted = completedQuests.includes(quest.id);

          return (
            <QuestNode
              key={quest.id}
              quest={quest}
              index={index}
              isUnlocked={isUnlocked}
              isCompleted={isCompleted}
              platform={platform}
              subtopic={subtopic}
            />
          );
        })}
      </div>
    </div>
  );
}

interface QuestPathSkeletonProps {
  count?: number;
}

export function QuestPathSkeleton({ count = 6 }: QuestPathSkeletonProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 max-w-2xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 bg-surface/60 rounded-2xl animate-pulse" />
          <div className="w-24 h-4 bg-surface/60 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
