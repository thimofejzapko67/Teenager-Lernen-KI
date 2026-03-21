import { Suspense } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { SearchResults } from '@/components/search/search-results';
import { search } from '@/lib/search';

interface SearchPageProps {
  searchParams: { q?: string };
}

async function SearchContent({ query }: { query: string }) {
  const results = await search(query);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <SearchBar className="flex-1 max-w-xl" placeholder="Search..." />
          </div>
        </div>

        {/* Search Results */}
        {query && <SearchResults results={results} query={query} />}

        {!query && (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Search ClawAcademy</h1>
            <p className="text-muted-foreground mb-8">
              Find lessons, users, and projects
            </p>
            <SearchBar className="max-w-md mx-auto" placeholder="Type to search..." />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent query={query} />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-4">
          <div className="h-12 rounded-lg bg-muted animate-pulse" />
          <div className="h-32 rounded-lg bg-muted animate-pulse" />
          <div className="h-32 rounded-lg bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
