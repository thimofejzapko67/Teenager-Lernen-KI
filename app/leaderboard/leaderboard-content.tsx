"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardTabs, type LeaderboardPeriod } from "@/components/leaderboard/leaderboard-tabs";
import { Top3Podium } from "@/components/leaderboard/top3-podium";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/leaderboard";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Info, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

function Pagination({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:bg-primary/10 hover:text-primary",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
        aria-label="Vorherige Seite"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Zurück</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, i) => (
          <button
            key={i}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..." || isLoading}
            className={cn(
              "min-w-[2.5rem] h-10 px-3 rounded-lg text-sm font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              page === currentPage
                ? "bg-gradient-to-r from-primary to-violet-600 text-white shadow-lg shadow-primary/30 scale-105"
                : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
              page === "..." && "cursor-default hover:bg-transparent"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:bg-primary/10 hover:text-primary",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
        aria-label="Nächste Seite"
      >
        <span className="hidden sm:inline">Weiter</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialPeriod = (searchParams.get("period") as LeaderboardPeriod) || "global";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [period, setPeriod] = useState<LeaderboardPeriod>(initialPeriod);
  const [page, setPage] = useState(initialPage);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = Math.ceil(total / 25);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getLeaderboard(period, page);
        setEntries(result.entries);
        setTotal(result.total);
      } catch (error) {
        setEntries([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [period, page]);

  const updateURL = (newPeriod: LeaderboardPeriod, newPage: number) => {
    const params = new URLSearchParams();
    if (newPeriod !== "global") params.set("period", newPeriod);
    if (newPage > 1) params.set("page", newPage.toString());

    const queryString = params.toString();
    const newUrl = `/leaderboard${queryString ? `?${queryString}` : ""}`;

    startTransition(() => {
      router.push(newUrl);
    });
  };

  const handlePeriodChange = (newPeriod: LeaderboardPeriod) => {
    setPeriod(newPeriod);
    setPage(1);
    updateURL(newPeriod, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    updateURL(period, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <LeaderboardTabs
        currentPeriod={period}
        onPeriodChange={handlePeriodChange}
        disabled={isLoading}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={period + page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {page === 1 && period === "global" && entries.length >= 3 && !isLoading && (
            <div className="mb-6">
              <Top3Podium entries={entries} />
            </div>
          )}

          <LeaderboardTable entries={entries} isLoading={isLoading} showTop3={page === 1 && period === "global"} />
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 pt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />

          {!isLoading && entries.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Info className="w-3.5 h-3.5" />
              <span>
                Zeige {Math.min((page - 1) * 25 + 1, total)}–{Math.min(page * 25, total)} von{" "}
                {total.toLocaleString("de-DE")} Entwicklern
              </span>
            </motion.div>
          )}
        </div>
      )}

      {period === "friends" && !isLoading && entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 text-center border border-dashed"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-violet-500/10">
              <Sparkles className="w-8 h-8 text-violet-400" />
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Noch keine Freunde hinzugefügt</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Füge Freunde hinzu, um zu sehen, wie du im Vergleich zu ihnen abschneidest.
          </p>
        </motion.div>
      )}
    </div>
  );
}
