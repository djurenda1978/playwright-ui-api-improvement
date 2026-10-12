import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { headers } from '@/api/headers';

export class UserConnector {
    private readonly path = 'users';

    constructor(private readonly request: APIRequestContext) {}

    async getUsers(page = 1): Promise<APIResponse> {
        return this.request.get(this.path, {
            headers: headers.acceptJson,
            params: {
                page,
            },
        });
    }
}