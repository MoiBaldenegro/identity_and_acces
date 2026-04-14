import type { AuthPort } from "../../domain/ports/auth.port";

export function logoutAllDevicesUseCase(port: AuthPort) {
    const exec = async (): Promise<void> => {
        await port.logoutAll();
    }
    return { exec };
}