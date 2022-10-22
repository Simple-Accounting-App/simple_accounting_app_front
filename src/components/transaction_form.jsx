import {useNavigate} from 'react-router-dom';

export default function TransactionForm() {
  let navigate = useNavigate(); 
  const navigateToHome = () =>{ 
    navigate(`/`);
  };
  return( 
    <div>
      <h2>Create a new transaction</h2>
      <button onClick={navigateToHome}>
        Cancel
      </button>
    </div>
  );
}