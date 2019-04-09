/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, Row, Col, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import styles from './Depart.less';

@connect(({ info, global, loading }) => ({
  info,
  global,
  loading: loading.effects['info/fetchDepart'],
}))
@Form.create()
class Depart extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'item_no',
      width: 100,
      fixed: 'left',
      align: 'center',
    },
    {
      title: '内容介绍',
      dataIndex: 'advantage',
      align: 'center',
    },
    {
      title: '内容介绍',
      dataIndex: 'content',
      align: 'center',
    },
    {
      title: '相关专家',
      dataIndex: 'doctor_list',
      render: text => <span>{text.map(v => v.doctor_name).toString(',')}</span>,
      width: 100,
      fixed: 'right',
      align: 'center',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleDel(text, record)}>删除</a>
        </Fragment>
      ),
      width: 100,
      fixed: 'right',
    },
  ];

  componentDidMount() {
    this.getDepartDetails();
    // const { form } = this.props;
    // form.setFieldsValue({
    //   depart: 'wzj',
    //   departMan: '301',
    // });
  }

  handleDel = (text, record) => {
    console.log(text, record);
  };

  getDepartDetails = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/getSpecialityProfile',
    });
  };

  handleStandardTableChange = pagination => {
    this.setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
    setTimeout(() => {
      this.getDepartDetails();
    }, 100);
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const {
      info: { specialityProfileList },
      global: { clientHeight },
      form: { getFieldDecorator },
      loading,
    } = this.props;
    const data = specialityProfileList && specialityProfileList.advantage_list;
    const desc = specialityProfileList && specialityProfileList.speciality_desc;
    const profile = specialityProfileList && specialityProfileList.leader_profile;
    console.log(data, 'data--->');
    return (
      <Fragment>
        <Card bordered={false} bodyStyle={{ padding: 0 }} className={styles.departBody}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="学科简介：">
              {getFieldDecorator('depart', { initialValue: desc })(<Input disabled />)}
            </Form.Item>
            <Form.Item label="学科带头人：">
              {getFieldDecorator('departMan', { initialValue: profile })(<Input disabled />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                编辑
              </Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
                保存
              </Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
                新增特色技术
              </Button>
            </Form.Item>
          </Form>
          <Row>
            <Col>
              <span className={styles.feature}>门诊专科特色技术:</span>
            </Col>
            <Col>
              <StandardTable
                loading={loading}
                rowKey={record => record.item_no}
                selectedRows={[]}
                //  loading={loading}
                data={data}
                columns={this.columns}
                rowSelection={null}
                onChange={this.handleStandardTableChange}
                scroll={{ x: '100%', y: clientHeight - 400 }}
              />
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}

export default Depart;
