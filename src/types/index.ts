export type UserApi = {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: 'active' | 'inactive';
}

export type User = Omit<UserApi, 'id'>
