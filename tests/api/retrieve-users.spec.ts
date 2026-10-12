import { test, expect, type APIResponse } from '@playwright/test';
import { UserConnector } from '@/api/connectors/UserConnector';
import { type UserResponse } from '@/api/models/responses/UserResponse';
import { Given, When, Then, And } from '@/utils/bdd';

test.describe('GoRest Users API', () => {
    let userConnector: UserConnector;
    let response: APIResponse;
    let users: UserResponse[];

    const retrieveUsers = async (): Promise<UserResponse[]> => {
        await When('user sends a request to retrieve the list of users', async () => {
            response = await userConnector.getUsers();
        });

        await Then('the response status is 200', async () => {
            expect(response.status()).toBe(200);
        });

        return response.json();
    };

    test.beforeEach(async ({ request }) => {
        await Given('the Users API client is initialized', async () => {
            userConnector = new UserConnector(request);
        });
    });

    test('TEST 1 - Returns at least one user', async () => {
        users = await retrieveUsers();

        await And('at least one user is returned', async () => {
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBeGreaterThan(0);
        });
    });

    test('TEST 2 - Returns at least one user whose name starts with C', async () => {
        let hasUserStartingWithC = false;

        await When('user searches the paginated user list for a name starting with C', async () => {
            response = await userConnector.getUsers(1);

            expect(response.status()).toBe(200);

            users = await response.json();

            const totalPages = Number(
                response.headers()['x-pagination-pages']
            );

            hasUserStartingWithC = users.some(
                user => user.name.startsWith('C')
            );

            for (let page = 2; page <= totalPages && !hasUserStartingWithC; page++) {
                response = await userConnector.getUsers(page);

                expect(response.status()).toBe(200);

                users = await response.json();

                hasUserStartingWithC = users.some(
                    user => user.name.startsWith('C')
                );
            }
        });

        await Then("at least one user's name starts with the letter C", async () => {
            expect(hasUserStartingWithC).toBe(true);
        });
    });

    test('TEST 3 - Retrieves and displays the list of users in the console', async () => {
        users = await retrieveUsers();

        await And('at least one user is returned', async () => {
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBeGreaterThan(0);
        });

        await And('the list of users is displayed in the console', async () => {
            console.log(users);
        });
    });
});