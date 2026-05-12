class BettingStrategy {
    constructor(config) {
        this.initialBet = config.initialBet;
        this.betPercentage = config.betPercentage; // 10% logic
        this.maxBet = config.maxBet;
        this.minBet = config.minBet;
        this.targetMultiplier = config.targetMultiplier;
        this.stopLoss = config.stopLoss;
        this.takeProfit = config.takeProfit;
        this.martingaleMultiplier = config.martingaleMultiplier || 2;
        this.consecutiveLosses = 0;
        this.currentBetAmount = this.initialBet;
    }

    calculateNextBet(currentBalance, wonLastRound = true) {
        if (wonLastRound) {
            this.consecutiveLosses = 0;
            // Exponential: 10% of balance, but at least 10 shillings
            this.currentBetAmount = Math.max(this.minBet, currentBalance * this.betPercentage);
        } else {
            this.consecutiveLosses++;
            // Martingale recovery
            this.currentBetAmount = this.currentBetAmount * this.martingaleMultiplier;
        }

        return Math.min(this.currentBetAmount, this.maxBet);
    }
}

module.exports = BettingStrategy;