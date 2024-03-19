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

const getThumbnailUrl = (imageUrl) => {
    return getQiniuImageUrlWithParams(
        imageUrl,
        // Math.round(window.innerWidth * 0.7),
        // Math.round(window.innerHeight * 0.7),
        768,
        768,
        85,
    );
};

const getMediumImageUrl = (imageUrl) => {
    return getQiniuImageUrlWithParams(
        imageUrl,
        // Math.round(window.innerWidth * 1.5),
        // Math.round(window.innerHeight * 1.5),
        1536,
        1536,
        100,
    );
};

export default {
    getQiniuImageUrlWithParams,
    getThumbnailUrl,
    getMediumImageUrl,
};
