# UI Spec – Gemini Meme Wars

## 1. Objectifs et Philosophie Design (2025)

Ce document établit les standards techniques et esthétiques pour Gemini Meme Wars et sert de source de vérité unique pour toute l’interface utilisateur. [file:11][web:18]  
**Vision** : Un gacha "Hyper-Premium" qui combine l’intensité visuelle des TCG modernes (Marvel Snap, Shadowverse, Pocket TCG) avec la fluidité et la réactivité d’une application mobile native. [file:11][web:22]

L’UI doit maximiser la lisibilité, la sensation de réactivité (< 100 ms perçus) et la compréhension de l’état de jeu, tout en restant suffisamment minimaliste côté chrome pour laisser la place aux cartes et aux effets visuels. [web:22][web:24]  
Tous les écrans (combat, roll, deck, inventaire, lobby) doivent respecter les mêmes principes, tokens et composants décrits dans ce document. [file:11][web:18]

### 1.1 Piliers Design

1. **Zero-Latency Feel** : les interactions doivent être perçues comme instantanées (< 100 ms), les animations venant accompagner mais jamais bloquer l’input. [web:22][web:38]  
2. **Mobile-First Immersion** : l’interface est pensée pour un usage à une main, [translate:Thumb-Driven], avec les actions critiques dans les 40 % inférieurs de l’écran. [web:44][web:53]  
3. **Cognitive Ease** : chaque écran a un objectif principal clair et une hiérarchie visuelle stricte, avec un minimum de bruit et de chrome superflu. [web:42][web:48]  
4. **Inclusive by Default** : conformité WCAG 2.2 AA dès la conception, y compris cibles tactiles, contrastes, gestion du mouvement et alternatives aux gestes complexes. [web:39][web:61]

---

## 2. Système de Design & Tokens 2.0

L’interface repose sur un système de design tokenisé à trois niveaux pour assurer cohérence, scalabilité et théming futur. [file:11][web:18]  
Les composants n’emploient jamais de valeurs en dur, uniquement des références de tokens. [web:18][web:59]

### 2.1 Niveaux de tokens et convention de nommage

- **Tokens de base (reference tokens)** : valeurs brutes typées (couleurs, espaces, rayons, durées). [web:18][web:70]  
- **Tokens sémantiques** : noms fonctionnels (ex. `color.bg.canvas`, `spacing.layout.gutter`). [web:18][web:33]  
- **Tokens composants** : mapping pour un composant précis (ex. `card.frame.border`, `button.primary.background`). [web:18][web:59]

Convention de nommage recommandée : `category.role.modifier.state` (par ex. `color.surface.primary.hover`). [web:33][web:59]  
Tout nouveau style visuel doit d’abord être ajouté comme token sémantique, puis consommé par les composants. [web:18][web:59]

### 2.2 Palette Sémantique (Theming)

#### 2.2.1 Couleurs structurelles

Palette sombre, neutre, pour mettre les cartes et les VFX en avant. [file:11][web:24]

| Token                       | Valeur (Réf)        | Usage principal                                      |
| :-------------------------- | :------------------ | :-------------------------------------------------- |
| `color.bg.canvas`           | `#0f172a` (Slate 900) | Fond global de l’application (zone morte)        |
| `color.bg.surface.base`     | `#1e293b` (Slate 800) | Panneaux, cartes (fond)                           |
| `color.bg.surface.elevated` | `#334155` (Slate 700) | Modales, tooltips, overlays                       |
| `color.border.subtle`       | `rgba(255,255,255,0.1)` | Séparateurs, bordures neutres                   |
| `color.text.primary`        | `#f8fafc` (Slate 50) | Titres, valeurs critiques                          |
| `color.text.secondary`      | `#94a3b8` (Slate 400) | Labels, descriptions, métadonnées                 |

Les contrastes texte/fond doivent respecter au minimum 4.5:1 pour le texte normal et 3:1 pour le texte large. [web:39][web:35]  
Les contrastes des composants non textuels (icônes, boutons) doivent viser au moins 3:1 avec leur arrière‑plan. [web:61][web:35]

#### 2.2.2 Couleurs fonctionnelles & rareté

