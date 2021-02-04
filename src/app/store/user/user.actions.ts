import { User } from "src/app/models/user.model";

export namespace UserActoins {

    export class RegistrationRequest {
        static readonly type = '[User] RegistrationRequest';

        constructor(public request: User) { }
    }

    export class RegistrationResponse {
        static readonly type = '[User] RegistrationResponse';

        constructor(public response: any) { }
    }


}