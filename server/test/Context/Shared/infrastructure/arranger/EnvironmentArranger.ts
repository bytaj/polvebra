export abstract class EnvironmentArranger {
  public abstract setUp(): Promise<void>;

  public abstract arrange(): Promise<void>;

  public abstract close(): Promise<void>;
}
