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
