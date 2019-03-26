import React from 'react';
import { Card } from 'antd';
import echarts from 'echarts/dist/echarts';
import ReactEcharts from 'echarts-for-react';
import macarons from '../../echartsColor';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

// import styles from './Analysis.less';

class Abar extends React.Component {
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
          type: 'bar',
        },
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar',
        },
      ],
    };
    return option;
  };

  render() {
    const { loading, option, dataSource } = this.props;
    return (
      <Card
        loading={loading}
        // className={styles.Apie}
        bordered={false}
        title={option[0]}
        style={{ marginTop: 24 }}
      >
        <ReactEcharts option={dataSource || {}} theme="macarons" style={{ height: 300 }} />
      </Card>
    );
  }
}

export default Abar;
