/* eslint-disable camelcase */
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
    handleSearch: false,
    handleSearchData: [],
  };

  columns = [
    {
      title: '挂号时间',
      dataIndex: 'registering_date',
      align: 'center',
    },
    {
      title: '就诊时间',
      dataIndex: 'visit_date',
      align: 'center',
    },
    {
      title: '门诊号',
      dataIndex: 'patient_id',
      align: 'center',
    },
    {
      title: '与用户关系',
      dataIndex: 'agency_relationship',
      align: 'center',
    },
    {
      title: '号别',
      dataIndex: 'clinic_label',
      align: 'center',
    },
    {
      title: '缴费方式',
      dataIndex: 'card_type',
      align: 'center',
    },
    {
      title: '挂号途径',
      dataIndex: 'operator_no',
      align: 'center',
    },
  ];

  componentDidMount() {
    this.getUserNo();
  }

  getUserNo = () => {
    const { dispatch, hUser } = this.props;
    const params = {
      ID: hUser.bindId,
    };
    dispatch({
      type: 'hUser/getUserNoHistory',
      payload: params,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form,
      hUser: { data },
    } = this.props;
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      const isBetween = (v, t) => moment(v).isBetween(t[0], t[1]);
      const { registering_date, visit_date, name, operator_no } = fieldsValue;
      const A =
        !registering_date || registering_date.length <= 0
          ? data
          : data.filter(v => isBetween(v.registering_date, registering_date));
      const B =
        !visit_date || visit_date.length <= 0
          ? A
          : A.filter(v => isBetween(v.visit_date, visit_date));
      const C = name === undefined ? B : B.filter(v => v.patient_id.includes(name));
      const handleSearchData =
        operator_no === undefined ? C : C.filter(v => v.operator_no.includes(operator_no));
      this.setState({
        handleSearch: true,
        handleSearchData,
      });
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
    this.setState({
      handleSearch: false,
      handleSearchData: [],
    });
  };

  render() {
    const {
      showStatus,
      hideNoModal,
      form: { getFieldDecorator },
      hUser: { data },
      loading,
    } = this.props;
    const { handleSearch, handleSearchData } = this.state;
    const hospList = {
      list: handleSearch ? handleSearchData : data || [],
      pagination: false,
    };

    return (
      <div>
        <Modal
          title="用户挂号记录"
          visible={showStatus}
          onCancel={hideNoModal}
          footer={null}
          width="80%"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
              <Col md={6} sm={24}>
                <Form.Item>
                  {getFieldDecorator('registering_date')(
                    <RangePicker
                      placeholder={['选择挂号开始时间', '选择挂号结束时间']}
                      format={dateFormat}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col md={6} sm={24}>
                <Form.Item>
                  {getFieldDecorator('visit_date')(
                    <RangePicker
                      placeholder={['选择就诊开始时间', '选择就诊结束时间']}
                      format={dateFormat}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col md={3} sm={204}>
                <Form.Item>
                  {getFieldDecorator('name')(<Input placeholder="请输入门诊号!" />)}
                </Form.Item>
              </Col>
              <Col md={4} sm={24}>
                <Form.Item>
                  {getFieldDecorator('operator_no')(
                    <Select placeholder="请选择挂号途径">
                      <Option value="微信">微信</Option>
                      <Option value="微医">微医</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col md={4} sm={24}>
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
          />
        </Modal>
      </div>
    );
  }
}
export default UserNoModal;
