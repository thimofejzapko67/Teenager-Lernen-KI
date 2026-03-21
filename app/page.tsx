export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-display font-bold neon-text">
          ClawAcademy
        </h1>
        <p className="text-xl text-muted-foreground">
          KI-Entwicklung für Teenager
        </p>
        <div className="flex gap-4 justify-center">
          <button className="cyber-button px-8 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Start Learning
          </button>
          <button className="cyber-button px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-colors">
            Explore
          </button>
        </div>
      </div>
    </main>
  );
}
