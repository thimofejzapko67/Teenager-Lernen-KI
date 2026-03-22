"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardTabs, type LeaderboardPeriod } from "@/components/leaderboard/leaderboard-tabs";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/leaderboard";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
          "p-2 rounded-lg transition-colors",
          "hover:bg-accent/10",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, i) => (
        <button
          key={i}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..." || isLoading}
          className={cn(
            "min-w-[2.5rem] h-10 px-3 rounded-lg text-sm font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            page === currentPage
              ? "bg-primary text-primary-foreground neon-border"
              : "hover:bg-accent/10 text-muted-foreground hover:text-foreground",
            (page === "...") && "cursor-default"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={cn(
          "p-2 rounded-lg transition-colors",
          "hover:bg-accent/10",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get initial state from URL
  const initialPeriod = (searchParams.get("period") as LeaderboardPeriod) || "global";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [period, setPeriod] = useState<LeaderboardPeriod>(initialPeriod);
  const [page, setPage] = useState(initialPage);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = Math.ceil(total / 25);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getLeaderboard(period, page);
        setEntries(result.entries);
        setTotal(result.total);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        setEntries([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [period, page]);

  // Update URL when state changes
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
      {/* Tabs */}
      <LeaderboardTabs
        currentPeriod={period}
        onPeriodChange={handlePeriodChange}
        disabled={isLoading}
      />

      {/* Table */}
      <LeaderboardTable entries={entries} isLoading={isLoading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Results info */}
      {!isLoading && entries.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Zeige {Math.min((page - 1) * 25 + 1, total)}-{Math.min(page * 25, total)} of{" "}
          {total.toLocaleString()} Entwickler
        </div>
      )}
    </div>
  );
}
