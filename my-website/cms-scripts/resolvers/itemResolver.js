const resolveItemInRichText = (item) => {
    if (item.system.type === 'tab_container'){

        return `> inline content item`
    }
    return `> Content not available.`
}

exports.resolveItemInRichText = resolveItemInRichText;
