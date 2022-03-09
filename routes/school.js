const router = require('express').Router();
const fs = require('fs');
var convert = require('xml-js');

// get children
router.get('/children', (req, res) => {
	let result = '';
	try {
		fs.readFile('./Samples/Children.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });
			res.send(JSON.parse(result));
		});
	} catch (err) {
		console.log(err);
	}
});

// get a specific child
router.get('/children/:num', (req, res) => {
	let { num } = req.params;

	let result = '';
	try {
		fs.readFile('./Samples/Children.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });
			res.send(JSON.parse(result).Children.Child[parseInt(num)]);
			// res.send(':)');
		});
	} catch (err) {
		console.log(err);
	}
});

// get teachers
router.get('/teachers', (req, res) => {
	let result = '';
	try {
		fs.readFile('./Samples/Teachers.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });
			res.send(JSON.parse(result));
		});
	} catch (err) {
		console.log(err);
	}
});

// get a specific teacher
router.get('/teachers/:num', (req, res) => {
	let { num } = req.params;
	let result = '';
	try {
		fs.readFile('./Samples/Teachers.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });
			res.send(JSON.parse(result).Teachers.Teacher[num]);
		});
	} catch (err) {
		console.log(err);
	}
});

// get classes
router.get('/classes', (req, res) => {
	let result = '';
	try {
		fs.readFile('./Samples/Classes.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });
			res.send(JSON.parse(result));
		});
	} catch (err) {
		console.log(err);
	}
});

// get a specific class
router.get('/classes/:num', (req, res) => {
	let { num } = req.params;
	let result = '';
	try {
		fs.readFile('./Samples/Classes.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });
			res.send(JSON.parse(result).Classes.Class[num]);
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
