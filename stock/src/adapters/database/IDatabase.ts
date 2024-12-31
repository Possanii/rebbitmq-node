export interface IDatabase<T> {
  connect(): Promise<T>;
  disconnect(): Promise<void>;
}
