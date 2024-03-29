// First, we must import the schema creator
// import { createSchema } from 'sanity'

// Then import schema types from any plugins that might expose them
// import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import note from './note'
import topic from './topic'

// Then we give our schema to the builder and provide the result to Sanity
export default {
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: [ //schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,
    note,
    topic,
    blockContent,
  ],
}
