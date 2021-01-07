import { HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorActions } from "../store/error/error.actions";


@Injectable()
export class ErrorInterceptor {
    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error) => this.handleResponse(error))
        );
    }

    private handleResponse(error) {
        if (error?.status === 400) {
            this.store.dispatch(new ErrorActions.SetErrors(error?.error))
        }
        return throwError(error);
    }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
