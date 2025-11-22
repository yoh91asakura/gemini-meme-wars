<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# parfait, refait l'explication complete du jeu avec le roll, les combat. détaill absolution tout le foncitonnement du jeu

Le jeu est un PvP auto-battler d’emojis façon Meme Mayhem : on roll des cartes via un gacha, on construit un deck, puis deux avatars fixes s’envoient des projectiles pendant que les cartes autour d’eux chargent et déclenchent leurs propres ultis.[^1][^2]
Les stats du joueur sont la somme de ses cartes, et tout l’intérêt est de créer des decks qui génèrent des combos d’ultis tellement synergiques qu’ils “cassent” la partie, sans que ce soit trivial à atteindre.[^3][^4]

### Vue d’ensemble

Le jeu est un roguelite / auto-battler PvP très inspiré de Meme Mayhem : duel en vue de côté, emojis qui partent en flux continu et focus sur les builds absurdes et les synergies.[^2][^1]
Contrairement à Meme Mayhem où l’ulti est attaché au personnage, ici ce sont les cartes elles‑mêmes qui possèdent une jauge de mana et déclenchent leur propre ultime (dégâts ou buff) quand elles sont chargées.[^5][^2]

Deux joueurs (ou un joueur vs IA) se font face, avatar à gauche et avatar à droite, chacun entièrement fixe, et chacun tire automatiquement des emojis en fonction de son deck dans un duel purement autobattler.[^6][^2]
Le but à long terme est de pousser les joueurs à explorer la méta et à découvrir des combinaisons de cartes extrêmement fortes, tout en gardant un cœur de partie simple : “mes stats + mes combos vs les tiennes, que le meilleur deck gagne”.[^4][^6]

### Boucle de jeu globale

La boucle macro ressemble à un gacha–deckbuilder classique : jouer pour gagner des ressources, les dépenser dans un roll, récupérer des cartes, améliorer son deck, puis repartir en combat.[^7][^8]
Chaque session typique ressemble à : lobby → roll de nouvelles cartes → sélection / modification du deck → lancement d’un duel PvP (ou PvE IA) → fin de match et récompenses → retour lobby.[^9][^7]

Les premiers temps, les matchs sont courts (course au DPS), ce qui permet d’enchaîner rapidement les combats pour tester des idées de decks et débloquer progressivement plus de contenu.[^10][^11]
En mid/late game, des decks à forte survie et régénération permettent des duels beaucoup plus longs, où les boucles d’ultis et les synergies profondes prennent toute leur importance.[^12][^2]

### Module Roll \& Économie de cartes

Le jeu utilise un système de roll type gacha : le joueur dépense une monnaie (soft ou premium) pour ouvrir des packs / roulettes et obtenir de nouvelles cartes de différentes raretés.[^8][^7]
La rareté influence principalement la puissance potentielle et la complexité des passifs/ultis d’une carte, en s’inspirant des systèmes de profondeur de contenu et de duplication des gacha modernes.[^7][^8]

Les duplicatas de cartes ne sont pas perdus : ils servent à monter le niveau ou les étoiles de la carte (plus de stats, ulti plus fort, meilleure scalabilité), ce qui donne une vraie valeur à chaque drop supplémentaire.[^13][^7]
La fréquence d’ouverture du gacha et la taille de la collection sont réglées pour offrir une progression longue, comme dans les jeux où il faut énormément de drops pour maxer une carte légendaire.[^8][^7]

Au niveau serveur, chaque roll est calculé côté backend (RNG, vérification de la monnaie, attribution des cartes) puis renvoyé au client qui se contente d’animer la révélation visuelle.[^7][^8]
Cela garantit l’intégrité de l’économie et permet de faire évoluer les tables de loot (bannières, événements, taux temporaires) sans mettre à jour le client.[^8][^7]

### Module Deck \& agrégation de stats

Le joueur possède une collection de cartes, mais ne peut équiper qu’un deck limité (par exemple 4–6 cartes actives) pour un combat donné.[^3][^9]
Chaque carte représente un “module” de build qui apporte à la fois des stats brutes, un passif et un ulti, et le deck final est la somme cohérente de ces modules.[^2][^3]

