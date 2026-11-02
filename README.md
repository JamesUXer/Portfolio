# James Spiller Portfolio

Static portfolio website scaffolded for GitHub Pages.

## Structure

- `index.html` contains the semantic page sections.
- `projects.html` contains the selected and in-progress projects index.
- `styles.css` contains design tokens and responsive layout rules.
- `case-study-system.css` contains the shared case-study styles extracted from Habit Hero.
- `CASE-STUDY-DESIGN.md` documents their roles and adoption by other case studies.
- `scripts.js` contains small progressive enhancements.
- `assets/images/` contains the current project and hero imagery.
- `assets/icons/` is for exported SVG icons.
- `assets/docs/` is for downloadable files such as the CV PDF.

## Local Preview

Open `index.html` in a browser, or serve the folder locally:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Pending Content

The email, LinkedIn, GitHub, and CV controls are visible but intentionally disabled until their
final destinations are supplied. The current project imagery was extracted from the Figma reference
PNGs and can be replaced in place with higher-resolution originals later.

## GitHub Pages Deployment

1. Create a new GitHub repository.
2. Push this folder to the repository.
3. In the repository, open `Settings` -> `Pages`.
4. Set the source to deploy from the `main` branch and `/ (root)`.
5. Save, then wait for GitHub Pages to publish the site.

## Custom Domain

After buying a domain, add it in GitHub under `Settings` -> `Pages` -> `Custom domain`.

If using an apex domain like `example.com`, point the domain to GitHub Pages with `A` records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.example.com`, add a `CNAME` record pointing to:

```text
YOUR-GITHUB-USERNAME.github.io
```

GitHub may add a `CNAME` file automatically when the custom domain is saved. If it does, pull that change back into this local repository.

Official docs:

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Playground

`playground.html` contains the interactive island, six experiments, annotated design moments and full-size play links. `playground.js`, `playground-testing.js`, `playground.css` and `playground-world.css` implement the experience. Runtime assets are under `assets/playground/`. Field notes is a clearly labelled fictional demo with separate local storage; Testing journeys is an illustrative explanation without research collection. The private testing platforms and participant data are not included. Legacy `work-in-progress.html` links redirect into the Playground.
