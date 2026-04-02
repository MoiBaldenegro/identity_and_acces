// Caso de uso: registro

import type { AuthPort, RegisterData } from "../../domain/ports/auth.port";

export function registerUseCase(port: AuthPort) {
    const exec = async (data: RegisterData): Promise<{ userId: string }> => {
        return await port.register(data);
    }
    return {
        exec
    }
}