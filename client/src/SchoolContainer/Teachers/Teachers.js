import React, { useEffect, useState } from 'react';
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../Utilities/ScrollService';
import Animations from '../../Utilities/Animations';
import axios from 'axios';

import './Teachers.css';
export default function Teachers({ id }) {
	const [teacherName, setTeacherName] = useState('');
	const [dispach, setDispach] = useState('all');
	const [className, setClassName] = useState('');
	const [teachers, setTeachers] = useState([]);
	const [sortedTeacher, setSortedTeacher] = useState([]);
	const [sortedClass, setSortedClass] = useState([]);

	let fadeInScreenHandler = (screen) => {
		if (screen.fadeInScreen != id) {
			return;
		}
		Animations.animations.fadeInScreen(id);
	};

	useEffect(async () => {
		await axios
			.get('/teachers')
			.then((data) => {
				if (data) {
					let newData = data.data.Teachers.Teacher;
					setTeachers(newData);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const displayAllTeachers = () => {
		return Object.values(teachers).map((value, index) => (
			<Teachers
				key={index}
				name={teachers[index].Name && teachers[index].Name._text}
				email={teachers[index].Email && teachers[index].Email._text}
				phone={teachers[index].Phone}
				subject={teachers[index].Subject && teachers[index].Subject._text}
			/>
		));
	};

	const handlePressKeyTeacher = async (event) => {
		if (event.key === 'Enter') {
			if (event.target.value.length === 0) {
				setDispach('all');
				handleDisplayDispach();
			}
			const name = event.target.value;
			console.log('client: ', name);

			await axios
				.get('/teachers/:name', {
					params: {
						name: name,
					},
				})
				.then((data) => {
					if (data) {
						console.log('sorted data:');
						console.log(data.data);

						setSortedTeacher((prevState) => ({
							...prevState,
							...data,
						}));

						setDispach('sort-by-teacher');
						handleDisplayDispach();
					}
				})
				.catch((err) => console.log(err));
		}
	};

	const handlePressKeyClass = async (event) => {
		if (event.key === 'Enter') {
			if (event.target.value.length === 0) {
				setDispach('all');
				handleDisplayDispach();
			}
			const name = event.target.value;
			console.log('client: ', name);

			await axios
				.get('/class/:name', {
					params: {
						name: name,
					},
				})
				.then((data) => {
					if (data) {
						console.log('sorted data:');
						console.log(data.data);

						setSortedClass((prevState) => ({
							...prevState,
							...data,
						}));

						setDispach('sort-by-class');
						handleDisplayDispach();
					}
				})
				.catch((err) => console.log(err));
		}
	};

	const Teachers = ({ name, email, phone, subject }) => {
		let phoneHome = ['Home'];
		let phoneWork = ['Work'];
		let phoneMobile = ['Mobile'];

		// Check teacher phones
		if (Array.isArray(Object.values(phone))) {
			Object.values(phone).map((item, i) => {
				if (item._attributes) {
					if (item._attributes.type === 'mobile') {
						phoneMobile.push(item._text);
					} else if (item._attributes.type === 'work') {
						phoneWork.push(item._text);
					} else if (item._attributes.type === 'home') {
						phoneHome.push(item._text);
					}
				}
			});
		} else {
			console.log('phone:  ', phone);
			if (Object.values(phone)._attributes.type === 'mobile') {
				phoneMobile.push(Object.values(phone)._text);
			} else if (Object.values(phone)._attributes.type === 'work') {
				phoneWork.push(Object.values(phone)._text);
			} else if (Object.values(phone)._attributes.type === 'home') {
				phoneHome.push(Object.values(phone)._text);
			}
		}

		return (
			<div className='row  teacher-container'>
				<div className='col-3'>
					<span className='label'> name: </span>
				</div>
				<div className='col'>
					<span> {name}</span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='label'> email: </span>
				</div>
				<div className='col'>
					<span> {email} </span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='label'>{phoneMobile && phoneMobile[0]}:</span>
				</div>
				<div className='col'>
					<span>{phoneMobile && phoneMobile[1]}</span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='label'>{phoneHome && phoneHome[0]}:</span>
				</div>
				<div className='col'>
					<span>{phoneHome && phoneHome[1]}</span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='label'>{phoneHome && phoneWork[0]}:</span>
				</div>
				<div className='col'>
					<span>{phoneHome && phoneWork[1]}</span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='label'> subject:</span>
				</div>
				<div className='col'>
					<span> {subject}</span>
				</div>
			</div>
		);
	};

	const sortByTeacher = () => {
		console.log('sorted teacher is: ', sortedTeacher.data);
		return Object.values(sortedTeacher.data).map((value, index) => (
			<Teachers
				key={index}
				name={value.Name && value.Name._text}
				email={value.Email && value.Email._text}
				phone={value.Phone}
				subject={value.Subject && value.Subject._text}
			/>
		));
	};

	// Displaying all the teachers that teach a specific class
	const sortByClass = () => {
		return Object.values(sortedClass.data).map((value, index) => (
			<Teachers
				key={index}
				name={value.Name && value.Name._text}
				email={value.Email && value.Email._text}
				phone={value.Phone}
				subject={value.Subject && value.Subject._text}
			/>
		));
	};

	const handleDisplayDispach = () => {
		switch (dispach) {
			case 'all':
				return displayAllTeachers();

			case 'sort-by-teacher':
				return sortByTeacher();

			case 'sort-by-class':
				return sortByClass();
			default:
				return displayAllTeachers();
		}
	};

	const fadeInSubscription =
		ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

	const handleTeacherName = (e) => {
		setTeacherName(e.target.value);
	};
	const handleClassName = (e) => {
		setClassName(e.target.value);
	};

	return (
		<div className='about-me-container screen-container fade-in' id={id || ''}>
			<div className='about-me-parent'>
				<div className='title'>
					<ScreenHeading title={'Teachers'} />
				</div>
				<div className='teacher-card'>
					<div className='search row'>
						<div className='col-sm search-label'>
							<label className='search-name-teacher'>Name:</label>
							<input
								type='text'
								placeholder='Search the teacher by name'
								className='teacher-name-input'
								onKeyPress={handlePressKeyTeacher}
								value={teacherName}
								onChange={handleTeacherName}
							/>
						</div>
						<div className='col-sm search-label'>
							<label className='search-class-teacher '>Class:</label>
							<input
								type='text'
								placeholder='Search teacher by class'
								onKeyPress={handlePressKeyClass}
								className='class-name-input'
								value={className}
								onChange={handleClassName}
							/>
						</div>
					</div>

					<div className='search-output'>{handleDisplayDispach()}</div>
				</div>
			</div>
		</div>
	);
}
