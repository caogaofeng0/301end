/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Button, Divider, DatePicker, Select, Icon } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import confirmPopCon from './confirmPopCon';
import UserNoModal from './UserNoModal';
import { saveClientHeight } from '../../utils/utils';
import styles from './UserList.less';

const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ rule, hUser, loading, global }) => ({
  rule,
  global,
  loading: loading.models.rule,
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    showStatus: false,
  };

  columns = [
    {
      title: 'id',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '用户姓名',
      dataIndex: 'owner',
    },
    {
      title: '身份证号',
      dataIndex: 'updatedAt',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '电话号码',
      dataIndex: 'createdAt',
    },
    {
      title: '创建时间',
      dataIndex: 'callNo',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => (
        <span className={classNames({ [styles.status]: val !== 0 })}>
          {val === 0 ? '正常' : '锁定'}
        </span>
      ),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.bindUser(text, record)}>绑定的患者</a>
          <Divider type="vertical" />
          <a onClick={() => this.noHistory(text, record)}>用户挂号记录</a>
          <Divider type="vertical" />
          <a onClick={() => this.toggleStatus(text, record)}>
            {record && record.status === 0 ? '锁定' : '恢复'}
          </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  /**
   * 切换状态
   */
  toggleStatus = (text, record) => {
    const { status } = record;
    const name = status === 0 ? '锁定' : '恢复';
    const params = {
      title: `你正在进行用户${name}操作`,
      content: `用户${name}后，${name === '锁定' ? '将不可使用' : '将恢复正常使用'},`,
      askSure: `你还要${name}吗？`,
      okText: `${name}`,
    };
    confirmPopCon(params, record, this.handleStatusChange);
  };

  handleStatusChange = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/listStatus',
    });
    // console.log(record);
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
    console.log(record, '------------>1111');
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    // const filters = Object.keys(filtersArg).reduce((obj, key) => {
    //   const newObj = { ...obj };
    //   newObj[key] = getValue(filtersArg[key]);
    //   return newObj;
    // }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      // ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  previewItem = id => {
    router.push(`/profile/basic/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
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
    //  const {showStatus} = this.state;
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
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  renderAdvancedForm() {
    const dateFormat = 'YYYY/MM/DD';
    const { expandForm } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('time')(
                <DatePicker.RangePicker
                  initialValue={[
                    moment('2015/01/01', dateFormat),
                    moment('2015/01/01', dateFormat),
                  ]}
                  format={dateFormat}
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('platform')(
                <Select placeholder="请选择第三方平台id" initialValue="jack">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}
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
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  {!expandForm ? '展开' : '收起'}
                  {!expandForm ? <Icon type="down" /> : <Icon type="up" />}
                </a>
              </div>
            </div>
          </Col>
          {expandForm ? (
            <Col md={8} sm={24}>
              <FormItem label={null}>
                {getFieldDecorator('status')(
                  <Select placeholder="请选择状态" initialValue="jack">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          ) : null}
          {expandForm ? (
            <Col md={8} sm={24}>
              <FormItem label={null}>
                {getFieldDecorator('name')(<Input placeholder="输入姓名搜索" />)}
              </FormItem>
            </Col>
          ) : null}
          {expandForm ? (
            <Col md={8} sm={24}>
              <FormItem label={null}>
                {getFieldDecorator('id')(<Input placeholder="输入身份证号搜索" />)}
              </FormItem>
            </Col>
          ) : null}
        </Row>
      </Form>
    );
  }

  render() {
    const {
      rule: { data },
      loading,
      global: { clientHeight },
    } = this.props;
    const { selectedRows, showStatus } = this.state;
    // console.log(clientHeight, 'clientHeight');
    return (
      // <PageHeaderWrapper title={null}>

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
            scroll={{ y: 200 }}
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={this.columns}
            rowSelection={null}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </Card>
      // </PageHeaderWrapper>
    );
  }
}

export default UserList;