Les stats de base d’une carte incluent : vie, force (attaque), esquive, armure, contribution à la régénération de mana, éventuellement critique et effets secondaires.[^14][^2]
Les stats du joueur sont calculées comme : $Stat\_joueur = Stat\_de\_base + \sum Stat\_carte$, ce qui signifie que chaque carte a un impact numérique direct sur la tankiness et le DPS.[^15][^2]

La vie max de l’avatar est la somme d’une base fixe plus toutes les contributions de PV des cartes, permettant en late game d’atteindre des valeurs très élevées comme dans les runs extrêmes de Meme Mayhem.[^12][^2]
La force totale augmente les dégâts de tous les projectiles et des ultis, encourageant des builds “full strength” capables de one‑shot s’ils survivent assez longtemps pour charger leurs ultimes.[^16][^17]

L’esquive agrégée offre une chance de ne prendre aucun dégât même si un projectile touche la hitbox, créant des archetypes “glass cannon dodge” viables mais risqués.[^18][^14]
La régénération de mana agrégée fixe la vitesse moyenne de charge des ultis des cartes, ce qui devient le levier central pour les decks orientés “spam d’ultimes”.[^19][^2]

### Structure d’une carte (stats, passif, ulti)

Chaque carte est définie par : un emoji principal (visuel de projectile ou de thème), un bloc de stats, un passif toujours actif/conditionnel, et un ulti déclenché par une jauge de mana propre à la carte.[^4][^2]
Les stats contrôlent le profil mathématique (plus de PV, plus de force, plus de dodge, plus de regen), le passif modifie le comportement permanent (on hit, on dodge, on damage, etc.), et l’ulti applique un effet ponctuel fort.[^5][^2]

Le passif est conçu comme un bonus “low‑frequency, high‑impact” ou “high‑frequency, low‑impact” selon la carte, par exemple : gagner de la force en prenant des coups, se soigner un peu à chaque hit, voler de la mana à l’adversaire, etc.[^16][^2]
L’ulti est conçu comme un spike puissant : énorme burst de dégâts, buff massif de stats, stun ou affaiblissement de l’adversaire, ou boost temporaire de regen/ulti pour provoquer un effet boule de neige.[^17][^2]

La difficulté de design vient de la combinaison : certaines cartes ont peu de stats mais un passif/ulti très explosif, d’autres sont surtout des “briques de stats” pour soutenir un plan de jeu précis.[^6][^3]
Le joueur doit apprendre intuitivement quels rôles remplissent ses cartes et comment leurs ultis peuvent se chaîner pour former des combos.[^9][^2]

### Mana, régénération et ultis de cartes

Chaque carte possède deux valeurs clés de mana : un **mana max** (quantité nécessaire pour déclencher l’ulti) et éventuellement un modificateur sur la **régénération globale** du joueur.[^19][^2]
Le joueur a une stat de régénération de mana globale (issue de ses cartes) qui remplit, à chaque tic de combat, les jauges de toutes les cartes simultanément, comme l’énergie qui charge les ultis dans de nombreux autobattlers.[^13][^2]

En plus de cette regen passive, certaines mécaniques ajoutent de la mana sur des événements : toucher l'adversaire, être touché, esquiver (proc de la stat), ou déclencher des effets de cartes spécifiques.[^20][^2]
Cela permet par exemple des cartes de type “brain” qui brûlent ou volent l’énergie adverse, ou des cartes d’accélération qui donnent des pics d’énergie sous conditions.[^2]

Quand la jauge d’une carte atteint ou dépasse son mana max, l’ulti de cette carte est automatiquement lancé : l’UI fait “proccer” la carte (animation, glow), un effet se joue sur l’avatar, puis l’effet mécanique est résolu.[^5][^2]
Après l’ulti, la jauge est vidée ou réduite selon le design (par exemple remise à zéro ou diminuée d’un certain pourcentage), pour éviter les boucles instantanées d’ultis infinis.[^19][^2]

Des limites (caps) et rendements décroissants sont prévues sur la regen de mana et certains multiplicateurs d’ultis, afin que les builds late game soient absurdes mais pas littéralement infinis.[^21][^22]
L'objectif est que "casser le jeu" demande une combinaison de cartes rares, un tuning fin de régénération et suffisamment de stats défensives pour tenir assez longtemps.[^18][^16]

