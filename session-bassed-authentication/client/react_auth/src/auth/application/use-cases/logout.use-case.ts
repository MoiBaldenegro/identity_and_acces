// Caso de uso: logout

import type { AuthPort } from "../../domain/ports/auth.port";

export function logoutUseCase(port: AuthPort) {
    const exec = async (): Promise<void> => {
        return await port.logout();
    }
    return {
        exec
    }
}