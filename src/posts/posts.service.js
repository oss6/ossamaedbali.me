import sanityClient from '../client';

const postsService = {
  getPosts(options) {
    const opts = options || {};

    return sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) ${opts.limit ? `[0...${opts.limit}]` : ''} {
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
    `);
  }
}

export default postsService;
