import { useEffect, useState } from 'react';
// import styles from './ChangeUsername.module.css';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { server } from '@/config/index';
import { formName } from '@/lib/yup/schema/user.schema';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

interface props {
	name: string | null;
}

export default function ChangeUserName({ name }: props) {
	// console.log('ChangeUserName name', name);
	const [username, setUsername] = useState(name);
	const [validated, setValidated] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { variant: themeVariant, text: themeText } = useRecoilValue(getThemeSiteState);

	useEffect(() => {
		setUsername(name);
	}, [name]);

	const handleSubmit = async (fields: any, { setSubmitting }: any) => {
		// console.log('fields', fields);
		setIsSubmitted(false);
		setSubmitting(true);
		const { data, status } = await axios.put(
			`${server}/api/user/profile`,
			{
				originalDisplayName: username,
				displayName: fields.formDisplayName,
			},
			{
				responseType: 'json',
			},
		);
		// console.log('ChangeUserName data', data);
		if (data.error) {
			setErrorMessage(data.error);
		} else {
			setErrorMessage('');
			setUsername(data.profile.name);
			const event = new Event('visibilitychange');
			document.dispatchEvent(event);
			setIsSubmitted(true);
		}
		setSubmitting(false);
	};

	const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		const form = event.currentTarget;
		form.select();
	};

	return (
		<Formik
			validationSchema={formName}
			onSubmit={handleSubmit}
			initialValues={{ formDisplayName: username ? username : '' }}
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
								className="px-2 py-1"
								value={values.formDisplayName}
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
						className={`border ${
							errorMessage == '' ? (isSubmitted ? 'border-success' : 'border-dark') : 'border-danger'
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
