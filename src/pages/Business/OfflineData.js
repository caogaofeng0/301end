import React, { memo } from 'react';
import { Card } from 'antd';
import styles from './Analysis.less';
import { TimelineChart } from '@/components/Charts';

const OfflineData = memo(
  ({loading, options, offlineChartData }) => (
    <Card
      loading={loading}
      className={styles.offlineCard}
      style={{ marginTop: 32 }}
    >
      <div style={{ padding: '0 24px' }}>
        <TimelineChart
          height={400}
          title={options.title}
          data={offlineChartData}
          titleMap={{
            y1: options.titleMap.y1,
            y2:options.titleMap.y2,
          }}
        />
      </div>
    </Card>
  )
);

export default OfflineData;
