import React, { memo } from 'react';
import { Card } from 'antd';
import styles from './Analysis.less';
import { TimelineChart } from '@/components/Charts';

const OfflineData = memo(
  ({loading, offlineChartData }) => (
    <Card
      loading={loading}
      className={styles.offlineCard}
      bordered={false}
      title="挂号走势图(30天)"
      headStyle={{borderBottom:'none', paddingBottom: 0}}
      style={{ marginTop: 32 }}
    >
      <div style={{ padding: '0 24px' }}>
        <TimelineChart
          height={400}
          data={offlineChartData}
          titleMap={{
            y1: '挂号订单数',
          }}
        />
      </div>
    </Card>
  )
);

export default OfflineData;
