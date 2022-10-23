import { useQuery, gql } from '@apollo/client';
import { Table } from 'antd';

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current amount',
      dataIndex: 'currentAmount',
      key: 'currentAmount',
    },
  ];

  let dataSource = data.currentUserAccounts.map(({ name, currentAmount }) => (
    {
      name: name,
      currentAmount: currentAmount,
    }
  ));

  return( 
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{position: ['none', 'none'],}}/>
    </div>
  );
}

