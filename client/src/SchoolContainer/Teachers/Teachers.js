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
				phoneMobile={
					teachers[index].Phone[0] !== undefined
						? [
								teachers[index].Phone[0]._attributes.type,
								teachers[index].Phone[0]._text,
						  ]
						: [
								teachers[index].Phone._attributes.type,
								teachers[index].Phone._text,
						  ]
				}
				phoneHome={
					teachers[index].Phone[1] !== undefined
						? [
								teachers[index].Phone[1]._attributes.type,
								teachers[index].Phone[1]._text,
						  ]
						: [
								teachers[index].Phone._attributes.type,
								teachers[index].Phone._text,
						  ]
				}
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

	const Teachers = ({ name, email, phoneMobile, phoneHome, subject }) => {
		if (phoneMobile[0] === phoneHome[0]) {
			phoneHome = ['Work', '----------'];
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
				phoneMobile={
					value.Phone[0] !== undefined
						? [value.Phone[0]._attributes.type, value.Phone[0]._text]
						: [value.Phone._attributes.type, value.Phone._text]
				}
				phoneHome={
					value.Phone[1] !== undefined
						? [value.Phone[1]._attributes.type, value.Phone[1]._text]
						: [value.Phone._attributes.type, value.Phone._text]
				}
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
				phoneMobile={
					value.Phone[0] !== undefined
						? [value.Phone[0]._attributes.type, value.Phone[0]._text]
						: [value.Phone._attributes.type, value.Phone._text]
				}
				phoneHome={
					value.Phone[1] !== undefined
						? [value.Phone[1]._attributes.type, value.Phone[1]._text]
						: [value.Phone._attributes.type, value.Phone._text]
				}
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
				<ScreenHeading title={'Teachers'} />
				<div className='about-me-card'>
					<div className='search'>
						<div className='col-sm search-label'>
							<label className='search-name-teacher'>Name:</label>
							<input
								type='text'
								placeholder='Search the teacher by name'
								className='teacher-name-input'
								onKeyPress={handlePressKeyClass}
								value={className}
								onChange={handleClassName}
							/>
						</div>
						<div className='col-sm search-label'>
							<label className='search-name-teacher'>Class:</label>
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
