# Product Guidelines: ClawAcademy

## Brand Voice & Tone

### Voice Personality
- **Energetic**: Jugendlich, aber nicht kindlich
- **Empowering**: "Du kannst das!"
- **Direct**: Kein Fachchinesisch, klar und einfach
- **Fun**: Locker, Emojis okay (sparsam)
- **Inclusive**: Alle Level, alle Hintergründe

### Tone Examples

❌ **Bad:**
> "Unser proprietäres Algorithmus-System optimiert die user-centric Lernkurve mittels state-of-the-art Machine Learning Technologie."

✅ **Good:**
> "Du lernst schneller, weil wir dich herausfordern - genau richtig für dein Level."

---

## Terminology & Glossary

| Term | Definition | Usage |
|------|------------|-------|
| XP | Experience Points - Punkte für Fortschritt | Always "XP", never "Erfahrungspunkte" |
| Rank | Stufe basierend auf XP | Novice, Coder, Developer, Architect, Master, Legend |
| Streak | Tage am Stück eingeloggt | "7-Tage Streak" |
| Lektion | Inhalteinheit, max 15 Min | Always "Lektion", never "Kurs" or "Modul" |
| Projekt | Hochgeladenes Werk | Community bewertet mit Sternen |
| Sponsor | Firma die Talente unterstützt | Bronze, Silver, Gold, Platinum |
| Scouten | Sponsoren suchen Profile | "Werden gescoutet" |

---

## Writing Style Guidelines

### For Lessons
- **Short paragraphs**: Max 3 sentences
- **Active voice**: "Klicke hier" not "Hier kann geklickt werden"
- **Numbered steps**: 1, 2, 3... never bullets for sequences
- **Code blocks**: Always include copy button
- **Examples**: Real-world, not abstract

### For UI Text
- **Buttons**: Verb or Noun, title case ("Start Learning", "Profile")
- **Headings**: Sentence case, not title case ("Your progress" not "Your Progress")
- **Error messages**: Helpful, specific, action-oriented
- **Empty states**: Friendly, suggest next action

### For Communications
- **Emails**: Subject line = value, preview = details
- **Push notifications**: Under 60 characters if possible
- **Announcements**: Why → What → How

---

## Error Message Convention

### Format
```text
[What happened] + [Why it happened] + [What to do]

✅ Good:
"Dein Prompt konnte nicht gespeichert werden (Server nicht erreichbar). Versuche es noch einmal."

❌ Bad:
"Fehler beim Speichern."
```

### Error States
- **404**: "Diese Seite wurde verschoben oder gelöscht."
- **403**: "Du hast keinen Zugriff auf diese Seite."
- **500**: "Etwas ist schiefgelaufen. Wir arbeiten daran."
- **Network**: "Keine Verbindung. Überprüfe dein Internet."

---

## Success Message Convention

### Format
```text
[Action completed] + [Optional reward]

✅ Examples:
"Lektion abgeschlossen! +50 XP"
"Projekt hochgeladen! Warte auf Feedback..."
"Rank Up! Du bist jetzt: Coder 🚀"
```

### Celebration Triggers
- First lesson
- Rank up
- Achievement unlock
- Project uploaded
- Sponsor secured
- 7-day streak
- 30-day streak

---

## Content Principles

### What We Teach
- ✅ Practical AI skills
- ✅ Real-world tools
- ✅ Current best practices
- ✅ Security awareness
- ✅ Industry standards

### What We Don't Teach
- ❌ Outdated frameworks
- ❌ Theoretical fluff
- ❌ Unpopular languages
- ❌ Unsafe practices
- ❌ Grey/black hat techniques

### Content Quality
- **Accuracy**: Technical correctness verified
- **Clarity**: 13-year-old can understand
- **Actionability**: Can be applied immediately
- **Relevance**: Current tools and practices
- **Engagement**: Interesting, not boring

---

## User Communication Guidelines

### Welcome Message
> "Hey [Name]! Willkommen bei ClawAcademy. Lerne KI-Entwicklung, baue Projekte, werde sponsored. Deine Reise beginnt jetzt! 🚀"

### Onboarding Flow
1. Pick your level (Never coded / Some experience / I know stuff)
2. First recommendation based on level
3. Quick win: Complete first lesson in < 5 min
4. Celebrate with confetti + XP

### Win-back Email (inactive 7 days)
> "Hey [Name], du fehlst uns! Deine Streak steht still. Komm zurück und hol dir den +100 XP Bonus für 7 Tage! 🔥"

### Sponsor secured (user)
> "🎉 GROSSARTIG! [Company] möchte dich sponsorren! Check deine Messages für die nächsten Schritte."

---

## Accessibility Guidelines

### Visual
- Color contrast minimum 4.5:1
- Font size minimum 16px body
- No color-only information
- Focus indicators visible

### Content
- Alt text for images
- Captions for videos
- Descriptive link text ("Learn more" not "Click here")
- Proper heading hierarchy

### Keyboard
- All features accessible via keyboard
- Tab order logical
- Skip to content link
- No keyboard traps

---

## Localization Notes

### German (Primary)
- Informal "Du" (never "Sie")
- Technical terms stay English (XP, Level, Rank)
- German grammar rules apply
- Date format: DD.MM.YYYY

### English (Secondary)
- Source of truth for translations
- British or American (choose one)
- Date format: YYYY-MM-DD (ISO)

---

## Content Moderation

### Auto-Flag Triggers
- Toxic language (slurs, hate speech)
- Personal information (emails, phones)
- External links (except approved domains)
- Spam patterns

### Review Queue
- Reported content
- Project uploads (new users)
- Forum posts (first 5)
- Sponsor contact requests

### Ban Policy
- Strike 1: Warning + content removed
- Strike 2: 7-day suspension
- Strike 3: Permanent ban

---

*Last Updated: 2025-03-21*
