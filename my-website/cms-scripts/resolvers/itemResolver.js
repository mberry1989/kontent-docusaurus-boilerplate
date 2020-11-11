const resolveItemInRichText = (item) => {
    switch (item.system.type) {
        case 'callout':
            return `:::${item.type.value[0].name} ${item.title.value} ${item.body.value}:::`

        case 'youtube_video':     
            return `<a href="http://www.youtube.com/watch?v=${item.video_id.value}"><img src="http://img.youtube.com/vi/${item.video_id.value}/0.jpg" alt="${item.video_title.value}"/></a>`
        
        default:
            return `> Content not available.`
    }
}

exports.resolveItemInRichText = resolveItemInRichText;
