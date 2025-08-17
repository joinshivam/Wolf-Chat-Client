export function slugify(text) {
    return typeof text !== "string" ? text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-') : text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');
}
