import { Injectable } from "@angular/core";
import { Navigate } from "@ngxs/router-plugin";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { RegistrationResponseModel } from "src/app/models/registration-response.model";
import { User } from "src/app/models/user.model";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { UserService } from "src/app/service/user.service";
import { UserActions } from "./user.actions";

export interface UserSateModel {
    user: User,
    logged: boolean;
    registerLoading: boolean;
    registrationResponseModel: RegistrationResponseModel;
}

@State<UserSateModel>({
    name: 'user',
    defaults: {
        user: null,
        logged: false,
        registerLoading: false,
        registrationResponseModel: null
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

    @Selector()
    static registrationResponseModel(state: UserSateModel) {
        return state.registrationResponseModel;
    }

    @Selector()
    static registerLoading(state: UserSateModel) {
        return state.registerLoading;
    }

    @Action(UserActions.RegistrationRequest)
    registrationRequest(state: StateContext<UserSateModel>, action: UserActions.RegistrationRequest) {
        state.patchState({
            registerLoading: true
        });
        return this.userService.registration(action.request).pipe(
            mergeMap(response => {
                state.patchState({
                    registerLoading: false
                });
                const registrationResponse = new RegistrationResponseModel({ ...response });
                registrationResponse.created = true;
                return this.store.dispatch(new UserActions.SetCreated(registrationResponse))
            }),
            catchError(() => this.store.dispatch(new UserActions.UserFailed()))
        )
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

    @Action(UserActions.SetCreated)
    setCreated(
        state: StateContext<UserSateModel>,
        action: UserActions.SetCreated
    ) {
        state.patchState({
            registrationResponseModel: action.registrationResponseModel
        })
    }

    @Action(UserActions.UserFailed)
    userFailed(
        state: StateContext<UserSateModel>,
        action: UserActions.UserFailed
    ) {
        state.patchState({
            registerLoading: false
        })
    }

}