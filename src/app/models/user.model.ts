export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}