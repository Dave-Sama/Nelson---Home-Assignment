import Home from '../SchoolContainer/Home/Home';
import Children from '../SchoolContainer/Children/Children';
import Teachers from '../SchoolContainer/Teachers/Teachers';

export const TOTAL_SCREENS = [
	{
		screen_name: 'Home',
		component: Home,
	},
	{
		screen_name: 'Teachers',
		component: Teachers,
	},
	{
		screen_name: 'Children',
		component: Children,
	},
];

export const GET_SCREEN_INDEX = (screen_name) => {
	if (!screen_name) {
		for (let i = 0; i < TOTAL_SCREENS.length; ++i) {
			if (TOTAL_SCREENS[i].screen_name === screen_name) return i;
		}
		return -1;
	}
};
