import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";


export class SystemStateMatcher implements ErrorStateMatcher {

    private field: string;
    private errors: Map<string, string> = new Map<string, string>();

    isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        return this.hasError;
    }

    get hasError() {
        return this.errors?.has(this.field);
    }

    get message() {
        return this.hasError ? this.errors?.get(this.field) : null;
    }

    setField(field: string) {
        this.field = field;
    }

    setErrors(errors: Map<string, string>) {
        this.errors = errors;
    }

}