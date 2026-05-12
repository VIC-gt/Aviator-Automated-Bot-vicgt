class BetManager {
    // ... existing constructor ...

    async placeBet(page, currentBalance) {
        if (this.isWaitingForResult) return false;

        try {
            const frame = await FrameHelper.waitForSelectorInFrames(page, this.config.SELECTORS.GAME.BET_BUTTON);

            // Pass current balance to get the 10% bet amount
            const wonLast = this.lastResult !== 'loss';
            const betAmount = this.strategy.calculateNextBet(currentBalance, wonLast);
            
            logger.info(`Placing exponential bet: ${betAmount.toFixed(2)} KES`);

            await frame.evaluate(async (amount, selector) => {
                const input = document.querySelector(selector);
                if (input) {
                    input.value = amount.toString();
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }, betAmount, this.config.SELECTORS.GAME.BET_INPUT);

            await page.waitForTimeout(200);
            await frame.click(this.config.SELECTORS.GAME.BET_BUTTON);
            
            this.isWaitingForResult = true;
            this.currentBet = { amount: betAmount };
            return true;
        } catch (error) {
            logger.error(`Betting error: ${error.message}`);
            return false;
        }
    }
    
    // ... rest of checkCashout logic ...
}