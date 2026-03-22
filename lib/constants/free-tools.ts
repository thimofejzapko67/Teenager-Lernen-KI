export interface FreeTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "free" | "low-cost";
  whatIsIt: string;
  integration: string;
  setupSteps: string[];
}

export const FREE_TOOLS: Record<string, FreeTool> = {
  "opencode": {
    id: "opencode",
    title: "openCode",
    description: "KI-gestützte CLI für vollständigen Projekt-Zugriff",
    icon: "💻",
    category: "free",
    whatIsIt: "openCode CLI ist ein revolutionäres Kommandozeilen-Tool, das einer KI vollständigen Zugriff auf deinen gesamten Codebase gibt. Die KI kann dadurch nicht nur einzelne Code-Fragmente verstehen, sondern das komplette Projekt analysieren, Zusammenhänge zwischen Dateien erkennen und sogar ganze Features selbstständig implementieren. Statt Code-Snippets zu kopieren, kann openCode dein gesamtes Projekt bauen, Refactorings durchführen und komplexe Aufgaben lösen, die ein tiefes Verständnis deiner Architektur erfordern.",
    integration: "openCode CLI integriert sich direkt in dein Terminal und arbeitet mit deinem lokalen Dateisystem. Es kann mit jedem Projekt-Typ verwendet werden - sei es Web-Development, Mobile Apps oder Backend-Services. Die KI liest alle relevanten Dateien, versteht die Struktur und kann Änderungen direkt in deinem Code vornehmen.",
    setupSteps: [
      "Öffne dein Terminal im Projektverzeichnis",
      "Installiere openCode CLI mit 'npm install -g opencode'",
      "Führe 'opencode init' aus, um das Tool zu konfigurieren",
      "Gib der KI Zugriff auf dein Projekt mit 'opencode grant-access'",
      "Starte deine erste KI-gestützte Aufgabe mit 'opencode build \"Feature beschreiben\"'"
    ]
  },
  "kilo-cli": {
    id: "kilo-cli",
    title: "Kilo CLI",
    description: "Dein intelligenter Begleiter für die Kommandozeile",
    icon: "⚡",
    category: "free",
    whatIsIt: "Kilo CLI ist ein mächtiges Kommandozeilen-Tool, das KI direkt in dein Terminal bringt. Es hilft dir beim Schreiben von Code, erklärt komplexe Fehlermeldungen, schlägt Verbesserungen vor und kann sogar ganzen Code refactoren. Perfekt für Entwickler, die effizienter arbeiten möchten, ohne ständig zwischen Editor und Browser zu wechseln.",
    integration: "Kilo CLI funktioniert als standalone Tool in jeder Shell-Umgebung (bash, zsh, fish). Es kann in deinen bestehenden Workflow integriert werden und arbeitet mit allen gängigen Version-Control-Systemen zusammen. Du kannst es für Git-Operationen, Code-Analysen und Automatisierungsaufgaben nutzen.",
    setupSteps: [
      "Stelle sicher, dass Node.js (Version 16+) installiert ist",
      "Installiere Kilo CLI global: 'npm install -g kilo-cli'",
      "Führe 'kilo config --api-key DEIN_KEY' aus, um deinen API-Key zu setzen",
      "Teste die Installation: 'kilo --version'",
      "Probiere deinen ersten Befehl: 'kilo explain \"Was macht dieser Code?\"'"
    ]
  },
  "openrouter": {
    id: "openrouter",
    title: "openRouter",
    description: "Eine API für alle KI-Modelle",
    icon: "🔀",
    category: "free",
    whatIsIt: "openRouter ist dein universeller Gateway zu verschiedenen KI-Modellen. Anstatt für jedes KI-Modell (GPT-4, Claude, Llama, etc.) separate API-Keys zu verwalten und verschiedene Integrationen zu schreiben, bietet openRouter eine einzige, einheitliche API. Du kannst zwischen Modellen wechseln, ohne deinen Code zu ändern - perfekt für Experimente und um das beste Modell für jede Aufgabe zu finden.",
    integration: "openRouter integriert sich als Zwischenschicht in deine Anwendung. Statt direkt OpenAI, Anthropic oder andere Anbieter aufzurufen, sendest du Requests an openRouter. Es funktioniert mit jedem HTTP-Client und jeder Programmiersprache. Die Response-Formate sind standardisiert, sodass du Modell-Wechsel transparent durchführen kannst.",
    setupSteps: [
      "Erstelle einen kostenlosen Account auf openrouter.ai",
      "Navigiere zum Dashboard und generiere deinen API-Key",
      "Installiere das SDK: 'npm install openrouter' (oder nutze REST API)",
      "Konfiguriere openRouter mit deinem API-Key in der .env-Datei",
      "Wähle ein Modell (z.B. 'openai/gpt-4') und sende deine erste Anfrage"
    ]
  },
  "qwencoder": {
    id: "qwencoder",
    title: "QwenCoder",
    description: "Open-Source KI speziell für Programmieren",
    icon: "🤖",
    category: "free",
    whatIsIt: "QwenCoder ist ein speziell für die Code-Generierung trainiertes KI-Modell aus der Qwen-Familie. Im Gegensatz zu allgemeinen KI-Modellen versteht QwenCoder Programmiersprachen auf einem tieferen Level - es kann komplexe Algorithmen schreiben, Bugs finden und Code optimieren. Als Open-Source-Modell kannst du es lokal ausführen und hast volle Kontrolle über deine Daten.",
    integration: "QwenCoder kann auf verschiedene Weisen genutzt werden: lokal auf deinem Computer (für maximale Privatsphäre), über Cloud-APIs oder integriert in IDEs wie VS Code. Es unterstützt über 20 Programmiersprachen und kann für Autovervollständigung, Code-Reviews und Dokumentationsgenerierung verwendet werden.",
    setupSteps: [
      "Entscheide: Lokale Installation oder Cloud-Nutzung",
      "Für lokal: Installiere Ollama oder llama.cpp",
      "Lade das QwenCoder-Modell herunter (z.B. 'ollama pull qwencoder')",
      "Teste das Modell mit einer einfachen Code-Anfrage",
      "Optional: Installiere die VS Code Extension für direkte Integration"
    ]
  },
  "gemini-cli": {
    id: "gemini-cli",
    title: "Gemini CLI",
    description: "Google's leistungsstarke KI im Terminal",
    icon: "✨",
    category: "free",
    whatIsIt: "Gemini CLI bringt Google's fortschrittlichstes KI-Modell direkt in deine Kommandozeile. Mit Zugriff auf Gemini's multimodale Fähigkeiten kannst du nicht nur Text verarbeiten, sondern auch Bilder analysieren, komplexe Reasoning-Aufgaben lösen und Code generieren. Die CLI eignet sich perfekt für Automatisierung, schnelle Fragen zwischendurch und die Integration in Scripts.",
    integration: "Gemini CLI integriert sich nahtlos in deine bestehende Terminal-Umgebung. Es kann in Shell-Scripts verwendet werden, mit Pipes kombiniert werden und Output an andere Tools weiterleiten. Perfekt für CI/CD-Pipelines, automatische Dokumentation oder als intelligenter Assistent beim Programmieren.",
    setupSteps: [
      "Installiere die Google Cloud CLI (gcloud)",
      "Authentifiziere dich: 'gcloud auth login'",
      "Aktiviere die Gemini API in der Google Cloud Console",
      "Installiere das Gemini CLI Package: 'npm install -g @google/generative-ai-cli'",
      "Teste mit: 'gemini \"Erkläre mir Docker\"'"
    ]
  },
  "google-ai-studio": {
    id: "google-ai-studio",
    title: "Google AI Studio",
    description: "Visueller Playground für KI-Entwicklung",
    icon: "🎨",
    category: "free",
    whatIsIt: "Google AI Studio ist eine kostenlose, webbasierte Plattform zum Experimentieren mit Google's neuesten KI-Modellen. Du kannst Prompts testen, verschiedene Modelle vergleichen, Temperatureinstellungen anpassen und die perfecten Konfigurationen für deine Anwendung finden. Besonders praktisch: Du kannst fertige Prompts direkt als Code exportieren und in deine Anwendung integrieren.",
    integration: "Google AI Studio funktioniert komplett im Browser - keine Installation nötig. Du kannst Prompts entwickeln, testen und dann als API-Aufrufe in deine Anwendung übernehmen. Es bietet auch Functions Calling, strukturierte Outputs und die Möglichkeit, Prompts als Templates zu speichern und mit dem Team zu teilen.",
    setupSteps: [
      "Besuche aistudio.google.com",
      "Melde dich mit deinem Google-Konto an",
      "Klicke auf 'Create new prompt' für dein erstes Experiment",
      "Teste verschiedene Modelle (Gemini Pro, Flash, etc.)",
      "Nutze 'Get code' um den Prompt in deine App zu integrieren"
    ]
  },
  "z-ai": {
    id: "z-ai",
    title: "z.ai",
    description: "Professionelle KI-Plattform für ernsthafte Projekte",
    icon: "🚀",
    category: "low-cost",
    whatIsIt: "z.ai ist eine professionelle KI-Plattform, die über die Grundfunktionen kostenloser Tools hinausgeht. Mit höheren Rate-Limits, besserer Performance und erweiterten Features wie Team-Kollaboration, Custom Model Fine-Tuning und Enterprise-Grade Security ist es ideal für ernsthafte Projekte und wachsende Teams, die zuverlässige KI-Leistung benötigen.",
    integration: "z.ai bietet umfassende APIs und SDKs für alle gängigen Programmiersprachen (Python, JavaScript, Go, etc.). Es lässt sich nahtlos in bestehende CI/CD-Pipelines integrieren und bietet Webhooks für Event-getriebene Architekturen. Die Plattform skaliert automatisch mit deinen Anforderungen.",
    setupSteps: [
      "Erstelle einen Account auf z.ai und wähle einen Plan",
      "Generiere deine API-Credentials im Dashboard",
      "Installiere das z.ai SDK: 'npm install z-ai-sdk'",
      "Konfiguriere Environment-Variablen für API-Key",
      "Integriere die API in deine erste Anwendung"
    ]
  }
};

export const FREE_TOOLS_LIST = Object.values(FREE_TOOLS);
export const FREE_TOOLS_ONLY = FREE_TOOLS_LIST.filter(tool => tool.category === "free");
export const LOW_COST_TOOLS = FREE_TOOLS_LIST.filter(tool => tool.category === "low-cost");
