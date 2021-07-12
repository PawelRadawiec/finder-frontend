import { ExceptionResponse } from "src/app/models/exception-response.model";

export interface ErrorStateModel {
    errors: Map<string, string>;
    errorResponse: ExceptionResponse;
}