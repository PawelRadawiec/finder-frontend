import { LoginRequestModel } from "src/app/models/login-request.model";
import { LoginResponseModel } from "src/app/models/login-response.model";
import { MessageResponse } from "src/app/models/message-response.model";
import { RegistrationResponseModel } from "src/app/models/registration-response.model";
import { User } from "src/app/models/user.model";

export namespace UserActions {

    export class RegistrationRequest {
        static readonly type = '[User] RegistrationRequest';

        constructor(public request: User) { }
    }

    export class LoginRequest {
        static readonly type = '[User] LoginRequest';

        constructor(public request: LoginRequestModel) { }

    }

    export class LoginResponse {
        static readonly type = '[User] LoginResponse';

        constructor(public response: LoginResponseModel) { }

    }

    export class SetLogged {
        static readonly type = '[User] SetLogged';

        constructor(public logged: boolean) {

        }
    }

    export class SetCreated {
        static readonly type = '[User] SetCreated';

        constructor(public registrationResponseModel: RegistrationResponseModel) {
        }
    }

    export class UserFailed {
        static readonly type = '[User] UserFailed';

        constructor() {
        }

    }

    export class ActivateRequest {
        static readonly type = '[User] ActivateRequest';

        constructor(public id: string) {

        }

    }

    export class ActivateResponse {
        static readonly type = '[User] ActivateResponse';

        constructor(public response: MessageResponse) {

        }

    }


}