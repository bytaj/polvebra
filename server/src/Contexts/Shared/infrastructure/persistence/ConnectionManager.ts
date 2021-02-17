export interface ConnectionManager {
  connect(): Promise<any>;
  connection(): Promise<any>;
  close(): Promise<void>;
}
