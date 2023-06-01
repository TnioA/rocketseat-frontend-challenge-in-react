export function getPageCount(totalCount: number, limitForPage: number) {
    var pages = Math.trunc(totalCount / limitForPage);
    pages = totalCount % limitForPage > 0 ? pages + 1 : pages;
    pages = pages < 0 ? 0 : pages;

    return pages;
}