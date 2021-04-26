import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../service/user.service";
import { ArticleState } from "../store/article.state";
import { UserActions } from "../store/user/user.actions";

@Injectable()
export class ActivateResolver implements Resolve<any>{

    constructor(
        private store: Store,
        private userService: UserService
        ) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.paramMap.get('id');
        return this.store.dispatch(new UserActions.ActivateRequest(id)).pipe(
            map(() => this.store.selectSnapshot(ArticleState))
        );
    }

}