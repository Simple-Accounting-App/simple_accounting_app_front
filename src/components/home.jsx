import {useNavigate} from 'react-router-dom';

import Transactions from './transactions.jsx';
import Accounts from './accounts.jsx';

export default function Home() {
  let navigate = useNavigate(); 
  const navigateToTransactionForm = () =>{ 
    navigate(`/transaction/new`);
  };
  return (
    <div>
      <h2>Simple Accounting App</h2>
      <h2>Current user: Astérix</h2>
      <br/>
      <h3>Accounts</h3>
      <Accounts />
      <br/>
      <h3>Transactions</h3>
      <Transactions />
      <br/>
      <button onClick={navigateToTransactionForm}>
        New transaction
      </button>
    </div>
  );
}