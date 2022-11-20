type ErrorResponse = {
  statusCode: number;
  isError: true;
  message: string;
};
type Response<T> = T | ErrorResponse;

export default Response;
