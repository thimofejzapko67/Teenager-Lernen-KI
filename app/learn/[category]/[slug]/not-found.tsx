import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LessonNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
          <FileQuestion className="h-10 w-10 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Lektion nicht gefunden</h1>
          <p className="text-muted-foreground">
            Die Lektion, die du suchst, existiert nicht oder wurde verschoben.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/learn">
              <Home className="h-4 w-4 mr-2" />
              Zur Übersicht
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">Zur Startseite</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
