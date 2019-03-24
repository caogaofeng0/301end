import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './No.less';
import PageLoading from '@/components/PageLoading';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const Aline = React.lazy(() => import('./Aline'));
const Apie = React.lazy(() => import('./Apie'));
const Abar = React.lazy(() => import('./Abar'));

@connect(({ business, loading }) => ({
  business,
  loading: loading.effects['business/topDataUser'],
}))
class User extends Component {
  state = {
    noType: 'add',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'business/topDataUser',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'business/topDataUser',
    });
    cancelAnimationFrame(this.reqRef);
  }

  handleChangeNoType = e => {
    this.setState({
      noType: e.target.value,
    });
  };

  render() {
    const { noType } = this.state;
    const {
      business: { topDataUser },
      loading,
    } = this.props;
    // console.log(topDataUser, 'topDataUser');

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
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={topDataUser} option={optionText.row} />
        </Suspense>
        <Suspense fallback={null}>
          <Aline
            loading={loading}
            dataSource={[]}
            option={optionText.line}
            noType={noType}
            handleChangeNoType={this.handleChangeNoType}
          />
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
                <Apie loading={loading} dataSource={[]} option={optionText.payN} />
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
                <Apie loading={loading} dataSource={[]} option={optionText.weekS} />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Abar loading={loading} dataSource={[]} option={optionText.weekQ} />
              </Suspense>
            </Col>
          </Row>
        </div>
      </GridContent>
    );
  }
}

export default User;
