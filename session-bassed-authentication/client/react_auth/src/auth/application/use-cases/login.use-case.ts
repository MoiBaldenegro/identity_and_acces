// Caso de uso: login
import type { UserEntity } from "../../domain/entities/user.entity";
import type { AuthPort, LoginData } from "../../domain/ports/auth.port";



export function loginUseCase(port: AuthPort) {
    const exec = async (data: LoginData): Promise<UserEntity> => {
        return await port.login(data);
    }
    return {
        exec
    }
}