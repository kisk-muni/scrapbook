type ErrorResponse = {
  statusCode: number;
  message: string;
};
type Response<T> = T | ErrorResponse;

export default Response;
