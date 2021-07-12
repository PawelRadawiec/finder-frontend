import { MessageResponse } from "src/app/models/message-response.model";
import { RegistrationResponseModel } from "src/app/models/registration-response.model";
import { User } from "src/app/models/user.model";

export interface UserSateModel {
    activateMessage: MessageResponse;
    user: User,
    logged: boolean;
    registerLoading: boolean;
    registrationResponseModel: RegistrationResponseModel;
}