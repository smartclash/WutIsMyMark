import * as _ from 'lodash';
import * as puppet from 'puppeteer';
import {Tabletojson} from 'tabletojson';

const cleanCurdeData = (json: any[]): SemesterMarkSheet => {
    let cleanData: SemesterMarkSheet = { 
        semester: '', headings: [], subjects: []
    };

    _.map(json[0], (crudeData, mainKey: number) => {
        let data = _.values(crudeData);

        if (mainKey === 2) {
            return ;
        }

        if (mainKey === 0) {
            return cleanData.semester = data[0];
        }

        if (mainKey === 1) {
            // TODO remove S.No field from headings
            return cleanData.headings = data;
        }

        _.map(data, (subject, subKey) => {
            // TODO remove this whole S.No field. Can be done only after removing it from the headings
            if (subKey === 0) {
                return cleanData.subjects.push({ sno: subject, marks: [], name: '' })
            }

            if (subKey === 1) {
                return cleanData.subjects[mainKey - 3].name = subject;
            }

            return cleanData.subjects[mainKey - 3].marks.push(subject);
        });
    });

    return cleanData;
};

const getMarkDetails = (json: any[]): SemesterMarkSheet => {
    return cleanCurdeData(json);
};

const scrape: Scrapper = async (username, password, semester) => {
    try {
        const browser = await puppet.launch();
        const page = await browser.newPage();

        await page.goto('http://103.249.82.130/student1/Default.aspx');

        await page.type('#txtuname', username);
        await page.type('#txtpassword', password);

        await page.click('#Button1');
        await page.waitFor(1000);

        await page.click('#pHeadermarks');
        await page.waitFor(200);
        await page.click('#ImageButton1');
        await page.waitFor(1000);

        await page.click('#txt_vech');
        await page.waitFor(100);
        await page.click(`#vehiclechecklist_${semester - 1}`);
        await page.click('#btnmarkgo');
        await page.waitFor(1000);

        const marksTableRaw = await page.$eval('table#Fpsmarks_viewport', elem => {
            return elem.innerHTML;
        });
        const table2Json = Tabletojson.convert('<table>' + marksTableRaw + '</table>');
        const markDetails = getMarkDetails(table2Json);

        // Had to do this way to make typscript agree that the result is a string
        const studentDetails: Student = {
            name: `${await page.$eval('#lblsname', e => e.innerText)}`,
            roll: `${await page.$eval('#lblRegText', e => e.innerText)}`,
            year: `${await page.$eval('#lblyear', e => e.innerText)}`,
            image: `${await page.$eval('#Imagestudent', e => e.src)}`,
            branch: `${await page.$eval('#lbldegree', e => e.innerText)}`,
            semester: `${await page.$eval('#lblsem', e => e.innerText)}`
        };

        browser.close();
        return [
            studentDetails,
            markDetails,
        ];
    } catch {
        throw new Error('Could not login and get data');
    }
};

scrape('311019101017', '07122001', 2).then(console.log).catch(console.error);
export default scrape;
