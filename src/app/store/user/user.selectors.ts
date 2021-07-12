import { Selector } from "@ngxs/store";
import { UserSateModel } from "./user-state.model";
import {UserState } from "./user.state";

export class UserSelectors {

    @Selector([UserState])
    static activateMessage(state: UserSateModel) {
        return state.activateMessage;
    }

    @Selector([UserState])
    static logged(state: UserSateModel) {
        return state.logged;
    }

    @Selector([UserState])
    static registrationResponseModel(state: UserSateModel) {
        return state.registrationResponseModel;
    }

    @Selector([UserState])
    static registerLoading(state: UserSateModel) {
        return state.registerLoading;
    }

}