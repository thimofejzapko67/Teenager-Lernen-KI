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
    description: "Open-Source Code-Editor mit KI-Unterstützung",
    icon: "💻",
    category: "free",
    whatIsIt: "openCode ist ein leistungsstarker, open-source Code-Editor mit integrierter KI-Unterstützung. Er bietet Syntax-Highlighting, IntelliSense und nahtlose Git-Integration für eine verbesserte Entwicklungs-erfahrung.",
    integration: "openCode lässt sich einfach in deine bestehende Entwicklungsumgebung integrieren. Es unterstützt alle gängigen Programmiersprachen und kann mit Git-Repositories verbunden werden.",
    setupSteps: [
      "Lade openCode von der offiziellen Website herunter",
      "Installiere den Editor auf deinem Betriebssystem",
      "Öffne openCode und konfiguriere deine Einstellungen",
      "Installiere empfohlene Erweiterungen für deine Sprache",
      "Verbinde dein GitHub-Konto für Git-Integration"
    ]
  },
  "kilo-cli": {
    id: "kilo-cli",
    title: "Kilo CLI",
    description: "Kommandozeilen-Tool für KI-gestützte Entwicklung",
    icon: "⚡",
    category: "free",
    whatIsIt: "Kilo CLI ist ein Kommandozeilen-Tool, das KI-gestützte Entwicklung direkt im Terminal ermöglicht. Es hilft beim Schreiben, Refactoring und Debuggen von Code.",
    integration: "Kilo CLI funktioniert als Standalone-Tool oder als Erweiterung für deine bestehende CLI-Workflow-Umgebung. Es kann mit allen gängigen Shells verwendet werden.",
    setupSteps: [
      "Installiere Node.js falls noch nicht vorhanden",
      "Führe 'npm install -g kilo-cli' aus",
      "Konfiguriere deinen API-Key mit 'kilo config'",
      "Teste die Installation mit 'kilo --version'",
      "Starte dein erstes Projekt mit 'kilo init'"
    ]
  },
  "openrouter": {
    id: "openrouter",
    title: "openRouter",
    description: "Einheitliche API für verschiedene KI-Modelle",
    icon: "🔀",
    category: "free",
    whatIsIt: "openRouter bietet eine einheitliche API-Schnittstelle, um auf verschiedene KI-Modelle zuzugreifen. Es ermöglicht das einfache Wechseln zwischen verschiedenen Modellen ohne Code-Änderungen.",
    integration: "openRouter kann in jede Anwendung integriert werden, die KI-Funktionalitäten benötigt. Es ersetzt direkte API-Aufrufe an einzelne Anbieter durch eine standardisierte Schnittstelle.",
    setupSteps: [
      "Erstelle einen Account auf openrouter.ai",
      "Generiere einen API-Key im Dashboard",
      "Installiere das openRouter SDK: 'npm install openrouter'",
      "Konfiguriere deinen API-Key in der Anwendung",
      "Wähle das gewünschte Modell und starte"
    ]
  },
  "qwencoder": {
    id: "qwencoder",
    title: "QwenCoder",
    description: "Spezialisiertes KI-Modell für Code-Generierung",
    icon: "🤖",
    category: "free",
    whatIsIt: "QwenCoder ist ein auf Code spezialisiertes KI-Modell, das für das Verstehen und Generieren von Programmcode optimiert ist. Es unterstützt mehrere Programmiersprachen.",
    integration: "QwenCoder kann über verschiedene Schnittstellen genutzt werden - als Standalone-Tool, über API-Aufrufe oder integriert in Entwicklungsumgebungen.",
    setupSteps: [
      "Besuche die QwenCoder-Website oder GitHub-Seite",
      "Wähle die gewünschte Installationsmethode",
      "Lade das Modell oder installiere das SDK",
      "Konfiguriere die Spracheinstellungen",
      "Teste mit einem einfachen Code-Beispiel"
    ]
  },
  "gemini-cli": {
    id: "gemini-cli",
    title: "Gemini CLI",
    description: "Google's KI-Modell für die Kommandozeile",
    icon: "✨",
    category: "free",
    whatIsIt: "Gemini CLI ermöglicht den Zugriff auf Google's Gemini KI-Modell direkt über die Kommandozeile. Es bietet leistungsstarke Textverarbeitung und Code-Analyse.",
    integration: "Das Tool lässt sich nahtlos in CLI-Workflows integrieren und kann für Automatisierung, Code-Reviews und Dokumentationsgenerierung verwendet werden.",
    setupSteps: [
      "Installiere Google Cloud CLI",
      "Authentifiziere dich mit 'gcloud auth login'",
      "Aktiviere die Gemini API in Google Cloud",
      "Installiere das Gemini CLI-Paket",
      "Teste mit 'gemini chat \"Hallo\"'"
    ]
  },
  "google-ai-studio": {
    id: "google-ai-studio",
    title: "Google AI Studio",
    description: "Web-basierte Plattform für KI-Experimente",
    icon: "🎨",
    category: "free",
    whatIsIt: "Google AI Studio ist eine webbasierte Plattform zum Experimentieren mit Google's KI-Modellen. Es bietet eine visuelle Oberfläche zum Testen und Optimieren von Prompts.",
    integration: "AI Studio kann direkt im Browser verwendet werden. Ergebnisse und Prompts können exportiert und in Anwendungen integriert werden.",
    setupSteps: [
      "Besuche aistudio.google.com",
      "Melde dich mit deinem Google-Konto an",
      "Erstelle ein neues Projekt",
      "Wähle ein Modell und experimentiere mit Prompts",
      "Exportiere erfolgreiche Prompts für deine Anwendung"
    ]
  },
  "z-ai": {
    id: "z-ai",
    title: "z.ai",
    description: "Kostenpflichtige KI-Plattform mit erweiterten Features",
    icon: "🚀",
    category: "low-cost",
    whatIsIt: "z.ai ist eine KI-Plattform mit erweiterten Funktionen für professionelle Entwickler. Es bietet höhere Limits, bessere Performance und zusätzliche Features.",
    integration: "z.ai bietet APIs und SDKs für verschiedene Programmiersprachen und kann in bestehende Workflows integriert werden.",
    setupSteps: [
      "Erstelle einen Account auf z.ai",
      "Wähle einen passenden Plan",
      "Generiere API-Credentials",
      "Installiere das z.ai SDK",
      "Integriere die API in deine Anwendung"
    ]
  }
};

export const FREE_TOOLS_LIST = Object.values(FREE_TOOLS);
export const FREE_TOOLS_ONLY = FREE_TOOLS_LIST.filter(tool => tool.category === "free");
export const LOW_COST_TOOLS = FREE_TOOLS_LIST.filter(tool => tool.category === "low-cost");
