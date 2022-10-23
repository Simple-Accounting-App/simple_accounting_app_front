import {useNavigate} from 'react-router-dom';
import { Layout, Button, PageHeader } from 'antd';
import { Col, Row } from 'antd';

import Transactions from './transactions.jsx';
import Accounts from './accounts.jsx';

const { Content } = Layout;

export default function Home() {
  let navigate = useNavigate(); 
  const navigateToTransactionForm = () =>{ 
    navigate(`/transaction/new`);
  };
  return (
    <Layout>
      <PageHeader
        className='site-page-header'
        title='Simple Accounting App'
        subTitle='Current user: Astérix'
      />
      <br/>
      <Content>
        <Row>
          <Col span={2}></Col>
          <Col span={22}><h3>Accounts</h3></Col>
        </Row>
        <br/>
        <Row>
          <Col span={1}></Col>
          <Col span={12}><Accounts /></Col>
          <br/>
        </Row>
        <br/>
        <br/>
        <Row>
          <Col span={2}></Col>
          <Col span={7}><h3>Transactions</h3></Col>
          <Col span={2}>
            <Button type='primary' onClick={navigateToTransactionForm}>
              New transaction
            </Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span={1}></Col>
          <Col span={12}><Transactions /></Col>
          <br/>
        </Row>
      </Content>
    </Layout>
  );
}