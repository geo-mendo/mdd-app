import { Observable } from "rxjs";
import { AuthSuccess } from "src/app/infrastructure/dtos/auth/authSuccess.interface";
import { ISigninRequest } from "src/app/infrastructure/dtos/auth/ISigninRequest.interface";
import { ISignupRequest } from "src/app/infrastructure/dtos/auth/ISignupRequest.interface";

export interface IAuthRepository {
    signin: (signRequest: ISigninRequest) => Observable<AuthSuccess>
    signup: (signupRequest: ISignupRequest) => Observable<AuthSuccess>
    setToken: (authToken: string) => void
    getToken: () => string | null
    removeToken: () => void
}