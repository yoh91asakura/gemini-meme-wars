# Project Context: Gemini Meme Wars

## 0. The Bible
**`game-spec.md` is the absolute source of truth.**
**`ui-spec.md` is the absolute source of truth for UI layout, full-art anime cards, and roll/deck/combat screens.**
*   All UI work (components, layout, animations) MUST comply with `ui-spec.md` and modern web/game UI best practices defined there.
*   All features MUST align with the spec.
*   If a feature is not in the spec, question its necessity.
*   If an implementation contradicts the spec, it is a bug.
*   **Vertical Slice Rule**: Even for MVP/Vertical Slice, core mechanics (Gacha, Fusion, Combat Flow) must respect the spec's definitions, not just "spirit".

## 1. Core Philosophy & Architecture
**Objective:** Build a scalable, testable auto-battler using a hybrid React + Phaser architecture.

### Architectural Layers (Immutable)
1.  **The Brain (Pure Logic)**: `src/game/logic/`
    *   Contains all math, stats calculations, and game rules.
    *   **MUST** be pure TypeScript (no Phaser/React dependencies).
    *   **MUST** be fully unit-tested via `vitest`.
    *   *Example*: `damageCalculator.ts`, `statCalculator.ts`.

2.  **The Body (Game Engine)**: `src/game/`
    *   Handles rendering, physics, and the main game loop via **Phaser**.
    *   Consumes Logic layer for calculations.
    *   Syncs state to the Store.
    *   *Example*: `MainScene.ts`, `PlayerEntity.ts`.

3.  **The Face (UI)**: `src/components/`
    *   Handles HUD, Menus, Shop, and Overlay via **React**.
    *   Reads from the Store.
    *   *Example*: `HUD.tsx`, `Shop.tsx`.

4.  **The Nervous System (State)**: `src/stores/`
    *   **Zustand** store acts as the bridge.
    *   Phaser writes frame-by-frame data (HP, position) here.
    *   React reads this data to update the UI.

## 2. Tech Stack & Conventions
*   **Build**: Vite (React + TS).
*   **Styling**: Tailwind CSS v4.
*   **Game Engine**: Phaser 3.
*   **State Management**: Zustand.
*   **Testing**: Vitest + JSDOM.
*   **Language**: TypeScript (Strict).
    *   Use `import type` for interfaces.
    *   Prefer functional purity where possible.

## 3. Development Workflow (Strict)
Follow this cycle for every feature to ensure stability and testability.

### Step 1: Logic & Testing (TDD)
*   Define interfaces in `src/game/logic/types.ts`.
*   Implement pure logic functions in `src/game/logic/`.
*   **MANDATORY**: Write and pass unit tests in `*.test.ts` alongside the logic.
*   *Do not touch Phaser or React yet.*

### Step 2: Engine Implementation
*   Create/Update Phaser Objects or Scenes.
*   Integrate the tested logic functions.
*   Ensure the scene updates the Zustand store if UI needs to know about changes.

### Step 3: UI Integration
*   Build React components using data from `useGameStore`.
*   Ensure UI overlays correctly on top of the Phaser canvas.

### Step 4: Verification
*   **MANDATORY**: Run `npm run dev` and verify in the browser using the `browser_navigate` tool.
*   Check console for errors.
*   Verify gameplay loop (Start -> Play -> End -> Restart).

## 4. Key File Locations
*   `src/game/logic/types.ts`: Single source of truth for data models (Card, Stats).
*   `src/stores/useGameStore.ts`: Global state definition.
*   `src/game/scenes/MainScene.ts`: The primary game loop.
*   `src/App.tsx`: Root layout managing the overlay of React on Phaser.

## 5. Commands
*   **Test**: `npx vitest run`
*   **Dev Server**: `npm run dev`
