import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SettingActions } from "./settings.actions";

export interface SettingsStateModel {
    xsDevice: boolean;
}

@State({
    name: 'settings',
    defaults: {
        xsDevice: false
    }
})
@Injectable()
export class SettingsState {

    constructor() { }

    @Selector()
    static xsDevice(model: SettingsStateModel) {
        return model.xsDevice;
    }


    @Action(SettingActions.SetXsDevice)
    setXsDevice(state: StateContext<SettingsStateModel>, action: SettingActions.SetXsDevice) {
        state.patchState({
            xsDevice: action.xsDevice
        });
    }

}
