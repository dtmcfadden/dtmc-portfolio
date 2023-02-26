import { useEffect, useState } from 'react';
import styles from './fraudgameDescription.module.css';

interface Props {
	titleText?: string | undefined;
	text?: string | undefined;
	children?: React.ReactNode | undefined;
}

export default function FraudGameDescription({ titleText, text, children }: Props) {
	return (
		<>
			<span>
				<span className={`${styles.cTriang}`} title={titleText} data-test="span"></span>
				{text && (
					<span className={`${styles.textAdj}`} data-test="text">
						{text}
					</span>
				)}
				{children && <>{children}</>}
			</span>
		</>
	);
}
