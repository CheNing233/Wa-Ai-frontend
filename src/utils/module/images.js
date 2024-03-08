const getQiniuImageUrlWithParams = (
    imageUrl,
    width = null,
    height = null,
    quality = 75,
    format = 'webp'
) => {
    const baseParam = 'imageMogr2/auto-orient'

    let size = ''
    if (width && height) {
        size = `/thumbnail/${width}x${height}>`
    }

    let formatParam = ''
    if (format !== null) {
        formatParam = `/format/${format}`
    }

    let qualityParam = ''
    if (quality !== null) {
        qualityParam = `/quality/${quality}`
    }

    return `${imageUrl}?${baseParam}${size}${formatParam}/blur/1x0${qualityParam}`
};


export default {
    getQiniuImageUrlWithParams
};
