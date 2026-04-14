// Caso de uso: login
import type { User } from "../../domain/entities/user.entity";
import type { AuthPort, LoginData } from "../../domain/ports/auth.port";



export function loginUseCase(port: AuthPort) {
    const exec = async (data: LoginData): Promise<User> => {
        const userEntity = await port.login(data);
        return userEntity.toPrimitives();
    }
    return {
        exec
    }
}