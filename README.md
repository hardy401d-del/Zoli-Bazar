# Zoli Bazar

Boutique en ligne 100% statique pour l'Océan Indien (La Réunion, Mayotte, Madagascar).
Progressive Web App installable, sans base de données ni serveur — HTML, CSS et JavaScript natifs uniquement.

## Structure du projet

```
.
├── index.html              Page unique : onboarding, boutique, panier
├── manifest.json           Manifeste PWA (nom, icônes, couleurs)
├── sw.js                   Service worker (cache et fonctionnement hors-ligne)
├── netlify.toml             Configuration des headers de cache Netlify
├── icons/                  Icônes de l'app (favicon, home screen, maskable)
└── images/
    ├── logo-mark.svg        Logo icône seul (vectoriel)
    ├── logo-full.svg         Logo icône + nom (vectoriel)
    └── products/            Illustrations des produits
```

## Développement local

Aucun outil de build requis. Pour tester en local avec le service worker actif (nécessite un serveur, pas un simple double-clic sur le fichier) :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Déploiement

Le site est prévu pour Netlify, connecté directement à ce repo GitHub :

1. Netlify → **Add new site → Import an existing project** → sélectionner ce repo.
2. Build command : *(aucune)* — Publish directory : `.`
3. Chaque `git push` sur la branche principale redéploie automatiquement.

## Configuration à compléter

- **Produits** : dans `index.html`, tableau `products` — ajouter `checkoutUrl` (lien de checkout Lemon Squeezy) pour chaque article.
- **Photos produits** : remplacer les illustrations dans `images/products/` par de vraies photos, puis mettre à jour le champ `image` correspondant.
- **Cache** : à chaque déploiement modifiant `index.html`, `manifest.json`, les icônes ou les images produits, incrémenter `CACHE_NAME` dans `sw.js` (ex. `zoli-bazar-v5`).

## Régions et adaptation culturelle

Le choix de région est stocké dans `localStorage` (`zoli_bazar_region`) et adapte :
- la bannière d'accueil (titre/sous-titre en créole réunionnais, shimaoré, ou malgache)
- la devise affichée (Euro pour La Réunion/Mayotte, Ariary pour Madagascar)
