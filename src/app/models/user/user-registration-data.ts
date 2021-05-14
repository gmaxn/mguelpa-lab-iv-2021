import { ProfileInformation } from "../profile/profile-information";
import { UserCredentials } from "./user-credentials";

export interface UserRegistrationData<T> {
    credentials: UserCredentials;
    profile: ProfileInformation<T>;
}