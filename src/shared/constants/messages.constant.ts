enum responseMessages {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  ERROR = "ERROR",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  CONFLICT = "CONFLICT",
  SERVER_ERROR = "SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  BAD_GATEWAY = "BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
  UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  INVALID_USER_ID = "INVALID_USER_ID",
  INVALID_ROLE = "INVALID_ROLE",
  FILE_IS_REQUIRED = "FILE_IS_REQUIRED",
  FILE_SIZE_TOO_LARGE = "FILE_SIZE_TOO_LARGE",
  INVALID_FILE_FORMAT = "INVALID_FILE_FORMAT",
  FILE_NOT_EXIST = "FILE_NOT_EXIST",
  POST_NOT_EXIST = "POST_NOT_EXIST",
  CATEGORY_EXIST = "CATEGORY_EXIST",
  INVALID_ID = "INVALID_ID",
  TAGS_INVALID = "TAGS_INVALID",
  CATEGORIES_NOT_EXIST = "CATEGORIES_NOT_EXIST",
  REPLY_COMMENT_NOT_FOUND = "REPLY_COMMENT_NOT_FOUND",
  ERROR_FETCHING_USERS =    "ERROR_FETCHING_USERS",
  PAGE_NOT_FOUND = "PAGE_NOT_FOUND",
  PROJECT_NOT_FOUND= "PROJECT_NOT_FOUND",
  DIRECTORY_ERROR = "DIRECTORY_ERROR",
  UPLOAD_FAILED = "UPLOAD_FAILED",
}

export function getResponseMessage(message: keyof typeof responseMessages) {
  return responseMessages[message];
}
