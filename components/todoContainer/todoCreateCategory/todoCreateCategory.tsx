import { userState } from '@/recoil/atoms/userAtom';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import { Formik, useFormik, useFormikContext } from 'formik';
import { server } from '@/config/index';
import axios from 'axios';
import styles from './todoCreateCategory.module.css';
import { Button, Col, Container, Form, InputGroup, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { yupCreateCategoryForm } from '@/lib/yup/todo/todoForm.yup';

const TodoCreateCategory = () => {
	const [validated, setValidated] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const {
		variant: themeVariant,
		border: themeBorder,
		button: themeButton,
		text: themeText,
	} = useRecoilValue(selectThemeSiteState);
	const [showBtnCat, setShowBtnCat] = useState(true);
	const [formValues, setFormValues] = useState({ formCategoryName: 'test' });

	const handleSubmit = async (fields: any, { setSubmitting }: any) => {
		console.log('handleSubmit fields', fields);
		// console.log('handleSubmit user?.name', user?.name);
		if (fields.formCategoryName != '') {
			setIsSubmitted(false);
			setSubmitting(true);
			const { data, status } = await axios.post(
				`${server}/api/todo/category/name`,
				{
					name: fields.formCategoryName,
				},
				{
					responseType: 'json',
				},
			);
			console.log('TodoCreateCategory data', data);
			if (data.error != '') {
				setErrorMessage(data.error);
			} else {
				setErrorMessage('');
				// setUserState({ ...user, ...{ name: data.profile.name } });
				setIsSubmitted(true);
			}
			setSubmitting(false);
		}
	};

	const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		const form = event.currentTarget;
		form.select();
	};

	return (
		<Container className={`border ${themeBorder} rounded p-0`}>
			<Row>
				<Col className={showBtnCat === true ? `d-none` : `d-block`}>
					<Button
						type="button"
						className={`w-100 submit btn-sm ${themeButton} border ${themeBorder}`}
						onClick={() => {
							setShowBtnCat(true);
						}}
					>
						{`Create Category`}
					</Button>
				</Col>
				<Col className={showBtnCat === false ? `d-none` : `d-block`}>
					<Formik
						enableReinitialize={true}
						validationSchema={yupCreateCategoryForm}
						onSubmit={handleSubmit}
						initialValues={formValues}
						// initialValues={{ formDisplayName: user.name ? user.name : '' }}
					>
						{({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, isSubmitting }) => (
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group controlId="formCategoryName">
									<InputGroup hasValidation>
										<Form.Control
											required
											type="text"
											placeholder="Category Name"
											name="formCategoryName"
											className="px-1 py-0 rounded"
											value={values.formCategoryName}
											// value={user?.name}
											onFocus={handleInputFocus}
											onChange={handleChange}
											isInvalid={!!errors.formCategoryName}
										/>
										<Form.Control.Feedback type="invalid">{errors.formCategoryName}</Form.Control.Feedback>
									</InputGroup>
									{errorMessage && (
										<Form.Text id="errorHelpBlock" className="text-danger">
											{errorMessage}
										</Form.Text>
									)}
								</Form.Group>
								<Row className={`m-0`}>
									<Col sm={10} className={`p-0`}>
										<Button
											variant={themeVariant}
											type="submit"
											disabled={!isValid || isSubmitting}
											className={`w-100 submit btn-sm ${themeButton} border ${
												errorMessage == '' ? (isSubmitted ? 'border-success' : themeBorder) : 'border-danger'
											}`}
										>
											{`Add Category`}
											{isSubmitting && <Spinner animation="border" size="sm" />}
										</Button>
									</Col>
									<Col sm={2} className={`p-0`}>
										<Button
											type="button"
											className={`w-100 btn-sm btn-danger border ${themeBorder}`}
											onClick={() => {
												setShowBtnCat(false);
											}}
										>
											{`X`}
										</Button>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
			{/* <Row>
				<Col>
					<Row className={`m-0`}>
						<Col sm={10} className={`p-0`}>
							<Button type="button" className={`w-100 text-nowrap btn-sm btn-primary border ${themeBorder}`}>
								{`Add Category`}
							</Button>
						</Col>
						<Col sm={2} className={`p-0`}>
							<Button
								type="button"
								className={`w-100 submit btn-sm btn-danger border ${themeBorder}`}
								onClick={() => {
									setShowBtnCat(false);
								}}
							>
								{`X`}
							</Button>
						</Col>
					</Row>
				</Col>
				<Col>

				</Col>
			</Row> */}
		</Container>
	);
};

export default TodoCreateCategory;
