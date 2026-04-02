// src/domain/entities/user.entity.ts

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserEntity {
  getFullName: () => string;
}

export function createUser(id: string, email: string, firstName?: string, lastName?: string): UserEntity {

    const user: User = {
        id,
        email,
        firstName,
        lastName
    };

    function getFullName(): string {
        return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;
    }   

    return {
        getFullName
    };
}