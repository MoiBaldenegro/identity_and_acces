import type { AuthPort } from "../../domain/ports/auth.port";

export const getUsersSessions = (authPort: AuthPort) => {
    const exec = async () => {
        const response = await authPort.getUserSessions();
        return response;
    }
    return { exec };
}