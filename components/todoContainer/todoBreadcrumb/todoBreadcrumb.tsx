import { userState } from '@/recoil/atoms/userAtom';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoBreadcrumb.module.css';
import { Container, ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

const TodoBreadcrumb = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(getThemeSiteState);

	return <Container className={`border ${themeBorder} rounded`}>Breadcrumb</Container>;
};

export default TodoBreadcrumb;
