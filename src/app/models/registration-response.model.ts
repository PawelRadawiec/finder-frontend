export class RegistrationResponseModel {
    created: boolean;
    userId: string;
    message: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }

}