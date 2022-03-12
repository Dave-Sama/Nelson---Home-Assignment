/*
	Basic requiremnts
*/
const router = require('express').Router();
const fs = require('fs');
var convert = require('xml-js');
const axios = require('axios');

/* 
	get swagger files
*/
const swaggerChildren = fs.readFileSync(
	'./Samples/GetChildren_swagger.json',
	'utf8'
);
const swaggerTeachers = fs.readFileSync(
	'./Samples/GetTeachers_swagger.json',
	'utf8'
);

/* 
	Create a teacher/children URL using swegger API
*/
const teachersURL =
	JSON.parse(swaggerTeachers).host +
	JSON.parse(swaggerTeachers).basePath +
	'/' +
	JSON.parse(swaggerTeachers).info.title;

const childrenURL =
	JSON.parse(swaggerChildren).host +
	JSON.parse(swaggerChildren).basePath +
	'/' +
	JSON.parse(swaggerChildren).info.title;

/*
	Default URL
*/
router.get('/', (req, res) => {
	res.json(JSON.parse(swaggerChildren));
});

/*
	Get all children
*/
router.get('/children', async (req, res) => {
	let result = '';
	try {
		fs.readFile('./postmanChildren.xml', (err, data) => {
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

/*
	Get a specific child by number of index - ** Test **
*/
router.get('/children/:num', (req, res) => {
	let { num } = req.params;

	let result = '';
	try {
		fs.readFile('./postmanChildren.xml', (err, data) => {
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

/*
	Get a specific child by first/last name
*/
router.get('/childrens/:first/:last', (req, res) => {
	let firstName = req.params['first'];
	let lastName = req.params['last'];

	let result = '';
	let sortedArr = [];

	try {
		fs.readFile('./postmanChildren.xml', (err, data) => {
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

/*
	Get all teachers
*/
router.get('/teachers', (req, res) => {
	let result = '';
	try {
		fs.readFile('./postmanTeachers.xml', (err, data) => {
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

/*
	Get a specific teacher by name
*/
router.get('/teachers/:name', (req, res) => {
	let name = req.query.name;
	let result = '';
	let sortedArr = [];
	try {
		fs.readFile('./postmanTeachers.xml', (err, data) => {
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

/*
	Get childrens by common hoby
*/
router.get('/hobby/:name', (req, res) => {
	let name = req.query.name;
	let result = '';
	let sortedArr = [];

	console.log('server: hobby: ', name);
	try {
		fs.readFile('./postmanChildren.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });

			if (res) {
				Object.values(JSON.parse(result).Children.Child).map(
					(element, index) => {
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

/*
	Get a specific teacher based on subject
*/
router.get('/class/:name', (req, res) => {
	let name = req.query.name;
	let result = '';
	console.log('server: subject: ', name);
	let sortedArr = [];
	try {
		fs.readFile('./postmanTeachers.xml', (err, data) => {
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

/*
	Get all existing classes
*/
router.get('/class', (req, res) => {
	let result = '';
	let sortedArr = [];
	console.log('here!');
	try {
		fs.readFile('./postmanTeachers.xml', (err, data) => {
			if (err) {
				res.send('something went wrong');
			}
			result = convert.xml2json(data, { compact: true, spaces: 4 });

			if (res) {
				Object.values(JSON.parse(result).Teachers.Teacher).map((element) => {
					sortedArr.push(element.Subject._text);
				});
				if (sortedArr.length === 0) {
					res.status(400).json({ msg: `Cannot find any class. ` });
				} else {
					res.send(sortedArr);
				}
			}
		});
	} catch (err) {
		console.log(err);
	}
});

router.get('/create-class', (req, res) => {
	className_arr = [];
	class_arr = [];
	try {
		// get teacher and children and convert to json
		const children_result = fs.readFileSync('./postmanChildren.xml', 'utf8');
		let children_conv = convert.xml2json(children_result, {
			compact: true,
			spaces: 4,
		});
		const teachers_result = fs.readFileSync('./postmanTeachers.xml', 'utf8');
		let teachers_conv = convert.xml2json(teachers_result, {
			compact: true,
			spaces: 4,
		});

		// get the class names
		Object.values(JSON.parse(teachers_conv).Teachers.Teacher).map((element) => {
			className_arr.push(element.Subject._text);
		});

		Object.values(className_arr).map((className) => {
			let childrenByClass_arr = [];
			let teacherByClass_arr = [];

			// sort the children by class name
			Object.values(JSON.parse(children_conv).Children.Child).map((element) => {
				let temp = [];
				if (element.Hobby)
					if (Array.isArray(element.Hobby)) {
						element.Hobby.map((c) => {
							temp.push(c._text);
						});
					} else if (
						typeof element.Hobby === 'object' &&
						!Array.isArray(element.Hobby) &&
						element.Hobby !== null
					) {
						temp.push(element._text);
					}

				if (temp.length > 0) {
					if (temp.includes(className)) {
						newChild = {
							ID: {
								_text: element.PersonDetails._attributes.id,
							},
							Name: {
								_text:
									element.PersonDetails.Name.First._text +
									' ' +
									(element.PersonDetails.Name.Middle
										? element.PersonDetails.Name.Middle._text
										: '') +
									' ' +
									element.PersonDetails.Name.Last._text,
							},
							Email: {
								_text: element.PersonDetails.Email._text,
							},
						};
						childrenByClass_arr.push(newChild);
					}
				}
			});
			// check teacher
			Object.values(JSON.parse(teachers_conv).Teachers.Teacher).map(
				(element, index) => {
					if (element.Subject._text === className) {
						delete element.Subject;
						teacherByClass_arr.push(element);
					}
				}
			);

			class_arr.push({
				_attributes: {
					name: className,
					noOfChildren: childrenByClass_arr.length,
				},
				Teacher: teacherByClass_arr,
				Child: childrenByClass_arr,
			});
		});

		// static
		finalResult = {
			xml: {
				_attributes: {
					version: '1.0',
					encoding: 'windows-1252',
				},
			},
			Classes: {
				Class: class_arr,
			},
		};
		var options = {
			compact: true,
			ignoreComment: true,
			spaces: 4,
		};
		const toXML = convert.json2xml(JSON.stringify(finalResult), options);

		// save xml file
		fs.writeFileSync('Classes.xml', toXML, (err, file) => {
			if (err) throw err;
		});

		res.send('completed');
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
