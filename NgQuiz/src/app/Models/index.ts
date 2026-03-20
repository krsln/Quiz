export interface QuizItem {
  Id: number;

  Term: string;
  Definition: string;
}

export interface IResponse<T> {
  Data: T;
  State: ResponseState | null;
}

export interface ResponseState {
  Success: boolean;
  Duration: string;
  Error: ErrorType;
  State: string;
}

export interface ErrorType {
  Code: string;
  Message: string;
}
