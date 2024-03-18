// // import puppeteer from "puppeteer-core/lib/esm/puppeteer/puppeteer-core.js"
// import puppeteer from "puppeteer";
// import "@testing-library/jest-dom"

// describe('show/hide an event details', () =>{
//     let browser;
//     let page;
//     beforeAll(async()=>{
//         browser = await puppeteer.launch({
//             headless: false,
//             slowMo: 250,
//             timeout: 0
//         })
       
//         const page = await browser.newPage();
//         await page.goto('http://localhost:3000/');
//     })

//     afterAll(()=>{
//         browser.close();
//     })

//     test('An event element is collapsed by default', async()=>{

//         await page.waitForSelector('.event');
//         const eventDetails = await page.$('.event .details');
//         expect(eventDetails).toBeNull();
//         browser.close();
//     })

//     test('User can collapse an event to hide details', async() =>{
//         await page.click('.event .details-btn');
//         const eventDetails = await page.$('.event .details');

//         expect(eventDetails).toBeNull();
//     })
// })