require('dotenv').config()

const resolveLinkInRichText = (link, context) => {
    if (link.type === process.env.DOC_CONTENT_TYPE){
      return { url: `${link.urlSlug}`};
    }
    return { url: 'unsupported-link'};
  }

  exports.resolveLinkInRichText = resolveLinkInRichText;