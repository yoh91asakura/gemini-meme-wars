<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# si je fais ça mon agent.md sera trop gros, je prefere que tu fasse juste le ui spec, on le référencera. Le ui spec doivent permettre de bien comprendre le roll, l'ethétique des carts full art a la anime card et avoir un ui qui respecte les best pratice actuelle

Voici un brouillon complet de `ui-spec.md` que tu peux ajouter à ton repo et référencer depuis `agent.md`.[^1][^2]

***

### UI Spec – Gemini Meme Wars

#### 1. Objectifs et périmètre

Ce document définit les règles de l’interface utilisateur pour Gemini Meme Wars : mise en page, esthétique des cartes full art, écrans de roll, deck et combat.[^3][^1]
L’objectif est de garantir une UI cohérente, lisible, responsive (mobile‑first) et suffisamment “premium” pour un gacha PvP moderne.[^4][^2]

Toute nouvelle UI doit respecter ce spec ; si un besoin n’y apparaît pas, il doit être d’abord ajouté ici avant d’être codé.[^5][^1]
L’UI doit rester centrée joueur : lisibilité instantanée, peu d’effort cognitif, feedback immédiat à chaque action.[^6][^1]

#### 2. Direction artistique générale

L’esthétique vise un mélange “full art anime card game” moderne (Shadowverse, Runeterra, mobile gacha) avec des emojis comme motif central.[^7][^8]
Les cartes sont des vignettes hautement illustrées, avec une grande illustration centrale et un chrome minimaliste qui met l’art en avant plutôt que des bordures complexes.[^9][^7]

Les personnages et emojis doivent paraître vivants : poses dynamiques, silhouettes claires, utilisation de compositions type “rule of thirds” pour éviter les visuels plats.[^7][^9]
La palette générale tend vers le coloré et saturé mais avec un fond d’interface plus neutre (bleu nuit, gris chaud) pour laisser les cartes et projectiles dominer visuellement.[^10][^9]

Les rares et cartes clés peuvent s’inspirer des cartes promo anime (cadres plus brillants, particules, halo léger) sans nuire à la lisibilité du texte.[^11][^10]
Les avatars, HUD et boutons gardent un style simple et propre pour éviter la surcharge, la complexité visuelle étant réservée aux cartes et au gacha.[^1][^3]

#### 3. Layout global et responsive

Le jeu est pensé en mode portrait mobile‑first, avec une mise en page qui s’adapte ensuite au desktop sans changer les hiérarchies visuelles.[^12][^13]
La zone centrale de combat (canvas) est toujours prioritaire, encadrée par des panneaux UI latéraux ou supérieurs qui ne masquent jamais les projectiles.[^13][^1]

Breakpoints principaux : petit mobile, grand mobile, tablette verticale, desktop, chacun réorganisant les panneaux sans changer l’ordre logique (combat au centre, cartes proches des avatars, HUD en haut).[^2][^14]
Sur mobile, la navigation doit être possible avec un pouce : boutons principaux en bas ou en zones faciles d’accès, tailles de cibles tactiles ≥ 48 px.[^2][^6]

Sur desktop, les panneaux peuvent être plus espacés, avec une grille plus large pour le deck et l’inventaire, mais en conservant les mêmes composants.[^15][^2]
Aucun écran ne doit imposer un scroll vertical continu pour les actions critiques (combat, roll, gestion de deck) : tout doit être visible ou accessible par onglets/panels.[^1][^2]

#### 4. Composant Carte full art (référence visuelle)

Les cartes sont des rectangles verticaux, ratio approximatif 2:3, avec un art plein cadre occupant la majorité de la surface.[^8][^7]
L’illustration (emoji ou personnage) doit être lisible même en petite taille ; le sujet principal ne doit pas être centré sur le ventre mais sur le visage/haut du corps.[^9][^7]

