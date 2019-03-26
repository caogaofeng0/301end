/* eslint-disable react/no-unused-state */
import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Form, Select, DatePicker, Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './No.less';
import PageLoading from '@/components/PageLoading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const Aline = React.lazy(() => import('./Aline'));
const Apie = React.lazy(() => import('./Apie'));
const Abar = React.lazy(() => import('./Abar'));
const FormItem = Form.Item;
@connect(({ business, loading }) => ({
  business,
  loading: loading.effects['business/topDataUser'],
}))
@Form.create()
class User extends Component {
  state = {
    noType: 'add',
    approver: '',
    time: '',
  };

  componentDidMount() {
    this.reqRef = requestAnimationFrame(() => {
      this.getFetch();
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'business/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  getFetch = () => {
    const { dispatch } = this.props;
    // const { approver, time} = this.state
    console.log('getFetch');
    dispatch({
      type: 'business/noTrendFetch',
    });
    dispatch({
      type: 'business/noDayPlatform',
    });
    dispatch({
      type: 'business/noDayPlatformTrend',
    });
  };

  renderAdvancedForm = () => {
    const dateFormat = 'YYYY/MM/DD';
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <Form.Item label={null} className={styles.noSelect}>
              {getFieldDecorator('approver')(
                <Select placeholder="请选择审批员">
                  <Select.Option value="xiao">付晓晓</Select.Option>
                  <Select.Option value="mao">周毛毛</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={7} md={24}>
            <FormItem label={null}>
              {getFieldDecorator('time')(
                <DatePicker.RangePicker
                  initialValue={[
                    moment('2015/01/01', dateFormat),
                    moment('2015/01/01', dateFormat),
                  ]}
                  format={dateFormat}
                />
              )}
            </FormItem>
          </Col>
          <Col lg={7} md={24}>
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
  };

  handleChangeNoType = e => {
    this.setState({
      noType: e.target.value,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // const values = {
      //   ...fieldsValue,
      // };
      console.log({ ...fieldsValue });
      this.setState({
        ...fieldsValue,
      });
      this.getFetch();
    });
  };

  render() {
    const { noType } = this.state;
    const { business, loading } = this.props;

    const optionText = {
      row: ['用户数', '绑定患者数', '实名用户数', '异常用户增量数'],
      line: ['各平台用户走势图（30天）', '挂号订单数'],
      signP: ['异常用户类型分布（30天）'],
      quitP: ['黑名单用户平台走势图（30天）'],
      payN: ['当日累计用户数平台分布'],
      payT: ['各平台新增用户走势图（7天）'],
      weekS: ['当日累计绑定患者数平台分布'],
      weekQ: ['各平台新增绑定就诊人走势图（7天）'],
    };
    const { topDataUser, noTrend, noDayPlatform, noDayPlatformTrend } = business;
    return (
      <PageHeaderWrapper loading={loading} content={this.renderAdvancedForm()}>
        <GridContent>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={topDataUser} option={optionText.row} />
          </Suspense>
          <Suspense fallback={null}>
            <Aline
              loading={loading}
              dataSource={noTrend}
              option={optionText.line}
              noType={noType}
              handleChangeNoType={this.handleChangeNoType}
            />
          </Suspense>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Apie loading={loading} dataSource={noDayPlatform} option={optionText.signP} />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar
                    loading={loading}
                    dataSource={noDayPlatformTrend}
                    option={optionText.quitP}
                  />
                </Suspense>
              </Col>
            </Row>
          </div>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Apie loading={loading} dataSource={noDayPlatform} option={optionText.payN} />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar
                    loading={loading}
                    dataSource={noDayPlatformTrend}
                    option={optionText.payT}
                  />
                </Suspense>
              </Col>
            </Row>
          </div>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Apie loading={loading} dataSource={noDayPlatform} option={optionText.weekS} />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar
                    loading={loading}
                    dataSource={noDayPlatformTrend}
                    option={optionText.weekQ}
                  />
                </Suspense>
              </Col>
            </Row>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default User;
