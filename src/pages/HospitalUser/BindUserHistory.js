/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { Row, Col, Card, Form, Button, DatePicker, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserList.less';

const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ hUser, loading, global }) => ({
  hUser,
  global,
  loading: loading.models.hUser,
}))
@Form.create()
class BindUserHistory extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    currentPage: 1,
    pageSize: 10,
  };

  columns = [
    {
      title: '就诊时间',
      dataIndex: 'visit_date',
      align: 'center',
    },
    {
      title: '就诊序号',
      dataIndex: 'visit_no',
      align: 'center',
    },
    {
      title: '号别',
      dataIndex: 'clinic_label',
      align: 'center',
    },
    {
      title: '身份',
      dataIndex: 'clinic_type',
      align: 'center',
    },
    {
      title: '费别',
      dataIndex: 'charge_type',
      align: 'center',
    },
    {
      title: '第三方平台',
      dataIndex: 'register_from',
      align: 'center',
    },
  ];

  componentDidMount() {
    this.getUserBindHistory();
  }

  getUserBindHistory = () => {
    const { dispatch, form, hUser } = this.props;
    const { currentPage, pageSize } = this.state;
    const params = {
      ...form.getFieldsValue(),
      currentPage,
      pageSize,
      ID: hUser.bindId,
    };
    dispatch({
      type: 'hUser/getHospitalUserBindHistory',
      payload: params,
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    this.setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
    setTimeout(() => {
      this.getUserBindHistory();
    }, 100);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    setTimeout(() => {
      this.getUserBindHistory();
    }, 100);
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields(err => {
      if (err) return;
      this.getUserBindHistory();
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
              {getFieldDecorator('center')(
                <RangePicker
                  placeholder={['就诊开始日期', '就诊结束日期']}
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
                <Select placeholder="请选择第三方平台" initialValue="">
                  <Option value="jack">微医</Option>
                  <Option value="lucy">微信</Option>
                  <Option value="tom">其他</Option>
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
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      hUser: { hospitaluserBindHistory },
      loading,
      global: { clientHeight },
    } = this.props;
    const { selectedRows } = this.state;
    // eslint-disable-next-line no-console
    console.log(hospitaluserBindHistory, '进入渲染');
    const bindHistroy = {
      list: hospitaluserBindHistory.register_list,
      pagination: hospitaluserBindHistory.pagination,
    };

    return (
      // <PageHeaderWrapper title={null}>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
          <StandardTable
            // scroll={{ y: clientHeight - 370 }}
            rowKey={rowKey => rowKey.visit_no}
            selectedRows={selectedRows}
            loading={loading}
            data={bindHistroy}
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

export default BindUserHistory;