| Token                      | Rôle                     | Hex / Gradient                                             |
| :------------------------- | :----------------------- | :--------------------------------------------------------- |
| `color.brand.primary`      | Action principale (CTA)  | `#3b82f6` (Blue 500)                                      |
| `color.utility.success`    | Confirmation, HP, buff   | `#22c55e` (Green 500)                                     |
| `color.utility.warning`    | Attention, pré‑alerte    | `#eab308` (Yellow 500)                                    |
| `color.utility.danger`     | Erreur, ennemi, dégâts   | `#ef4444` (Red 500)                                       |
| `color.utility.info`       | Infos neutres            | `#38bdf8` (Sky 400)                                       |
| `color.rarity.common`      | Base frame               | `#94a3b8` (Slate 400)                                     |
| `color.rarity.rare`        | Rare frame               | `#3b82f6` (Blue 500) + glow léger                         |
| `color.rarity.epic`        | Epic frame               | `#a855f7` (Purple 500) + particules subtiles              |
| `color.rarity.legendary`   | Legendary frame          | `linear-gradient(135deg,#f59e0b,#ef4444)` + FX holographiques |

Le code couleur de rareté doit être cohérent sur tous les écrans (cartes, roll, inventaire, récompenses). [file:11][web:32]  
Les effets additionnels (glow, particules) doivent rester subtils pour ne pas nuire à la lisibilité du texte et des stats. [file:11][web:36]

### 2.3 Typographie & échelle fluide

L’ensemble des textes utilise une police sans‑serif moderne et lisible (ex. Inter), avec éventuellement une variante plus condensée pour les nombres. [file:11][web:38]  
Toutes les tailles sont exprimées en `rem` (base 16 px) pour permettre le zoom utilisateur. [file:11][web:19]

Échelle recommandée : [file:11][web:19]  
- `text.display` : 2.5rem (40 px) – gros chiffres de dégâts, titres Victoire/Défaite. [file:11][web:22]  
- `text.h1`      : 1.5rem (24 px) – titres d’écran principaux. [file:11][web:19]  
- `text.h2`      : 1.25rem (20 px) – noms de cartes, sous‑titres. [file:11][web:36]  
- `text.body`    : 1rem (16 px) – texte standard (descriptions, menus). [file:11][web:19]  
- `text.caption` : 0.875rem (14 px) – stats secondaires, labels discrets. [file:11][web:19]  
- `text.tiny`    : 0.75rem (12 px) – mentions légales, métadonnées. [file:11][web:19]

Le line‑height doit se situer entre 1.4 et 1.6 pour tout texte de paragraphe, y compris en mobile. [web:19][web:13]  
Le jeu doit supporter une augmentation de la taille du texte jusqu’à 200 % sans casser les layouts critiques. [web:39][web:64]

### 2.4 Espacement, rayons et ombres

- Grille d’espacement basée sur 4 px : 4, 8, 12, 16, 24, 32, 48, 64… (`spacing.xs|sm|md|lg|xl`). [file:11][web:13]  
- Rayons d’angle limités : 4 px (petits éléments), 8 px (boutons, cartes compactes), 16 px (grandes cartes, modales). [web:25][web:60]

Ombres / elevation standardisées : [file:11][web:12]  
- `shadow.sm` : petits éléments, boutons secondaires, chips. [file:11][web:12]  
- `shadow.md` : cartes au repos, panneaux flottants. [file:11][web:12]  
- `shadow.lg` : cartes survolées, modales, overlays importants. [file:11][web:12]  
- `shadow.glow.*` : halos colorés pour focus et raretés élevées. [file:11][web:30]

Aucun composant ne doit définir sa propre ombre hors de ces presets, pour garantir la cohérence globale. [web:18][web:21]  
Les modifications de profondeur (hover, focus) se font toujours par changement d’ombre, légère translation et éventuelle variation de luminosité. [web:26][web:60]

### 2.5 Motion & micro‑interactions

- Durées : `motion.fast` (120–150 ms), `motion.normal` (180–220 ms), `motion.slow` (250–350 ms). [file:11][web:26]  
- Easing : `ease-out` pour entrées rapides, `ease-in-out` pour transitions de page, courbes Bézier custom pour les cartes. [file:11][web:26]

Les animations utilisent en priorité `transform` et `opacity` pour profiter de l’accélération GPU. [file:11][web:26]  
Les micro‑interactions doivent clarifier l’état (cliqué, prêt, erreur) sans distraire du gameplay. [web:22][web:42]

