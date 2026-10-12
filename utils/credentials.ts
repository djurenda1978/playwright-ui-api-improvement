import { getDataFromSecret } from '@/config/secretsLoader';

export type UserType =
    | 'STANDARD'
    | 'LOCKED_OUT'
    | 'PROBLEM'
    | 'PERFORMANCE_GLITCH'
    | 'ERROR'
    | 'VISUAL';

export function getCredentials(userType: UserType): { username: string; password: string } {
    return {
        username: getDataFromSecret(`SAUCE_${userType}_USERNAME`),
        password: getDataFromSecret('SAUCE_PASSWORD'),
    };
}