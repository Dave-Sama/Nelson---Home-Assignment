import React from 'react';
import ScrollService from '../../../Utilities/ScrollService';
import './Profile.css';
export default function Profile() {
	return (
		<div className='profile-container'>
			<div className='profile-parent'>
				<div className='profile-detailes'>
					<div className='profile-details-name'></div>
					<div className='profile-details-role'>
						<span className='primary-text'>
							<span className='profile-role-tagline'>
								<span className='this'>This</span>{' '}
								<span className='is'>is</span>{' '}
								<span className='where'>where</span>{' '}
								<span className='your'>your</span>{' '}
								<span className='future'>future</span>{' '}
								<span className='begins'>begins</span>.
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
