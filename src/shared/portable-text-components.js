import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source)
}

export const portableTextComponents = {
  block: {
    pre: ({ children }) => <pre>{children}</pre>
  },
  types: {
    image: ({ value }) => {
      return (
        <img src={urlFor(value)} alt={value.caption} title={value.caption} style={{width: '100%'}} />
      );
    },
    iframe: ({ value }) => {
      return (
        <iframe title={value.title} style={{width: '100%'}} height={value.height} src={value.url} frameBorder="0" scrolling="no" allowFullScreen></iframe>
      );
    },
    code: ({ value }) => {
      return (
        <SyntaxHighlighter useInlineStyles={true} language={value.language} style={docco}>
          {value.code}
        </SyntaxHighlighter>
      )
    }
  },
  marks: {
    internalLinkSource: ({ children, value }) => {
      return (
        <a href={'#' + value.iref}>{children}</a>
      );
    },
    internalLinkTarget: ({ children, value }) => {
      return (
        <>
        <span id={value.irefTarget}></span>
        {children}
        </>
      )
    }
  }
};
