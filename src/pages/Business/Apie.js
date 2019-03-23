import React from 'react';
import { Card } from 'antd';
import echarts from 'echarts/dist/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

import styles from './Analysis.less';

class Apie extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    echarts.registerTheme('macarons');
  }

  getOption = () => {
    const option = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    return option;
  };

  render() {
    const { loading } = this.props;
    return (
      <Card
        loading={loading}
        className={styles.Apie}
        bordered={false}
        title="当日挂号平台分布"
        style={{ marginTop: 24 }}
      >
        <div style={{ padding: '0 0px 32px 0px' }}>
          <ReactEcharts option={this.getOption()} />
        </div>
      </Card>
    );
  }
}

export default Apie;
