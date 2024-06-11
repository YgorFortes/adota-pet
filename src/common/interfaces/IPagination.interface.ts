export interface IPagination<T> {
  items: Array<T>;
  meta: { totalCount: number; counterPage: number };
}
