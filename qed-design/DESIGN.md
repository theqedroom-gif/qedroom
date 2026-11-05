# The QED Room — Design System

The QED Room is a Philippine maths channel and website for students who find maths hard, aligned with the DepEd curriculum. Tagline: **"Where it's quite easily done."**

Every screen should feel **friendly, accommodating and professional**, and look **straightforward, minimal and modern**. If a choice makes maths feel harder or busier, it's wrong.

All values live in `tokens.css` (CSS variables) and `tailwind.preset.js`. **Never hard-code a hex, font or size that has a token.**

---

## 1. Logo

Files are in `assets/brand/`:

| File | Use |
|---|---|
| `logo-green.png` | Primary. Light grounds (white, paper, green-50). |
| `logo-charcoal.png` | One-colour/mono contexts, print, light grounds. |
| `badge-green.png` | Avatars, favicons, site header on green, small spaces. |
| `badge-charcoal.png` | Same as above on neutral contexts. |

- Clear space on every side = the height of "room" in the lockup. Minimum width 96px for the full logo, 32px for the badge.
- Never recolour the lightbulb, stretch, rotate, add effects, or rebuild the logo with fonts.
- Always give `alt="The QED Room"` (or "The QED Room home" when it's a home link).

## 2. Colour

**Brand trio**
- **QED Green `--qed-green` #3B5D39.** Primary: headings, primary buttons, links, nav bars.
- **Lightbulb Yellow `--qed-yellow` #E8C544.** Accent: hint buttons, highlights, rewards, "aha" moments, focus rings.
- **Charcoal `--qed-charcoal` #333333.** Body text, icons, footers.

**Ramps:** neutral, red, orange, yellow, green (teal), blue and purple, each 900 → 50. Use 700/900 for text and 50/100 for backgrounds.

**Feedback roles** (always text step on pale step, plus an icon, never colour alone):
| Role | Text | Background |
|---|---|---|
| Correct | `--feedback-correct-fg` green-700 | green-50 |
| Hint | yellow-900 | yellow-50 |
| Try again | red-700 | red-50 |
| Info | blue-700 | blue-50 |

**Contrast rules (WCAG AA)**
- ✅ White on QED Green 7.5:1 · Charcoal on Yellow 7.5:1 · neutral-500 on white 7.2:1
- ⚠️ Yellow on Green 4.5:1. **Large text only** (24px+ or 19px bold).
- ❌ Yellow on white 1.7:1. **Never use yellow for text, icons or thin lines on light grounds.** Use yellow-900 instead.
- Text on a ramp's 500 step or lighter is charcoal/neutral-900, never white.

**Proportion:** mostly white/paper, green for structure and action, yellow in small doses. A screen should never be more yellow than green.

## 3. Typography

| Role | Font | Size / line height |
|---|---|---|
| Display | Amaranth 700 | 56 / 60 |
| H1 | Amaranth 700 | 40 / 46 |
| H2 | Amaranth 700 | 28 / 34 |
| H3 | Roboto 500 | 20 / 28 |
| Body | Roboto 400 | 17 / 28 |
| Small / meta | Roboto 400 | 14 / 22 |
| Tagline | Roboto 300 italic, uppercase, 0.24em tracking | 15 |
| Student input | Roboto Mono 400 | 18 |

- Amaranth is for headings only. Never for body text, buttons or long passages.
- Body line length is 60–75 characters (`max-width: 680px` for prose).
- Sentence case for headings and buttons.

## 4. Maths: always LaTeX

**Every maths expression is written in LaTeX and rendered with KaTeX.** No exceptions: inline variables, single numbers in an equation, worked examples, quiz questions, feedback messages.

- Inline: `$ax^2 + bx + c = 0$`. Display: `$$x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$`
- Single variables in prose are maths too: "Solve for $x$", "add to $b$".
- **Never** type maths with Unicode characters (x², −, ×, ÷, √, π) or set it in Roboto Mono.
- **No maths inside Amaranth headings.** Reword the heading or put the expression in the body.
- Worked examples use `aligned` with `&=` so the equals signs line up. Highlight the final answer with `.answer-highlight` (yellow-50 ground, yellow-900 text).
- Answer `<input>`s are plain text in Roboto Mono (that's what students type). When echoing a student's answer back, render it as LaTeX.
- Setup: `katex-setup.html`. KaTeX provides MathML for screen readers automatically.

## 5. Shape, space, elevation

- Spacing: 4-pt scale (`--space-1` 4px … `--space-8` 64px). Default gap between related items 12–16px, between sections 32–48px.
- Radius: `--radius-sm` 8px (chips, small tiles), `--radius-md` 12px (inputs, callouts), `--radius-lg` 16px (cards, panels), `--radius-pill` (buttons, tags).
- Elevation: one shadow only, `--shadow-card`, for cards that can be clicked. Everything else is flat.
- Content width: `--content-max` 1160px, 24px side padding (16px on phones).

## 6. Components

**Buttons** (pill, height 48px, Roboto 500 16px, verb labels)
- Primary: green bg, white text. **One per view.**
- Accent: yellow bg, charcoal text. Support actions only: "Show hint", rewards.
- Secondary: white bg, 2px green border, green text.
- Text button: green, underlined.

**Answer input:** 48px tall, 12px radius, 2px border (neutral-100 idle → green focused/correct → red-700 wrong), Roboto Mono 18px, a visible `<label>` containing the question in LaTeX, and a "Check" button beside it. Feedback appears below with an icon.

**Callouts** (12px radius, icon + bold label + text)
- **Hint:** lightbulb icon, yellow-50 / yellow-900
- **Key idea:** green-50 / green-700
- **Common mistake:** red-50 / red-700

**Lesson card:** white, `--radius-lg`, `--shadow-card`. Header band (green-300 ground, green-900 LaTeX formula), grade + topic tags, Amaranth title, meta line, progress bar (green on green-50) and % label.

**Tags:** pill, 12px Roboto 500. Grade = green-50 / green-700, topic = yellow-50 / yellow-900.

**Stepper:** circles 32px. Done = green, current = yellow with charcoal number, upcoming = white with neutral-100 border.

**Badge / reward:** green panel, yellow circle with white border and charcoal star icon, Amaranth title.

**Nav:** green header bar, white links, active link = pill on green-900. Collapses to a menu button on phones.

**Footer:** charcoal, neutral-100 text, tagline in yellow (large enough to pass on charcoal).

## 7. Icons & imagery

- Icons: simple line icons, 2px stroke, round caps/joins, 24px grid (Lucide matches well). Colour = the text colour of their context.
- The lightbulb is the brand motif. Use it for hints and "aha" moments only.
- Photos: real Filipino students and classrooms with a green duotone overlay. No stock clichés, no emoji as icons.
- Video placeholders: 16:9, `--radius-lg`, green play button.

## 8. Voice

- Warm, patient, encouraging, like a kuya/ate tutor. Short sentences.
- Light Taglish in feedback and encouragement is on-brand ("Tama!", "Kaya mo 'yan!"). Keep instructions and maths explanations in clear English.
- Wrong answers: never "Wrong". Say "Not quite. Try again" plus a hint.
- Celebrate effort and progress, not speed.

## 9. Accessibility checklist

- Text contrast ≥ 4.5:1 (3:1 for 24px+). Check every new colour pair.
- Touch targets ≥ 44×44px.
- Real `<button>`, `<a href>`, `<label for>`, never clickable `<div>`s.
- Visible focus: yellow outline + charcoal ring (in `tokens.css`).
- Feedback never relies on colour alone: always icon + words.
- Every page works at 360px wide: nav collapses, side menus stack, wide maths and tables scroll inside their box.
