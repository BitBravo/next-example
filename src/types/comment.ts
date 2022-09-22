export interface IComment {
    _id?: string;
    blogId: string;
    title: string;
    description: string;
    user?: string;
}

export interface ICommentPagination {
    data: IComment[];
    isLast: boolean;
    page: number;
    totalPage: number;
}