---

## 3. Composant Carte "Full Art"

Les cartes sont le support principal de l’identité visuelle du jeu et doivent être impressionnantes sans sacrifier la lisibilité. [file:11][web:36]  
Elles doivent rester reconnaissables en petit format (grille, liste) et spectaculaires en mode inspect / zoom. [file:11][web:60]

### 3.1 Structure anatomique (Z croissant)

1. **Frame/Border** : indique la rareté (épaisseur, couleur, FX). [file:11][web:28]  
2. **Artwork Layer** : illustration plein cadre au format 2:3, avec composition centrée sur le personnage/emoji. [file:11][web:36]  
3. **Gradient Overlay** : dégradé noir en bas pour assurer un contraste texte > 4.5:1. [file:11][web:36]  
4. **Content Layer** : bandeaux de nom, stats, coût, badges. [file:11][web:36]  
5. **FX Layer** : particules, reflets, lens flare (surtout pour Epic/Legendary). [file:11][web:28]  
6. **Interaction Layer** : zone tactile complète de la carte, capture des événements pointer/touch. [file:11][web:60]

### 3.2 Contenu de la carte

- **Nom** : en bas ou en haut selon la composition, toujours sur bandeau semi‑opaque. [file:11][web:36]  
- **Rareté** : badge visuel (icône + couleur) en coin, cohérent avec `color.rarity.*`. [file:11][web:28]  
- **Stats clés** : HP, Force, Esquive, Regen mana, affichées avec icônes cohérentes et valeurs lisibles. [file:11][web:22]  
- **Barre de mana/ulti** : en bas de carte, sur toute la largeur, avec progression colorée nette. [file:11][web:22]

Les détails complexes (compétences, effets passifs) sont consultables via un mode inspect pour éviter la surcharge sur la carte de base. [file:11][web:36]  
Les textes ne doivent jamais se superposer directement à des zones d’illustrations très contrastées, sauf avec overlay dédié. [file:11][web:36]

### 3.3 États visuels & interactions

- **Idle** : scale 1.0, ombre `shadow.md`, couleurs normales. [file:11][web:26]  
- **Hover (desktop) / Long press (mobile)** : scale ~1.05, `shadow.lg`, légère augmentation de brightness, affichage éventuel de tooltip. [file:11][web:26]  
- **Active / Dragging** : scale ~1.1, opacité ~0.8, feedback haptique moyen, ghost dans la grille. [file:11][web:61]  
- **Disabled (mana insuffisant)** : désaturation (60–80 %), opacité réduite, curseur `not-allowed` sur desktop. [file:11][web:19]  
- **Ulti ready** : halo pulsant autour de la carte, shimmer lent sur le cadre, animation de barre de mana bouclée. [file:11][web:26]

Les transitions entre états utilisent `motion.fast` et des easings doux pour éviter les à‑coups. [file:11][web:26]  
En cas de `prefers-reduced-motion`, les changements d’état se limitent à des fades d’opacité et de couleur. [web:39][web:64]

### 3.4 Rareté & FX

- **Common** : cadre discret, ombre simple, aucun FX. [file:11][web:28]  
- **Rare** : cadre coloré, glow léger, shimmer très subtil. [file:11][web:28]  
- **Epic** : cadre saturé, particules modérées, glow marqué. [file:11][web:28]  
- **Legendary** : cadre gradient, FX holographiques, particules riches, mais texte toujours lisible. [file:11][web:28]

Les FX sont associés à la rareté via des tokens composants (`card.fx.legendary.particles`, etc.) pour faciliter l’évolutivité. [web:18][web:32]  
Les performances doivent être surveillées sur appareils milieu de gamme pour éviter les chutes de FPS lors de multiples animations de cartes. [web:26][web:72]

---

## 4. CombatScreen

L’écran de combat est la scène principale : il doit être lisible, nerveux et dégagé au centre. [file:11][web:22]  
Le joueur doit comprendre en un coup d’œil l’état du match (HP, mana, ultis, timer). [file:11][web:20]

### 4.1 Layout général

- **Orientation** : mobile portrait, responsive jusqu’à tablette/desktop. [file:11][web:16]  
- **Top (HUD ennemi)** : barre HP, état, buffs/debuffs. [file:11][web:22]  
- **Centre (Arena)** : zone de projectiles et VFX, strictement sans UI persistante. [file:11][web:22]  
- **Bas (Thumb Zone)** : main de cartes, barre de mana, avatar joueur, actions secondaires. [file:11][web:44]

