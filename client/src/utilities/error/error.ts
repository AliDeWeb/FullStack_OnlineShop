export const ExtractErrorMessage = (err: {
  statusCode: number;
  message: string | string[];
  error?: string;
}) => {
  const ErrMessage =
    typeof err.message === "string" ? err.message : err.message[0];

  return { ErrMessage, statusCode: err.statusCode };
};
