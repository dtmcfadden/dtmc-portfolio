import { Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';

interface IUserStats {
	trans_is_fraud_count: number | null;
	trans_total_count: number | null;
}

export default function FraudTransStats({ trans_is_fraud_count, trans_total_count }: IUserStats) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="Transaction Statistics" text="">
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>Transaction Fraud Count</td>
						<td data-test="trans_is_fraud_count">{trans_is_fraud_count}</td>
					</tr>
					<tr>
						<td>Transaction Non Fraud Count</td>
						<td data-test="trans_non_fraud_count">
							{trans_total_count && trans_is_fraud_count && trans_total_count - trans_is_fraud_count}
						</td>
					</tr>
					<tr>
						<td>Transaction Total Count</td>
						<td data-test="trans_total_count">{trans_total_count}</td>
					</tr>
				</tbody>
			</Table>
		</CustomCard>
	);
}
