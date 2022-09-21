export interface IBlog {
    _id?: string;
    name: string;
    random?: number;
    description: string;
}

export interface IBlogPagination {
    data: IBlog[];
    isLast: boolean;
    page: number;
    totalPage: number;
}