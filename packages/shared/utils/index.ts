export type Id = string;
export type PageSizeRequest = {
    page: number,
    size: number
};
export type PageSizeResponse<T> = {
    data: T[],
    total: number
};

export const getTemplateFileName = (templateTitle: string) => {
    return templateTitle?.toLowerCase().replaceAll(" ", "-") || "" + new Date().toLocaleDateString();
}