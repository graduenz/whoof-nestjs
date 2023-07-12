export class PaginatedList<T> {
  public totalPages: number;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;

  constructor(
    public items: T[],
    public totalCount: number,
    public pageIndex: number,
    public pageSize: number,
  ) {
    this.totalPages = Math.ceil(totalCount / pageSize);
    this.hasPreviousPage = pageIndex > 1;
    this.hasNextPage = pageIndex < this.totalPages;
  }
}
