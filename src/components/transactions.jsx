import { useQuery, gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
    {
        currentUserTransactions {
        amount
        transferDate
        debitAccount {
            name
            user {
            name
            }
        }
        creditAccount {
            name
            user {
            name
            }
        }
        }
    }
`;

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function Transactions() {        
    const { loading, error, data } = useQuery(GET_TRANSACTIONS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return( 
        <table>
            <tr>
                <th>Debit account</th>
                <th>Credit account</th>
                <th>Transfer date</th>
                <th>Amount</th>
            </tr>
            {data.currentUserTransactions.map(({ amount, transferDate, debitAccount, creditAccount }) => (
                <tr>
                    <td>{debitAccount.user.name}'s {debitAccount.name}</td>
                    <td>{creditAccount.user.name}'s {creditAccount.name}</td>
                    <td>{formatDate(transferDate)}</td>
                    <td>{amount}</td>
                </tr>
            ))}
        </table>
    );
}

