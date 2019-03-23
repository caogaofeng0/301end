import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import styles from './No.less';
import { ChartCard } from '@/components/Charts';
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

// eslint-disable-next-line no-unused-vars
const IntroduceRow = memo(({ loading, visitData, option }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={option[0]}
        action={
          <Tooltip title={option[0]}>
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
        title={option[1]}
        action={
          <Tooltip title={option[1]}>
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
        title={option[2]}
        action={
          <Tooltip title={option[2]}>
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
        title={option[3]}
        action={
          <Tooltip title={option[3]}>
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
