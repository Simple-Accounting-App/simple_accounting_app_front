import './App.css';

import Accounts from './components/accounts.jsx';

function App() {
  return (
    <div>
      <h2>Simple Accounting App</h2>
      <h2>Current user: Astérix</h2>
      <br/>
      <h3>Accounts</h3>
      <Accounts />
      <br/>
      <h3>Transactions</h3>
    </div>
  );
}

export default App;
