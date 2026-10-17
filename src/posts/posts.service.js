import sanityClient from '../client';

function filterByCategories(categories) {
  if (!categories || categories.length === 0) {
    return '';
  }

  return '&& references($categories)';
}

function filterBySearchTerm(searchTerm) {
  if (!searchTerm) {
    return '';
  }

  return '&& ((title match $searchTerm) || (body[].children[].text match $searchTerm))';
}

const postsService = {
  getPosts(_options, _filters) {
    const options = _options || {};
    const filters = _filters || {};

    return sanityClient.fetch(`
      *[_type == "post" ${filterByCategories(filters.categories)} ${filterBySearchTerm(filters.searchTerm)}] | order(publishedAt desc) ${options.limit ? '[0...$limit]' : ''} {
        title,
        slug,
        publishedAt,
        mainImage{
            asset->{
            _id,
            url
          }
        },
        "name": author->name
      }
    `, {
      categories: filters.categories || [],
      searchTerm: filters.searchTerm || '',
      limit: options.limit || 0
    });
  },

  getCategories() {
    return sanityClient.fetch(`
      *[_type == "category"] {
        _id,
        title
      }
    `)
  }
}

export default postsService;
