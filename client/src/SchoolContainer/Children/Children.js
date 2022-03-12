import React, { useEffect, useState } from 'react';
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../Utilities/ScrollService';
import Animations from '../../Utilities/Animations';
import axios from 'axios';
import _ from 'lodash';

import './Children.css';

export default function Children({ id }) {
	const [childName, setChildName] = useState('');
	const [dispach, setDispach] = useState('all');
	const [hobbyName, setHobbyName] = useState('');
	const [children, setChildren] = useState([]);
	const [sortedChild, setSortedChild] = useState([]);
	const [sortedHobby, setSortedHobby] = useState([]);

	let fadeInScreenHandler = (screen) => {
		if (screen.fadeInScreen != id) {
			return;
		}
		Animations.animations.fadeInScreen(id);
	};

	useEffect(async () => {
		const newData = await axios
			.get('/children')
			.then((data) => {
				if (data) {
					return data.data.Children.Child;
				}
			})
			.catch((err) => console.log(err));
		setChildren((prevState) => ({
			...prevState,
			...newData,
		}));
	}, []);

	const displayAllChildren = () => {
		return Object.values(children).map((value, index) => (
			<Child
				key={index}
				id={
					children[index].PersonDetails._attributes &&
					children[index].PersonDetails._attributes.id
				}
				name={
					children[index].PersonDetails.Name &&
					children[index].PersonDetails.Name.First._text +
						' ' +
						children[index].PersonDetails.Name.Last._text
				}
				email={
					children[index].PersonDetails.Email &&
					children[index].PersonDetails.Email._text
				}
				hobby={
					children[index].Hobby !== undefined ? children[index].Hobby : null
				}
			/>
		));
	};

	const handlePressKeyChild = async (event) => {
		if (event.key === 'Enter') {
			if (event.target.value.length === 0) {
				setDispach('all');
				handleDisplayDispach();
			} else {
				let firstName = 'x';
				let lastName = 'x';

				const fullName = event.target.value;
				console.log(fullName);
				if (fullName.indexOf(' ') !== -1) {
					firstName = _.upperFirst(
						fullName.substring(0, fullName.indexOf(' '))
					);
					lastName = _.upperFirst(
						fullName.substring(fullName.indexOf(' ') + 1, fullName.length)
					);
				} else {
					firstName = _.upperFirst(fullName);
				}
				try {
					const promise = await axios
						.get(`/childrens/${firstName}/${lastName}`)
						.then((data) => {
							if (data) {
								console.log('sorted data:');
								console.log(data.data);

								if (Object.values(data.data)) {
									setSortedChild(data.data);
								}
								return data.data;
							}
						})
						.catch((err) => console.log(err));
					if (promise) {
						setDispach('sort-by-child');
						handleDisplayDispach();
					}
				} catch (err) {
					console.log(err);
				}
			}
		}
	};

	const handlePressKeyHobby = async (event) => {
		if (event.key === 'Enter') {
			if (event.target.value.length === 0) {
				setDispach('all');
				handleDisplayDispach();
			}
			const hobbyName = event.target.value;
			console.log('client: ', hobbyName);

			const promise = await axios
				.get('/hobby/:name', {
					params: {
						name: hobbyName,
					},
				})
				.then((data) => {
					if (data) {
						console.log('sorted data:');
						console.log(data.data);

						if (Object.values(data.data)) {
							setSortedHobby(data.data);
						}
						return data.data;
					}
				})
				.catch((err) => console.log(err));

			if (promise) {
				setDispach('sort-by-hobby');
				handleDisplayDispach();
			}
		}
	};

	const Child = ({ id, name, email, hobby }) => {
		let temp = [];
		if (typeof hobby == 'object' && hobby) {
			if (hobby.length > 1) {
				hobby.map((element) => {
					temp.push(element._text);
				});
				hobby = temp;
			}
			temp = Object.values(hobby).join(',  ');
			// console.log('after: ', hobby);
			// console.log('type: ', typeof hobby);
		}

		return (
			<div className='row  child-container'>
				<div className='col-3'>
					<span className='child-label'> ID: </span>
				</div>
				<div className='col'>
					<span> {id}</span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='child-label'> name: </span>
				</div>
				<div className='col'>
					<span> {name}</span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='child-label'> email: </span>
				</div>
				<div className='col'>
					<span> {email} </span>
				</div>
				<div className='w-100'></div>
				<div className='col-3'>
					<span className='child-label'>hobby:</span>
				</div>
				<div className='col'>
					<span>{temp} </span>
				</div>
			</div>
		);
	};

	const sortByChild = () => {
		console.log('here there is a problem:');
		console.log(sortedChild[0].PersonDetails._attributes);
		if (sortedChild !== undefined && Object.values(sortedChild).length > 0) {
			return Object.values(sortedChild).map((value, index) => (
				<Child
					key={index}
					id={
						sortedChild[index].PersonDetails._attributes &&
						sortedChild[index].PersonDetails._attributes.id
					}
					name={
						sortedChild[index].PersonDetails.Name &&
						sortedChild[index].PersonDetails.Name.First._text +
							' ' +
							sortedChild[index].PersonDetails.Name.Last._text
					}
					email={
						sortedChild[index].PersonDetails.Email &&
						sortedChild[index].PersonDetails.Email._text
					}
					hobby={
						sortedChild[index].Hobby !== undefined
							? sortedChild[index].Hobby
							: null
					}
				/>
			));
		}
	};

	// Displaying all the Children that have a common hobby
	const sortByHobby = () => {
		console.log('sorted Hobby:', sortedHobby);

		if (sortedHobby !== undefined) {
			if (Object.values(sortedHobby).length > 0) {
				return Object.values(sortedHobby).map((value, index) => (
					<Child
						key={index}
						id={
							sortedHobby[index].PersonDetails._attributes &&
							sortedHobby[index].PersonDetails._attributes.id
						}
						name={
							sortedHobby[index].PersonDetails.Name &&
							sortedHobby[index].PersonDetails.Name.First._text +
								' ' +
								sortedHobby[index].PersonDetails.Name.Last._text
						}
						email={
							sortedHobby[index].PersonDetails.Email &&
							sortedHobby[index].PersonDetails.Email._text
						}
						hobby={
							sortedHobby[index].Hobby !== undefined
								? sortedHobby[index].Hobby
								: null
						}
					/>
				));
			}
		}
	};

	const handleDisplayDispach = () => {
		switch (dispach) {
			case 'all':
				return displayAllChildren();

			case 'sort-by-child':
				return sortByChild();

			case 'sort-by-hobby':
				return sortByHobby();
			default:
				return displayAllChildren();
		}
	};

	const fadeInSubscription =
		ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

	const handleChildName = (e) => {
		setChildName(e.target.value);
	};
	const handleHobbyName = (e) => {
		setHobbyName(e.target.value);
	};

	return (
		<div className='children-container screen-container fade-in' id={id || ''}>
			<div className='about-me-parent'>
				<ScreenHeading title={'Children'} />
				<div className='child-card'>
					<div className='search row'>
						<div className='col-sm search-label'>
							<label className='search-name-child'>Name:</label>
							<input
								type='text'
								placeholder='Enter the name of the Child'
								className='child-name-input'
								onKeyPress={handlePressKeyChild}
								value={childName}
								onChange={handleChildName}
							/>
						</div>
						<div className='col-sm search-label'>
							<label className='search-name-child'>Hobby:</label>
							<input
								type='text'
								placeholder='Enter the name of the hobby'
								onKeyPress={handlePressKeyHobby}
								className='child-name-input'
								value={hobbyName}
								onChange={handleHobbyName}
							/>
						</div>
					</div>

					<div className='child-search-output'>{handleDisplayDispach()}</div>
				</div>
			</div>
		</div>
	);
}
