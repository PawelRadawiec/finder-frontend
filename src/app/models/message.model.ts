export class Message {
    id: string;
    from: string;
    message: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }

}
