const router = require('express').Router();
const fs = require('fs');
var convert = require('xml-js');
const _ = require('lodash');
// get children

router.get('/children', (req, res) => {
	let result = '';
	try {
		fs.readFile('./Samples/Children.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });

			if (res) {
				res.status(200).send(JSON.parse(result));
			}
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

// router.get('/childrens/:bla', (req, res) => {
// 	res.send('<h1>Suka!</h1>');
// });

// get a specific teacher
router.get('/childrens/:first/:last', (req, res) => {
	let firstName = req.params['first'];
	let lastName = req.params['last'];

	let result = '';
	let sortedArr = [];

	try {
		fs.readFile('./Samples/Children.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });

			if (result) {
				Object.values(JSON.parse(result).Children.Child).map(
					(element, index) => {
						if (firstName !== 'x' && lastName !== 'x') {
							if (
								element.PersonDetails.Name.First._text === firstName &&
								element.PersonDetails.Name.Last._text === lastName
							) {
								console.log(
									'matched first name: ',
									element.PersonDetails.Name.First._text
								);
								console.log(
									'matched last name: ',
									element.PersonDetails.Name.Last._text
								);
								sortedArr.push(element);
							}
						} else if (firstName !== 'x' && lastName === 'x') {
							if (
								element.PersonDetails.Name.First._text === firstName ||
								element.PersonDetails.Name.Last._text === firstName
							) {
								console.log(
									'matched first name: ',
									element.PersonDetails.Name.First._text
								);
								console.log(
									'matched last name: ',
									element.PersonDetails.Name.Last._text
								);
								sortedArr.push(element);
							}
						}
					}
				);
				if (sortedArr.length === 0) {
					res.status(400).json({
						msg: `There is no one with the name ${firstName} ${lastName}`,
					});
				} else {
					console.log('sorted array is:');
					console.log(sortedArr[0].PersonDetails.Name.First._text);
					res.send(sortedArr);
				}
			}
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

			if (res) {
				res.status(200).send(JSON.parse(result));
			}
		});
	} catch (err) {
		console.log(err);
	}
});

// get a specific teacher
router.get('/teachers/:name', (req, res) => {
	let name = req.query.name;
	let result = '';
	let sortedArr = [];
	try {
		fs.readFile('./Samples/Teachers.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });

			if (res) {
				Object.values(JSON.parse(result).Teachers.Teacher).map(
					(element, index) => {
						if (element.Name._text === name) {
							sortedArr.push(element);
						}
					}
				);
				if (sortedArr.length === 0) {
					res
						.status(400)
						.json({ msg: `There is no one with the name ${name}` });
				} else {
					res.send(sortedArr);
				}
			}
		});
	} catch (err) {
		console.log(err);
	}
});

// get a specific teacher
router.get('/hobby/:name', (req, res) => {
	let name = req.query.name;
	let result = '';
	let sortedArr = [];

	console.log('server: hobby: ', name);
	try {
		fs.readFile('./Samples/Children.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });

			if (res) {
				Object.values(JSON.parse(result).Children.Child).map(
					(element, index) => {
						// console.log('element: ', Object.values(element.Hobby));

						let temp = [];
						if (typeof element.Hobby == 'object' && element.Hobby) {
							if (element.Hobby.length > 1) {
								element.Hobby.map((element) => {
									temp.push(element._text);
								});
							}
						}

						if (temp.length > 0) {
							Object.values(temp).map((hobby) => {
								if (hobby === name) {
									sortedArr.push(element);
								}
							});
						}
					}
				);
				if (sortedArr.length === 0) {
					res
						.status(400)
						.json({ msg: `There is no one with the name ${name}` });
				} else {
					res.send(sortedArr);
				}
			}
		});
	} catch (err) {
		console.log(err);
	}
});

// get a specific class
router.get('/class/:name', (req, res) => {
	let name = req.query.name;
	let result = '';
	let sortedArr = [];
	try {
		fs.readFile('./Samples/Teachers.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });

			if (res) {
				Object.values(JSON.parse(result).Teachers.Teacher).map(
					(element, index) => {
						if (element.Subject._text === name) {
							sortedArr.push(element);
						}
					}
				);
				if (sortedArr.length === 0) {
					res.status(400).json({ msg: `There isn't a class called ${name}` });
				} else {
					res.send(sortedArr);
				}
			}
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
			res.status(200).send(JSON.parse(result));
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
