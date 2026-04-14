// Caso de uso: obtener usuario actual
import type { User} from "../../domain/entities/user.entity";
import type { AuthPort } from "../../domain/ports/auth.port";

export function getCurrentUserUseCase(port: AuthPort) {
    const exec = async (): Promise<User | null> => {
        const response = await port.getCurrentUser();
        return response?.toPrimitives() || null;
    }
    return {
        exec
    }
}