import { test, expect } from '@playwright/test';

const customer = {
  name: 'John Doe',
  age: 38,
  color: 'pink',
  isCool: 'Yup',
};

test.describe('Add New Customer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should open Add New Customer modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New Customer' }).click();
    await expect(page.getByRole('dialog', { name: 'Add Customer' })).toBeVisible();
  });

  test('should close Add New Customer modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New Customer' }).click();
    const modal = page.getByRole('dialog', { name: 'Add Customer' });
    await modal.getByRole('button', { name: 'Close' }).click();
    await expect(modal).not.toBeVisible();
  });

  test('should add a new customer correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New Customer' }).click();
    const modal = page.getByRole('dialog', { name: 'Add Customer' });
    await expect(modal).toBeVisible();

    await test.step('fill in all fields', async () => {
      await modal.locator('#name').fill(customer.name);
      await modal.locator('#age').fill(customer.age.toString());

      const select = modal.getByRole('button', { name: 'Options menu' });
      await select.focus();
      await select.press('Enter');
      await modal.getByRole('option', { name: customer.color }).press('Enter');
      await expect(select).toHaveText(customer.color);

      const checkbox = page.getByRole('checkbox', { name: 'Is this person cool?' });
      await checkbox.focus();
      await checkbox.press('Space');
      await expect(checkbox).toBeChecked();
    });

    await test.step('click submit button', async () => {
      await modal.getByRole('button', { name: 'Submit' }).click();
    });

    await test.step('verify that the customer is added correctly', async () => {
      await expect(modal).not.toBeVisible();
      await expect(page.getByText(customer.name)).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(customer.age.toString())).toBeVisible();
      await expect(page.getByText(customer.isCool)).toBeVisible();
    });
  });
});
