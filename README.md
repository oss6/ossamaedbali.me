# ossamaedbali.me

> My personal website: home page, work, blog and digital garden.

The site is a React single-page app that fetches its content at runtime from
[Sanity](https://www.sanity.io). Blog posts and notes are written in a Sanity
Studio that lives in this repo, so publishing content never requires a rebuild
or redeploy. Only code changes do.

## Tech stack

- **Frontend:** [Create React App](https://create-react-app.dev) (React 18),
  `react-router-dom` v6, `react-helmet-async`
- **Content:** Sanity (project `stxb7yu3`, dataset `production`), queried with
  GROQ via `@sanity/client` and rendered with `@portabletext/react`
- **Rich content:** `react-syntax-highlighter` for code blocks, KaTeX for LaTeX
- **Hosting:** static build on AWS S3, deployed by GitHub Actions
- **Releases:** [standard-version](https://github.com/conventional-changelog/standard-version)
  with Conventional Commits, see [CHANGELOG.md](CHANGELOG.md)

## Project structure

```
.
├── src/
│   ├── App.js                 # routes
│   ├── client.js              # Sanity client (read-only, CDN)
│   ├── home/                  # /
│   ├── work/                  # /work
│   ├── posts/                 # /blog and /blog/:slug
│   ├── digital-garden/        # /digital-garden and /digital-garden/:slug
│   ├── not-found/             # 404 page
│   ├── card/                  # shared card component
│   └── shared/
│       └── portable-text-components.js  # renderers for images, code, iframes, LaTeX
├── personalblog/              # Sanity Studio (v3)
│   ├── sanity.config.js       # Studio config and plugins
│   ├── sanity.cli.js          # project/dataset used by the Sanity CLI
│   └── schemas/               # content model
├── public/
└── .github/workflows/deploy.yml
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
[`src/shared/portable-text-components.js`](src/shared/portable-text-components.js).
Otherwise the site won't display it.

## Local development

Prerequisites: Node.js (CI builds with Node 16) and npm.

### Website

```
$ npm install
$ npm run start
```

The site runs at http://localhost:3000 and reads published content from the
production dataset.

### Sanity Studio

```
$ cd personalblog
$ npm install
$ npm run dev
```

The Studio runs at http://localhost:3333. Log in with the account that owns the
Sanity project.

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

This uses standard-version to:

1. Bump the version in `package.json` based on the Conventional Commits since
   the last release.
2. Update [CHANGELOG.md](CHANGELOG.md).
3. Commit and tag `vX.Y.Z`.
4. Push the commit and tag to `origin master`.

The tag push triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
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

- `personalblog/sanity.json` is left over from Sanity Studio v2. The v3 Studio
  uses `sanity.config.js` and `sanity.cli.js` instead.
- The frontend's Sanity client in [`src/client.js`](src/client.js) is read-only
  and uses the CDN (`useCdn: true`), so a newly published edit can take a few
  seconds to appear.
