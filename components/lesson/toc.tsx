"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  items: TOCItem[];
  activeId?: string;
}

export function TOC({ items, activeId }: TOCProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="lg:hidden glass-card rounded-lg overflow-hidden">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <List className="h-4 w-4 text-primary" />
          <span className="font-semibold">Inhaltsverzeichnis</span>
        </div>
        <span
          className={cn(
            "transform transition-transform",
            isCollapsed ? "-rotate-90" : "rotate-90"
          )}
        >
          ▼
        </span>
      </button>

      {!isCollapsed && (
        <nav className="p-4 pt-0 space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                "block w-full text-left py-1.5 px-2 rounded transition-all",
                "hover:bg-primary/10 hover:text-primary",
                activeId === item.id
                  ? "bg-primary/20 text-primary font-medium border-l-2 border-primary"
                  : "text-muted-foreground",
                item.level === 3 && "pl-6 text-sm"
              )}
            >
              {item.text}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

interface DesktopTOCProps {
  items: TOCItem[];
  activeId?: string;
}

export function DesktopTOC({ items, activeId }: DesktopTOCProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block sticky top-24 w-64 shrink-0 self-start">
      <div className="glass-card rounded-lg p-4">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <List className="h-4 w-4" />
          Auf dieser Seite
        </h4>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  const offset = 100;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = element.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className={cn(
                "block py-1.5 px-2 rounded transition-all text-sm",
                "hover:bg-primary/10 hover:text-primary",
                activeId === item.id
                  ? "bg-primary/20 text-primary font-medium border-l-2 border-primary"
                  : "text-muted-foreground",
                item.level === 3 && "pl-4 text-xs"
              )}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
