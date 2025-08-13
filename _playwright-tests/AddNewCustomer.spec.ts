import { test, expect } from '@playwright/test';

test.describe('Add New Customer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open Add New Customer modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New Customer', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Add Customer', exact: true })).toBeVisible();
  });

  test('should close Add New Customer modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New Customer', exact: true }).click();
    const modal = page.getByRole('dialog', { name: 'Add Customer', exact: true });
    await modal.getByTestId('OUIA-Generated-Modal-small-2-ModalBoxCloseButton').click();
    await expect(modal).not.toBeVisible();
  });
});
