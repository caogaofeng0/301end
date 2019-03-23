/* eslint-disable no-unused-vars */
import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './No.less';
import PageLoading from '@/components/PageLoading';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
// const SalesCard = React.lazy(() => import('./SalesCard'));
// const TopSearch = React.lazy(() => import('./TopSearch'));
// const ProportionSales = React.lazy(() => import('./ProportionSales'));
// const OfflineData = React.lazy(() => import('./OfflineData'));
const Aline = React.lazy(() => import('./Aline'));
const Apie = React.lazy(() => import('./Apie'));
const Abar = React.lazy(() => import('./Abar'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  // handleTabChange = key => {
  //   this.setState({
  //     currentTabKey: key,
  //   });
  // };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

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
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData} option={optionText.row} />
        </Suspense>
        <Suspense fallback={null}>
          <Aline loading={loading} dataSource={offlineChartData} option={optionText.line} />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Apie loading={loading} dataSource={offlineData} option={optionText.signP} />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Abar loading={loading} dataSource={offlineData} option={optionText.quitP} />
              </Suspense>
            </Col>
          </Row>
        </div>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Abar loading={loading} dataSource={offlineData} option={optionText.payN} />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Abar loading={loading} dataSource={offlineData} option={optionText.payT} />
              </Suspense>
            </Col>
          </Row>
        </div>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Abar loading={loading} dataSource={offlineData} option={optionText.weekS} />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Abar loading={loading} dataSource={offlineData} option={optionText.weekQ} />
              </Suspense>
            </Col>
          </Row>
        </div>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Abar loading={loading} dataSource={offlineData} option={optionText.weekP} />
              </Suspense>
            </Col>
          </Row>
        </div>
      </GridContent>
    );
  }
}

export default Analysis;
