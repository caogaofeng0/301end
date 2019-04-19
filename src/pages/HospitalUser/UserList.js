import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Button, Divider, Table } from 'antd';
import StandardTable from '@/components/StandardTable';
import confirmPopCon from './confirmPopCon';
import UserNoModal from './UserNoModal';
import styles from './UserList.less';

const FormItem = Form.Item;

@connect(({ rule, hUser, loading, global }) => ({
  hUser,
  rule,
  global,
  loading: loading.models.hUser,
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    expandForm: true,
    showStatus: false,
  };

  columns = [
    {
      title: '用户标识',
      dataIndex: 'user_id',
      width: 100,
      align: 'center',
    },
    {
      title: '用户姓名',
      dataIndex: 'user_name',
      width: 100,
      align: 'center',
    },
    {
      title: '身份证号',
      dataIndex: 'document_no',
      width: 200,
      align: 'center',
    },
    {
      title: '电话号码',
      dataIndex: 'phone_number',
      width: 100,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      width: 200,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: text => (
        <span className={classNames(text === '0' ? styles.status : {})}>
          {text === '1' ? '正常' : '锁定'}
        </span>
      ),
    },
    {
      title: '操作',
      align: 'center',
      width: 250,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.bindUser(text, record)}>绑定的患者</a>
          <Divider type="vertical" />
          <a onClick={() => this.noHistory(text, record)}>用户挂号记录</a>
          <Divider type="vertical" />
          <a onClick={() => this.toggleUserStatus(text, record)}>
            {record && record.status === '1' ? '锁定' : '恢复'}
          </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    // this.getHospitalUser();
  }

  getHospitalUser = () => {
    const { dispatch, form } = this.props;
    const params = form.getFieldsValue().id;
    dispatch({
      type: 'hUser/getHospitalUserList',
      payload: params,
    });
  };

  expandedRowRender = (v, vt, vs) => {
    const columns = [
      { title: '第三方平台id', dataIndex: 'otherID', key: 'otherID' },
      { title: '第三方平台用户id', dataIndex: 'otherUserID', key: 'otherUserID' },
      { title: '注册时间', dataIndex: 'date', key: 'date' },
    ];
    const data = [];
    data.push({
      key: v,
      date: vt,
      otherID: vs,
      otherUserID: '789',
    });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  /**
   * 切换用户正常或者锁定状态
   */
  toggleUserStatus = (text, record) => {
    const { status } = record;
    const name = status === '1' ? '锁定' : '恢复';
    const params = {
      title: `你正在进行用户${name}操作`,
      content: `用户${name}后，${name === '锁定' ? '将不可使用' : '将恢复正常使用'},`,
      askSure: `你还要${name}吗？`,
      okText: `${name}`,
    };
    confirmPopCon(params, record, this.blackListStatusChange);
  };

  blackListStatusChange = s => {
    const { dispatch } = this.props;
    const userId = { user_id: s.user_id };
    if (s.status === '1') {
      dispatch({
        type: 'hUser/getAddBlackList',
        payload: userId,
        callback: this.getHospitalUser,
      });
    } else {
      dispatch({
        type: 'hUser/getRemoveBlackList',
        payload: userId,
        callback: this.getHospitalUser,
      });
    }
  };

  /**
   * 绑定的患者
   */
  bindUser = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hUser/saveBindUser',
      // payload: v.user_id,
      payload: { ...v, user_id: 721 },
    });
    router.push('/hospitalUser/userlist/bindUser');
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.getHospitalUser();
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  /**
   * 用户挂号历史
   */
  // eslint-disable-next-line no-unused-vars
  noHistory = (text, record) => {
    this.setState({
      showStatus: true,
    });
  };

  hideNoModal = () => {
    this.setState({
      showStatus: false,
    });
  };

  handleNoModal = () => {
    this.setState({
      showStatus: false,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(err => {
      if (err) return;
      this.getHospitalUser();
    });
  };

  renderAdvancedForm() {
    // const dateFormat = 'YYYY/MM/DD';
    // const { expandForm } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('time')(
                <DatePicker.RangePicker
                  placeholder={['创建开始时间', '创建结束时间']}
                  initialValue={[
                    moment('2015/01/01', dateFormat),
                    moment('2015/01/01', dateFormat),
                  ]}
                  format={dateFormat}
                />
              )}
            </FormItem>
          </Col> */}
          {/* <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('platform')(
                <Select placeholder="请选择第三方平台id" initialValue="jack">
                  <Option value="jack">01</Option>
                  <Option value="lucy">02</Option>
                  <Option value="tom">03</Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
          <Col md={8} sm={24}>
            <FormItem label={null}>
              {getFieldDecorator('id')(<Input placeholder="输入身份证号搜索" />)}
            </FormItem>
          </Col>
          <Col md={16} sm={24}>
            <div style={{ overflow: 'hidden', float: 'right' }}>
              <div style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  {!expandForm ? '展开' : '收起'}
                  {!expandForm ? <Icon type="down" /> : <Icon type="up" />}
                </a> */}
              </div>
            </div>
          </Col>
          {/* {expandForm ? (
            <Col md={8} sm={24}>
              <FormItem label={null}>
                {getFieldDecorator('status')(
                  <Select placeholder="请选择状态" initialValue="jack">
                    <Option value="jack">是</Option>
                    <Option value="lucy">否</Option>
                    <Option value="tom">其他</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          ) : null} */}
          {/* {expandForm ? (
            <Col md={8} sm={24}>
              <FormItem label={null}>
                {getFieldDecorator('name')(<Input placeholder="输入姓名搜索" />)}
              </FormItem>
            </Col>
          ) : null} */}
          {/* {expandForm ? (
            <Col md={8} sm={24}>
              <FormItem label={null}>
                {getFieldDecorator('id')(<Input placeholder="输入身份证号搜索" />)}
              </FormItem>
            </Col>
          ) : null} */}
        </Row>
      </Form>
    );
  }

  render() {
    const {
      loading,
      global: { clientHeight },
      hUser: { hospitaluserList },
    } = this.props;
    const { showStatus } = this.state;
    // eslint-disable-next-line compat/compat
    const hUList = Object.values(hospitaluserList).length > 0 ? [hospitaluserList] : [];
    const hospList = {
      list: hUList,
      pagination: false,
    };
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          {showStatus ? (
            <UserNoModal
              showStatus={showStatus}
              hideNoModal={this.hideNoModal}
              confirmLoading={false}
              handleNoModal={this.handleNoModal}
            />
          ) : null}
          <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
          <StandardTable
            scroll={{ x: '120%', y: clientHeight }}
            selectedRows={[]}
            rowKey={row => row.user_id}
            loading={loading}
            data={hospList}
            columns={this.columns}
            rowSelection={null}
            // expandedRowRender={record =>
            // this.expandedRowRender(record.updatedAt, record.updatedAt, record.updatedAt)
            // }
          />
        </div>
      </Card>
    );
  }
}

export default UserList;
