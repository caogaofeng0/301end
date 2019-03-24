/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
@connect(({ hUser, loading }) => ({
  hUser,
  loading: loading.models.hUser,
}))
@Form.create()
class UserNoModal extends Component {
  state = {};

  columns = [
    {
      title: '挂号时间',
      dataIndex: 'time',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '就诊时间',
      dataIndex: 'time2',
    },
    {
      title: '门诊号',
      dataIndex: 'phone',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '与用户关系',
      dataIndex: 'title',
    },
    {
      title: '号别',
      dataIndex: 'signature',
    },
    {
      title: '缴费方式',
      dataIndex: 'group',
    },
    {
      title: '挂号途径',
      dataIndex: 'address',
    },
  ];

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'hUser/fetch',
      payload: {},
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  ToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'hUser/fetch',
      payload: {},
    });
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
      type: 'hUser/fetch',
      payload: params,
    });
  };

  render() {
    const { showStatus, confirmLoading, handleNoModal, hideNoModal } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      hUser: { data },
      loading,
    } = this.props;
    console.log('进入渲染', data);
    return (
      <div>
        <Modal
          title="用户挂号记录"
          visible={showStatus}
          onOk={handleNoModal}
          confirmLoading={confirmLoading}
          onCancel={hideNoModal}
          width="80%"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <Form.Item>
                  {getFieldDecorator('noTime')(
                    <RangePicker
                      initialValue={[
                        moment('2015/01/01', dateFormat),
                        moment('2015/01/01', dateFormat),
                      ]}
                      format={dateFormat}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item>
                  {getFieldDecorator('askTime')(
                    <RangePicker
                      initialValue={[
                        moment('2015/01/01', dateFormat),
                        moment('2015/01/01', dateFormat),
                      ]}
                      format={dateFormat}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item>
                  {getFieldDecorator('departNo')(<Input placeholder="请输入您的姓名!" />)}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item>
                  {getFieldDecorator('work')(
                    <Select placeholder="请选择挂号途径">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col md={8} sm={24}>
                <Form.Item>
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
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <StandardTable
            rowKey={rowKey => rowKey.userId}
            selectedRows={[]}
            loading={loading}
            data={data}
            columns={this.columns}
            rowSelection={null}
            onChange={this.handleStandardTableChange}
          />
        </Modal>
      </div>
    );
  }
}
export default UserNoModal;
