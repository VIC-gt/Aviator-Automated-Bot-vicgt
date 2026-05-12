const config = {
    CREDENTIALS: {
        PHONE: '0712345678', // Replace with your Betika Number
        PASSWORD: 'YourPasswordHere' // Replace with your Betika Password
    },
    NAVIGATION: {
        BASE_URL: 'https://www.betika.com/en-ke/login',
        GAME_URL: 'https://www.betika.com/en-ke/aviator',
        TIMEOUT: 60000,
        RUN_DURATION: 24 * 60 * 60 * 1000 
    },
    GAME: {
        POLLING_INTERVAL: 4000,
        HISTORY_SIZE: 3 
    },
    SELECTORS: {
        LOGIN: {
            PHONE_INPUT: 'input[type="text"]',
            PASS_INPUT: 'input[type="password"]',
            SUBMIT_BUTTON: '.button.login__button'
        },
        GAME: {
            BUBBLE_MULTIPLIER: '.payouts-wrapper .bubble-multiplier',
            BALANCE: '.balance .amount',
            BET_BUTTON: 'div.buttons-block > button.btn.btn-success.bet.ng-star-inserted',
            CASHOUT_BUTTON: 'button.cashout.ng-star-inserted',
            BET_INPUT: 'input[inputmode="decimal"]',
            CASHOUT_MULTIPLIER: '.amount span:first-child'
        }
    },
    BETTING_STRATEGIES: {
        EXPONENTIAL_GROWTH: {
            initialBet: 10.00, // Starting amount
            minBet: 10.00,    // Hard minimum of 10 shillings
            betPercentage: 0.10, // 10% of balance for growth
            maxBet: 5000.00,
            targetMultiplier: 1.50,
            stopLoss: 50.00,   // Protects your 100 shilling start
            takeProfit: 10000.00,
            martingaleMultiplier: 2.0,
            averageMultiplierThreshold: 2.00
        }
    }
};

module.exports = config;