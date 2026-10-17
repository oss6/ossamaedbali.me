export const categories = [
  { _id: 'cat-research', title: 'Research' },
  { _id: 'cat-open-source', title: 'Open source' },
];

export const posts = [
  {
    title: 'lcmsPlot: publication-ready LC-MS plots in R',
    slug: { current: 'lcmsplot' },
    publishedAt: '2026-10-17T09:00:00.000Z',
    mainImage: { asset: { _id: 'image-main', url: 'https://cdn.sanity.io/images/test/test/main-800x600.png' } },
    name: 'Ossama Edbali',
  },
  {
    title: 'Peak detection in metabolomics: under the hood',
    slug: { current: 'peak-detection' },
    publishedAt: '2023-04-30T12:00:00.000Z',
    mainImage: { asset: { _id: 'image-peak', url: 'https://cdn.sanity.io/images/test/test/peak-800x600.png' } },
    name: 'Ossama Edbali',
  },
];

const span = (text, marks = []) => ({ _type: 'span', _key: text.slice(0, 8), text, marks });

export const post = {
  title: 'lcmsPlot: publication-ready LC-MS plots in R',
  slug: { current: 'lcmsplot' },
  publishedAt: '2026-10-17T09:00:00.000Z',
  name: 'Ossama Edbali',
  categories: [categories[0]],
  body: [
    { _type: 'block', _key: 'h2', style: 'h2', markDefs: [], children: [span('Motivation')] },
    {
      _type: 'block',
      _key: 'p1',
      style: 'normal',
      markDefs: [{ _type: 'link', _key: 'lnk', href: 'https://github.com/computational-metabolomics/lcmsPlot' }],
      children: [span('The code is on '), span('lcmsPlot repository', ['lnk']), span('.')],
    },
    { _type: 'code', _key: 'code', language: 'r', code: 'library(lcmsPlot)' },
    {
      _type: 'image',
      _key: 'img',
      caption: 'Four features plotted with lcmsPlot',
      asset: { _type: 'reference', _ref: 'image-abc123-1600x1120-png' },
    },
    { _type: 'latex', _key: 'tex', body: 'E = mc^2' },
  ],
};
