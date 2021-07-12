import { Selector } from "@ngxs/store";
import { ErrorStateModel } from "./error-state.model";
import { ErrorState } from "./error.state";

export class ErrorSelectors {

    @Selector([ErrorState])
    static errors(state: ErrorStateModel) {
        return state.errors;
    }


}