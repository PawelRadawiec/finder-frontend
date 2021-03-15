import { Injectable } from "@angular/core";
import { Navigate } from "@ngxs/router-plugin";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { mergeMap } from "rxjs/operators";
import { User } from "src/app/models/user.model";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { UserService } from "src/app/service/user.service";
import { UserActions } from "./user.actions";

export interface UserSateModel {
    user: User,
    logged: boolean;
}

@State<UserSateModel>({
    name: 'user',
    defaults: {
        user: null,
        logged: false
    }
})
@Injectable()
export class UserState {

    constructor(
        private store: Store,
        private userService: UserService,
        private tokenStorage: TokenStorageService
    ) {

    }

    @Selector()
    static logged(state: UserSateModel) {
        return state.logged;
    }

    @Action(UserActions.RegistrationRequest)
    registrationRequest(state: StateContext<UserSateModel>, action: UserActions.RegistrationRequest) {
        return this.userService.registration(action.request).pipe(
            mergeMap(response => this.store.dispatch(new UserActions.RegistrationResponse(response)))
        )
    }

    @Action(UserActions.RegistrationResponse)
    registrationResponse(state: StateContext<UserSateModel>, action: UserActions.RegistrationResponse) {
        console.log('response: ', action.response);
    }

    @Action(UserActions.LoginRequest)
    loginRequest(state: StateContext<UserSateModel>, action: UserActions.LoginRequest) {
        return this.userService.login(action.request).pipe(
            mergeMap(response => this.store.dispatch(new UserActions.LoginResponse(response)))
        )
    }

    @Action(UserActions.LoginResponse)
    loginResponse(state: StateContext<UserSateModel>, action: UserActions.LoginResponse) {
        const response = action.response;
        this.tokenStorage.saveToken(response.jwt);
        const user = new User();
        user.id = response.userId;
        user.email = response.email;
        user.username = response.username;
        this.tokenStorage.saveUser(user);
        state.patchState({
            user,
            logged: true
        });
        this.store.dispatch(new Navigate(['articles']));
    }

    @Action(UserActions.SetLogged)
    setLogged(state: StateContext<UserSateModel>, action: UserActions.SetLogged) {
        state.patchState({
            logged: action.logged
        })
    }


}