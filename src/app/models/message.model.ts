export class Message {
    id: string;
    from: string;
    message: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }

}

// private String to;
//     private String from;
//     private String message;