import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Form, Select, DatePicker, Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// import { getTimeDistance } from '@/utils/utils';
import styles from './No.less';
import PageLoading from '@/components/PageLoading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
// const SalesCard = React.lazy(() => import('./SalesCard'));
// const TopSearch = React.lazy(() => import('./TopSearch'));
// const ProportionSales = React.lazy(() => import('./ProportionSales'));
// const OfflineData = React.lazy(() => import('./OfflineData'));
const Aline = React.lazy(() => import('./Aline'));
const Apie = React.lazy(() => import('./Apie'));
const Abar = React.lazy(() => import('./Abar'));
const FormItem = Form.Item;

@connect(({ loading, business }) => ({
  business,
  loading: loading.effects['business/topData'],
}))
@Form.create()
class Analysis extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'business/topData',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'topData/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

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

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      dispatch({
        type: 'business/topData',
        payload: values,
      });
    });
  };

  render() {
    const { business, loading } = this.props;
    const { topData } = business;
    console.log(topData, 'topData');
    const optionText = {
      row: ['挂号平台数', '挂号用户数', '挂号数', '总收入'],
      line: ['挂号走势图(30天)', '挂号订单数'],
      signP: ['当日挂号平台分布'],
      quitP: ['当日退号平台分布'],
      payN: ['当日支付笔数平台分布'],
      payT: ['当日支付金额平台分布'],
      weekS: ['挂号平台分布走势图（近7天）'],
      weekQ: ['退号平台分布走势图（近7天）'],
      weekP: ['各平台号类分布（近7天）'],
    };

    return (
      <PageHeaderWrapper
        loading={loading}
        content={this.renderAdvancedForm()}
        // extraContent={extraContent}
      >
        <GridContent>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={topData} option={optionText.row} />
          </Suspense>
          <Suspense fallback={null}>
            <Aline loading={loading} dataSource={[]} option={optionText.line} />
          </Suspense>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Apie loading={loading} dataSource={[]} option={optionText.signP} />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar loading={loading} dataSource={[]} option={optionText.quitP} />
                </Suspense>
              </Col>
            </Row>
          </div>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar loading={loading} dataSource={[]} option={optionText.payN} />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar loading={loading} dataSource={[]} option={optionText.payT} />
                </Suspense>
              </Col>
            </Row>
          </div>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar loading={loading} dataSource={[]} option={optionText.weekS} />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar loading={loading} dataSource={[]} option={optionText.weekQ} />
                </Suspense>
              </Col>
            </Row>
          </div>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <Abar loading={loading} dataSource={[]} option={optionText.weekP} />
                </Suspense>
              </Col>
            </Row>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Analysis;
