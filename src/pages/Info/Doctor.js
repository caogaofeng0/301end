/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Button, Divider, DatePicker, Select, Icon } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditDoc from './EditDoc';
import styles from './Doctor.less';

const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ info, loading }) => ({
  info,
  loading: loading.models.info,
}))
@Form.create()
class DoctorList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    visibleStatus: false,
    confirmLoading: false,
    ModalText: 'didiidiid',
  };

  columns = [
    {
      title: '医生姓名',
      dataIndex: 'owner',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'id',
    },
    {
      title: '特长',
      dataIndex: 'content',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handDoctorInfo(text, record)}>编辑</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/fetch',
    });
  }

  /**
   * 编辑信息
   */
  handDoctorInfo = (text, record) => {
    console.log(text, record, '-------->');
    const { visibleStatus } = this.state;
    this.setState({
      visibleStatus: true,
    });
  };

  hideEditModal = () => {
    const { visibleStatus } = this.state;
    this.setState({
      visibleStatus: false,
    });
  };

  handleStatusChange = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/listStatus',
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
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
    const { expandForm } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label={null}>
              {getFieldDecorator('name')(<Input placeholder="输入姓名搜索" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <div style={{ overflow: 'hidden', float: 'right' }}>
              <div style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={this.handleFormReset}>
                  新增医生
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  handleEditModal = e => {
    console.log(e, '-------->ed');
  };

  render() {
    const {
      info: { data },
      loading,
    } = this.props;
    // console.log(data, '---------list----->');
    const { selectedRows, visibleStatus, confirmLoading, ModalText } = this.state;
    return (
      <Fragment>
        <EditDoc
          visibleStatus={visibleStatus}
          confirmLoading={confirmLoading}
          handleEditModal={this.handleEditModal}
          hideEditModal={this.hideEditModal}
          ModalText={ModalText}
        />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <StandardTable
              rowKey={record => record.id}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              rowSelection={null}
              onChange={this.handleStandardTableChange}
              // styles={{height: "80%", minHeight: 500}}
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default DoctorList;
