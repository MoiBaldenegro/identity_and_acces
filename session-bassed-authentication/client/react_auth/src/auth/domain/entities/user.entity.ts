// src/domain/entities/user.entity.ts

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserEntity {
  getFullName: () => string;
  getUserId: () => string;
  getUserEmail: () => string;
  toPrimitives: () => User;
}

export function createUser(id: string, email: string, firstName?: string, lastName?: string): UserEntity {

    const user: User = {
        id,
        email,
        firstName,
        lastName
    };

    const getFullName = () => {
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        return user.email;
    };

    const getUserId = () => user.id;
    const getUserEmail = () => user.email;

    const toPrimitives = () => user;

    return {
        getFullName,
        getUserId,
        getUserEmail,
        toPrimitives
    };
}