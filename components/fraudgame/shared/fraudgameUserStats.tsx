import { Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';

interface IUserStats {
	user_action_is_fraud_count: number | null;
	user_action_count: number | null;
	user_correct_match: number | null;
}

export default function FraudUserStats({
	user_action_is_fraud_count,
	user_action_count,
	user_correct_match,
}: IUserStats) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="User Statistics" text="">
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>User Action Is Fraud Count</td>
						<td>{user_action_is_fraud_count}</td>
					</tr>
					<tr>
						<td>User Action Non Fraud Count</td>
						<td>{user_action_count && user_action_is_fraud_count && user_action_count - user_action_is_fraud_count}</td>
					</tr>
					<tr>
						<td>User Action Count</td>
						<td>{user_action_count}</td>
					</tr>
					<tr>
						<td>User Correct Match Count</td>
						<td>{user_correct_match}</td>
					</tr>
				</tbody>
			</Table>
		</CustomCard>
	);
}
