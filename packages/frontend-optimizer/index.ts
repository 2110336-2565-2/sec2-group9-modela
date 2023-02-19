/* eslint-disable @typescript-eslint/no-empty-function */
// Modified from https://github.com/nestjs/swagger/blob/master/lib/extra/swagger-shim.ts
interface Type<T = any> extends Function {
  new (...args: any[]): T
}

export function ApiProperty() {
  return () => {}
}
export function ApiPropertyOptional() {
  return () => {}
}
export function ApiResponseProperty() {
  return () => {}
}
export function ApiBasicAuth() {
  return () => {}
}
export function ApiBearerAuth() {
  return () => {}
}
export function ApiBody() {
  return () => {}
}
export function ApiConsumes() {
  return () => {}
}
export function ApiCookieAuth() {
  return () => {}
}
export function ApiExcludeEndpoint() {
  return () => {}
}
export function ApiExcludeController() {
  return () => {}
}
export function ApiExtraModels() {
  return () => {}
}
export function ApiHeader() {
  return () => {}
}
export function ApiHeaders() {
  return () => {}
}
export function ApiHideProperty() {
  return () => {}
}
export function ApiOAuth2() {
  return () => {}
}
export function ApiOperation() {
  return () => {}
}
export function ApiParam() {
  return () => {}
}
export function ApiProduces() {
  return () => {}
}
export function ApiQuery() {
  return () => {}
}
export function ApiResponse() {
  return () => {}
}
export function ApiOkResponse() {
  return () => {}
}
export function ApiCreatedResponse() {
  return () => {}
}
export function ApiAcceptedResponse() {
  return () => {}
}
export function ApiNoContentResponse() {
  return () => {}
}
export function ApiMovedPermanentlyResponse() {
  return () => {}
}
export function ApiFoundResponse() {
  return () => {}
}
export function ApiBadRequestResponse() {
  return () => {}
}
export function ApiUnauthorizedResponse() {
  return () => {}
}
export function ApiTooManyRequestsResponse() {
  return () => {}
}
export function ApiNotFoundResponse() {
  return () => {}
}
export function ApiInternalServerErrorResponse() {
  return () => {}
}
export function ApiBadGatewayResponse() {
  return () => {}
}
export function ApiConflictResponse() {
  return () => {}
}
export function ApiForbiddenResponse() {
  return () => {}
}
export function ApiGatewayTimeoutResponse() {
  return () => {}
}
export function ApiGoneResponse() {
  return () => {}
}
export function ApiMethodNotAllowedResponse() {
  return () => {}
}
export function ApiNotAcceptableResponse() {
  return () => {}
}
export function ApiNotImplementedResponse() {
  return () => {}
}
export function ApiPreconditionFailedResponse() {
  return () => {}
}
export function ApiPayloadTooLargeResponse() {
  return () => {}
}
export function ApiRequestTimeoutResponse() {
  return () => {}
}
export function ApiServiceUnavailableResponse() {
  return () => {}
}
export function ApiUnprocessableEntityResponse() {
  return () => {}
}
export function ApiUnsupportedMediaTypeResponse() {
  return () => {}
}
export function ApiDefaultResponse() {
  return () => {}
}
export function ApiSecurity() {
  return () => {}
}
export function ApiTags() {
  return () => {}
}
export function ApiExtension() {
  return () => {}
}
export function DocumentBuilder() {
  return () => {}
}
export function SwaggerModule() {
  return () => {}
}
export function IntersectionType() {
  return () => {}
}
export function OmitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): Type<Omit<T, (typeof keys)[number]>> {
  return classRef as Type<Omit<T, (typeof keys)[number]>>
}
export function PartialType<T>(classRef: Type<T>): Type<Partial<T>> {
  return classRef as Type<Partial<T>>
}
export function PickType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): Type<Pick<T, (typeof keys)[number]>> {
  return classRef as Type<Pick<T, (typeof keys)[number]>>
}
export function refs(...props: any[]) {
  return props
}

export const faker = {}
