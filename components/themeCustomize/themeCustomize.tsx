import { Button, Col, FloatingLabel, Form, InputGroup, Row, Spinner, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import styles from './themeSwitcher.module.css';
import { siteThemeState, previewThemeState } from '@/recoil/atoms/themeSiteAtom';
import { Formik } from 'formik';
import axios from 'axios';
import React from 'react';
import { server } from '@/config/index';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { ThemePrefs, DefaultColor, BorderColor, TextColor } from '@/interfaces/userPrefs.interface';
import { yupThemePrefs, yupThemePrefsForm } from '@/lib/yup/form/theme.yup';
import { useSession } from 'next-auth/react';
import _ from 'lodash';

export default function ThemeCustomize() {
	const [validated, setValidated] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const { variant: themeVariant } = useRecoilValue(getThemeSiteState);

	const [siteTheme, setSiteTheme] = useRecoilState(siteThemeState);
	const [previewTheme, setPreviewTheme] = useRecoilState(previewThemeState);

	const [formCustom, setFormCustom] = useState(previewTheme.theme[previewTheme.isDark === true ? 1 : 0]);

	const { data: session, status } = useSession();

	const defaultFormValue = {
		formUseCustom: previewTheme.useCustom,
		formIsDarkCustom: previewTheme.isDark,
		formPage: formCustom.page,
		formBg: formCustom.bg,
		formVariant: formCustom.variant,
		formText: formCustom.text,
		formBorder: formCustom.border,
	};

	useEffect(() => {
		setFormCustom(previewTheme.theme[previewTheme.isDark === false ? 0 : 1]);
		// console.log('useEffect previewTheme', previewTheme);
	}, [previewTheme, status]);

	const handleSubmit = async (fields: any, { setSubmitting }: any) => {
		// console.log('handleSubmit fields', fields);
		// console.log('handleSubmit previewTheme', previewTheme);

		let returnTheme = {
			...{ isDark: previewTheme.isDark },
			...{ useCustom: previewTheme.useCustom },
			...{ theme: previewTheme.theme },
		};

		// const themePrefBlockCheck = await yupThemePrefsBlock.isValid(previewTheme.theme[0]);
		// console.log('themePrefBlockCheck', themePrefBlockCheck);

		// const themeBlockCheck = await yupThemeBlock.isValid(previewTheme.theme);
		// console.log('themeBlockCheck', themeBlockCheck);
		// console.log('returnTheme', returnTheme);

		const themeCheck = await yupThemePrefs.isValid(returnTheme);
		// console.log('themeCheck', themeCheck);

		if (themeCheck === true) {
			setIsSubmitted(false);
			setSubmitting(true);
			const { data, status } = await axios.put(`${server}/api/user/theme`, returnTheme, {
				responseType: 'json',
			});
			// console.log('ThemeCustomize status', status, 'data', data);
			if (_.isEmpty(data.error) == false) {
				setErrorMessage(data.error);
			} else {
				setErrorMessage('');
				// console.log('data', data);
				const applyTheme = { ...data.theme, ...{ s: 'storage' } };
				setSiteTheme({ ...applyTheme, ...{ session: false } });
				setPreviewTheme({ ...applyTheme, ...{ usePreview: false } });
				setIsSubmitted(true);
			}
		}
		setSubmitting(false);
	};

	const handleFormInputCheckChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		inputType: 'isDark' | 'usePreview' | 'useCustom',
	) => {
		setPreviewTheme({ ...previewTheme, ...{ [inputType]: event.currentTarget.checked } });
	};

	const handleFormInputSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
		inputType: 'page' | 'bg' | 'variant' | 'text' | 'border',
	) => {
		let previewThemeClone = JSON.parse(JSON.stringify(previewTheme));
		previewThemeClone.theme[previewTheme.isDark === false ? 0 : 1][inputType] = event.currentTarget.value;
		// console.log('handleFormInputChange previewTheme', previewThemeClone);
		setPreviewTheme(previewThemeClone);
	};

	return (
		<Formik validationSchema={yupThemePrefsForm} onSubmit={handleSubmit} initialValues={defaultFormValue}>
			{({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, isSubmitting }) => (
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formPreview">
						<Form.Check
							type="checkbox"
							name="formPreview"
							label="Preview Theme"
							checked={previewTheme.usePreview}
							onChange={(e) => {
								handleFormInputCheckChange(e, 'usePreview');
							}}
						/>
					</Form.Group>

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3" controlId="formUseCustom">
								<InputGroup hasValidation>
									<Form.Check
										type="checkbox"
										name="formUseCustom"
										label="Use custom colors"
										checked={previewTheme.useCustom}
										onChange={(e) => {
											handleChange(e);
											handleFormInputCheckChange(e, 'useCustom');
										}}
										isInvalid={!!errors.formUseCustom}
									/>
									<Form.Control.Feedback type="invalid">{errors.formUseCustom}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3" controlId="formIsDarkCustom">
								<InputGroup hasValidation>
									<Form.Check
										type="switch"
										name="formIsDarkCustom"
										label="Dark Theme"
										checked={previewTheme.isDark}
										onChange={(e) => {
											handleFormInputCheckChange(e, 'isDark');
										}}
										isInvalid={!!errors.formIsDarkCustom}
									/>
									<Form.Control.Feedback type="invalid">{errors.formIsDarkCustom}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col lg={6} className="px-1">
							<Form.Group className="mb-3" controlId="formPage">
								<InputGroup hasValidation>
									<FloatingLabel controlId="formPageLabel" label="Background Page Color" className="text-dark">
										<Form.Select
											aria-label="Background page color"
											name="formPage"
											value={formCustom.page}
											onChange={(e) => {
												handleChange(e);
												handleFormInputSelectChange(e, 'page');
											}}
											isInvalid={!!errors.formPage}
										>
											{Object.keys(DefaultColor).map((value, index) => (
												<option key={value} value={Object.values(DefaultColor)[index]}>
													{value}
												</option>
											))}
										</Form.Select>
									</FloatingLabel>
									<Form.Control.Feedback type="invalid">{errors.formPage}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col lg={6} className="px-1">
							<Form.Group className="mb-3" controlId="formBg">
								<InputGroup hasValidation>
									<FloatingLabel controlId="formBgLabel" label="Background Color" className="text-dark">
										<Form.Select
											aria-label="Background color"
											name="formBg"
											value={formCustom.bg}
											onChange={(e) => {
												handleChange(e);
												handleFormInputSelectChange(e, 'bg');
											}}
											isInvalid={!!errors.formBg}
										>
											{Object.keys(DefaultColor).map((value, index) => (
												<option key={value} value={Object.values(DefaultColor)[index]}>
													{value}
												</option>
											))}
										</Form.Select>
									</FloatingLabel>
									<Form.Control.Feedback type="invalid">{errors.formBg}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col lg={4} className="px-1">
							<Form.Group className="mb-3" controlId="formVariant">
								<InputGroup hasValidation>
									<FloatingLabel controlId="formVariantLabel" label="Variant Color" className="text-dark">
										<Form.Select
											aria-label="Variant color"
											name="formVariant"
											value={formCustom.variant}
											onChange={(e) => {
												handleChange(e);
												handleFormInputSelectChange(e, 'variant');
											}}
											isInvalid={!!errors.formVariant}
										>
											{Object.keys(DefaultColor).map((value, index) => (
												<option key={value} value={Object.values(DefaultColor)[index]}>
													{value}
												</option>
											))}
										</Form.Select>
									</FloatingLabel>
									<Form.Control.Feedback type="invalid">{errors.formVariant}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col lg={4} className="px-1">
							<Form.Group className="mb-3" controlId="formText">
								<InputGroup hasValidation>
									<FloatingLabel controlId="formTextLabel" label="Text Color" className="text-dark">
										<Form.Select
											aria-label="Text color"
											name="formText"
											value={formCustom.text}
											onChange={(e) => {
												handleChange(e);
												handleFormInputSelectChange(e, 'text');
											}}
											isInvalid={!!errors.formText}
										>
											{Object.keys(TextColor).map((value, index) => (
												<option key={value} value={Object.values(TextColor)[index]}>
													{value}
												</option>
											))}
										</Form.Select>
									</FloatingLabel>
									<Form.Control.Feedback type="invalid">{errors.formText}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col lg={4} className="px-1">
							<Form.Group className="mb-3" controlId="formBorder">
								<InputGroup hasValidation>
									<FloatingLabel controlId="formBorderLabel" label="Border Color" className="text-dark">
										<Form.Select
											aria-label="Border color"
											name="formBorder"
											value={formCustom.border}
											onChange={(e) => {
												handleChange(e);
												handleFormInputSelectChange(e, 'border');
											}}
											isInvalid={!!errors.formBorder}
										>
											{Object.keys(BorderColor).map((value, index) => (
												<option key={value} value={Object.values(BorderColor)[index]}>
													{value}
												</option>
											))}
										</Form.Select>
									</FloatingLabel>
									<Form.Control.Feedback type="invalid">{errors.formBorder}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group>
						{errorMessage && (
							<Form.Text id="errorHelpBlock" className="text-danger">
								{errorMessage}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group>
						<Button
							variant={themeVariant}
							type="submit"
							disabled={!isValid || isSubmitting}
							className={`w-100 submit border ${
								errorMessage == '' ? (isSubmitted ? 'border-success' : 'border-dark') : 'border-danger'
							}`}
						>
							Save
							{isSubmitting && <Spinner animation="border" size="sm" />}
						</Button>
					</Form.Group>
				</Form>
			)}
		</Formik>
	);
}