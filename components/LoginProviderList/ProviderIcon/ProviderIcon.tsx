import { useEffect, useState } from 'react';
import styles from './ProviderIcon.module.css';
import { Github, Google } from 'react-bootstrap-icons';

interface props {
	providerName: string;
	iconWidth?: string;
	iconHeight?: string;
}

export default function ProviderIcon({ providerName, iconWidth, iconHeight }: props) {
	// console.log('ProviderIcon', ProviderIcon);
	// const [providerLower, setProviderLower] = useState('');

	if (providerName) {
		// setProviderLower(providerName.toLowerCase());
		const providerLower = providerName.toLowerCase();

		return (
			<>
				{providerLower == 'github' && <Github className={styles.textBottom} width={iconWidth} height={iconHeight} />}
				{providerLower == 'google' && <Google className={styles.textBottom} width={iconWidth} height={iconHeight} />}
			</>
		);
	} else {
		return <></>;
	}
}
