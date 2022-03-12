import React, { useState } from 'react';
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../Utilities/ScrollService';
import Animations from '../../Utilities/Animations';
import './Faq.css';

export default function Faq({ id }) {
	const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
	const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});

	let fadeInScreenHandler = (screen) => {
		if (screen.fadeInScreen != id) {
			return;
		}
		Animations.animations.fadeInScreen(id);
	};
	const fadeInSubscription =
		ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

	const QuestionHeading = (props) => {
		return (
			<div className='faq-heading'>
				<div className='faq-main-heading'>
					<div className='heading-bullet'></div>

					<span>{props.heading ? props.heading : ''}</span>

					{props.fromDate && props.toDate ? (
						<div className='heading-date'>
							{props.fromDate + '-' + props.toDate}
						</div>
					) : (
						<div></div>
					)}
				</div>
				<div className='faq-sub-heading'>
					<span>{props.subHeading ? props.subHeading : ''}</span>
				</div>
				<div className='faq-heading-description'>
					<span>{props.description ? props.description : ''}</span>
				</div>
			</div>
		);
	};

	const faqBullets = [
		{ label: 'Teachers' },
		{ label: 'Children' },
		{ label: 'Classes' },
	];

	const answerDetails = [
		<div className='faq-screen-container' key='education'>
			<QuestionHeading
				heading={'How do I search teachers?'}
				subHeading={
					'You have two options to search a specific teacher, The first is to type his full name in the field, or you can search him by typing his teaching subject.'
				}
			/>
			<QuestionHeading
				heading={'How do I reset the displaying list?'}
				subHeading={'Just empty the Input text box, and press "Enter" key.'}
			/>
			<QuestionHeading
				heading={
					'How do I display the result after filling one of the Input fields?.'
				}
				subHeading={'Please type enter to Display the requested result.'}
			/>
		</div>,
		<div className='faq-screen-container' key='work-experience'>
			<QuestionHeading
				heading={'How do I search a specific Child?'}
				subHeading={
					'You can type his full name in the "Name" field, and press "Enter", Although if there are more than one child with the same full name, it will display them too.'
				}
			/>
			<QuestionHeading
				heading={'How to search all the children with the same Hobby?'}
				subHeading={
					'You can type the name of the Hobby in the relevant text input and click "Enter".'
				}
				fromDate={'2021'}
				toDate={'2022'}
			/>
		</div>,
		<div
			className='faq-screen-container programming-skills-container'
			key='programming-skills'
		>
			<div className='faq-screen-container' key='work-experience'>
				<QuestionHeading
					heading={'How to search a specific class particifants??'}
					subHeading={
						'You can type the name of the class in the "Class Name" field, and press "Enter", It will display basic information about the teacher, like his name and phone, the number of children in the class and their personal data.'
					}
				/>
				<QuestionHeading
					heading={
						'How to Create and Export the data about all of the classes in the school?'
					}
					subHeading={
						'Just click on the "Create XML file", and it will automatically merge the required data and save it to the root directory.'
					}
					fromDate={'2021'}
					toDate={'2022'}
				/>
			</div>
			,
		</div>,
	];

	const handleCarousal = (index) => {
		let offsetHight = 360;
		let newCarousalOffset = {
			style: {
				transform: 'translateY(' + index * offsetHight * -1 + 'px)',
			},
		};
		setCarousalOffSetStyle(newCarousalOffset);
		setSelectedBulletIndex(index);
	};

	const getBullets = () => {
		return faqBullets.map((bullet, index) => (
			<div
				onClick={() => handleCarousal(index)}
				className={
					index === selectedBulletIndex ? 'bullet selected-bullet' : 'bullet'
				}
				key={index}
			>
				<span className='bullet-label'>{bullet.label}</span>
			</div>
		));
	};

	const getFAQScreen = () => {
		return (
			<div style={carousalOffSetStyle.style} className='faq-details-carousal'>
				{answerDetails.map((faqDetail) => faqDetail)}
			</div>
		);
	};

	return (
		<div className='faq-container screen-container fade-in' id={id || ''}>
			<div className='faq-content'>
				<ScreenHeading title={'FAQ'} />
				<div className='faq-card'>
					<div className='faq-bullets'>
						<div className='bullet-container'>
							<div className='bullet-icons'></div>
							<div className='bullets'>{getBullets()}</div>
						</div>
					</div>
					<div className='faq-bullets-details'>{getFAQScreen()}</div>
				</div>
			</div>
		</div>
	);
}
