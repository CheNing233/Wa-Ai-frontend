const copyToClipboard = (text) =>
    navigator.clipboard.writeText(text)

export default {
    copyToClipboard,
}