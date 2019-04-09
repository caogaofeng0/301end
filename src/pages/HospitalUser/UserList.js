/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Divider,
  DatePicker,
  Select,
  Icon,
  Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import confirmPopCon from './confirmPopCon';
import UserNoModal from './UserNoModal';
import styles from './UserList.less';

const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
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
    selectedRows: [],
    showStatus: false,
    currentPage: 1,
    pageSize: 10,
  };

  columns = [
    {
      title: '用户标识',
      dataIndex: 'user_id',
      align: 'center',
    },
    {
      title: '用户姓名',
      dataIndex: 'user_name',
      align: 'center',
    },
    {
      title: '身份证号',
      dataIndex: 'document_no',
      align: 'center',
    },
    {
      title: '电话号码',
      dataIndex: 'phone_number',
      align: 'center',
    },
    {
      title: '创建时间（缺少字段）',
      dataIndex: 'phone_number',
      align: 'center',
    },
    {
      title: '状态（缺少字段）',
      dataIndex: 'phone_number',
      align: 'center',
      render: val => (
        <span className={classNames({ [styles.status]: val !== 0 })}>
          {val === 0 ? '正常' : '锁定'}
        </span>
      ),
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.bindUser(text, record)}>绑定的患者</a>
          <Divider type="vertical" />
          <a onClick={() => this.noHistory(text, record)}>用户挂号记录</a>
          <Divider type="vertical" />
          <a onClick={() => this.toggleUserStatus(text, record)}>
            {record && record.status === 0 ? '锁定' : '恢复'}
          </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.getHospitalUser();
  }

  getHospitalUser = () => {
    const { dispatch, form } = this.props;
    const { currentPage, pageSize } = this.state;
    // const params = {
    //   ...form.getFieldsValue(),
    //   currentPage,
    //   pageSize,
    // };
    let params = form.getFieldsValue().id;
    params = params === undefined ? '' : params;
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
    const name = status === 0 ? '锁定' : '恢复';
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
    // 用户状态 没有返回 用document_no 先代替
    if (s.document_no === 0) {
      dispatch({
        type: 'hUser/getAddBlackList',
        payload: userId,
        callblack: this.getHospitalUser,
      });
    } else {
      dispatch({
        type: 'hUser/getRemoveBlackList',
        payload: userId,
        callblack: this.getHospitalUser,
      });
    }
  };

  /**
   * 解绑
   */
  unbind = (text, record) => {
    const params = {
      title: '你正在进行用户与患者绑定关系解除操作。',
      content: '解除绑定后，用户不能为就诊人挂号,',
      askSure: '你还要解除关系吗？',
      okText: '确定',
    };
    confirmPopCon(params, record, this.getUnbinde);
  };

  /**
   * 绑定的患者
   */
  bindUser = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hUser/saveID',
      payload: v.name,
    });
    router.push('/hospitalUser/userlist/bindUser');
  };

  getUnbinde = record => {
    // eslint-disable-next-line no-console
    console.log(record, '------------>');
  };

  handleStandardTableChange = pagination => {
    this.setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
    setTimeout(() => {
      this.getHospitalUser();
    }, 100);
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

  expandedRowsChange = (expanded, record) => {
    // eslint-disable-next-line no-console
    console.log(expanded, record, 'expandedRowsChange');
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
          <Col md={8} sm={24}>
            <div style={{ overflow: 'hidden', float: 'right' }}>
              <div style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
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
      // global: { clientHeight },
      hUser: { hospitaluserList },
    } = this.props;
    const { selectedRows, showStatus } = this.state;
    const hospList = {
      list: hospitaluserList.response_results,
      pagination: hospitaluserList.pagination,
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
            // scroll={{ x: '100%', y: clientHeight - 370 }}
            selectedRows={selectedRows}
            rowKey={row => row.user_id}
            loading={loading}
            data={hospList}
            columns={this.columns}
            rowSelection={null}
            expandedRowRender={record =>
              this.expandedRowRender(record.updatedAt, record.updatedAt, record.updatedAt)
            }
            onExpand={this.expandedRowsChange}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </Card>
    );
  }
}

export default UserList;
