export const ImageUrl = (image) => {
    let {PUBLIC_URL} = process.env
    return `${PUBLIC_URL}/images/${image}`
}