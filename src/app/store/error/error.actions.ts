import { ExceptionResponse } from "src/app/models/exception-response.model";

export namespace ErrorActions {


    export class SetErrors {
        static readonly type = '[Error] SetErrors';

        constructor(public errors: ExceptionResponse) { }

    }


}