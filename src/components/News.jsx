import React, { useState } from 'react';
import { useEffect } from 'react';
import './News.css';

import API from '../utils/API';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewsState from '../context/news/NewsState';
import NewsReducer from '../context/news/NewsReducer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Paper, Grid, Button, TextField } from '@material-ui/core';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useFileUpload } from 'use-file-upload';

const News = () => {
	const [state, dispatch] = React.useReducer(NewsReducer, NewsState);

	// upload image 
	const defaultSrc =
		'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png';

	const [files, selectFiles] = useFileUpload();

	//form setup

	const gregorianToday = utils().getToday();
	const [selectedDay, setSelectedDay] = useState(gregorianToday);
	console.log(selectedDay);

	const [body, setBody] = useState({
		title: '',
		subtitle: '',
		text: '',
		img: 'some src',
		date: { selectedDay },
		category: '',
	});
	const handleSubmit = () => {
		// API.post('/change', {
		// 	title: body.Title,
		// 	subtitle: body.subtitle,
		// 	text: body.text,
		// 	img: body.img,
		// 	date: body.date,
		// 	category: body.category,
		// })
		// 	.then(function (response) {
		// 		console.log(response);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	};
	console.log(body);

	const handleTitle = (e) => {
		setBody({
			title: e.target.value,
		});
	};

	const handleSubtitle = (e) => {
		setBody({
			subtitle: e.target.value,
		});
	};

	const handleCategory = (e) => {
		setBody({
			category: e.target.value,
		});
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			width: 345,
			height: 500,
			marginTop: '25%',
			marginLeft: 15,
			fontSize: '16px',
			// color: 'blue',
		},
		titleText: {
			fontSize: '0.5rem !important',
			color: 'blue',
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
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}));
	const classes = useStyles();
	// const [expanded, setExpanded] = React.useState(false);
	// const handleExpandClick = () => {
	// 	setExpanded(!expanded);
	// };

	// Toggle Menu

	const [anchorEl, setAnchorEl] = React.useState(null);
	// const open = Boolean(anchorEl);

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

	// handle settings edit button
	const [openEditModal, setOpenEditModal] = React.useState(false);

	const handleModalOpen = () => {
		setOpenEditModal(true);
	};

	const handleModalClose = () => {
		setOpenEditModal(false);
	};

	// if (handleModalOpen) {
	// 	handleClose
	// } else {
	// 	handleModalOpen
	// }

	// handle setting delete button
	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const handleDeleteOpen = () => {
		setOpenDeleteModal(true);
	};

	const handleDeleteClose = () => {
		setOpenDeleteModal(false);
	};

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
		API.get('/data')
			.then(function (response) {
				// handle success
				dispatch({
					type: 'NEWS_DATA',
					payload: response,
				});
				console.log(response);
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
						<CardMedia component="img" src={post.img} />
						<CardHeader
							action={
								<IconButton aria-label="settings" onClick={handleClick}>
									<MoreVertIcon />
								</IconButton>
							}
							className={classes.media}
							title={post.title}
							variant="h3"
							// subheader={post.date}
							// subheader={post.subtitle}
						>
							{/* <Typography variant="body2" color="textSecondary" component="p">
							{post.title}
							</Typography> */}
						</CardHeader>
						{/* modal */}
						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							className={classes.modal}
							open={openEditModal}
							onClose={handleModalClose}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}
						>
							{/* <Fade in={open}> */}
							<form>
								<Paper style={{ padding: 20 }}>
									<Grid container alignItems="center" spacing={2}>
										<Grid item xs={12}>
											<TextField
												name="title"
												fullWidth
												type="text"
												label="Title"
												onChange={handleTitle}
												required
												value={body.title}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												name="subtitle"
												fullWidth
												type="text"
												label="SubTitle"
												required
												onChange={handleSubtitle}
												value={body.subtitle}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												name="category"
												fullWidth
												type="text"
												label="Category"
												required
												onChange={handleCategory}
											/>
										</Grid>

										<Grid item xs={12}>
											<CKEditor
												editor={ClassicEditor}
												data={body.text}
												// onReady={(editor) => {
												// 	// You can store the "editor" and use when it is needed.
												// 	console.log('Editor is ready to use!', editor);
												// }}
												onChange={(event, editor) => {
													const data = editor.getData();
													setBody({
														text: data,
													});
												}}
												// onBlur={(event, editor) => {
												// 	console.log('Blur.', editor);
												// }}
												// onFocus={(event, editor) => {
												// 	console.log('Focus.', editor);
												// }}
											/>
										</Grid>

										<Grid container item xs={12} justify="center" alignItems="center">
											<DatePicker
												value={selectedDay}
												onChange={setSelectedDay}
												inputPlaceholder="Select a day"
												// renderInput={renderCustomInput}
											/>
										</Grid>

										<Grid item xs={12} style={{ marginTop: 16 }}>
											<Button
												variant="contained"
												color="primary"
												type="button"
												fullWidth
												onClick={handleSubmit}
											>
												Submit
											</Button>
										</Grid>
									</Grid>
								</Paper>
							</form>
							{/* </Fade> */}
						</Modal>
						<Dialog open={openDeleteModal} onClose={handleDeleteClose}>
							<DialogTitle id="alert-dialog-title">Удалить пост?</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">Пост будет удален</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleDeleteClose} color="primary">
									Отменить
								</Button>
								<Button onClick={handleDeleteClose} color="primary" autoFocus>
									Удалить!
								</Button>
							</DialogActions>
						</Dialog>
						<StyledMenu
							id="customized-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<StyledMenuItem onClick={handleModalOpen}>
								<ListItemIcon>
									{/* <EditIcon fontSize="small" onClick={handleModalOpen ? handleClose : handleModalOpen} /> */}
									<EditIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Edit" />
							</StyledMenuItem>
							<StyledMenuItem onClick={handleDeleteOpen}>
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
							{/* <Typography variant="body2" color="textSecondary" component="p">
								updated at: {post.updated_at}
							</Typography> */}
						</CardContent>
						{/* <Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography paragraph>Post Text:</Typography>
								<Typography paragraph>{post.text}</Typography>
							</CardContent>
						</Collapse> */}
					</Card>
				</div>
			))}

			<p></p>
		</div>
	);
};

export default News;
