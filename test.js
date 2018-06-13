const puppeteer = require('puppeteer');
const CREDS = require('./creds');

(async () => {
	const browser = await puppeteer.launch({
	//	headless: false
	});
	const page = await browser.newPage();
	//DOM element selectors
	const UsernameSelector = '#i0116';
	const NextSelector = '#idSIButton9';
	const PasswordSelector = '#i0118';
	const SignInSelector = '#idSIButton9';

	//navigate to login page
	await page.goto('https://portal.onopti.com',{waitUntil: 'networkidle2'});

	//enter username and click next
	//wait for next page to load before continuing on
	try{
	//await Promise.all([
	await	page.click(UsernameSelector),
	await	page.keyboard.type(CREDS.username),
	await	page.click(NextSelector),
	await	page.waitForNavigation({ waitUntil: 'networkidle2' })
	//]);
	} catch(error1) {
		console.error(error1);
		console.log("Testing error1");
	}
	
	//eneter password and click submit
	//wait for next page to load before continuing on
	try{
	//await Promise.all([
		await page.click(PasswordSelector),
		await page.keyboard.type(CREDS.password),
		await page.click(SignInSelector),
		await page.waitForNavigation({ waitUntil: 'networkidle2'})
	//]);
	} catch(error2){
		console.error(error2);
		console.log("Testing error2");

	}

	//take a pdf screenshot of the dashboard
	try{
	await page.goto('https://portal.onopti.com', { waitUntil: "networkidle0"});
	await page.pdf({path: 'pdfs/dashboard.pdf',format: 'A4'});
	}catch(error3){
		console.error(error3);
	}

	await browser.close();
})();



