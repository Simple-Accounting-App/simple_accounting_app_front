import { useQuery, gql } from '@apollo/client';
import { Table } from 'antd';

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

  const columns = [
    {
      title: 'Debit account',
      dataIndex: 'debitAccount',
      key: 'debitAccount',
    },
    {
      title: 'Credit account',
      dataIndex: 'debitAccount',
      key: 'debitAccount',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Transfer Date',
      dataIndex: 'transferDate',
      key: 'transferDate',
    },
  ];

  let dataSource = data.currentUserTransactions.map(({ amount, transferDate, debitAccount, creditAccount }) => (
    {
      debitAccount: debitAccount.user.name + "'s " + debitAccount.name,
      creditAccount: creditAccount.user.name + "'s " + creditAccount.name,
      transferDate: formatDate(transferDate),
      amount: amount
    }
  ));

  return( 
    <Table dataSource={dataSource} columns={columns}/>
  );
}