### Types d’ultis de cartes

Les ultis offensifs sont des gros coups de burst : missile emoji géant, pluie d’emojis concentrée, explosion en zone autour de l’ennemi, scaling sur la force totale du joueur.[^17][^2]
Ils permettent des kills instantanés si le joueur a stacké force, crit et amplification d’ulti, ce qui fait écho aux builds “one‑shot” très populaires dans Meme Mayhem.[^16][^17]

Les ultis défensifs / sustain : bouclier temporaire, énorme heal basé sur la vie max, augmentation massive de la régénération pour quelques secondes, ou pic d’esquive pour survivre à une phase dangereuse.[^22][^21]
Ces ultis rendent possibles des combats marathons où deux decks très tanky se testent jusqu’à ce que l’un perde sa boucle de sustain.[^12][^18]

Les ultis de contrôle / debuff : ralentir les projectiles adverses, réduire sa force, vider une partie de sa jauge de mana, couper sa régénération ou appliquer un poison/dégâts sur la durée.[^2][^16]
Ils jouent un rôle central dans les match‑ups haut niveau, où empêcher le timing d’ulti adverse vaut parfois plus que d’augmenter son propre DPS.[^23][^6]

### Système de combat PvP

Chaque match se déroule dans une arène fixe en 2D : avatar du joueur à gauche, avatar ennemi à droite, tous deux entièrement immobiles.[^6][^2]
Les deux avatars tirent en continu des projectiles‑emojis dont le pattern (cadence, forme, volume) dépend directement des cartes équipées et de leurs passifs.[^4][^2]

Les cartes sont rendues en colonnes ou en éventail de chaque côté de l’écran, près de leur avatar respectif, et restent visuellement statiques sauf au moment où leur passif ou ulti se déclenche.[^4][^2]
Les projectiles, eux, sortent du corps ou de l'arme de l'avatar et traversent l'écran vers l'adversaire, l'impact étant résolu automatiquement par les stats.[^24][^2]

Un projectile qui atteint l'avatar applique des dégâts calculés à partir de la force du joueur, des multiplicateurs de carte et de la défense adverse, sauf si un jet d'esquive (basé sur la stat) ou un effet de réduction annule/mitige l'impact. Si l'esquive proc, une animation d'esquive se joue sur l'avatar.[^16][^2]
Il n’y a pas de bouclier séparé dans la V1 : armure et PV viennent amortir les coups, mais chaque hit qui passe se ressent dans la barre de vie, à la manière des face‑tanking fights de Meme Mayhem.[^15][^2]

### PvP, IA à decks préfaits et flow de match

La version initiale fonctionne en “PvP asymétrique” : le joueur affronte des IA qui utilisent exactement les mêmes règles, mais avec des decks pré‑configurés.[^13][^2]
Chaque IA possède un ou plusieurs decks JSON prédéfinis, avec une identité de build claire (aggro, tank, ulti‑spam, drain d’énergie, etc.), ce qui permet de calibrer précisément la difficulté.[^3][^9]

Le flow d'un match est : sélection / validation du deck → matchmaking / choix d'un deck IA adapté → entrée en arène (3–2–1) → combat entièrement automatique → résolution de la victoire/défaite → récompenses.[^6][^13]
En cas de double KO (les deux PV tombent à 0 en même temps), une règle explicite décide de l’issue (par exemple avantage au joueur ou match nul selon le mode).[^23][^6]

À terme, la même logique de combat peut être utilisée en PvP réel (asynchrone ou temps réel) : chaque camp charge ses stats et son deck depuis le serveur, puis le moteur résout le duel.[^11][^13]
Mais pour la V1, l’accent reste sur l’expérience “je casse le jeu contre des bots de plus en plus débiles” afin de solidifier l’équilibrage avant d’ouvrir le matchmaking.[^11][^2]

### Philosophie des combos et du pacing

