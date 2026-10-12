/**
 * BDD-style step wrappers for Playwright tests.
 *
 * Wraps test.step() to provide readable Given/When/Then/And syntax,
 * and consistent BDD labels in code and reports
 * without introducing an additional BDD framework.
 */

import { test } from '@playwright/test';

export function Given<T>(description: string, fn: () => T | Promise<T>) {
    return test.step(`Given ${description}`, fn);
}

export function When<T>(description: string, fn: () => T | Promise<T>) {
    return test.step(`When ${description}`, fn);
}

export function Then<T>(description: string, fn: () => T | Promise<T>) {
    return test.step(`Then ${description}`, fn);
}

export function And<T>(description: string, fn: () => T | Promise<T>) {
    return test.step(`And ${description}`, fn);
}
