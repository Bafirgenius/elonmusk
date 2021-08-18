const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://twitter.com/elonmusk', { waitUntil: 'networkidle2' });

  const results = await page.$$eval('article div[lang]', (tweets) => tweets.map((tweet) => tweet.textContent));
  console.log(results);
  let tweet = JSON.stringify(results);
  fs.writeFileSync('tweet.json', tweet);

  browser.close();
})();