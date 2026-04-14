import { getCurrentUserUseCase } from "../../application/use-cases/get-current-user.use-case";
import { loginUseCase } from "../../application/use-cases/login.use-case";
import { logoutUseCase } from "../../application/use-cases/logout.use-case";
import { registerUseCase } from "../../application/use-cases/register.use-case";
import { authApiAdapter } from "../adapters/auth/auth.api.adapter";
import { fetchHttpAdapter } from "../adapters/http/fetch-http.adapter";

export interface AuthServiceContainer {
    register: ReturnType<typeof registerUseCase>;
    login: ReturnType<typeof loginUseCase>;
    logout: ReturnType<typeof logoutUseCase>;
    getCurrentUser: ReturnType<typeof getCurrentUserUseCase>;
    logoutAll: ReturnType<typeof logoutUseCase>; // Assuming logoutUseCase can handle logging out from all sessions
}

const fetchHttpClient = fetchHttpAdapter();
const authPort = authApiAdapter(fetchHttpClient);

const container = {
        register: registerUseCase(authPort),
        login: loginUseCase(authPort),
        logout: logoutUseCase(authPort),
        getCurrentUser: getCurrentUserUseCase(authPort),
        logoutAll: logoutUseCase(authPort) // Assuming the same use case can handle both single and all session logouts
    };


export const authServiceContainer: AuthServiceContainer = container;

