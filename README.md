# FougereBle

Site one-page (thème Carl) généré avec [Eleventy](https://www.11ty.dev/) et éditable via [Decap CMS](https://decapcms.org/).

## Ajouter du contenu

```bash
npm install
npm start
```

Ça lance le site sur [http://localhost:8080](http://localhost:8080) et le CMS sur [http://localhost:8080/admin/](http://localhost:8080/admin/).

Dans le CMS tu peux :

- modifier l’accueil, l’à-la-une, l’à propos
- ajouter un jeu (image, lien Itch, tags)

Ensuite `git add` / `git commit` / `git push`. GitHub Actions build et déploie.

## Build seul

```bash
npm run build
```

Le HTML sort dans `dist/`.

## GitHub Pages

Dans le dépôt : **Settings → Pages → Source = GitHub Actions**.

Le domaine `fougereble.fr` est dans `CNAME`.
