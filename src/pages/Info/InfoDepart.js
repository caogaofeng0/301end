/* eslint-disable no-console */
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Row, Col, Input, Form, Radio, Menu } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './InfoDepart.less';

const FormItem = Form.Item;
@connect(({ loading, info, global }) => ({
  global,
  info,
  loading: loading.effects['info/fetchDepartList'],
}))
@Form.create()
class InfoDepart extends React.Component {
  state = {};

  componentDidMount() {
    this.getDepartList();
  }

  getDepartList = v => {
    // v 点击底部传入的值
    const { dispatch, form } = this.props;
    dispatch({
      type: 'info/getSpecialityCategory',
      payload: { ...form.getFieldsValue(), v },
    });
  };

  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case '/info':
        router.push(`${match.url}`);
        break;
      case 'doctor':
        router.push(`${match.url}/doctor`);
        break;
      default:
        break;
    }
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll(err => {
      if (err) return;
      this.getDepartList();
    });
  };

  handleClick = e => {
    console.log('click ', e);
    const { dispatch } = this.props;
    // 调用详情
    dispatch({
      type: 'info/fetchDepart',
    });
    // this.getDepartList(depart)
  };

  getDepart = e => {
    console.log('radio ', e.target.value);
    const depart = e.target.value;
    this.getDepartList(depart);
  };

  render() {
    const {
      match,
      location,
      children,
      info: { specialityCategory },
      global: { clientHeight },
      form: { getFieldDecorator },
    } = this.props;
    const operationTabList = [
      {
        key: '/info',
        tab: <span>科室信息</span>,
      },
      {
        key: 'doctor',
        tab: <span>科室医生</span>,
      },
    ];
    console.log(specialityCategory, 'specialityCategory.');
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24, height: clientHeight - 70 }}>
              <Form
                onSubmit={this.handleSubmit}
                hideRequiredMark
                style={{ marginTop: 8, height: '10%' }}
              >
                <FormItem>
                  {getFieldDecorator('name')(<Input placeholder="输入关键字搜索" />)}
                </FormItem>
                <div className={styles.infoItem}>
                  <Menu
                    theme="light"
                    mode="inline"
                    // defaultSelectedKeys={['1']}
                    onClick={this.handleClick}
                    style={{ height: clientHeight - 260 }}
                  >
                    {specialityCategory &&
                      specialityCategory.map(v => (
                        <Menu.Item key={v.speciality_code}>
                          <span>科室：{v.speciality_name}</span>
                          <span>输入码：{v.speciality_code}</span>
                        </Menu.Item>
                      ))}
                  </Menu>
                </div>
                <div className={styles.departButtton}>
                  {getFieldDecorator('depart', {
                    initialValue: 'all',
                  })(
                    <Radio.Group onChange={this.getDepart}>
                      <Radio.Button value="all">全部</Radio.Button>
                      <Radio.Button value="in">内科</Radio.Button>
                      <Radio.Button value="out">外科</Radio.Button>
                      <Radio.Button value="other">其他</Radio.Button>
                    </Radio.Group>
                  )}
                </div>
              </Form>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              defaultactivekey="/info"
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default InfoDepart;
