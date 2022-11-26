import { useEffect, useState } from 'react';
// import styles from './ChangeUsername.module.css';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import React from 'react';
import { Formik, useFormik, useFormikContext } from 'formik';
import axios from 'axios';
import { server } from '@/config/index';
import { formName } from '@/lib/yup/schema/user.schema';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { userState } from '@/recoil/atoms/userAtom';
import { signOut } from 'next-auth/react';

export default function DeleteUserData() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const {
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
		button: themeButton,
	} = useRecoilValue(getThemeSiteState);
	const [user, setUserState] = useRecoilState(userState);

	const handleDeleteUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		const conf = confirm(`Are you sure you want to delete all data form ${user.name}`);
		if (conf === true) {
			setIsSubmitting(true);
			// console.log('handleDeleteUser Delete User');

			const { data, status } = await axios.delete(`${server}/api/user`);
			// console.log('DeleteUserData data', data);
			// console.log('DeleteUserData status', status);
			if (data.error && data.error != '') {
				setErrorMessage(data.error);
			} else {
				setErrorMessage('');
				setIsSubmitted(true);
				console.log('window.location.origin', window.location.origin);
				signOut({
					callbackUrl: `${window.location.origin}`,
				});
			}
			setIsSubmitting(false);
		}
	};

	return (
		<Form>
			{errorMessage && (
				<Form.Text id="errorHelpBlock" className="text-danger">
					{errorMessage}
				</Form.Text>
			)}
			<Button
				type="button"
				disabled={isSubmitting}
				className={`w-100 submit btn btn-danger border ${
					errorMessage == '' ? (isSubmitted ? 'border-success' : themeBorder) : 'border-danger'
				}`}
				onClick={(e) => {
					e.preventDefault();
					handleDeleteUser(e);
				}}
			>
				Delete User Data
				{isSubmitting && <Spinner animation="border" size="sm" />}
			</Button>
		</Form>
	);
}