La mise en page doit rester stable et éviter tout layout shift pendant le combat. [file:11][web:26]  
Les overlays (pause, résultat) remplacent temporairement l’affichage mais sont clairement distincts du HUD. [file:11][web:16]

### 4.2 HUD

- **HP ennemi** : barre pleine largeur en haut, couleur `color.utility.danger`, valeurs numériques optionnelles. [file:11][web:22]  
- **Avatar ennemi** : à proximité de la barre, avec animation de hit (shake, flash). [file:11][web:22]  
- **Buffs/debuffs** : ligne d’icônes avec tooltips explicites au survol / long press. [file:11][web:42]

- **HP joueur** : barre près de l’avatar joueur (bas/gauche), couleur `color.utility.success`. [file:11][web:22]  
- **Timer** : centré en haut, bien lisible mais discret, avec changement de couleur ou pulse en fin de round. [file:11][web:20]

### 4.3 Main de cartes & mana

La main de cartes est ancrée en bas dans la [translate:Thumb Zone] pour une prise en main à une main. [web:44][web:51]  
Le nombre de cartes visibles doit être optimisé (carrousel ou éventail) pour ne pas masquer l’arène. [file:11][web:22]

- **Main joueur** : cartes en ligne ou éventail, taille suffisante pour reconnaître l’art et l’état d’ulti. [file:11][web:22]  
- **Barre de mana** : au‑dessus des cartes, progression claire, couleurs de seuil (normal, presque prêt, prêt). [file:11][web:22]

Les ultis prêts utilisent l’état `Ulti ready` de la carte (halo, shimmer, peut‑être léger son/FX) pour attirer l’œil. [file:11][web:26]  
Les touches sont suffisamment grandes pour éviter les erreurs (≥ 44x44 px). [web:45][web:67]

### 4.4 Feedback & game juice

- **Dégâts** : textes flottants colorés, plus grands pour les gros critiques. [file:11][web:22]  
- **Hit** : flash bref sur la cible, screen shake léger (option désactivable). [file:11][web:30]  
- **Low HP** : vignette rouge pulsante, éventuellement sons de tension. [file:11][web:22]

Les VFX doivent rester lisibles : pas d’effets qui masquent complètement les avatars ou les projectiles. [file:11][web:48]  
En mode `Reduced Motion`, la plupart des effets de secousse et de flash violent sont remplacés par des variations de couleur et des fades doux. [web:39][web:64]

---

## 5. DeckBuilderScreen & Inventaire

Objectif : permettre au joueur de comprendre, construire et modifier un deck très rapidement, même avec une grande collection. [file:11][web:32]  
L’expérience doit se rapprocher d’un e‑commerce de cartes : recherche, filtres, tri, comparaison. [file:11][web:36]

### 5.1 Layout

- **Deck actif** : slots visibles (4–6), visuellement distincts de la grille d’inventaire. [file:11][web:22]  
- **Inventaire** : grille de toutes les cartes possédées, scrollable, avec pagination ou virtualisation. [file:11][web:32]  
- **Stats agrégées** : panneau affichant HP total, Force, Esquive, Regen mana, puissance moyenne. [file:11][web:22]

Sur mobile, l’inventaire peut être en bas avec scroll vertical, le deck en haut. [file:11][web:16]  
Sur desktop, l’inventaire se place à gauche et le deck + stats à droite pour utiliser la largeur. [file:11][web:16]

### 5.2 Filtres & tri

- **Filtres** : chips horizontales (rareté, type, élément, coût), état actif évident. [file:11][web:32]  
- **Tri** : menu (Puissance, Rareté, Récents, Nom) avec état sélectionné persistant. [file:11][web:36]

L’état des filtres et tris doit être clair pour éviter que le joueur pense avoir perdu des cartes. [file:11][web:19]  
Les résultats doivent se rafraîchir sans flash complet de l’écran (animations légères de réorganisation). [file:11][web:26]

### 5.3 Interactions deck/inventaire

- **Desktop** : drag & drop pour ajouter/retirer des cartes du deck. [file:11][web:42]  
- **Mobile** : modèle tap‑to‑equip / tap‑to‑unequip comme alternative simple au drag & drop. [web:61][web:38]

