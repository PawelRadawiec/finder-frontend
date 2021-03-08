import { HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { of, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { ErrorActions } from "../store/error/error.actions";


@Injectable()
export class ErrorInterceptor {
    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            mergeMap(response => this.handleResponse(response)),
            catchError((error) => this.handleErrors(error))
        );
    }

    private handleResponse(response) {
        if (response?.status === 200) {
            this.store.dispatch(new ErrorActions.SetErrors({
                status: '200',
                message: undefined,
                errorMap: new Map<string, string>(),
            }))
        }
        return of(response);
    }

    private handleErrors(error) {
        if (error?.status === 400) {
            this.store.dispatch(new ErrorActions.SetErrors(error?.error))
        }
        return throwError(error);
    }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
