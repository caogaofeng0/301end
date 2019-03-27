import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert, Form, Input, Row, Col, Button, message } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class LoginPage extends Component {
  state = {};

  // eslint-disable-next-line consistent-return
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const val = { ...form.getFieldsValue() };
    if (!val.userName) {
      message.warning('账号不能为空');
      return false;
    }
    if (!val.password) {
      message.warning('密码不能为空');
      return false;
    }
    dispatch({
      type: 'login/login',
      payload: {
        ...form.getFieldsValue(),
        type: 'account',
      },
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.main}>
        <div className={styles.mainLogn}>
          <img src="/logo_301.png" alt="301" />
          <span>解放军总医院管理系统</span>
        </div>
        <div className={styles.mainLogin}>
          <span className={styles.mainLoginWel}>掌上301欢迎您！</span>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Row gutter={{ md: 4, lg: 4, xl: 4 }}>
              <Col md={24} sm={24}>
                <FormItem label={null}>
                  {getFieldDecorator('userName')(<Input placeholder="账号" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 4, lg: 4, xl: 4 }}>
              <Col md={24} sm={24}>
                <FormItem label={null}>
                  {getFieldDecorator('password')(<Input type="password" placeholder="密码" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 4, lg: 4, xl: 4 }}>
              <Col md={24} sm={24}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  登录
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
