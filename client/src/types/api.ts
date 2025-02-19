export type TPostResponse = {
  httpStatus: number;
  message: string;
  data: object;
};

export interface IStream {
  streamId: number;
  streamingUrl: string;
  isStreaming: boolean;
}
