import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { Typography, Paper, Grid, Button, CssBaseline } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';

import API from '../utils/API';

const NewsCreate = () => {
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
		API.post('/create', {
			title: body.Title,
			subtitle: body.subtitle,
			img: body.img,
			date: body.date,
			category: body.category,
		})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		// alert(body)
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

	const handleText = (e) => {
		setBody({
			text: e.target.value,
		});
	};

	const handleCategory = (e) => {
		setBody({
			category: e.target.value,
		});
	};

	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
			<CssBaseline />
			<Typography variant="h4" align="center" component="h1" gutterBottom>
				🚀 Create new Post
			</Typography>
			<form onSubmit={handleSubmit} noValidate>
				<Paper style={{ padding: 20 }}>
					<Grid container alignItems="flex-start" spacing={2}>
						<Grid item xs={12}>
							<TextField name="Title" fullWidth type="text" label="Title" onChange={handleTitle} />
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="SubTitle"
								fullWidth
								type="text"
								label="SubTitle"
								onChange={handleSubtitle}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="Category"
								fullWidth
								type="text"
								label="Category"
								onChange={handleCategory}
							/>
						</Grid>

						<Grid item xs={12}>
							<CKEditor
								editor={ClassicEditor}
								data="<p>Hello from CKEditor 5!</p>"
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

						<Grid item style={{ marginTop: 16 }}>
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</form>
		</div>
	);
};

export default NewsCreate;
