import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { mergeMap } from "rxjs/operators";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/service/user.service";
import { UserActoins } from "./user.actions";

export interface UserSateModel {
    user: User
}


@State<UserSateModel>({
    name: 'user',
    defaults: {
        user: null
    }
})
@Injectable()
export class UserState {

    constructor(
        private store: Store,
        private userService: UserService
    ) {

    }

    @Action(UserActoins.RegistrationRequest)
    registrationRequest(state: StateContext<UserSateModel>, action: UserActoins.RegistrationRequest) {
        return this.userService.registration(action.request).pipe(
            mergeMap(response => this.store.dispatch(new UserActoins.RegistrationResponse(response)))
        )
    }

    @Action(UserActoins.RegistrationResponse)
    registrationResponse(state: StateContext<UserSateModel>, action: UserActoins.RegistrationResponse) {
        console.log('response: ', action.response);
    }


}