Éléments fixes de chaque carte : zone d’art, bandeau de nom, badge de rareté, zone de stats, barre de mana en bas.[^8][^7]
Le bandeau de nom est simple et propre (fond légèrement opaque sur l’art), avec typographie claire et hiérarchie lisible entre nom et rareté.[^7][^9]

La zone de stats ne montre qu’un résumé : HP, Force, Esquive, Regen mana, sous forme d’icônes + valeurs, pour limiter le texte.[^16][^8]
La barre de mana occupe toute la largeur de la carte, avec couleur et remplissage reflétant l’état de charge d’ulti de cette carte.[^8][^1]

Code couleur par rareté : fond ou cadre plus brillant pour les épics et légendaires, mais sans texture trop dense ni ornementation excessive.[^10][^7]
Les bordures et ombres des cartes utilisent toujours les mêmes épaisseurs et styles pour assurer une cohérence et faciliter la lecture sur des grilles denses.[^5][^1]

#### 5. UI de combat (CombatScreen)

L’écran de combat est structuré autour de l’arène centrale (canvas), avec un avatar à gauche et un à droite, en miroir.[^17][^18]
Les cartes du joueur sont affichées en colonne ou éventail près de son avatar (gauche), leurs barres de mana visibles en permanence.[^17][^8]

Les cartes ennemies (IA ou autre joueur) sont affichées côté droit, en version réduite (emoji + état d’ulti), pour éviter la surcharge tout en donnant des infos de lecture.[^18][^16]
Les jauges de vie du joueur et de l’ennemi sont situées en haut de l’écran, barres larges, couleurs distinctes, avec valeurs numériques optionnelles.[^2][^1]

Le timer de round et l’état du match (début, fin, victoire, défaite) sont placés au centre haut, de manière discrète mais visible.[^4][^1]
Aucun panneau ou élément n’empiète sur la zone où les projectiles voyagent, sauf overlays temporels (pause, fin de match).[^13][^1]

Sur mobile, les panneaux de cartes peuvent être légèrement semi‑transparents et collés aux bords pour maximiser l’espace de jeu.[^12][^13]
Les touches ou boutons d’actions (pause, paramètres) sont placés dans les coins supérieurs, de taille confortable et bien espacés des éléments cliquables secondaires.[^6][^2]

#### 6. UI de roll / gacha (RollScreen)

L’écran de roll met en scène une carte ou un groupe de cartes au centre, avec une animation claire qui crée anticipation puis récompense.[^19][^20]
La zone principale contient la carte révélée en grand format, centrée, avec animation d’apparition (scale‑in, glow, légères particules).[^21][^16]

Le bouton de roll (single, multi) est situé en bas, large, avec texte, icône de monnaie et coût clairement affiché.[^20][^19]
Les monnaies disponibles (soft, premium) sont affichées en haut ou en haut‑droite, avec icônes distinctes et valeurs lisibles.[^20][^10]

Un bandeau ou zone secondaire montre l’historique récent des pulls (petites cartes en ligne ou grille réduite).[^21][^20]
En cas de multi‑roll, les cartes sont d’abord affichées en grille compacte, puis un tap sur une carte peut la passer en mode “full reveal” pour profiter de l’animation et de l’art.[^16][^20]

Les raretés élevées déclenchent une couche d’effets supplémentaires (halo coloré, flash d’arrière‑plan, particules), mais les durées doivent rester courtes pour ne pas frustrer.[^19][^20]
Toutes les actions de roll sont irréversibles visualisées : transitions claires, pas de déclenchement sans feedback fort (son, animation, vibration le cas échéant).[^6][^1]

#### 7. UI de deck et inventaire (DeckBuilderScreen)

L’écran deck/inventaire doit permettre de comprendre et modifier un deck en quelques secondes, même sur mobile.[^22][^8]
En haut ou sur un panneau latéral, afficher les stats agrégées du joueur : HP total, Force, Esquive, Regen mana, éventuellement niveau moyen ou puissance.[^22][^8]

