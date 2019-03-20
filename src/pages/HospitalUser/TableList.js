import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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
  Modal,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '门诊号',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '与用户关系',
      dataIndex: 'desc',
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '医学中心名称',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.unbind(text, record)}>解除绑定</a>
          <Divider type="vertical" />
          <a href="">挂号记录</a>
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
  
  unbind = (text, record) => {
    console.log(text, record);
    Modal.confirm({
      title: '你正在进行用户与患者绑定关系解除操作。',
      cancelText: '取消',
      okText: '解除',
      content: (
        <div>
          <p style={{color:'red'}}>解除绑定后，用户不能为就诊人挂号,</p>
          <p>你还要解除关系吗？</p>
        </div>
      ),
      onOk:() => this.getUnbinde(record),
      onCancel() {},
    });
  }
  
  getUnbinde = (record) => {
    console.log(record, "------------>");
  }


  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
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
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={null}>
              {getFieldDecorator('name')(<Input placeholder="输入关键字搜索" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ overflow: 'hidden' }}>
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
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderWrapper title={null}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              rowSelection={null}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
