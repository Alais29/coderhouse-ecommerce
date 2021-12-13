export enum EErrorCodes {
  UnauthorizedRoute = 1,
  UnknownEndpoint,
  NotImplemented,
  ProductValidation,
  ProductNotFound,
  ProductRepeated,
  CartEmpty,
  UserSignUpValidation,
  UserDoesNotExists,
  UserAlreadyExists,
  UserNotLoggedIn,
  OrderCreateError,
  FileValidation,
}

export enum ModelType {
  memory,
  fs,
  mySql,
  sqlite,
  localMongo,
  mongoAtlas,
  firebase,
}
