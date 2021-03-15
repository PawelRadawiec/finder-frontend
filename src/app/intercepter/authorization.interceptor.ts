import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { TokenStorageService } from "../service/token-storage.service";
import { UserActions } from "../store/user/user.actions";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    constructor(
        private store: Store,
        private token: TokenStorageService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        const tokenNotNull = (token != null)
        if (tokenNotNull) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        this.store.dispatch(new UserActions.SetLogged(tokenNotNull))
        return next.handle(authReq);
    }

}


export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
];