La zone principale présente : une grille de toutes les cartes possédées et une rangée de slots de deck actif (4–6).[^23][^22]
Les slots de deck sont visuellement différenciés (cadres plus grands, fond distinct, étiquettes de slot) pour les distinguer de l’inventaire brut.[^1][^8]

Interaction recommandée : taper ou drag‑and‑drop une carte de l’inventaire vers un slot de deck remplace ou ajoute la carte au deck.[^24][^2]
À chaque changement de deck, les stats agrégées sont mises à jour en temps réel avec une légère animation de nombre (count‑up/down) pour renforcer le lien de cause à effet.[^25][^6]

Sur desktop, l’inventaire peut occuper la partie gauche et les slots deck + stats la partie droite, avec plus de colonnes.[^15][^2]
Sur mobile, l’inventaire peut être en bas (scroll horizontal ou petite grille), le deck en haut, pour un usage confortable au pouce.[^12][^13]

#### 8. Micro‑interactions et animations

Chaque action utilisateur (tap sur bouton, sélection de carte, validation de roll) doit déclencher au moins un retour visuel rapide : changement d’état, petite animation, effet sonore.[^6][^1]
Les micro‑interactions doivent utiliser des durées courtes (≈150–250 ms) et des easings doux pour garder un sentiment de réactivité.[^26][^6]

Les cartes réagissent au survol (desktop) ou à la sélection (mobile) par un léger lift, une ombre renforcée et éventuellement un glow discret.[^27][^7]
Quand une carte charge son ulti, la barre de mana peut pulser légèrement ou changer de teinte à mesure qu’elle approche du seuil.[^26][^1]

Quand l’ulti d’une carte est prêt, la carte entière peut entrer dans un état “ready” : halo coloré, pulsation lente, accentuation visuelle sans gêner la lisibilité du combat.[^26][^1]
Au déclenchement de l’ulti, l’animation doit être nette mais brève : petit zoom, flash, vibration locale, puis retour rapide à l’état normal ou charging.[^27][^26]

Les transitions entre écrans (lobby → combat, combat → résultat, lobby → roll) doivent être courtes et cohérentes, réutilisant les mêmes patterns (fade, slide, scale).[^3][^1]
Éviter les animations trop longues ou lourdes qui cassent le rythme, surtout dans des boucles de jeu basées sur des rounds courts et répétés.[^2][^6]

#### 9. Accessibilité, lisibilité et performance

Le contraste entre texte et fond doit respecter les bonnes pratiques (palettes color‑blind friendly, évitement de texte sur fond très saturé sans overlay).[^25][^1]
Les tailles de police doivent rester lisibles sur petits écrans, avec possibilité d’augmenter la taille via des préférences si nécessaire.[^1][^6]

Les informations critiques (HP, mana, état d’ulti, coût des rolls) ne doivent jamais reposer uniquement sur la couleur : utiliser aussi des icônes ou formes.[^3][^1]
Les boutons importants doivent être clairement distingués des actions secondaires (couleur, taille, label).[^25][^2]

Les animations doivent rester légères et optimisées : privilégier les transformations GPU (translate, scale, opacity) plutôt que les effets coûteux (blur étendu, box‑shadow massifs).[^26][^6]
Éviter les layout shifts pendant les combats : pas de redimensionnement dynamique de panneaux qui ferait bouger la zone de jeu ou les cartes.[^2][^1]

#### 10. Règles de cohérence et extension

Tous les écrans partagent les mêmes styles de boutons, panneaux, cartes et typographie ; toute variation doit être justifiée par une fonction (ex : bouton principal vs secondaire).[^25][^1]
Les nouveaux composants UI doivent réutiliser les styles existants (tokens, classes, composants partagés), et non introduire de nouveaux patterns isolés.[^5][^2]

