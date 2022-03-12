import React, { useEffect, useState } from 'react';
import ScreenHeading from '../../Utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../Utilities/ScrollService';
import Animations from '../../Utilities/Animations';
import axios from 'axios';
import _ from 'lodash';
import Swal from 'sweetalert2';
import './Classes.css';

export default function Classes({ id }) {
	const [className, setClassName] = useState('');
	const [dispach, setDispach] = useState('all');
	const [children, setChildren] = useState([]);
	const [sortedClass, setSortedClass] = useState([]);

	// teacher data
	const [nameOfTeacher, setNameOfTeacher] = useState('');
	const [phone, setPhone] = useState('');
	const [numberOfChildren, setNumberOfChildren] = useState('');

	/*
		rxjs observable, smoth effect
	*/
	let fadeInScreenHandler = (screen) => {
		if (screen.fadeInScreen != id) {
			return;
		}
		Animations.animations.fadeInScreen(id);
	};

	/*
		this method is a react hook, works as a componentdidmount() - initial fetch of all children 
	*/
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

	/*
		This method is looping thorugh the child array and creating a child cord for each child
	*/
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

	/*
        this method is fetching a specific teacher from the teachers list.
    */
	const sortTeacherByClass = async (className) => {
		const name = className;
		await axios
			.get('/class/:name', {
				params: {
					name: name,
				},
			})
			.then((data) => {
				if (data) {
					setNameOfTeacher(data.data[0].Name._text);
					setPhone(
						`${data.data[0].Phone[0]._attributes.type}: ${data.data[0].Phone[0]._text}`
					);
				}
			})
			.catch((err) => console.log(err));
	};

	/*
        Find all the relevant classes by name.
    */
	const handlePressKeyClass = async (event) => {
		if (event.key === 'Enter') {
			if (event.target.value.length === 0) {
				setDispach('all');
				setNameOfTeacher('');
				setPhone('');
				setNumberOfChildren('');
				handleDisplayDispach();
			}
			const className = event.target.value;

			// fetch children based a common hobby
			const childPromise = await axios
				.get('/hobby/:name', {
					params: {
						name: className,
					},
				})
				.then((data) => {
					if (data) {
						console.log('sorted data:');
						console.log(data.data);

						if (Object.values(data.data)) {
							setSortedClass(data.data);
							setNumberOfChildren(data.data.length);
						}
						return data.data;
					}
				})
				.catch((err) => console.log(err));

			if (childPromise) {
				// fetch data from teachers list
				sortTeacherByClass(className);

				// dispach data for displaying
				setDispach('sort-by-class');
				handleDisplayDispach();
			}
		}
	};

	/*
		This method displaying a child card
	*/
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
			</div>
		);
	};

	/*
		 Displaying all the Children that have a common hobby
	*/
	const sortByHobby = () => {
		if (sortedClass !== undefined) {
			if (Object.values(sortedClass).length > 0) {
				return Object.values(sortedClass).map((value, index) => (
					<Child
						key={index}
						id={
							sortedClass[index].PersonDetails._attributes &&
							sortedClass[index].PersonDetails._attributes.id
						}
						name={
							sortedClass[index].PersonDetails.Name &&
							sortedClass[index].PersonDetails.Name.First._text +
								' ' +
								sortedClass[index].PersonDetails.Name.Last._text
						}
						email={
							sortedClass[index].PersonDetails.Email &&
							sortedClass[index].PersonDetails.Email._text
						}
						hobby={
							sortedClass[index].Hobby !== undefined
								? sortedClass[index].Hobby
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

			case 'sort-by-class':
				return sortByHobby();

			default:
				return displayAllChildren();
		}
	};

	const fadeInSubscription =
		ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

	const handleClassName = (e) => {
		setClassName(e.target.value);
	};

	const onHandleMerge = async () => {
		await axios.get('/create-class').then((data) => {
			if (data.data === 'completed') {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Classes.XML file Successfully Created',
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Classes.XML file Successfully Created',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	};

	return (
		<div className='children-container screen-container fade-in' id={id || ''}>
			<div className='about-me-parent'>
				<ScreenHeading title={'Classes'} />
				<div className='child-card'>
					<div className='search-class'>
						<div className='col-sm-8 search-label'>
							<label className='search-name-class'>Class Name:</label>
							<input
								type='text'
								placeholder='Search class participants by class name '
								className='teacher-name-input'
								onKeyPress={handlePressKeyClass}
								value={className}
								onChange={handleClassName}
							/>
						</div>

						<div className='col-sm-3 search-label-button'>
							<button onClick={onHandleMerge} className='btn btn-primary'>
								Create XML file
							</button>
						</div>
					</div>
					<div className='search-2'>
						<div className='col-sm search-label'>
							<input
								disabled
								type='text'
								placeholder='Teacher Name'
								className='teacher-output'
								value={`Teacher:  ${nameOfTeacher}`}
							/>
						</div>
						<div className='col-sm search-label'>
							<input
								disabled
								type='text'
								placeholder='Phone'
								className='teacher-output'
								value={phone}
							/>
						</div>
						<div className='col-sm search-label'>
							<input
								disabled
								type='text'
								placeholder='Number of children'
								className='teacher-output'
								value={`Number of children:  ${numberOfChildren}`}
							/>
						</div>
					</div>

					<div className='child-search-output'>{handleDisplayDispach()}</div>
				</div>
			</div>
		</div>
	);
}
