export namespace SettingActions {

    export class SetXsDevice {
        static readonly type = '[Settings] SetXsDevice';

        constructor(public xsDevice: boolean) { }
    }

}