Avant d’ajouter un nouvel élément visuel (badge, icône, style de carte), vérifier qu’il ne duplique pas un pattern existant déjà disponible dans le design system.[^28][^5]
Tout changement majeur de layout ou de langage visuel doit être d’abord saisi dans ce `ui-spec.md` puis implémenté ensuite en code.[^5][^1]

***

Tu peux maintenant :

- Ajouter ce fichier comme `ui-spec.md` à la racine.[^29][^5]
- Dans `agent.md`, juste dire que toute UI doit suivre `ui-spec.md` pour la mise en page, les cartes et les écrans roll/deck/combat, sans recopier tous les détails.[^29][^2]
<span style="display:none">[^30][^31][^32][^33][^34]</span>

<div align="center">⁂</div>

[^1]: https://genieee.com/best-practices-for-game-ui-ux-design/

[^2]: https://orthoplexsolutions.com/web-development/web-app-ui-ux-best-practices-and-trends-in-2025-for-optimal-user-experience/

[^3]: https://gamecrio.com/5-game-ui-ux-trends-in-2025-every-developer-should-follow/

[^4]: https://www.linkedin.com/pulse/mastering-game-uiux-best-practices-you-should-know-sunil-khobragade-p5qzf

[^5]: https://www.designsystemscollective.com/a-comprehensive-guide-to-atomic-design-and-design-tokens-in-modern-ui-ux-development-288a996a483a

[^6]: https://nextnative.dev/blog/mobile-app-ui-design-best-practices

[^7]: https://www.reddit.com/r/homemadeTCGs/comments/1jgeuvt/working_on_a_modern_card_style_for_anime_based/

[^8]: https://gdkeys.com/the-card-games-ui-design-of-fairtravel-battle/

[^9]: https://www.clipstudio.net/how-to-draw/archives/161230

[^10]: https://www.reddit.com/r/gachagaming/comments/1hsfzx7/hot_take_the_gacha_game_industry_has_the_best/

[^11]: https://draftsim.com/anime-mtg-cards/

[^12]: https://www.youtube.com/watch?v=M7sD-1alYyw

[^13]: https://genieee.com/responsive-ui-design-for-games/

[^14]: https://dev.to/gerryleonugroho/responsive-design-breakpoints-2025-playbook-53ih

[^15]: https://blogs.spritegenix.com/responsive-web-design-best-practices-for-2025

[^16]: https://game-wisdom.com/critical/10-unique-mobile-games

[^17]: https://www.youtube.com/watch?v=SpNiDQd-ics

[^18]: https://bounty-bash.com/auto-battler-guide.html

[^19]: https://www.theseus.fi/bitstream/handle/10024/805479/Dang_Thang.pdf?sequence=2

[^20]: https://www.gamerefinery.com/the-complete-guide-to-mobile-game-gachas-in-2022/

[^21]: https://dribbble.com/tags/gacha

[^22]: https://www.deconstructoroffun.com/blog/2017/8/31/designing-a-strong-gacha

[^23]: https://play.google.com/store/apps/details?id=com.Tollopaja.DACAB

[^24]: https://uxplaybook.org/articles/ui-fundamentals-best-practices-for-ux-designers

[^25]: https://www.lyssna.com/blog/ui-design-principles/

[^26]: https://www.smashingmagazine.com/2025/11/keyframes-tokens-standardizing-animation-across-projects/

[^27]: https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/

[^28]: https://figr.design/blog/how-to-use-design-tokens

[^29]: agent.md

[^30]: https://www.facebook.com/groups/TGDAus/posts/29255516934096822/

[^31]: https://neta.art/use-cases/en/the-best-anime-style-game-UI-generator

[^32]: https://www.youtube.com/watch?v=w1SPnlOIR94

[^33]: https://www.youtube.com/watch?v=EWdKNhDEifg

[^34]: https://www.youtube.com/watch?v=S4q969CPemc\&vl=fr

