import type { Subtopic } from "@/types/quests";

export const SUBTOPICS: Record<string, Subtopic> = {
  frontend: {
    id: "frontend",
    title: "Frontend",
    description: "HTML, CSS, React, Next.js",
    icon: "🎨",
    xpTotal: 750,
    explanation: `## Was ist Frontend?

Das Frontend ist der **sichtbare Teil** einer Website oder Web-App - alles, was用户 sehen und mit dem sie interagieren können.

### Die drei Säulen des Frontends:

1. **HTML** (HyperText Markup Language) - Das Grundgerüst
   - Definiert die Struktur und den Inhalt
   - Überschriften, Texte, Bilder, Links...

2. **CSS** (Cascading Style Sheets) - Das Design
   - Farben, Schriftarten, Abstände, Layouts
   - Macht Websites schön und responsive

3. **JavaScript** - Die Interaktivität
   - Klicks, Animationen, Daten laden
   - Macht Websites lebendig

### Moderne Frontend-Frameworks:

- **React** - Von Meta, am weitesten verbreitet
- **Next.js** - React-Framework mit Server-Rendering
- **Vue.js** - Einfach zu lernen
- **Svelte** - Schnell und kompakt

### Frontend vs Backend:

| Frontend | Backend |
|----------|---------|
| Sichtbar für用户 | Unsichtbar, läuft auf Server |
| HTML, CSS, JS | Python, Node.js, Datenbanken |
|用户-Interaktion | Datenverarbeitung |`,
    quests: [
      {
        id: "html-basics",
        title: "HTML Grundlagen",
        description: "Lerne die Grundlagen von HTML",
        explanation: `## HTML Grundlagen

HTML steht für **HyperText Markup Language** und ist die Grundlage jeder Website.

### Wichtige HTML-Tags:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Meine erste Seite</title>
</head>
<body>
    <h1>Überschrift 1</h1>
    <h2>Überschrift 2</h2>
    <p>Ein Absatz mit Text.</p>
    <a href="https://beispiel.de">Ein Link</a>
    <img src="bild.jpg" alt="Bildbeschreibung">
    <button>Ein Button</button>
</body>
</html>
\`\`\`

### Das Wichtigste:
- Jedes HTML-Dokument beginnt mit \`<!DOCTYPE html>\`
- Der Inhalt steht in \`<body>\`...\`</body>\`
- Überschriften: \`<h1>\` (größte) bis \`<h6>\` (kleinste)
- Text: \`<p>\` für Absätze
- Links: \`<a href="url">Text</a>\``,
        xpReward: 50,
        order: 1,
        tasks: [
          {
            id: "html-task-1",
            type: "multiple-choice",
            question: "Was bedeutet HTML?",
            options: [
              "HyperText Markup Language",
              "High Tech Modern Language",
              "Home Tool Markup Language",
              "Hyperlinks and Text Markup Language"
            ],
            correctAnswer: 0,
            hint: "Es steht für HyperText Markup Language"
          },
          {
            id: "html-task-2",
            type: "multiple-choice",
            question: "Welcher Tag wird für die größte Überschrift verwendet?",
            options: ["<head>", "<h6>", "<h1>", "<header>"],
            correctAnswer: 2,
            hint: "h1 ist die größte Überschrift"
          },
          {
            id: "html-task-3",
            type: "code",
            question: "Erstelle einen Absatz mit dem Text 'Hallo Welt!'",
            codeTemplate: "<!-- Schreibe deinen Code hier -->",
            correctAnswer: "<p>Hallo Welt!</p>",
            hint: "Verwende den <p> Tag"
          }
        ]
      },
      {
        id: "css-basics",
        title: "CSS Grundlagen",
        description: "Lerne wie du Websites stylen kannst",
        explanation: `## CSS Grundlagen

CSS steht für **Cascading Style Sheets** und macht Websites schön.

### So bindest du CSS ein:

\`\`\`html
<!-- Methode 1: Externe CSS-Datei -->
<link rel="stylesheet" href="style.css">

<!-- Methode 2: Im <head> Bereich -->
<style>
    h1 { color: blue; }
</style>

<!-- Methode 3: Inline (nicht empfohlen) -->
<h1 style="color: blue;">Überschrift</h1>
\`\`\`

### Wichtige CSS-Eigenschaften:

\`\`\`css
/* Textfarbe */
color: red;

/* Hintergrundfarbe */
background-color: #f0f0f0;

/* Schriftgröße */
font-size: 20px;

/* Abstand außen */
margin: 10px;

/* Abstand innen */
padding: 15px;

/* Rahmen */
border: 2px solid black;
\`\`\`

### Klassen und IDs:

\`\`\`css
/* Klasse mit . */
.meine-klasse { color: blue; }

/* ID mit # */
#meine-id { color: red; }
\`\`\``,
        xpReward: 75,
        order: 2,
        tasks: [
          {
            id: "css-task-1",
            type: "multiple-choice",
            question: "Wofür steht CSS?",
            options: [
              "Computer Style Sheets",
              "Cascading Style Sheets",
              "Creative Style Sheets",
              "Colorful Style Sheets"
            ],
            correctAnswer: 1,
            hint: "Es steht für Cascading Style Sheets"
          },
          {
            id: "css-task-2",
            type: "multiple-choice",
            question: "Welche Eigenschaft ändert die Textfarbe?",
            options: ["text-color", "font-color", "color", "foreground"],
            correctAnswer: 2,
            hint: "Es ist einfach nur 'color'"
          },
          {
            id: "css-task-3",
            type: "code",
            question: "Mache die Schriftgröße 24px",
            codeTemplate: "p { /* Schreibe deinen Code hier */ }",
            correctAnswer: "font-size: 24px;",
            hint: "Verwende font-size: 24px;"
          }
        ]
      },
      {
        id: "javascript-basics",
        title: "JavaScript Grundlagen",
        description: "Lerne wie du Websites interaktiv machst",
        explanation: `## JavaScript Grundlagen

JavaScript macht Websites **interaktiv** und **lebendig**.

### Variablen:

\`\`\`javascript
// const - kann nicht geändert werden
const name = "Max";

// let - kann geändert werden
let alter = 18;

// var - alt, nicht mehr verwenden
var x = 5;
\`\`\`

### Funktionen:

\`\`\`javascript
// Funktionsdefinition
function sagHallo() {
    console.log("Hallo!");
}

// Aufrufen
sagHallo();

// Mit Parameter
function gruesse(name) {
    console.log("Hallo " + name + "!");
}

gruesse("Max"); // Hallo Max!
\`\`\`

### Events:

\`\`\`javascript
// Button-Klick
document.getElementById("meinButton").addEventListener("click", function() {
    alert("Button wurde geklickt!");
});

// OnClick-Attribut
<button onclick="sagHallo()">Klick mich</button>
\`\`\``,
        xpReward: 100,
        order: 3,
        tasks: [
          {
            id: "js-task-1",
            type: "multiple-choice",
            question: "Welches Schlüsselwort definiert eine unveränderbare Variable?",
            options: ["let", "var", "const", "variable"],
            correctAnswer: 2,
            hint: "const steht für constant"
          },
          {
            id: "js-task-2",
            type: "multiple-choice",
            question: "Wie ruft man eine Funktion auf?",
            options: [
              "rufe meineFunktion",
              "meineFunktion()",
              "meineFunktion{}",
              "call meineFunktion"
            ],
            correctAnswer: 1,
            hint: "Funktionen werden mit () aufgerufen"
          },
          {
            id: "js-task-3",
            type: "code",
            question: "Definiere eine Variable 'name' mit dem Wert 'Anna'",
            codeTemplate: "// Schreibe deinen Code hier",
            correctAnswer: "const name = \"Anna\";",
            hint: "Verwende const und Anführungszeichen"
          }
        ]
      },
      {
        id: "react-basics",
        title: "React Basics",
        description: "Lerne die Grundlagen von React",
        explanation: `## React Basics

React ist ein **JavaScript-Framework** von Meta für moderne Web-Apps.

### Komponenten:

\`\`\`jsx
// Eine einfache Komponente
function Welcome() {
    return <h1>Hallo und willkommen!</h1>;
}

// Mit Props (Eigenschaften)
function Welcome(props) {
    return <h1>Hallo {props.name}!</h1>;
}

// Verwendung
<Welcome name="Max" />
\`\`\`

### useState:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Klicks: {count}
        </button>
    );
}
\`\`\`

### JSX-Regeln:
- Alle Tags müssen geschlossen werden
- \`className\` statt \`class\`
- \`{ }\` für JavaScript-Ausdrücke`,
        xpReward: 125,
        order: 4,
        tasks: [
          {
            id: "react-task-1",
            type: "multiple-choice",
            question: "Welches Hook wird für State verwendet?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            correctAnswer: 1,
            hint: "useState"
          },
          {
            id: "react-task-2",
            type: "multiple-choice",
            question: "Wie schreibt man 'class' in JSX?",
            options: ["class", "className", "klass", "cssClass"],
            correctAnswer: 1,
            hint: "Es ist className"
          },
          {
            id: "react-task-3",
            type: "code",
            question: "Erstelle einen State mit useState, der bei 0 startet",
            codeTemplate: "const [count, setCount] = /* Schreibe deinen Code hier */;",
            correctAnswer: "useState(0)",
            hint: "useState(0)"
          }
        ]
      },
      {
        id: "nextjs-basics",
        title: "Next.js Einführung",
        description: "Lerne die Grundlagen von Next.js",
        explanation: `## Next.js Einführung

Next.js ist ein **React-Framework** mit zusätzlichen Features.

### Vorteile von Next.js:
- **Server-Side Rendering** - Schnellere Ladezeiten
- **File-based Routing** - Routes aus Ordnern
- **API Routes** - Backend im Frontend
- **Vercel Deployment** - Ein Klick Deploy

### Routing:

\`\`\`
app/
├── page.tsx          → / (Startseite)
├── about/
│   └── page.tsx      → /about
├── blog/
│   ├── page.tsx      → /blog
│   └── [slug]/
│       └── page.tsx  → /blog/mein-artikel
\`\`\`

### Einfache Seite:

\`\`\`tsx
// app/page.tsx
export default function Home() {
    return (
        <main>
            <h1>Willkommen!</h1>
            <p>Dies ist eine Next.js Seite</p>
        </main>
    );
}
\`\`\`

### Server Components vs Client Components:

\`\`\`tsx
// Server Component (Standard)
export default function ServerComp() {
    return <div>Diese läuft auf dem Server</div>;
}

// Client Component
"use client";
export default function ClientComp() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\``,
        xpReward: 150,
        order: 5,
        tasks: [
          {
            id: "nextjs-task-1",
            type: "multiple-choice",
            question: "Was ist der Hauptvorteil von Server-Side Rendering?",
            options: [
              "Bessere Code-Struktur",
              "Schnellere Ladezeiten",
              "Einfachere Syntax",
              "Mehr Funktionen"
            ],
            correctAnswer: 1,
            hint: "SSR macht Seiten schneller"
          },
          {
            id: "nextjs-task-2",
            type: "multiple-choice",
            question: "Welches Directive wird für Client Components verwendet?",
            options: ["'use server'", "'use client'", "'use browser'", "'use frontend'"],
            correctAnswer: 1,
            hint: "use client"
          },
          {
            id: "nextjs-task-3",
            type: "multiple-choice",
            question: "Wo liegt die page.tsx für die Route /blog/posts?",
            options: [
              "app/page.tsx",
              "app/blog/posts.tsx",
              "app/blog/posts/page.tsx",
              "pages/blog/posts.tsx"
            ],
            correctAnswer: 2,
            hint: "Jeder Ordner braucht eine page.tsx"
          }
        ]
      },
      {
        id: "frontend-project",
        title: "Dein erstes Frontend-Projekt",
        description: "Baue deine erste Website",
        explanation: `## Dein erstes Frontend-Projekt

Jetzt kombinieren wir alles, was du gelernt hast!

### Projektidee: Personal Website

Baue eine einfache Website über dich selbst mit:
- Einem Header mit deinem Namen
- Einem "Über mich" Abschnitt
- Einem Footer mit Kontakt

### Struktur:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Dein Name</h1>
        <nav>
            <a href="#about">Über mich</a>
            <a href="#projects">Projekte</a>
        </nav>
    </header>

    <main>
        <section id="about">
            <h2>Über mich</h2>
            <p>Schreibe etwas über dich...</p>
        </section>

        <section id="projects">
            <h2>Meine Projekte</h2>
            <!-- Deine Projekte -->
        </section>
    </main>

    <footer>
        <p>Kontakt: deinemail@beispiel.de</p>
    </footer>
</body>
</html>
\`\`\`

### CSS-Design:

\`\`\`css
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
}

section {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 5px;
}
\`\`\`

### Bonus: Mit React/Next.js

Verwende Next.js und baue die gleiche Website als React-App!`,
        xpReward: 250,
        order: 6,
        tasks: [
          {
            id: "project-task-1",
            type: "multiple-choice",
            question: "Welcher Tag wird für die Navigation verwendet?",
            options: ["<navigation>", "<nav>", "<menu>", "<navigate>"],
            correctAnswer: 1,
            hint: "Es ist <nav>"
          },
          {
            id: "project-task-2",
            type: "code",
            question: "Erstelle einen Link mit id 'about'",
            codeTemplate: "<!-- Schreibe deinen Code hier -->",
            correctAnswer: '<a href="#about">Über mich</a>',
            hint: "Verwende <a href='#about'>"
          },
          {
            id: "project-task-3",
            type: "multiple-choice",
            question: "Was macht 'margin: 0 auto'?",
            options: [
              "Zentriert ein Element horizontal",
              "Zentriert ein Element vertikal",
              "Entfernt alle Abstände",
              "Fügt Abstand hinzu"
            ],
            correctAnswer: 0,
            hint: "0 auto zentriert horizontal"
          }
        ]
      }
    ]
  },

  backend: {
    id: "backend",
    title: "Backend",
    description: "Node.js, APIs, Databases",
    icon: "⚙️",
    xpTotal: 750,
    explanation: "## Was ist Backend?\n\nDas Backend ist der **unsichtbare Teil** einer Web-App, der auf Servern läuft.\n\n### Backend-Aufgaben:\n- Daten verarbeiten und speichern\n- Benutzer authentifizieren\n- APIs bereitstellen\n- Geschäftslogik ausführen",
    quests: []
  },

  databases: {
    id: "databases",
    title: "Databases",
    description: "SQL, PostgreSQL, Supabase",
    icon: "🗄️",
    xpTotal: 500,
    explanation: "## Was sind Datenbanken?\n\nDatenbanken speichern und organisieren Daten effizient.",
    quests: []
  },

  deploy: {
    id: "deploy",
    title: "Deploy",
    description: "Vercel, Netlify, CI/CD",
    icon: "🚀",
    xpTotal: 375,
    explanation: "## Was ist Deployment?\n\nDeployment macht deine Website für andere erreichbar.",
    quests: []
  },

  // App Development Subtopics
  ios: {
    id: "ios",
    title: "iOS",
    description: "Swift, SwiftUI",
    icon: "🍎",
    xpTotal: 750,
    explanation: "## iOS Entwicklung\n\nLerne Apps für iPhone und iPad zu entwickeln.",
    quests: []
  },

  android: {
    id: "android",
    title: "Android",
    description: "Kotlin, Jetpack Compose",
    icon: "🤖",
    xpTotal: 750,
    explanation: "## Android Entwicklung\n\nLerne Apps für Android zu entwickeln.",
    quests: []
  },

  "cross-platform": {
    id: "cross-platform",
    title: "Cross-Platform",
    description: "React Native, Flutter",
    icon: "🔄",
    xpTotal: 1000,
    explanation: "## Cross-Platform Entwicklung\n\nEntwickele einmal, läuft überall.",
    quests: []
  },

  publishing: {
    id: "publishing",
    title: "Publishing",
    description: "App Store & Play Store",
    icon: "📦",
    xpTotal: 500,
    explanation: "## App Publishing\n\nVeröffentliche deine Apps in den Stores.",
    quests: []
  },

  // Security Subtopics
  authentication: {
    id: "authentication",
    title: "Authentication",
    description: "OAuth, JWT, Sessions",
    icon: "🔑",
    xpTotal: 500,
    explanation: "## Authentication\n\nSichere Benutzeranmeldung für deine Apps.",
    quests: []
  },

  "data-protection": {
    id: "data-protection",
    title: "Data Protection",
    description: "Verschlüsselung, Privacy",
    icon: "🛡️",
    xpTotal: 500,
    explanation: "## Data Protection\n\nSchütze Benutzerdaten mit Verschlüsselung.",
    quests: []
  },

  vulnerabilities: {
    id: "vulnerabilities",
    title: "Vulnerabilities",
    description: "XSS, SQL Injection, CSRF",
    icon: "🔍",
    xpTotal: 750,
    explanation: "## Sicherheitslücken\n\nLerne häufige Angriffe zu erkennen und zu verhindern.",
    quests: []
  },

  "best-practices": {
    id: "best-practices",
    title: "Best Practices",
    description: "Secure Coding",
    icon: "✅",
    xpTotal: 375,
    explanation: "## Secure Coding\n\nBest Practices für sicheren Code.",
    quests: []
  },

  // Free Tools Subtopics
  cursor: {
    id: "cursor",
    title: "Cursor",
    description: "KI-gesteuerter Code Editor",
    icon: "⚡",
    xpTotal: 250,
    explanation: "## Cursor Editor\n\nEin KI-gestützter Code Editor auf VS Code Basis.",
    quests: []
  },

  windsurf: {
    id: "windsurf",
    title: "Windsurf",
    description: "Intelligente IDE",
    icon: "💨",
    xpTotal: 250,
    explanation: "## Windsurf\n\nEine intelligente IDE mit KI-Integration.",
    quests: []
  },

  bolt: {
    id: "bolt",
    title: "Bolt",
    description: "Schnelles Prototyping",
    icon: "🔩",
    xpTotal: 375,
    explanation: "## Bolt\n\nSchnelles Prototyping mit KI.",
    quests: []
  },

  v0: {
    id: "v0",
    title: "v0",
    description: "UI mit KI generieren",
    icon: "✨",
    xpTotal: 500,
    explanation: "## v0 von Vercel\n\nUI-Komponenten mit KI generieren.",
    quests: []
  }
};
