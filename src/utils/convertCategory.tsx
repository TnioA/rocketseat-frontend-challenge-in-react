export function convertCategory(category: string) {
    if(category.length < 1)
        return category;

    return category[0].toUpperCase() + category.substring(1);
}