//	CLI to convert HTML to PDF
//
//	Usage: 
//
//
//
//	More info available at:
//
//		https://github.com/LucianoGanga/simple-headless-chrome
//

// landscape boolean Paper orientation. Defaults to false.
// displayHeaderFooter boolean Display header and footer. Defaults to false.

// printBackground boolean Print background graphics. Defaults to false.
// scale number Scale of the webpage rendering. Defaults to 1.

// paperWidth number Paper width in inches. Defaults to 8.5 inches.
// paperHeight number Paper height in inches. Defaults to 11 inches.

// marginTop number Top margin in inches. Defaults to 1cm (~0.4 inches).
// marginBottom number Bottom margin in inches. Defaults to 1cm (~0.4 inches).
// marginLeft number Left margin in inches. Defaults to 1cm (~0.4 inches).
// marginRight number Right margin in inches. Defaults to 1cm (~0.4 inches).

const HeadlessChrome = require('simple-headless-chrome')

function cm_to_in(value_cm) {
	return parseFloat(value_cm)*0.4;
}

// Get command line args. Settings default values. Measures in cm
var args = {
	'url': '',
	'filename': 'output',
	'landscape': 'false',
	'display-header-footer': 'false',
	'print-background': 'false',
	'scale': 1,
	'page-width': 21,
	'page-height': 29.7,
	'margin-top': 1,
	'margin-bottom': 1,
	'margin-left': 1,
	'margin-right': 1,
}

process.argv.slice(2).forEach(function (arg, index, array) {
	
	if (arg.includes('=')) {
		var name = arg.split('=')[0].replace('--', '')
		var val = arg.split('=')[1]
		
		args[name] = val
	}
});

// Create browser and convert to pdf
const browser = new HeadlessChrome({
	headless: true
})


async function navigateWebsite() {
	try {
		await browser.init()
		
		const mainTab = await browser.newTab({ privateTab: false })
		
		await mainTab.goTo(args['url'])
		
		await mainTab.savePdf(
			fileName = args['filename'],
			options = {
				landscape: args['landscape'] == 'true',
				displayHeaderFooter: args['display-header-footer'] == 'true',
				printBackground: args['print-background'] == 'true',
				scale: parseInt(args['scale']),
				paperWidth: cm_to_in(args['page-width']),
				paperHeight: cm_to_in(args['page-height']),
				marginTop: cm_to_in(args['margin-top']),
				marginBottom: cm_to_in(args['margin-bottom']),
				marginLeft: cm_to_in(args['margin-left']),
				marginRight: cm_to_in(args['margin-right'])
			}
		)
		
		// Close the browser
		await browser.close()
	} catch (err) {
		console.log('ERROR!', err)
	}
 }
 
navigateWebsite()