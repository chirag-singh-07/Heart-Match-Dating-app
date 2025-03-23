export const sendResponse = (
  res,
  success,
  statusCode,
  message,
  data = null
) => {
  res.status(statusCode).json({ success, message, data });
};
