import type { AuthPort } from "../../domain/ports/auth.port";

export const logoutSingleDeviceUseCase = (authPort: AuthPort) => {
  return {
    exec: async (sessionId: string): Promise<void> => {
      await authPort.logoutSingleDevice(sessionId);
    }
  };
};
