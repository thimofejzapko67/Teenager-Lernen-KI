import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ArrowLeft, Zap, Trophy, Users } from "lucide-react"

const perks = [
  { icon: Zap, text: "Sofort +50 XP beim ersten Login" },
  { icon: Trophy, text: "Kämpfe um Sponsorship-Plätze" },
  { icon: Users, text: "Werde Teil der Community" },
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
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-border/40 to-transparent" />

      {/* Left panel — brand/marketing */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative p-12 border-r border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10 w-fit">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold font-display">C</span>
          </div>
          <span className="text-xl font-display font-bold bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">
            Codelift
          </span>
        </Link>

        {/* Main pitch */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold leading-tight">
              Code dich{" "}
              <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                nach oben.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Lerne KI-Entwicklung, sammle XP und werde von echten Tech-Companies gesponsert.
            </p>
          </div>

          {/* Perks */}
          <div className="space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
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
                  className="w-8 h-8 rounded-full bg-card border border-border/60 flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-semibold">1.200+</span> Teenager bereits dabei
            </p>
          </div>
        </div>

        {/* Decoration */}
        <div className="absolute bottom-12 right-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative z-10">
        {/* Back link */}
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-bold font-display">C</span>
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">
              Codelift
            </span>
          </Link>
        </div>

        <div className="w-full max-w-sm space-y-6">
          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl font-display font-bold">
              {defaultTab === "signup" ? "Account erstellen" : "Willkommen zurück"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {defaultTab === "signup"
                ? "Kostenlos starten — kein Kreditkarte nötig."
                : "Melde dich an und weiter geht's."}
            </p>
          </div>

          {/* Card */}
          <Card className="border-border/60 bg-card/70 backdrop-blur-sm shadow-2xl shadow-black/20">
            <CardContent className="pt-6">
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                  <TabsTrigger value="login" className="text-sm font-medium">Einloggen</TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm font-medium">Registrieren</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>

                <TabsContent value="signup">
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Legal */}
          <p className="text-center text-xs text-muted-foreground">
            Mit der Anmeldung stimmst du unseren{" "}
            <Link href="/impressum" className="text-primary hover:underline">
              Nutzungsbedingungen
            </Link>{" "}
            und der{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>{" "}
            zu.
          </p>
        </div>
      </div>
    </div>
  )
}
