import React , { PureComponent } from 'react';
import { List, Button, Row, Col } from 'antd';
import { connect } from 'dva';

@connect(({  lists, loading }) => ({
  lists,
  // submitting: loading.effects['lists/addRemote'],
  submitting: loading.effects['lists/addRemote'],
}))
class ListRen extends PureComponent {
  constructor(props){
    super(props);
    this.state ={
      index: 0,
    }
  };
  
  add = () => {
    const { index } = this.state
    const { dispatch } = this.props;
    const values = {
      key: `${index}`,
      id: `${index}`,
      name: `JIMS  ${index}`,
      department: 'London No. 1 Lake Park',
    };
    this.setState({index: index + 1})
    
    dispatch({
      type:'lists/add',
      payload: values,
    })
  };

  remove = () => {
    const { dispatch } = this.props;
    const { index } = this.state
    dispatch({
      type:'lists/remove',
      payload: `${index - 1}`,
    });
    this.setState({index: index - 1})
  };

  render(){
    const { lists } = this.props
    return(
      <div>
        <List
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={lists}
          renderItem={item => (<List.Item>{item.name}</List.Item>)}
        />
        <Row>
          <Col span={12}><Button type='primary' onClick={()=> this.add()}>增加</Button></Col>
          <Col span={12}><Button type='primary' onClick={()=> this.remove()}>减少</Button></Col>
        </Row>
      </div>
      )
  }
    
}

export default ListRen;