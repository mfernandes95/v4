export class ImportHistoryEntity {
  constructor(
    public date: Date,
    public fileName: string,
    public success: boolean,
    public errorMessage?: string
  ) {}
}
