import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import autoHeight from '../autoHeight';
import styles from './index.less';

@autoHeight()
class TimelineChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [60, 20, 40, 40],
      borderWidth = 2,
      data: sourceData,
    } = this.props;

    const data = Array.isArray(sourceData) ? sourceData : [{ x: 0, y1: 0, y2: 0 }];

    const scale = {
      year: {
        alias: '年' // 为属性定义别名
      },
      num: {
        alias: '车' // 为属性定义别名
      }
    };

    return (
      <div className={styles.timelineChart} style={{ height: height + 30 }}>
        <div>
          {title && <h4>{title}</h4>}
          <Chart height={height} padding={padding} data={data} scale={scale} forceFit>
            <Axis name="year" />
            <Tooltip />
            <Legend name="key" position="top" />
            <Geom
              position="year*num"
              size={borderWidth}
              type="line"
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default TimelineChart;
