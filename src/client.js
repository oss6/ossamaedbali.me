import { createClient } from '@sanity/client';

export default createClient({
  projectId: 'stxb7yu3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-03-08'
});
