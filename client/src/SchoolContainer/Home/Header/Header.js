import React, { useState } from 'react';
import './Header.css';
import {
	TOTAL_SCREENS,
	GET_SCREEN_INDEX,
} from '../../../Utilities/commonUtils';
import ScrollService from '../../../Utilities/ScrollService';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
	const [selectedScreen, setSelectedScreen] = useState(0);
	const [showHeaderOptions, setShowHeaderOptions] = useState(false);
	const updateCurrentScreen = (currentScreen) => {
		if (!currentScreen || !currentScreen.screenInView) return;
		let screenIndex = GET_SCREEN_INDEX(currentScreen.screenInView);
		if (screenIndex < 0) return;
	};
	let currentScreenSubscription =
		ScrollService.currentScreenBroadcaster.subscribe(updateCurrentScreen);
	const getHeaderOptions = () => {
		return TOTAL_SCREENS.map((Screen, i) => (
			<div
				key={Screen.screen_name}
				id='bars'
				className={getHeaderOptionsClasses(i)}
				onClick={() => switchScreen(i, Screen)}
			>
				<span>{Screen.screen_name}</span>
			</div>
		));
	};
	const getHeaderOptionsClasses = (index) => {
		let classes = 'header-option ';
		if (index < TOTAL_SCREENS.length - 1) classes += 'header-option-seperator ';
		if (selectedScreen === index) classes += 'selected-header-option ';
		return classes;
	};
	const switchScreen = (index, screen) => {
		let screenComponent = document.getElementById(screen.screen_name);
		if (!screenComponent) return;
		screenComponent.scrollIntoView({ behavior: 'smooth' });
		setSelectedScreen(index);
		setShowHeaderOptions(false);
	};

	return (
		<div
			className='header-container'
			onClick={() => setShowHeaderOptions(!showHeaderOptions)}
		>
			<div className='header-parent'>
				<div
					className='header-hamburger'
					onClick={() => {
						setShowHeaderOptions(!showHeaderOptions);
					}}
				>
					<FontAwesomeIcon className='header-hamburger-bars' icon={faBars} />
				</div>
				<div className='header-logo'>
					<span style={{ color: 'tomato', textShadow: '0px 4px  white' }}>
						NELSON
					</span>
					<span
						style={{
							fontSize: 20,
							margin: '10px',
							color: `white`,
							padding: '1px',
							textShadow: '0px 1px  tomato',
						}}
					>
						High School
					</span>
				</div>
				<div
					className={
						showHeaderOptions
							? 'header-options show-hamburger-options'
							: 'header-options'
					}
				>
					{getHeaderOptions()}
				</div>
			</div>
		</div>
	);
}
