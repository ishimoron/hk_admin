import { slide as Menu } from 'react-burger-menu';

import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';

import './Drawer.css';

const Drawer = (params) => {
	return (
		<div>
			<Menu disableAutoFocus={true} burgerBarClassName={'burger__btn-focus'}>
				<a className="menu-item" href="/">
					<span className="menu-icons">
						<HomeIcon />
					</span>
					Home
				</a>
				<a className="menu-item" href="/news">
					<span className="menu-icons">
						<DescriptionIcon />
					</span>
					News
				</a>
				<a className="menu-item" href="/create">
					<span className="menu-icons">
						<AddIcon />
					</span>
					Create News
				</a>
			</Menu>
		</div>
	);
};

export default Drawer;
