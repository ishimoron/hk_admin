import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
	Typography,
	Paper,
	Grid,
	Button,
	CssBaseline,
	RadioGroup,
	FormLabel,
	MenuItem,
	FormGroup,
	FormControl,
	FormControlLabel,
} from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewsCreate = () => {
	const onSubmit = async (values) => {
		const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		await sleep(300);
		window.alert(JSON.stringify(values, 0, 2));
	};
	const validate = (values) => {
		const errors = {};
		if (!values.firstName) {
			errors.firstName = 'Required';
		}
		if (!values.lastName) {
			errors.lastName = 'Required';
		}
		if (!values.email) {
			errors.email = 'Required';
		}
		return errors;
	};
	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
			<CssBaseline />
			<Typography variant="h4" align="center" component="h1" gutterBottom>
				🚀 Create new Post
			</Typography>
			
			<Form
				onSubmit={onSubmit}
				initialValues={{ employed: true, stooge: 'larry' }}
				validate={validate}
				render={({ handleSubmit, reset, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit} noValidate>
						<Paper style={{ padding: 16 }}>
							<Grid container alignItems="flex-start" spacing={2}>
								<Grid item xs={6}>
									<Field
										fullWidth
										required
										name="firstName"
										component={TextField}
										type="text"
										label="First Name"
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										fullWidth
										required
										name="lastName"
										component={TextField}
										type="text"
										label="Last Name"
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name="email"
										fullWidth
										required
										component={TextField}
										type="email"
										label="Email"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										label="Employed"
										control={<Field name="employed" component={Checkbox} type="checkbox" />}
									/>
								</Grid>
								<Grid item>
									<FormControl component="fieldset">
										<FormLabel component="legend">Best Stooge</FormLabel>
										<RadioGroup row>
											<FormControlLabel
												label="Larry"
												control={
													<Field name="stooge" component={Radio} type="radio" value="larry" />
												}
											/>
											<FormControlLabel
												label="Moe"
												control={
													<Field name="stooge" component={Radio} type="radio" value="moe" />
												}
											/>
											<FormControlLabel
												label="Curly"
												control={
													<Field name="stooge" component={Radio} type="radio" value="curly" />
												}
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item>
									<FormControl component="fieldset">
										<FormLabel component="legend">Sauces</FormLabel>
										<FormGroup row>
											<FormControlLabel
												label="Ketchup"
												control={
													<Field
														name="sauces"
														component={Checkbox}
														type="checkbox"
														value="ketchup"
													/>
												}
											/>
											<FormControlLabel
												label="Mustard"
												control={
													<Field
														name="sauces"
														component={Checkbox}
														type="checkbox"
														value="mustard"
													/>
												}
											/>
											<FormControlLabel
												label="Salsa"
												control={
													<Field
														name="sauces"
														component={Checkbox}
														type="checkbox"
														value="salsa"
													/>
												}
											/>
											<FormControlLabel
												label="Guacamole 🥑"
												control={
													<Field
														name="sauces"
														component={Checkbox}
														type="checkbox"
														value="guacamole"
													/>
												}
											/>
										</FormGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Field fullWidth name="notes" component={TextField} multiline label="Notes" />
								</Grid>
								<Grid item xs={12}>
									<Field
										fullWidth
										name="city"
										component={Select}
										label="Select a City"
										formControlProps={{ fullWidth: true }}
									>
										<MenuItem value="London">London</MenuItem>
										<MenuItem value="Paris">Paris</MenuItem>
										<MenuItem value="Budapest">A city with a very long Name</MenuItem>
									</Field>
									<CKEditor
										editor={ClassicEditor}
										data="<p>Hello from CKEditor 5!</p>"
										onReady={(editor) => {
											// You can store the "editor" and use when it is needed.
											console.log('Editor is ready to use!', editor);
										}}
										onChange={(event, editor) => {
											const data = editor.getData();
											console.log({ event, editor, data });
										}}
										onBlur={(event, editor) => {
											console.log('Blur.', editor);
										}}
										onFocus={(event, editor) => {
											console.log('Focus.', editor);
										}}
									/>
								</Grid>

								<Grid item style={{ marginTop: 16 }}>
									<Button
										type="button"
										variant="contained"
										onClick={reset}
										disabled={submitting || pristine}
									>
										Reset
									</Button>
								</Grid>
								<Grid item style={{ marginTop: 16 }}>
									<Button variant="contained" color="primary" type="submit" disabled={submitting}>
										Submit
									</Button>
								</Grid>
							</Grid>
						</Paper>
						<pre>{JSON.stringify(values, 0, 2)}</pre>
					</form>
				)}
			/>
		</div>
	);
};

export default NewsCreate;
