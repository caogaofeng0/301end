import React, { memo } from 'react';
import { Card } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import styles from './Analysis.less';
import { TimelineChart } from '@/components/Charts';
const data = [
  {
    year: "1991",
    value: 3
  },
  {
    year: "1992",
    value: 4
  },
  {
    year: "1993",
    value: 3.5
  },
  {
    year: "1994",
    value: 5
  },
  {
    year: "1995",
    value: 4.9
  },
  {
    year: "1996",
    value: 6
  },
  {
    year: "1997",
    value: 7
  },
  {
    year: "1998",
    value: 9
  },
  {
    year: "1999",
    value: 13
  }
];
const cols = {
  value: {
    min: 0
  },
  year: {
    range: [0, 1]
  }
};

const lineData = memo(
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
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="valuedd" />
          <Tooltip
            crosshairs={{
                type: "y"
              }}
          />
          <Geom type="line" position="year*value" size={2} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape="circle"
            style={{
                stroke: "#fff",
                lineWidth: 1
              }}
          />
        </Chart>
      </div>
    </Card>
  )
);

export default lineData;
