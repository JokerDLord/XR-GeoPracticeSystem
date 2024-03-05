export function getImageUrl(name) {
    console.log(name)
    return new URL(`${name}`, import.meta.url).href
}