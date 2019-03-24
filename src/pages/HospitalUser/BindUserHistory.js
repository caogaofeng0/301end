import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { Row, Col, Card, Form, Button, DatePicker, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';

const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class BindUserHistory extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '就诊时间',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '就诊序号',
      dataIndex: 'owner',
    },
    {
      title: '号别',
      dataIndex: 'updatedAt',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '身份',
      dataIndex: 'createdAt',
    },
    {
      title: '费别',
      dataIndex: 'createdAt',
    },
    {
      title: '挂号途径',
      dataIndex: 'createdAt',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

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
              {getFieldDecorator('center')(
                <RangePicker
                  defaultValue={[
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
                <Select placeholder="请选择挂号途径">
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

export default BindUserHistory;
