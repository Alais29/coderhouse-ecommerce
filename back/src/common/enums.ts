export enum EErrorCodes {
  UnauthorizedRoute = 1,
  UnknownEndpoint,
  ProductValidation,
  ProductNotFound,
  ProductRepeated,
  CartEmpty,
  UserSignUpValidation,
  UserAlreadyExists,
  UserNotLoggedIn,
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
