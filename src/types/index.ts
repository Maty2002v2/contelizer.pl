export type UserApi = {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: 'active' | 'inactive';
}

export type User = UserApi

export type Pagination = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
  currentPackageIndex: number
};

export type PaginationConfig = {
    totalItems: number,
    currentPage?: number,
    pageSize?: number,
    maxPages?: number
}
