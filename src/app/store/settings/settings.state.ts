import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SettingsStateModel } from "./settings-state.model";
import { SettingActions } from "./settings.actions";

@State({
    name: 'settings',
    defaults: {
        xsDevice: false
    }
})
@Injectable()
export class SettingsState {

    constructor() { }

    @Action(SettingActions.SetXsDevice)
    setXsDevice(state: StateContext<SettingsStateModel>, action: SettingActions.SetXsDevice) {
        state.patchState({
            xsDevice: action.xsDevice
        });
    }

}
