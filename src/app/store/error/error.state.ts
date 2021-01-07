import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ExceptionResponse } from "src/app/models/exception-response.model";
import { ErrorActions } from "./error.actions";

export interface ErrorStateModel {
    errors: Map<string, string>;
    errorResponse: ExceptionResponse;
}

@State({
    name: 'errors',
    defaults: {
        errors: null,
        errorResponse: null
    }
})
@Injectable()
export class ErrorState {

    constructor() { }

    @Action(ErrorActions.SetErrors)
    setErrors(state: StateContext<ErrorStateModel>, action: ErrorActions.SetErrors) {
        const errors = new Map<string, string>();
        if (action.errors) {
            for (let [key, value] of Object.entries(action.errors?.errorMap)) {
                errors.set(key, value);
            }
        }
        state.patchState({
            errors,
            errorResponse: action.errors
        });

    }

}