Exemple (mobile) : tap sur une carte dans l’inventaire → si slot libre, elle est ajoutée, sinon ouvrir une modale pour choisir une carte à remplacer. [file:11][web:61]  
Les stats agrégées se mettent à jour avec une animation de chiffres (count‑up/down) pour renforcer le lien cause‑effet. [file:11][web:26]

Une vue inspect permet d’ouvrir une carte en plein écran, avec ses stats détaillées, ses compétences et son historique. [file:11][web:36]  
Cette vue doit être accessible depuis le deck et depuis l’inventaire. [file:11][web:36]

---

## 6. Gacha & Roll (Summoning)

Moments forts du jeu, doivent être gratifiants et contrôlables (skip facile). [web:41][web:30]  
Le joueur doit comprendre clairement ce qu’il obtient et ce qu’il a dépensé. [file:11][web:43]

### 6.1 Layout & infos

- **Zone centrale** : carte ou groupe de cartes à révéler, grande taille, centrée. [file:11][web:30]  
- **Boutons roll** : en bas, large CTA, libellé explicite (ex. "Roll x1", "Roll x10") avec icône de monnaie + coût. [file:11][web:41]  
- **Monnaies** : en haut (gauche/droite), solde des devises pertinentes (soft/hard) avec icônes distinctes. [file:11][web:41]

Un historique condensé des dernières cartes obtenues peut être affiché sous forme de bandeau ou de grille compacte. [file:11][web:32]  
Les cartes très rares doivent ressortir clairement dans ce récapitulatif (cadre, FX, label de rareté). [file:11][web:30]

### 6.2 Séquence d’animation

1. **Trigger** : le joueur appuie sur un bouton de roll, éventuellement avec un press prolongé pour charger. [file:11][web:41]  
2. **Anticipation** : animation de coffre/orbe qui vibre, intensité visuelle modérée au départ. [file:11][web:30]  
3. **Reveal** :
   - Flash bref. [file:11][web:30]  
   - Carte(s) face cachée apparaissent, puis flip 3D ou unmask. [file:11][web:30]  
   - Couleur de l’aura/explosion varie selon la rareté (Gris → Bleu → Violet → Doré). [file:11][web:30]  
4. **Result** : carte(s) full art affichée(s), avec options pour inspecter ou passer. [file:11][web:30]

Le bouton "Skip" est toujours visible et accessible dès le début de la séquence, surtout pour les multi‑rolls. [file:11][web:43]  
Les temps non interactifs ne doivent pas dépasser quelques secondes cumulé, afin de ne pas frustrer les joueurs intensifs. [web:41][web:57]

---

## 7. Accessibilité & Inclusive Design

L’UI vise la conformité WCAG 2.2 AA, avec une attention particulière portée aux critères liés au mobile et au jeu (mouvement, taille des cibles, focus non masqué). [web:39][web:64]  
Les comportements spécifiques au jeu (drag, secousses, clignotements) doivent toujours avoir une alternative ou un réglage. [web:61][web:67]

### 7.1 Cibles tactiles & focus

- **Taille minimale** : au moins 44x44 CSS px pour tous les boutons et zones interactives (cible globale incluant padding). [web:45][web:67]  
- **Espacement** : éviter les cibles adjacentes collées, idéalement ≥ 8 px entre deux actions critiques. [web:52][web:50]

Tous les éléments focusables ont un état de focus clairement visible (outline 2 px, forte couleur de contraste). [web:39][web:67]  
Aucun élément ne doit être entièrement masqué lorsqu’il reçoit le focus (SC 2.4.11 "Focus not obscured"). [web:39][web:67]

### 7.2 Contraste & couleur

- Contraste texte/fond ≥ 4.5:1 par défaut, y compris sur textes en overlay sur illustration. [web:39][web:35]  
- Palettes testées pour les principales formes de daltonisme ; les informations critiques ne reposent jamais uniquement sur la couleur. [web:27][web:35]

Les icônes et pictos importants (HP, mana, ulti, erreur) ont également une forme distincte, pas seulement une couleur différente. [web:61][web:35]  
Des outils de vérification de contraste sont intégrés au workflow design (Figma plugins, tests automatisés). [web:61][web:18]

### 7.3 Mouvement & réductions

