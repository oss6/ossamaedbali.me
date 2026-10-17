# ossamaedbali.me

> My personal website: home page, work, blog and digital garden.

The site is a React single-page app that fetches its content at runtime from
[Sanity](https://www.sanity.io). Blog posts and notes are written in a Sanity
Studio that lives in this repo, so publishing content never requires a rebuild
or redeploy. Only code changes do.

## Tech stack

- **Frontend:** React 19 built with [Vite](https://vite.dev), `react-router` v8.
  Page titles use React 19's built-in `<title>` support.
- **Content:** Sanity (project `stxb7yu3`, dataset `production`), queried with
  GROQ via `@sanity/client` and rendered with `@portabletext/react`
- **Rich content:** `react-syntax-highlighter` for code blocks, KaTeX for LaTeX
- **Studio:** Sanity Studio v6 with the Structure and Vision tools
- **Tooling:** Vitest and Testing Library, ESLint 10 (flat config), Node.js 24
  (pinned in [`.nvmrc`](.nvmrc))
- **Hosting:** static build on AWS S3, deployed by GitHub Actions
- **Releases:** [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version)
  with Conventional Commits, see [CHANGELOG.md](CHANGELOG.md)

## Project structure

```
.
├── index.html                 # Vite entry HTML
├── vite.config.js             # dev server, build and test config
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # routes
│   ├── App.test.jsx           # smoke tests (Sanity client mocked)
│   ├── client.js              # Sanity client (read-only, CDN)
│   ├── home/                  # /
│   ├── work/                  # /work
│   ├── posts/                 # /blog and /blog/:slug
│   ├── digital-garden/        # /digital-garden and /digital-garden/:slug
│   ├── not-found/             # 404 page
│   ├── card/                  # shared card component
│   ├── shared/
│   │   └── portable-text-components.jsx  # renderers for images, code, iframes, LaTeX
│   └── test/                  # test setup and fixtures
├── personalblog/              # Sanity Studio (v6)
│   ├── sanity.config.js       # Studio config and plugins
│   ├── sanity.cli.js          # project/dataset used by the Sanity CLI
│   └── schemas/               # content model
├── public/                    # static files copied as-is (favicons, manifest)
└── .github/workflows/
    ├── ci.yml                 # lint, test and build on pushes and PRs
    └── deploy.yml             # build and sync to S3 on release tags
```

## Content model

The schemas live in [`personalblog/schemas`](personalblog/schemas):

| Type | Fields |
|---|---|
| `post` | `title`, `slug`, `author`, `mainImage`, `categories`, `publishedAt`, `body` |
| `note` | `title`, `slug`, `body`, `notes` (links to other notes), `topics` |
| `author` | `name`, `slug`, `image`, `bio` |
| `category` | `title`, `description` |
| `topic` | `title`, `description` |

`body` uses the shared `blockContent` type (Portable Text), which supports:

- headings (h1–h4), blockquotes, `pre`, bullet and numbered lists
- bold, italic, inline code, external links, and internal anchor links
  (`internalLinkSource` / `internalLinkTarget`)
- images with captions, code blocks (`@sanity/code-input`), iframes, and inline
  or block LaTeX

If you add a new block type to the schema, also add a renderer for it in
[`src/shared/portable-text-components.jsx`](src/shared/portable-text-components.jsx).
Otherwise the site won't display it.

## Local development

Prerequisites: Node.js 24 and npm. With [nvm](https://github.com/nvm-sh/nvm),
run `nvm use` in the repo root to pick up the version in `.nvmrc`.

### Website

```
$ npm install
$ npm run dev        # dev server at http://localhost:3000 (npm start also works)
$ npm run lint
$ npm test
$ npm run build      # production build in build/
$ npm run preview    # serve the production build at http://localhost:3000
```

The dev server reads published content from the production dataset. The tests
mock the Sanity client, so they don't need network access.

### Sanity Studio

```
$ cd personalblog
$ npm install
$ npm run dev
```

The Studio runs at http://localhost:3333. Log in with the account that owns the
Sanity project. Besides the content editor, the **Vision** tool lets you run GROQ
queries against the dataset. `npm run lint` and `npm run build` check the Studio
the same way CI does.

## Writing and publishing content

### From the Studio

1. Create a **Post** (or **Note**) in the Studio and fill in its title, slug,
   author, categories, published date and main image.
2. Write the body. Use the code block for snippets, and give every image a
   caption, because the caption is used as the image's alt text.
3. Click **Publish**. The post appears at `/blog/<slug>` straight away.

Unpublished drafts aren't visible on the site, so you can safely save work in
progress.

### From the command line

The Sanity CLI reads the project and dataset from
[`personalblog/sanity.cli.js`](personalblog/sanity.cli.js). Run CLI commands
from `personalblog/`:

```
$ npx sanity login                                    # use the account that owns the project
$ npx sanity documents query '*[_type == "post"]{title, "slug": slug.current}'
$ npx sanity dataset import post.ndjson production --missing
```

- An imported document whose `_id` starts with `drafts.` stays an unpublished
  draft until you publish it in the Studio.
- `--missing` never overwrites existing documents. Use `--replace` to update a
  document on purpose.
- Images in an NDJSON import can be uploaded inline by giving the image object
  `"_sanityAsset": "image@file:///absolute/path.png"`.

> **Note:** Sanity treats each login provider as a separate account, even when
> they share an email address. If the CLI reports `project user not found`, you're
> logged in with an account that isn't a member of the project. Run
> `npx sanity logout`, then log in again with the provider that owns the project.

## Releasing and deploying

### Automatic (recommended)

Deployments run from tags. Run:

```
$ npm run release
```

This uses commit-and-tag-version to:

1. Bump the version in `package.json` based on the Conventional Commits since
   the last release.
2. Update [CHANGELOG.md](CHANGELOG.md).
3. Commit and tag `vX.Y.Z`.
4. Push the commit and tag to `origin master`.

Every push and pull request to `master` runs [`ci.yml`](.github/workflows/ci.yml)
(lint, test and build for the site and the Studio). The tag push triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
It builds the site and syncs `build/` to the S3 bucket in `eu-west-1` (with
`--delete`, so files missing from the build are removed). The workflow needs the
`AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` repository
secrets.

### Using the AWS CLI

With AWS credentials configured locally:

```
$ npm run build
$ npm run deploy
```

### Manually

```
$ npm run build
```

Then upload the contents of `build` to the S3 bucket.

## Notes

- The frontend's Sanity client in [`src/client.js`](src/client.js) is read-only
  and uses the CDN (`useCdn: true`), so a newly published edit can take a few
  seconds to appear.
