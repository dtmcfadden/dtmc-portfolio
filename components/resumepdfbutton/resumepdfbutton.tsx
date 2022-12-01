import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import styles from './resumepdfbutton.module.css';
import { FiletypePdf, Link } from 'react-bootstrap-icons';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function ResumePdfButton() {
	const { button: themeButton, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<Button
			type="button"
			href={`/static/David_McFadden_Resume.pdf`}
			target={`_resume`}
			className={`w-100 submit ${themeButton} border ${themeBorder} ${styles.resumeBtn}`}
		>
			<FiletypePdf size={16} className={`mx-2`} />
			Download Resume
		</Button>
	);
}