Le jeu respecte la préférence système `prefers-reduced-motion` : [web:39][web:64]  
- Désactivation des screen shakes. [file:11][web:30]  
- Réduction des particules et des transitions complexes, remplacées par des fades simples. [file:11][web:26]  
- Durées d’animation éventuellement raccourcies (ou supprimées) pour certains users. [web:64][web:71]

Les effets susceptibles de provoquer de l’inconfort (flashs rapides, effets stroboscopiques) sont évités ou fortement limités. [web:39][web:64]  
Les options d’accessibilité in‑game permettent d’ajuster l’intensité visuelle (VFX, post‑processing) séparément du reste. [file:11][web:71]

### 7.4 Gestes & alternatives

Toute action réalisable uniquement par drag & drop doit avoir une alternative à un seul pointer (tap, boutons). [web:61][web:67]  
Exemple : trier ou réorganiser des cartes via boutons de repositionnement ou listes d’options, en plus du DnD. [web:61][web:52]

Les interactions essentielles ne reposent pas sur des gestes non évidents (double tap, long swipe) sans signalisation claire. [web:64][web:55]  
Les animations critiques (roll, victoire, défaite) restent skippables pour les profils sensibles. [web:41][web:43]

---

## 8. Haptics & Audio Feedback

L’haptique renforce la lecture des actions sans devenir envahissante. [file:11][web:49]  
Les vibrations suivent une gradation claire : légère (exploration), moyenne (actions), forte (événements majeurs). [file:11][web:26]

- **Light** : hover carte, scroll tick dans l’inventaire, changement d’onglet. [file:11][web:49]  
- **Medium** : validation de sélection, drop de carte dans le deck, activation d’ulti. [file:11][web:26]  
- **Heavy** : gros dégâts subis, roll légendaire, victoire/défaite. [file:11][web:30]

Une option permet de désactiver totalement l’haptique côté joueur. [web:71][web:64]  
Les sons suivent la même logique de gradation (UI légère vs événements de gameplay). [file:11][web:20]

---

## 9. Implémentation technique (CSS / UI Layer)

L’implémentation doit refléter fidèlement le système de design décrit précédemment. [file:11][web:18]  
Les tokens sont exposés via variables CSS (`--color-…`, `--space-…`, etc.) ou via un thème central dans le moteur de jeu. [web:18][web:70]

### 9.1 Layout & unités

- Layout global : CSS Grid (ou équivalent moteur) pour structurer les grandes zones (HUD, arène, panels). [file:11][web:38]  
- Layout local : Flexbox pour barres, listes et alignement dans les cartes. [file:11][web:38]

Les tailles de texte, paddings et marges sont exprimées en `rem`, tandis que les conteneurs majeurs peuvent utiliser `%`, `vw` ou `vh`. [file:11][web:38]  
Les breakpoints sont alignés sur les largeurs d’écran de référence (petit mobile, mobile, tablette, desktop). [file:11][web:16]

### 9.2 Performance & optimisation

- Usage de `will-change: transform, opacity` sur les éléments fréquemment animés. [file:11][web:26]  
- Virtualisation / windowing sur les grandes listes (inventaire, historique de rolls) pour limiter le coût de rendu. [file:11][web:26]

Les images de cartes sont servies en WebP/AVIF avec plusieurs résolutions selon le contexte (thumbnail, carte normale, full art). [file:11][web:38]  
Les tests de performance incluent des scénarios de forte densité (nombre maximal de cartes animées, rolls en rafale). [file:11][web:26]

---

## 10. Cohérence, gouvernance & évolution

Ce document est la référence unique pour toutes les décisions UI de Gemini Meme Wars. [file:11][web:18]  
Toute divergence visuelle ou interactionnelle doit être justifiée et, si validée, intégrée ici avant d’être implémentée. [web:18][web:21]

Les tokens, composants et patterns sont versionnés, avec journal des changements (changelog) pour permettre rollback si nécessaire. [web:18][web:59]  
Des tests de régression visuelle (visual regression) sont exécutés à chaque release majeure pour détecter les écarts involontaires. [web:18][web:59]

Les nouveaux écrans doivent composer avec les composants existants avant d’introduire de nouveaux patterns. [file:11][web:21]  
Les designers et développeurs sont responsables de vérifier toute nouveauté UI à l’aune de ce `ui-spec.md`. [file:11][web:18]