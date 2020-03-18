import * as puppet from 'puppeteer';

const scrape = async () => {
    const browser = await puppet.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('http://103.249.82.132/studentlogin/');

    await page.type('#txtuname', '############');
    await page.type('#txtpassword', '########');

    await page.click('#Button1');
    await page.waitFor(1000);
    console.log(page.url());

    await page.click('#pHeadermarks');
    await page.waitFor(200);
    await page.click('#ImageButton1');
    await page.waitFor(1000);
    console.log(page.url());

    await page.click('#txt_vech');
    await page.waitFor(100);
    await page.click('#vehiclecheck');
    await page.click('#btnmarkgo');
    await page.waitFor(1000);
    console.log(page.url());

    browser.close();
};

scrape();
