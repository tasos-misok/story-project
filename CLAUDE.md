# Story Project

Interactive choose-your-own-adventure story player. Users read narrative nodes and make
choices that branch the story along different paths in a directed graph.

## Tech Stack

- **React 19** (JSX, no TypeScript)
- **Vite 7** — dev server and build tooling
- **ESLint 9** — linting with react-hooks and react-refresh plugins

No testing framework is configured.

## Project Structure

```
src/
  main.jsx              # Entry point — renders App in StrictMode
  App.jsx               # Root component — delegates to StoryPlayer
  App.css               # Unused Vite boilerplate styles
  index.css             # Global theme (dark/light mode, typography, buttons)
  components/
    StoryPlayer.jsx     # Core component — renders story nodes and handles navigation
  story/
    story.json          # All story content (node graph with titles, text, choices)
  assets/
    react.svg           # Unused Vite boilerplate asset
```

## Commands

| Action        | Command           |
|---------------|-------------------|
| Dev server    | `npm run dev`     |
| Build         | `npm run build`   |
| Preview build | `npm run preview` |
| Lint          | `npm run lint`    |

## Key Concepts

- **Story data** is a directed graph of nodes defined in `src/story/story.json`
- **Navigation** is driven by a single `currentNodeId` state in StoryPlayer
- **Ending nodes** have an empty `choices` array and show a restart button
- **Broken links** (invalid `nextId`) are handled defensively — see `src/components/StoryPlayer.jsx:13`

## Adding Story Content

Edit `src/story/story.json` only. Each node needs a unique key and follows:
`{ title, text, choices: [{ label, nextId }] }`. Set `choices: []` for endings.

## Additional Documentation

Check these files when working in their respective areas:

- [Architectural Patterns](.claude/docs/architectural_patterns.md) — data-driven UI,
  node graph navigation, state management, component hierarchy, inline style conventions
