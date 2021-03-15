import { LoginRequestModel } from "src/app/models/login-request.model";
import { LoginResponseModel } from "src/app/models/login-response.model";
import { User } from "src/app/models/user.model";

export namespace UserActions {

    export class RegistrationRequest {
        static readonly type = '[User] RegistrationRequest';

        constructor(public request: User) { }
    }

    export class RegistrationResponse {
        static readonly type = '[User] RegistrationResponse';

        constructor(public response: any) { }
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


}