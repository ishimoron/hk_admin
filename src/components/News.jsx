import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './News.css';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewsState from '../context/news/NewsState';
import NewsReducer from '../context/news/NewsReducer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const News = () => {
	// {
	// 	data.map((post) => <li key={post.id}>{post.title}</li>);
	// }
	const [state, dispatch] = React.useReducer(NewsReducer, NewsState);

	const useStyles = makeStyles((theme) => ({
		root: {
			minWidth: 345,
			marginTop: 70,
		},
		media: {
			// height: 0,
			// paddingTop: '56.25%', // 16:9
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},
	}));
	const classes = useStyles();
	const ITEM_HEIGHT = 48;
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// Toggle Menu

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// menu styles

	const StyledMenu = withStyles({
		paper: {
			border: '1px solid #d3d4d5',
		},
	})((props) => (
		<Menu
			elevation={0}
			getContentAnchorEl={null}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			{...props}
		/>
	));

	const StyledMenuItem = withStyles((theme) => ({
		root: {
			'&:focus': {
				backgroundColor: theme.palette.primary.main,
				'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
					color: theme.palette.common.white,
				},
			},
		},
	}))(MenuItem);

	useEffect(() => {
		axios
			.get('https://www.hcmariupol.com.ua/api/data')
			.then(function (response) {
				// handle success
				dispatch({
					type: 'NEWS_DATA',
					payload: response,
				});
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);
	return (
		<div className="news_container">
			{state.newsData.map((post) => (
				<div key={post.id}>
					<Card className={classes.root}>
						<CardHeader
							action={
								<IconButton aria-label="settings" onClick={handleClick}>
									<MoreVertIcon />
								</IconButton>
							}
							title={post.title}
							// subheader={post.date}
							subheader={post.subtitle}
						/>

						<StyledMenu
							id="customized-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<StyledMenuItem>
								<ListItemIcon>
									<EditIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Edit" />
							</StyledMenuItem>
							<StyledMenuItem>
								<ListItemIcon>
									<DeleteIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Delete" />
							</StyledMenuItem>
							{/* <StyledMenuItem>
								<ListItemIcon>
									<InboxIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Inbox" />
							</StyledMenuItem> */}
						</StyledMenu>

						<CardMedia className={classes.media} component="img" src={post.img} title="Paella dish" />

						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								post date: {post.date}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								post category: {post.category}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								created ad: {post.created_at}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								updated at: {post.updated_at}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<IconButton aria-label="add to favorites">
								<FavoriteIcon />
							</IconButton>
							<IconButton aria-label="share">
								<ShareIcon />
							</IconButton>
							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
							>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography paragraph>Post Text:</Typography>
								<Typography paragraph>{post.text}</Typography>
							</CardContent>
						</Collapse>
					</Card>
				</div>
			))}

			<p></p>
		</div>
	);
};

export default News;
