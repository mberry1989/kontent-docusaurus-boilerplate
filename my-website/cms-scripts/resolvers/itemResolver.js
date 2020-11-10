const resolveItemInRichText = (item) => {
    if (item.system.type === 'callout'){
        return `:::${item.type.value[0].name} ${item.title.value} ${item.body.value}:::`
    }
    if (item.system.type === 'youtube_video') {     
        return `<a href="http://www.youtube.com/watch?v=${item.video_id.value}"><img src="http://img.youtube.com/vi/${item.video_id.value}/0.jpg" alt="${item.video_title.value}"/></a>`
    }
    return `> Content not available.`
}

exports.resolveItemInRichText = resolveItemInRichText;
