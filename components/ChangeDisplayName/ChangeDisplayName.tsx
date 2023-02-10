import { useEffect, useState } from 'react';
// import styles from './ChangeUsername.module.css';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import React from 'react';
import { Formik, useFormik, useFormikContext } from 'formik';
import axios from 'axios';
import { server } from '@/config/index';
import { yupFormName } from '@/lib/yup/schema/user.schema.yup';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { userState } from '@/recoil/atoms/userAtom';

export default function ChangeUserName() {
	// console.log('ChangeUserName name', name);
	const [validated, setValidated] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const {
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
		button: themeButton,
	} = useRecoilValue(selectThemeSiteState);
	const [user, setUserState] = useRecoilState(userState);
	const [formValues, setFormValues] = useState({ formDisplayName: user.name });
	// const { values: formValues } = useFormikContext();
	// console.log('ChangeUserName user', user);

	useEffect(() => {
		setFormValues({ formDisplayName: user.name });
	}, [user.name]);
	// useEffect(() => {
	// 	console.log('ChangeUserName useEffect user.name', user.name);
	// 	setUsername(user.name);
	// }, [user, setUsername]);

	const handleSubmit = async (fields: any, { setSubmitting }: any) => {
		// console.log('handleSubmit fields', fields);
		// console.log('handleSubmit user?.name', user?.name);
		if (fields.formDisplayName != user?.name) {
			setIsSubmitted(false);
			setSubmitting(true);
			const { data, status } = await axios.put(
				`${server}/api/user/profile`,
				{
					displayName: fields.formDisplayName,
				},
				{
					responseType: 'json',
				},
			);
			// console.log('ChangeUserName data', data);
			if (data.error != '') {
				setErrorMessage(data.error);
			} else {
				setErrorMessage('');
				setUserState({ ...user, ...{ name: data.profile.name } });
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
		<Formik
			enableReinitialize={true}
			validationSchema={yupFormName}
			onSubmit={handleSubmit}
			initialValues={formValues}
			// initialValues={{ formDisplayName: user.name ? user.name : '' }}
		>
			{({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, isSubmitting }) => (
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formProfileName">
						<Form.Label>Display Name</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								required
								type="text"
								placeholder="Display Name"
								name="formDisplayName"
								className="px-2 py-1 rounded"
								value={values.formDisplayName}
								// value={user?.name}
								onFocus={handleInputFocus}
								onChange={handleChange}
								isInvalid={!!errors.formDisplayName}
							/>
							<Form.Control.Feedback type="invalid">{errors.formDisplayName}</Form.Control.Feedback>
						</InputGroup>
						<Form.Text id="nameHelpBlock" className={themeText}>
							Name displayed on the website.
						</Form.Text>
						{errorMessage && (
							<Form.Text id="errorHelpBlock" className="text-danger">
								{errorMessage}
							</Form.Text>
						)}
					</Form.Group>
					<Button
						variant={themeVariant}
						type="submit"
						disabled={!isValid || isSubmitting}
						className={`w-100 submit ${themeButton} border ${
							errorMessage == '' ? (isSubmitted ? 'border-success' : themeBorder) : 'border-danger'
						}`}
					>
						Change
						{isSubmitting && <Spinner animation="border" size="sm" />}
					</Button>
				</Form>
			)}
		</Formik>
	);
}
