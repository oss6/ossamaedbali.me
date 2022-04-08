import sanityClient from '../client';

function filterByTopics(topics) {
  if (!topics || topics.length === 0) {
    return '';
  }

  return `&& references(${topics.map(t => `"${t}"`).join(', ')})`;
}

function filterBySearchTerm(searchTerm) {
  if (!searchTerm) {
    return '';
  }

  return `&& ((title match "${searchTerm}") || (body[].children[].text match "${searchTerm}"))`;
}

const digitalGardenService = {
  getNotes(_filters) {
    // const options = _options || {};
    const filters = _filters || {};

    return sanityClient.fetch(`
      *[_type == "note" ${filterByTopics(filters.topics)} ${filterBySearchTerm(filters.searchTerm)}] {
        _id,
        title,
        slug,
        topics[]->
      }
    `);
  },

  getNote(slug) {
    return sanityClient.fetch(`
      *[_type == "note" && slug.current == $slug] {
        title,
        slug,
        body
      }
    `, { slug })
  },

  getTopics() {
    return sanityClient.fetch(`
      *[_type == "topic"] {
        _id,
        title
      }
    `)
  }
};

export default digitalGardenService;
