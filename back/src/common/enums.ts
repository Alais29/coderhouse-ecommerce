export enum EErrorCodes {
  UnauthorizedRoute = 1,
  UnknownEndpoint,
  ProductValidation,
  ProductNotFound,
  ProductRepeated,
}

export enum ModelType {
  fs = 1,
  mySql,
  sqlite,
  localMongo,
  mongoAtlas,
  firebase
}
