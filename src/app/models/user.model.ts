export class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}