import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, DatePicker, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './UserList.less';

const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(({ hUser, loading, global }) => ({
  hUser,
  global,
  loading: loading.models.hUser,
}))
@Form.create()
class BindUserHistory extends PureComponent {
  state = {
    handleSearch: false,
    handleSearchData: [],
  };

  columns = [
    {
      title: '就诊日期',
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
      dataIndex: 'identity',
      align: 'center',
    },
    {
      title: '费别',
      dataIndex: 'charge_type',
      align: 'center',
    },
    {
      title: '挂号途径',
      dataIndex: 'register_from',
      align: 'center',
    },
  ];

  componentDidMount() {
    this.getUserBindHistory();
  }

  getUserBindHistory = () => {
    const { dispatch, hUser } = this.props;
    dispatch({
      type: 'hUser/getHospitalUserBindHistory',
      payload: hUser.patientUser.patient_id,
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      handleSearch: false,
      handleSearchData: [],
    });
  };

  handleSearchCon = e => {
    e.preventDefault();
    const {
      form,
      hUser: {
        // eslint-disable-next-line camelcase
        hospitaluserBindHistory: { register_list },
      },
    } = this.props;
    form.validateFields((err, val) => {
      if (err) return;
      const { date, platform } = val;
      const fiterDate =
        date && date.length > 0
          ? register_list.filter(v => moment(v.visit_date).isBetween(date[0], date[1]))
          : // eslint-disable-next-line camelcase
            register_list;
      const handleSearchData = platform
        ? fiterDate.filter(v => v.register_from === platform)
        : fiterDate;
      this.setState({
        handleSearch: true,
        handleSearchData,
      });
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearchCon} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={null}>
              {getFieldDecorator('date')(
                <RangePicker placeholder={['就诊开始日期', '就诊结束日期']} format={dateFormat} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} style={{ height: 56 }}>
            <FormItem label={null}>
              {getFieldDecorator('platform')(
                <Select placeholder="请选择第三方平台" initialValue="">
                  <Option value="微医">微医</Option>
                  <Option value="微信">微信</Option>
                  <Option value="窗口">窗口</Option>
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
    } = this.props;
    const { handleSearch, handleSearchData } = this.state;
    const bindHistroy = {
      list: handleSearch ? handleSearchData : hospitaluserBindHistory.register_list,
      pagination: false,
    };

    return (
      // <PageHeaderWrapper title={null}>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
          <StandardTable
            // scroll={{ y: clientHeight - 370 }}
            rowKey={rowKey => rowKey.visit_no}
            selectedRows={[]}
            loading={loading}
            data={bindHistroy}
            columns={this.columns}
            rowSelection={null}
          />
        </div>
      </Card>
      // </PageHeaderWrapper>
    );
  }
}

export default BindUserHistory;
