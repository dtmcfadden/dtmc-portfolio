import { BuiltInProviderType } from 'next-auth/providers';
import { getProviders, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import styles from './LoginProviderList.module.css';
import ProviderIcon from './ProviderIcon/ProviderIcon';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useRecoilValue } from 'recoil';

export default function LoginProviderList() {
	// console.log('LoginProviderList');
	const {
		isDark,
		bg: themeBg,
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
	} = useRecoilValue(selectThemeSiteState);
	const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>>();

	useEffect(() => {
		(async () => {
			// console.log('LoginProviderList', 'useEffect');
			const res = await getProviders();
			// console.log('LoginProviderList', 'res', res);
			if (res) {
				setProviders(res);
			}
		})();
	}, []);

	return (
		<>
			<ListGroup>
				{providers &&
					Object.values(providers).map((provider) => (
						<ListGroup.Item key={provider.name} className={`p-0 ${themeBorder}`}>
							<Button
								className={'w-100'}
								variant="dark"
								onClick={() => {
									signIn(provider.id);
								}}
							>
								<ProviderIcon providerName={provider.name} iconWidth={'1.25em'} iconHeight={'1.25em'} />
								<span className={'ml-1'}>{provider.name}</span>
							</Button>
						</ListGroup.Item>
					))}
			</ListGroup>
		</>
	);
}
