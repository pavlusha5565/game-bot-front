export interface IPaginateResponse {
  page: number;
  pageCount: number;
  itemCount: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  limit: number;
}

export interface IPaginateRequest {
  page: number;
  limit: number;
}

export const paginateResponseDefault = {
  page: 1,
  pageCount: 0,
  itemCount: 0,
  hasPrevPage: false,
  hasNextPage: false,
  limit: 20,
};

export type Paginate<T> = { paginate: IPaginateResponse; data: T };
