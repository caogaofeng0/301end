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
  state = {
    // eslint-disable-next-line react/no-unused-state
    currentPage: 1,
    // eslint-disable-next-line react/no-unused-state
    pageSize: 10,
  };

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
    this.getUserNo();
  }

  getUserNo = () => {
    const { dispatch, form, hUser } = this.props;
    const { currentPage, pageSize } = this.state;
    const params = {
      ...form.getFieldsValue(),
      currentPage,
      pageSize,
      ID: hUser.bindId,
    };
    dispatch({
      type: 'hUser/getHospitalUserNo',
      payload: params,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll(err => {
      if (err) return;
      this.getUserNo();
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
    const { form } = this.props;
    form.resetFields();
    this.getUserNo();
  };

  handleStandardTableChange = pagination => {
    this.setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
    setTimeout(() => {
      this.getUserNo();
    }, 100);
  };

  render() {
    const {
      showStatus,
      confirmLoading,
      handleNoModal,
      hideNoModal,
      form: { getFieldDecorator },
      hUser: { hospitaluserNo },
      loading,
    } = this.props;
    const hospList = {
      list: hospitaluserNo.list,
      pagination: hospitaluserNo.pagination,
    };
    console.log('进入渲染', hospList);
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
            rowKey={rowKey => rowKey.key}
            selectedRows={[]}
            loading={loading}
            data={hospList}
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
