import React, { useEffect, useState } from 'react';
import './Teachers.css';
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../Utilities/ScrollService';
import Animations from '../../Utilities/Animations';

export default function Teachers({ id }) {
	const [teacherName, setTeacherName] = useState('');
	const [className, setClassName] = useState('');

	let fadeInScreenHandler = (screen) => {
		if (screen.fadeInScreen != id) {
			return;
		}
		Animations.animations.fadeInScreen(id);
	};
	const fadeInSubscription =
		ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
	const SCREEN_CONSTANTS = {
		description:
			'Full Stack web and mobile developer with background knowledge of MERN stack with react.js',
		highlights: {
			bullets: [
				'Full Stack web and mobile development',
				'Interactive Front End as per the design',
				'React and React-Native',
				'Redux for State Management',
				'Building REST API',
				'Managing databases',
			],
			heading: 'Here are a few Highlights:',
		},
	};
	const renderHighlight = () => {
		return SCREEN_CONSTANTS.highlights.bullets.map((value, i) => (
			<div className='highlight' key={i}>
				<div className='highlight-blob'></div>
				<div>
					<span>{value}</span>
				</div>
			</div>
		));
	};

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
					<div className='search-output'>{teacherName}</div>

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
