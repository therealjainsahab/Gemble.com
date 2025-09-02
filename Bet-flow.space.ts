import { test, expect } from '@playwright/test';

test.describe('Bet Placement Flow', () => {
  test('should allow user to place a bet successfully', async ({ page }) => {
    // Mock authentication
    await page.route('**/auth/login', async (route) => {
      const json = { 
        token: 'mock-jwt-token',
        user: { id: 1, email: 'test@example.com' }
      };
      await route.fulfill({ json });
    });

    // Mock odds data
    await page.route('**/odds/event/1', async (route) => {
      const json = {
        eventId: 1,
        markets: [{
          id: 1,
          name: 'Match Winner',
          outcomes: [
            { id: 1, name: 'Team A', price: 2.5 },
            { id: 2, name: 'Team B', price: 1.8 }
          ]
        }]
      };
      await route.fulfill({ json });
    });

    // Navigate to event page
    await page.goto('/event/1');
    
    // Select bet outcome
    await page.click('text=Team A @2.5');
    
    // Enter bet amount
    await page.fill('[data-testid="bet-amount"]', '100');
    
    // Verify potential win calculation
    await expect(page.locator('[data-testid="potential-win"]'))
      .toHaveText('250.00');
    
    // Place bet
    await page.click('text=Place Bet');
    
    // Verify success message
    await expect(page.locator('[data-testid="bet-success"]'))
      .toBeVisible();
  });
});
