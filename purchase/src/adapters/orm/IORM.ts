export interface IORM<T> {
  connect(): Promise<T>;
  disconnect(): Promise<void>;
}
