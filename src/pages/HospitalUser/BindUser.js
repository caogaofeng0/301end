/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { Row, Col, Card, Form, Button, Divider, Select, Input } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import confirmPopCon from './confirmPopCon';
import styles from './BindUser.less';

const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ hUser, loading, global }) => ({
  hUser,
  global,
  loading: loading.models.hUser,
}))
@Form.create()
class BindUser extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    currentPage: 1,
    pageSize: 10,
  };

  columns = [
    {
      title: '门诊号',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '与用户关系',
      dataIndex: 'owner',
    },
    {
      title: '绑定时间',
      dataIndex: 'updatedAt',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '医学中心名称',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.unbind(text, record)}>解除绑定</a>
          <Divider type="vertical" />
          <a onClick={() => this.noHistory(text, record)}>患者挂号记录</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.getUserBind();
  }

  getUserBind = () => {
    const { dispatch, form, hUser } = this.props;
    const { currentPage, pageSize } = this.state;
    const params = {
      ...form.getFieldsValue(),
      currentPage,
      pageSize,
      ID: hUser.bindId,
    };
    dispatch({
      type: 'hUser/getHospitalUserBind',
      payload: params,
    });
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

  getUnbinde = record => {
    // eslint-disable-next-line no-console
    console.log(record, '------------>1111');
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    this.setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
    setTimeout(() => {
      this.getUserBind();
    }, 100);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    setTimeout(() => {
      this.getUserBind();
    }, 100);
  };

  /**
   * 用户挂号历史
   */
  // eslint-disable-next-line no-unused-vars
  noHistory = (text, record) => {
    //  const {showStatus} = this.state;
    router.push('/hospitalUser/userlist/bindhistory');
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

      this.getUserBind();
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} className={styles.bindUserRow}>
          <Col md={8} sm={24}>
            <FormItem label={null}>
              {getFieldDecorator('center')(
                <Select placeholder="请选择医学中心">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('platform')(
                <Select placeholder="请选择第三方平台id" initialValue="">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('status')(
                <Select placeholder="请选择患者状态" initialValue="">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('num')(<Input placeholder="输入门诊号搜索" />)}
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
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      hUser: { hospitaluserBind },
      loading,
      global: { clientHeight },
    } = this.props;
    const { selectedRows, showStatus } = this.state;
    const hospList = {
      list: hospitaluserBind.list,
      pagination: hospitaluserBind.pagination,
    };
    return (
      // <PageHeaderWrapper title={null}>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
          <StandardTable
            scroll={{ y: clientHeight - 425 }}
            rowKey={rowKey => rowKey.key}
            selectedRows={[]}
            loading={loading}
            data={hospList}
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

export default BindUser;
