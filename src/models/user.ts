export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export class User {
    id: string;
    name: string;
    password: string;
    email: string;
    isVerified: boolean;
    googleId: string;
    createAt: number;
    updateAt: number;
    status: UserStatus;
    role: UserRole;

    constructor() {
        this.id = '';
        this.name = '';
        this.password = '';
        this.email = '';
        this.isVerified = true;
        this.googleId = '';
        this.createAt = 0;
        this.updateAt = 0;
        this.status = UserStatus.ACTIVE;
        this.role = UserRole.USER;
    }
}
