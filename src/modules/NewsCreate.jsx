import { useState } from 'react';

import { Typography, Paper, Grid, Button, CssBaseline, TextField } from '@material-ui/core';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';


const NewsCreate = () => {
	const gregorianToday = utils().getToday();
	const [selectedDay, setSelectedDay] = useState(gregorianToday);
	console.log(selectedDay);

	const [body, setBody] = useState({
		title: '',
		subtitle: '',
		text: '',
		img: 'some src',
		date: `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`,
		category: 1,
	});

	const handleSubmit = async () => {
		const response = await fetch('https://www.hcmariupol.com.ua/api/create', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.text();

		console.log(result);
	};
	// const handleSubmit = () => {
	// 	API.get('/create', {
	// 		title: body.Title,
	// 		subtitle: body.subtitle,
	// 		text: body.text,
	// 		img: body.img,
	// 		date: body.date,
	// 		category: body.category,
	// 	})
	// 		.then(function (response) {
	// 			console.log(response);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };
	console.log(body);

	const handleTitle = (e) => {
		setBody({
			...body,
			title: e.target.value,
		});
	};

	const handleSubtitle = (e) => {
		setBody({
			...body,
			subtitle: e.target.value,
		});
	};

	const handleCategory = (e) => {
		setBody({
			...body,
			category: e.target.value,
		});
	};

	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
			<CssBaseline />
			<Typography variant="h4" align="center" component="h1" gutterBottom>
				🚀 Create new Post
			</Typography>
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
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<TextField
								name="category"
								fullWidth
								type="text"
								label="Category"
								required
								onChange={handleCategory}
							/>
						</Grid> */}

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
										...body,
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
							<Button variant="contained" color="primary" type="button" fullWidth onClick={handleSubmit}>
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
