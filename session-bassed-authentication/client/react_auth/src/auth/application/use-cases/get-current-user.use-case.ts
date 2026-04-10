// Caso de uso: obtener usuario actual
import type { UserEntity } from "../../domain/entities/user.entity";
import type { AuthPort } from "../../domain/ports/auth.port";

export function getCurrentUserUseCase(port: AuthPort) {
    const exec = async (): Promise<UserEntity | null> => {
        const response = await port.getCurrentUser();
        alert(`Ejecutando getCurrentUserUseCase con port:${response?.getFullName()}`);
        console.log('getCurrentUser response:', response);
        return response;
    }
    return {
        exec
    }
}