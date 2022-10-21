import { useQuery, gql } from '@apollo/client';

const GET_ACCOUNTS = gql`
    {
        currentUserAccounts {
        name
        currentAmount
        }
    }
  
`;

export default function Accounts() {        
    const { loading, error, data } = useQuery(GET_ACCOUNTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return( 
        <table>
            <tr>
                <th>Name</th>
                <th>Current amount</th>
            </tr>
            {data.currentUserAccounts.map(({ name, currentAmount }) => (
                <tr>
                    <td>{name}</td>
                    <td>{currentAmount}</td>
                </tr>
            ))}
        </table>
    );
}

