import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import TransactionFormErrors from './transaction_form_errors.jsx';
import TransactionFormAccountInput from './transaction_form_account_input.jsx';

const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction(
    $debitAccountId: ID!
    $creditAccountId: ID! 
    $amount: String!
    $transferDate: ISO8601DateTime!
  ) {
    createTransaction(input:{debitAccountId: $debitAccountId, creditAccountId: $creditAccountId, amount: $amount, transferDate: $transferDate}) {
      success
      errors
      transaction {
        id
      }
    }
  }
`;

export default function TransactionForm() {
  let navigate = useNavigate(); 
  const navigateToHome = () => { 
    navigate(`/`, {replace: true});
    // To refresh home page
    navigate(0);
  };

  // State management 
  const [formState, setFormState] = useState({
    creditAccountId: '',
    debitAccountId: '',
    amount: '',
    transferDate: new Date().toISOString().slice(0, 10) // Today's date in format yyyy-mm-dd
  });

  function handleChange(evt) {
    console.log(evt);
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value
    });
  }

  // Call to GraphQL Mutation to create a transaction
  const [createTransaction, { data, loading, error }] = useMutation(CREATE_TRANSACTION_MUTATION, {
    variables: {
      creditAccountId: formState.creditAccountId,
      debitAccountId: formState.debitAccountId,
      amount: formState.amount,
      transferDate: formState.transferDate
    },
    onCompleted: (data) => {
      if (data.createTransaction.success) navigateToHome();
    }
  });

  if (loading) return 'Submitting...';
  
  return ( 
    <div>
      <h2>Create a new transaction</h2>
      <TransactionFormErrors graphQLErrors={error} data={data} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTransaction();
        }}
      >
        <div>
          <TransactionFormAccountInput 
            name='debitAccountId' 
            value={formState.debitAccountId} 
            handleChange={handleChange}
          />
          <TransactionFormAccountInput 
            name='creditAccountId' 
            value={formState.creditAccountId} 
            handleChange={handleChange}
          />
          <input
            name='amount'
            value={formState.amount}
            onChange={handleChange}
            type='text'
            placeholder='Enter a positive amount'
          />
          <input
            name='transferDate'
            value={formState.transferDate}
            onChange={handleChange}
            type='date'
            placeholder='Choose transfer date'
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <button onClick={navigateToHome}>
        Cancel
      </button>
    </div>
  );
}
