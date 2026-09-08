# Migration vers Astro 7.3.1 et Tailwind 4

## Plan révisé

1. Construire la version Astro 5 / Tailwind 3 pour conserver une référence.
2. Migrer vers Tailwind 4 avec `@tailwindcss/vite` : déplacer le thème en CSS,
   préserver les couleurs et le conteneur, adapter les classes supprimées ou
   renommées, puis comparer le rendu avec la référence.
3. Passer à Astro 7.3.1 et aux intégrations compatibles. Conserver le rendu
   statique, Vercel, React, les polices et la génération du sitemap/robots.txt.
   Fixer `compressHTML: true` pour préserver les espaces des textes existants.
4. Retirer la configuration Analytics redondante et `serverOptions`, qui n'est
   pas une option Astro reconnue. Aucune nouvelle CSP n'est activée : sa mise en
   place dépend de l'hébergement et des ressources externes autorisées.
5. Aligner le développement et la CI sur Node 24, avec `npm ci` et
   `npm run build` (vérification des types puis génération statique).
6. Vérifier le build, les pages, les images, les polices, les métadonnées, les
   PDF, la navigation mobile, le carrousel, la 404 et les redirections.

## Contraintes de déploiement

- Tailwind 4 nécessite Safari 16.4+, Chrome 111+ ou Firefox 128+.
- Le build télécharge Poppins depuis Google Fonts et nécessite un accès réseau.
- La configuration Vercel et le workflow Nginx existants sont conservés.
- Le workflow ne se déclenche automatiquement que sur la branche
  `github-actions`. Aucun déploiement n'est lancé pendant la migration.
- Avant publication, aligner aussi la version Node du projet Vercel et valider
  les redirections et la 404 sur l'hébergement cible. En cas de régression,
  redéployer l'artefact précédent ou restaurer les changements de migration
  avec leur lockfile, puis reconstruire.

## Résultat de la migration — 8 septembre 2026

- Astro **7.3.1**, Tailwind CSS et `@tailwindcss/vite` **4.3.3**.
- Intégrations : React **6.0.5**, Vercel **11.0.10**, sitemap **3.7.4**,
  check **0.9.10**. React reste en version majeure 18.
- Le thème CSS conserve les couleurs utilisées, Poppins, le breakpoint `xs`,
  les ombres et le conteneur plafonné à 1400px. Les dégradés conservent leur
  interpolation sRGB. La configuration Prettier pointe vers ce thème CSS.
- `npm ci` réussit avec le lockfile régénéré depuis une installation vierge.
- `npm run build` réussit : **32 pages**, **0 erreur**, **0 avertissement** et
  deux indications préexistantes (`frameborder` et variable `status` inutilisée).
- Comparaison des 32 fichiers HTML : aucune page ni aucun texte perdu, aucune
  modification des dimensions déclarées des images, aucun nouveau lien local
  cassé. Les PDF sont identiques et `robots.txt` est inchangé ; les deux fichiers
  sitemap sont générés. La différence de métadonnées porte sur le nom du fichier
  image Open Graph généré pour l'accueil.
- Comparaison dans le navigateur : aucun écart de géométrie supérieur à 1px sur
  les éléments mesurés de l'accueil à 390, 1280 et 1440px, de la grille des cercles
  et de la page Mons-Mines à 1440px. Vérification visuelle ciblée sur ordinateur
  et mobile, sans prétendre à une comparaison exhaustive de tous les pixels.
- Menu mobile, navigation avec `ClientRouter`, retour arrière/avant et carrousel
  PomPoms vérifiés. Les flèches et les indicateurs du carrousel fonctionnent.
- L'artefact Vercel contient les deux redirections 301 (`/cercles`, `/houzeau`)
  et la route de repli 404. Leur exécution sur l'hébergeur reste à vérifier lors
  d'une prévisualisation de déploiement. Aucun déploiement effectué.

## Anomalies préexistantes relevées

Ces points existent aussi dans la référence et ne sont pas modifiés par la migration :

- Les liens PDF de la page « À propos » sont relatifs (`pv/...`) et se résolvent
  sous `/a-propos/pv/` quand la page est consultée avec une barre oblique finale.
- L'URL Open Graph de l'accueil utilise `https://fede.fpms.ac.b` : le code retire
  le dernier caractère du domaine en construisant cette URL.
- Des liens pointent vers des pages absentes : `/cite-houzeau/salle-pp`,
  `/grands-evenements/crasino`, `/grands-evenements/isw` et
  `/grands-evenements/saint-nic`.
- Le workflow Nginx copie uniquement `dist/`. Les redirections HTTP et la 404
  doivent être configurées côté Nginx ; les règles Vercel ne s'y appliquent pas.

## Sources

- [Mise à jour Astro](https://docs.astro.build/en/upgrade-astro/)
- [Migration Astro 6](https://docs.astro.build/en/guides/upgrade-to/v6/)
- [Migration Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Migration Tailwind 4](https://tailwindcss.com/docs/upgrade-guide)
