import { Selector } from "@ngxs/store";
import { SettingsStateModel } from "./settings-state.model";
import { SettingsState } from "./settings.state";

export class SettngSelectors {

    @Selector([SettingsState])
    static xsDevice(model: SettingsStateModel) {
        return model.xsDevice;
    }


}