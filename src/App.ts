import * as fs from 'fs';
import * as cheerio from 'cheerio';
import * as puppet from 'puppeteer';
import * as table2json from 'html-table-to-json';

const scrape = async () => {
    const browser = await puppet.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('http://103.249.82.132/studentlogin/');

    // await page.type('#txtuname', '############');
    // await page.type('#txtpassword', '########');

    await page.click('#Button1');
    await page.waitFor(1000);
    console.log('Logged In ->', page.url());

    await page.click('#pHeadermarks');
    await page.waitFor(200);
    await page.click('#ImageButton1');
    await page.waitFor(1000);
    console.log('Clicked on marks button ->', page.url());

    await page.click('#txt_vech');
    await page.waitFor(100);
    await page.click('#vehiclecheck');
    await page.click('#btnmarkgo');
    await page.waitFor(1000);
    console.log('Got mark details ->', page.url());

    try {
        const marksTableRaw = await page.$eval('#Fpsmarks', elem => {
            return elem.innerHTML;
        });
        getMarkDetails(cheerio.load(marksTableRaw));
    } catch (_) {
        //
    }

    browser.close();
};

const getMarkDetails = ($: CheerioStatic) => {
    // const semesterTitle = $('table#Fpsmarks_viewport')[0].children[2].children[0].children[1].children[0].data;
    // const typesCollection = $('table#Fpsmarks_viewport')[0].children[2].children[1].children;
    const table = table2json.parse($('table#Fpsmarks_viewport').html());
    console.log(table.results);
    // const allRows = $('table#Fpsmarks_viewport > tbody')[0].children;
    // for(let i = 0; i <= allRows.length; i++) {
    //     for (let j = 0; j <= allRows[i].children.length; j++) {
    //         // console.log('-------allowed-------');
    //         // console.log(allRows[i].children[j]);
    //         console.log(allRows[i].children[j].children);
    //     }
    // }


    // Works
    // for(let i = 0; i <= typesCollection.length; i++) {
    //     if (isUselessThread(typesCollection[i])) continue;

    //     console.log(typesCollection[i].children[0].data);
    // }
};

const bypass = () => {
    const data = fs.readFileSync(__dirname + '/../lol.html', 'utf8');
    getMarkDetails(cheerio.load(data));
};

const isUselessThread = ($: CheerioElement): Boolean => {
    if ($.data === '\n\n\t\t\t\t' || $.data === '\n\t\t\t\t\t' || $ === undefined) {
        console.log('-------rejected-------')
        console.log($);
        return true;
    }

    console.log('-------allowed-------');
    console.log($);
    return false;
};

scrape();
