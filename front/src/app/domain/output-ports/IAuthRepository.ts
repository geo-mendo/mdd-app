import { Observable } from "rxjs";
import { AuthSuccess } from "src/app/infra/data/dtos/authSuccess.interface";
import { LoginRequest } from "src/app/infra/data/dtos/loginRequest.interface";
import { RegisterRequest } from "src/app/infra/data/dtos/registerRequest.interface";

export interface IAuthRepository {
    login: (loginRequest: LoginRequest) => Observable<AuthSuccess>
    signup: (signupRequest: RegisterRequest) => Observable<AuthSuccess>
    setToken: (authToken: string) => void
    getToken: () => string
}