La philosophie de design assume que les joueurs vont chercher à “briser” le système : stacking extrême de force, de regen, d’ultis et de synergies de passifs, comme dans les runs de Meme Mayhem qui montent à des valeurs ridicules.[^12][^16]
Le jeu est construit pour rendre ces combos possibles mais exigeants, en imposant des coûts, des caps, des contreparties et des timings d’ulti qui ne se mettent en place qu’après un certain temps de combat.[^7][^19]

Les rounds early sont volontairement explosifs : peu de PV, peu de regen, quelques passifs simples et des ultis peu fréquents, ce qui donne des matchs de quelques secondes à une minute.[^10][^11]
En late game, la montée en PV, régénération, réduction de dégâts et sophistication des ultis permet des duels beaucoup plus longs, où les synergies de deck et les timings d'ultis deviennent décisifs.[^18][^12]

Ce contraste sprint / marathon est au cœur de la fantasy : sentir la puissance croissante du deck à mesure qu’il passe de “tout le monde meurt vite” à “seuls les builds les plus optimisés et les meilleurs joueurs arrivent à se départager”.[^2][^6]
Ainsi, le jeu récompense la créativité en deckbuilding : trouver des combos de cartes et d'ultis qui se synergisent pour dominer le duel.[^13][^2]
<span style="display:none">[^25][^26][^27][^28][^29][^30][^31]</span>

<div align="center">⁂</div>

[^1]: https://store.steampowered.com/app/2719030/Meme_Mayhem/

[^2]: https://www.youtube.com/watch?v=SpNiDQd-ics

[^3]: https://steampeek.hu/?appid=2719030

[^4]: https://store.steampowered.com/app/2719030/Meme_Mayhem/?l=french

[^5]: https://www.youtube.com/watch?v=g__S-HeQ8fY

[^6]: https://bounty-bash.com/auto-battler-guide.html

[^7]: https://www.deconstructoroffun.com/blog/2017/8/31/designing-a-strong-gacha

[^8]: https://www.gamedeveloper.com/business/gacha-a-2021-detailed-guide-for-beginners-

[^9]: https://ultimategacha.com/pokemon-tcg-pocket-gameplay-gacha-system-decks/

[^10]: https://www.instant-gaming.com/en/17218-buy-meme-mayhem-pc-game-steam/

[^11]: https://minireview.io/top-mobile-games/best-auto-battlers-mobile

[^12]: https://www.youtube.com/watch?v=RYs2WDtf7x0

[^13]: https://play.google.com/store/apps/details?id=com.Tollopaja.DACAB

[^14]: https://www.reddit.com/r/MemeMayhem/comments/1dk9ef7/any_viable_build_ideas_what_to_go_for_at_the_start/

[^15]: https://steamcommunity.com/app/2719030/discussions/0/4339861495509286287/

[^16]: https://www.youtube.com/watch?v=cLaJIovGs7Y

[^17]: https://www.youtube.com/watch?v=tFD5ZZjncN8

[^18]: https://steamcommunity.com/app/2719030/discussions/0/4853281047676598771/

[^19]: https://forum.lastepoch.com/t/a-suggestion-regarding-mana-mana-regen-and-diversity-for-high-cost-builds/24490

[^20]: https://www.youtube.com/watch?v=b8VBCwFu_7E

[^21]: https://www.youtube.com/watch?v=mM2buRozpSw

[^22]: https://www.youtube.com/watch?v=U_3zN7OuCas

[^23]: https://www.reddit.com/r/iosgaming/comments/1nk36hc/whats_the_best_pvp_autobattlerautochess_game/

[^24]: https://www.youtube.com/watch?v=V9TNzX2zdgw

[^25]: https://www.youtube.com/watch?v=fXMC0dK2h0s

[^26]: https://www.youtube.com/watch?v=G7t14dEvJ0o

[^27]: https://steamcommunity.com/app/2719030/allnews/

[^28]: https://www.reddit.com/r/gamedesign/comments/q6jkb3/how_do_i_design_a_gacha_mechanic_in_a/

[^29]: https://www.youtube.com/playlist?list=PLOsIjyoSFXkk21sDZUMuy4mhjqg0xWrnR

[^30]: https://www.youtube.com/watch?v=loTue6bgAA0

[^31]: https://glitchwave.com/charts/top/game/2020-2024/g:roguelike/6/

