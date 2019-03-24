import React from 'react';
import { Card, Radio } from 'antd';
import echarts from 'echarts/dist/echarts';
import ReactEcharts from 'echarts-for-react';
import macarons from '../../echartsColor';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import styles from './Aline.less';

class LineData extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    echarts.registerTheme('macarons', macarons);
  }

  getOption = () => {
    const option = {
      title: {
        text: '789',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        },
      ],
    };
    return option;
  };

  render() {
    const { loading, option, noType, handleChangeNoType } = this.props;

    return (
      <Card
        loading={loading}
        // className={styles.Apie}
        bordered={false}
        title={option[0]}
        extra={
          noType && handleChangeNoType ? (
            <div className={styles.noCardExtra}>
              <div className={styles.noTypeRadio}>
                <Radio.Group value={noType} onChange={handleChangeNoType}>
                  <Radio.Button value="add">增量</Radio.Button>
                  <Radio.Button value="all">总量</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          ) : null
        }
      >
        <ReactEcharts option={this.getOption()} theme="macarons" style={{ height: 500 }} />
      </Card>
    );
  }
}

export default LineData;
