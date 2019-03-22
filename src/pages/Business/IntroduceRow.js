import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
// import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='挂号平台数'
        action={
          <Tooltip
            title='平台'
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={numeral(8846).format('0,0')}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <span>周同比</span>
          <span className={styles.trendText}>12%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='挂号用户数'
        action={
          <Tooltip
            title='用户'
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={numeral(8846).format('0,0')}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <span>周同比</span>
          <span className={styles.trendText}>12%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='挂号数'
        action={
          <Tooltip
            title='挂号数'
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={numeral(8846).format('0,0')}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <span>周同比</span>
          <span className={styles.trendText}>12%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='总收入'
        action={
          <Tooltip
            title='收入'
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={numeral(8846).format('0,0')}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <span>周同比</span>
          <span className={styles.trendText}>12%</span>
        </Trend>
      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
