import React, { useEffect, useState } from 'react';
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../Utilities/ScrollService';
import Animations from '../../Utilities/Animations';
import axios from 'axios';

import './Teachers.css';
export default function Teachers({ id }) {
	const [teacherName, setTeacherName] = useState('');
	const [className, setClassName] = useState('');
	const [teachers, setTeachers] = useState([]);

	let fadeInScreenHandler = (screen) => {
		if (screen.fadeInScreen != id) {
			return;
		}
		Animations.animations.fadeInScreen(id);
	};

	// useEffect(() => {
	// 	fetch('/teachers')
	// 		.then(async (data) => {
	// 			await data.json().then((data) => setTeachers(data));
	// 		})

	// 		.catch((err) => console.log(err));
	// }, []);

	useEffect(async () => {
		await axios
			.get('/teachers')
			.then((data) => {
				if (data) {
					console.log('fetched data:');
					console.log(data.data.Teachers.Teacher);

					// for (let i = 0; i < 10; ++i) {
					// 	setTeachers((prev) => [...prev, data.data.Teachers.Teacher[i]]);
					// }

					let newData = data.data.Teachers.Teacher;
					setTeachers((prevState) => ({
						...prevState,
						...newData,
					}));
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const Teachers = () => {
		console.log('teachers:');

		if (teachers[0]) {
			for (let i = 0; i < 10; ++i) {
				let name = teachers[0].Name._text;
				let email = teachers[0].Email._text;
				let phone = [
					[teachers[0].Phone[0]._attributes.type, teachers[0].Phone[0]._text],
					[teachers[0].Phone[1]._attributes.type, teachers[0].Phone[1]._text],
				];
				let subject = teachers[0].Subject._text;

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
							<span className='label'>{phone[0][0]}:</span>
						</div>
						<div className='col'>
							<span>{phone[0][1]}</span>
						</div>
						<div className='w-100'></div>
						<div className='col-3'>
							<span className='label'>{phone[1][0]}:</span>
						</div>
						<div className='col'>
							<span>{phone[1][1]}</span>
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
			}
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
								placeholder='Enter the name of the teacher'
								className='teacher-name-input'
								value={teacherName}
								onChange={handleTeacherName}
							/>
						</div>
						<div className='col-sm search-label'>
							<label className='search-name-teacher'>Class:</label>
							<input
								type='text'
								placeholder='Enter the name of the class'
								className='class-name-input'
								value={className}
								onChange={handleClassName}
							/>
						</div>
					</div>
					<div className='search-output'>{teachers && Teachers()}</div>

					{/* <div className='about-me-profile'></div>
					<div className='about-me-details'>
						<span className='about-me-description'>
							{SCREEN_CONSTANTS.description}
						</span>
						<div className='about-me-highlight'>
							<div className='highlight-heading'>
								<span>{SCREEN_CONSTANTS.highlights.heading}</span>
							</div>

							{renderHighlight()}
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}
