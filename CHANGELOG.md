# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.0](https://github.com/oss6/ossamaedbali.me/compare/v1.0.0...v2.0.0) (2026-10-17)

### ⚠ BREAKING CHANGES

* `npm start`/`npm run dev` now run Vite, `npm test` is
  temporarily unavailable, and Node.js 24 is required.
* requires React 19.2.7+ and Node.js 22.22+ (react-router 8).
* **studio:** the Studio now requires Node.js 24 (Sanity v6 needs
  Node 22.12+) and React 19.2.

### build

* migrate from Create React App to Vite ([3f8557e](https://github.com/oss6/ossamaedbali.me/commit/3f8557eee7a5402d6f35adc6312563a0811bfeeb))

### Features

* **studio:** upgrade Sanity Studio to v6 ([d049ac0](https://github.com/oss6/ossamaedbali.me/commit/d049ac0688541dc460696b5d24b56b8831e03de9))
* upgrade to React 19, React Router 8 and latest Sanity libraries ([61acf15](https://github.com/oss6/ossamaedbali.me/commit/61acf150f0e70279cb65596cd1ff972516792a08))

## [1.0.0](https://github.com/oss6/ossamaedbali.me/compare/v0.1.4...v1.0.0) (2023-05-01)


### ⚠ BREAKING CHANGES

* upgrade sanity

### Features

* upgrade sanity ([a5d6207](https://github.com/oss6/ossamaedbali.me/commit/a5d6207328011e33124855c693b688f4828e5b60))

### [0.1.4](https://github.com/oss6/ossamaedbali.me/compare/v0.1.3...v0.1.4) (2022-04-09)


### Features

* GH-2: add not found page ([9513a3e](https://github.com/oss6/ossamaedbali.me/commit/9513a3e2667d4f7bbe5ad25671e4c0c8744a5f8f)), closes [#2](https://github.com/oss6/ossamaedbali.me/issues/2)

### [0.1.3](https://github.com/oss6/ossamaedbali.me/compare/v0.1.2...v0.1.3) (2022-04-09)


### Bug Fixes

* add checkout and setup-node in deploy.yml ([ceddeef](https://github.com/oss6/ossamaedbali.me/commit/ceddeef6ac9374fc97a280b9b5e50cae56f772d1))

### [0.1.2](https://github.com/oss6/ossamaedbali.me/compare/v0.1.1...v0.1.2) (2022-04-09)


### Bug Fixes

* deploy steps ([bb835f2](https://github.com/oss6/ossamaedbali.me/commit/bb835f2270239683b3b3241dc9929ba9adc082c1))

### 0.1.1 (2022-04-09)


### Features

* add deploy pipeline ([3e79cc6](https://github.com/oss6/ossamaedbali.me/commit/3e79cc6b878a0cfc30b1393176c07c530b55a30b))
