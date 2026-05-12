const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const config = require('./util/config');
const logger = require('./util/logger');
const GameMonitor = require('./game/gameMonitor');
const BettingStrategy = require('./game/strategies');

puppeteer.use(StealthPlugin());

async function initializeBrowser() {
    const browser = await puppeteer.launch({
        headless: false, // Must be false to bypass advanced bot checks
        args: [
            '--no-sandbox', // Fixes your Linux crash
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });
    const page = await browser.newPage();
    return { browser, page };
}

async function loginToBetika(page) {
    logger.info('Logging into Betika...');
    await page.goto(config.NAVIGATION.BASE_URL);
    
    await page.waitForSelector(config.SELECTORS.LOGIN.PHONE_INPUT);
    await page.type(config.SELECTORS.LOGIN.PHONE_INPUT, config.CREDENTIALS.PHONE, { delay: 100 });
    await page.type(config.SELECTORS.LOGIN.PASS_INPUT, config.CREDENTIALS.PASSWORD, { delay: 100 });
    await page.click(config.SELECTORS.LOGIN.SUBMIT_BUTTON);
    
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(config.NAVIGATION.GAME_URL);
}

async function main() {
    const { browser, page } = await initializeBrowser();
    await loginToBetika(page);
    
    const strategyConfig = config.BETTING_STRATEGIES.EXPONENTIAL_GROWTH;
    const gameMonitor = new GameMonitor(page, config);
    gameMonitor.strategy = new BettingStrategy(strategyConfig);
    gameMonitor.startMonitoring();
}

main();