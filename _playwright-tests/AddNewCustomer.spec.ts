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

  test('should add a new customer correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Add New Customer', exact: true }).click();
    const modal = page.getByRole('dialog', { name: 'Add Customer', exact: true });
    await expect(modal).toBeVisible(); // assert that the modal is visible

    test.step('fill in all mandatory fields', async () => {
      await page.getByTestId('OUIA-Generated-TextInputBase-2').fill('John Doe');
      // await page.getByTestId('OUIA-Generated-TextInputBase-4') -> cannot use "fill"

      // const select = modal.getByRole('button', { name: 'Options menu' });
      // todo - how to fill a select
      // Open reliably via keyboard (preferred for PF)
      // await select.focus();
      // await page.keyboard.press('ArrowDown');
      // Options are rendered in a portal, so don't scope to modal
      // await page.getByRole('option', { name: 'red' }).click();

      // await page.getByTestId('OUIA-Generated-Checkbox-2').click();
    });

    // todo - see how modals are handled in our official repo

    test.step('click submit button', async () => {
      await modal.getByRole('button', { name: 'Submit' }).click();
    });

    test.step('verify that the customer is added correctly', async () => {
      // todo
    });
  });
});
