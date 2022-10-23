import { useQuery, gql } from '@apollo/client';

const GET_ACCOUNTS = gql`
  {
    currentUserAccounts {
      id
      name  
    }
  }
`;

export default function TransactionFormAccountInput(props) {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const name = props.name;
  let value = props.value;
  const handleChange = props.handleChange;

  return( 
    <select
      name={name}
      value={value}
      onChange={handleChange}
      type='number'
      placeholder='Select account'
    >
      <option value='' selected disabled hidden>Select an account</option>
      { data.currentUserAccounts.map(({ id, name }) => 
        <option value={id}>{name}</option>
      ) }
    </select>
  );
}