import { UserClaims } from "../user/user-claims";

export interface ProfileInformation<T> {
    claims: UserClaims;
    data: T
}