import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Col, Card, Form, Button, Divider, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import confirmPopCon from './confirmPopCon';
import styles from './BindUser.less';

const FormItem = Form.Item;
const centerID = '600004';
@connect(({ hUser, loading, global }) => ({
  hUser,
  global,
  loading: loading.models.hUser,
}))
@Form.create()
class BindUser extends PureComponent {
  columns = [
    {
      title: '门诊号',
      dataIndex: 'patient_id',
      align: 'center',
      width: 100,
    },
    {
      title: '与用户关系',
      dataIndex: 'relationship',
      align: 'center',
      width: 150,
      render: text => <span>{text === '0' ? '本人' : '其他'}</span>,
    },
    {
      title: '绑定时间',
      dataIndex: 'bind_time',
      align: 'center',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      width: 250,
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
    this.getUserBind({ institution_id: centerID });
  }

  getUserBind = v => {
    const { dispatch, hUser } = this.props;
    dispatch({
      type: 'hUser/getHospitalUserBind',
      payload: { data: hUser.bindUser.user_id, ...v },
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
    const { dispatch, hUser } = this.props;
    // eslint-disable-next-line camelcase
    const { patient_id } = record;
    dispatch({
      type: 'hUser/getUnbindPatient',
      payload: { user_id: hUser.bindUser.user_id, patient_id },
      callback: this.getUserBind,
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.getUserBind({ institution_id: centerID });
  };

  /**
   * 用户挂号历史
   */
  // eslint-disable-next-line no-unused-vars
  noHistory = (text, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hUser/savePatientID',
      payload: text,
    });
    router.push('/hospitalUser/userlist/bindhistory');
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { center } = fieldsValue;
      this.getUserBind({ institution_id: center });
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
              {getFieldDecorator('center', {
                initialValue: '600004',
              })(
                <Select placeholder="请选择医学中心">
                  <Select.Option value="600004">第一医学中心(301)</Select.Option>
                  <Select.Option value="690057">第三医学中心(武总)</Select.Option>
                  <Select.Option value="600024">第四医学中心(304)</Select.Option>
                  <Select.Option value="600023">第五医学中心(302)</Select.Option>
                  <Select.Option value="600003">第五医学中心(307)</Select.Option>
                  <Select.Option value="600038">第六医学中心(海总)</Select.Option>
                  <Select.Option value="600089">第七医学中心(陆总)</Select.Option>
                  <Select.Option value="600025">第八医学中心(309)</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={16} sm={24}>
            <div style={{ overflow: 'hidden', float: 'right' }}>
              <div style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={this.handleFormReset}>
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
    const hospList = {
      list: hospitaluserBind.patient_list,
      pagination: false,
    };
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
          <StandardTable
            scroll={{ y: clientHeight - 425 }}
            rowKey={rowKey => rowKey.patient_id}
            selectedRows={[]}
            loading={loading}
            data={hospList}
            columns={this.columns}
            rowSelection={null}
          />
        </div>
      </Card>
    );
  }
}

export default BindUser;
