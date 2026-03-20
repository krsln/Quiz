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


export interface FlashCard {
  id: string;
  front: string;
  back: string;
  isFavorite?: boolean;
  tags?: string[];
}

export interface DeckState {
  index: number;
  isFlipped: boolean;
  isPlaying: boolean;
  progress: number; // 0-100
}
