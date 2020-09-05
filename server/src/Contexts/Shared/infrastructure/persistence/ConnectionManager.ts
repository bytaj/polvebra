export interface ConnectionManager {
  connect(): Promise<any>;
  close(): Promise<void>;
}
