import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import { Layout, Button, PageHeader, Col, Row, Space, Form } from 'antd';

import TransactionFormErrors from './transaction_form_errors.jsx';
import TransactionFormAccountInput from './transaction_form_account_input.jsx';

const { Content } = Layout;

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
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value
    });
  }

  // Call to GraphQL Mutation to create a transaction
  const onSubmit = (e) => {
    createTransaction();
  }

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
    <Layout>
      <PageHeader
        className='site-page-header'
        title='Create a new transaction'
        subTitle='Current user: Astérix'
      />
      <Content>
        <Row>
          <Col span={1}></Col>
          <Col span={20}><TransactionFormErrors graphQLErrors={error} data={data} /></Col>
        </Row>
        <br/>
        <Form
          onFinish={onSubmit}
        >
          <Row>
            <Col span={1}></Col>
            <Col span={6}>
              <Row>
                <Space>
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
                </Space>
              </Row>
              <br/>
              <Row>
                <Space>
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
                </Space>
              </Row>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={1}></Col>
            <Col span={3}><Button type='primary' htmlType='submit'>Submit</Button></Col>
            <Col span={3}>
              <Button onClick={navigateToHome}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
        <br/>
      </Content>
    </Layout>
  );
}
