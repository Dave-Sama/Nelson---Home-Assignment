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

	useEffect(async () => {
		await axios
			.get('/teachers')
			.then((data) => {
				if (data) {
					console.log('fetched data:');
					console.log(data.data.Teachers.Teacher);

					let newData = data.data.Teachers.Teacher;
					setTeachers((prevState) => ({
						...prevState,
						...newData,
					}));
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const Teachers = ({ name, email, phoneMobile, phoneHome, subject }) => {
		if (phoneMobile[0] == phoneHome[0]) {
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
					{/* <div className='search-output'>{teachers && loopTeachers()}</div> */}
					<div className='search-output'>
						<>
							{Object.values(teachers).map((value, index) => {
								return (
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
										subject={
											teachers[index].Subject && teachers[index].Subject._text
										}
									/>
								);
							})}
							{/* {teachers[0] && (
								<Teachers
									key={0}
									name={teachers[0].Name && teachers[0].Name._text}
									email={teachers[0].Email && teachers[0].Email._text}
									phoneMobile={
										teachers[0].Phone[0] && [
											teachers[0].Phone[0]._attributes.type,
											teachers[0].Phone[0]._text,
										]
									}
									phoneHome={
										teachers[0].Phone[1] && [
											teachers[0].Phone[1]._attributes.type,
											teachers[0].Phone[1]._text,
										]
									}
									subject={teachers[0].Subject && teachers[0].Subject._text}
								/>
							)}
							{teachers[1] && (
								<Teachers
									key={1}
									name={teachers[1].Name && teachers[1].Name._text}
									email={teachers[1].Email && teachers[1].Email._text}
									phoneMobile={
										teachers[1].Phone[0] && [
											teachers[1].Phone[0]._attributes.type,
											teachers[1].Phone[0]._text,
										]
									}
									phoneHome={
										teachers[1].Phone[1] && [
											teachers[1].Phone[1]._attributes.type,
											teachers[1].Phone[1]._text,
										]
									}
									subject={teachers[1].Subject && teachers[1].Subject._text}
								/>
							)}
							{teachers[1] && (
								<Teachers
									key={1}
									name={teachers[1].Name && teachers[1].Name._text}
									email={teachers[1].Email && teachers[1].Email._text}
									phoneMobile={
										teachers[1].Phone[0] && [
											teachers[1].Phone[0]._attributes.type,
											teachers[1].Phone[0]._text,
										]
									}
									phoneHome={
										teachers[1].Phone[1] && [
											teachers[1].Phone[1]._attributes.type,
											teachers[1].Phone[1]._text,
										]
									}
									subject={teachers[1].Subject && teachers[1].Subject._text}
								/>
							)}
							{teachers[1] && (
								<Teachers
									key={1}
									name={teachers[1].Name && teachers[1].Name._text}
									email={teachers[1].Email && teachers[1].Email._text}
									phoneMobile={
										teachers[1].Phone[0] && [
											teachers[1].Phone[0]._attributes.type,
											teachers[1].Phone[0]._text,
										]
									}
									phoneHome={
										teachers[1].Phone[1] && [
											teachers[1].Phone[1]._attributes.type,
											teachers[1].Phone[1]._text,
										]
									}
									subject={teachers[1].Subject && teachers[1].Subject._text}
								/>
							)} */}
						</>
					</div>

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
