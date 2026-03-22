import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ArrowLeft, Zap, Trophy, Users } from "lucide-react"

const perks = [
  { icon: Zap,    text: "Sofort +50 XP beim ersten Login" },
  { icon: Trophy, text: "Kämpfe um Sponsorship-Plätze" },
  { icon: Users,  text: "Werde Teil der Community" },
]

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const defaultTab = tab === "signup" ? "signup" : "login"

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect("/dashboard")

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] relative p-14 border-r border-border">
        {/* Lime glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10 w-fit">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shadow-lg shadow-primary/25">
            <span className="text-primary-foreground font-display font-extrabold">C</span>
          </div>
          <span className="text-xl font-display font-extrabold text-foreground">Codelift</span>
        </Link>

        {/* Main pitch */}
        <div className="relative z-10 space-y-10">
          <div className="space-y-5">
            <span className="section-label">Für Teenager</span>
            <h2 className="text-5xl font-display font-extrabold leading-tight mt-4">
              Code dich
              <br />
              <span className="text-primary neon-text">nach oben.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Lerne KI-Entwicklung, sammle XP und werde von echten Tech-Companies gesponsert.
            </p>
          </div>

          {/* Perks */}
          <div className="space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">{text}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {["🧑‍💻", "👩‍💻", "🧑‍🎓", "👨‍💻"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-bold">1.200+</span> Teenager bereits dabei
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
          {[
            { n: "50+", l: "Lektionen" },
            { n: "350+", l: "Projekte" },
            { n: "100%", l: "Kostenlos" },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <p className="text-2xl font-display font-extrabold text-primary">{n}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-14 relative z-10">
        {/* Back */}
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
        </div>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2.5 justify-center">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-primary-foreground font-display font-extrabold">C</span>
            </div>
            <span className="text-xl font-display font-extrabold">Codelift</span>
          </Link>
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="text-2xl font-display font-bold">
              {defaultTab === "signup" ? "Account erstellen" : "Willkommen zurück"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {defaultTab === "signup"
                ? "Kostenlos starten — keine Kreditkarte nötig."
                : "Melde dich an und weiter geht's."}
            </p>
          </div>

          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border bg-muted/30 h-auto p-0">
                <TabsTrigger
                  value="login"
                  className="rounded-none py-3 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-none border-r border-border"
                >
                  Einloggen
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-none py-3 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Registrieren
                </TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Mit der Anmeldung stimmst du unseren{" "}
            <Link href="/impressum" className="text-primary hover:underline">Nutzungsbedingungen</Link>
            {" "}und der{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>
            {" "}zu.
          </p>
        </div>
      </div>
    </div>
  )
}
