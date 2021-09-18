export enum EErrorCodes {
  UnauthorizedRoute = 1,
  UnknownEndpoint,
  ProductValidation,
  ProductNotFound,
  ProductRepeated,
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
