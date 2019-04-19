import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'POST /api/business/get/data': {
    code: '200',
    data: {
      one: [345, 678],
      two: [3453, 6785],
      three: [3458, 2678],
      four: [3435, 6718],
    },
  },
  'GET /api/business/user/get/data': {
    code: '200',
    data: {
      one: [345, 678],
      two: [3453, 6785],
      three: [3458, 2678],
      four: [3435, 6718],
    },
  },

  'GET /api/business': mockjs.mock({
    code: '200',
    'list|10': [
      {
        time: 2012 - 10 - 19,
        time2: 2012 - 10 - 19,
        'userId|+1': 1,
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    ],
    pagination: { total: 46, pageSize: 10, current: 1 },
  }),
  'GET /api/user/bind/history': mockjs.mock({
    code: '200',
    'list|10': [
      {
        time: 2012 - 10 - 19,
        'num|+1': 1,
        'otherNum|+1': 10,
        createdAt: '医生',
        money: 700,
        line: '微医',
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    ],
    pagination: { total: 46, pageSize: 10, current: 1 },
  }),
  'GET /api/business/No/trend': mockjs.mock({
    code: '200',
    data: {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['挂号订单数'],
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '2010-01-02',
          '2011-01-02',
          '2012-01-02',
          '2013-01-02',
          '2014-01-02',
          '2015-01-02',
          '2016-01-02',
        ],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '挂号订单数',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
      ],
    },
  }),
  'GET /api/business/no/day/playform': mockjs.mock({
    code: '200',
    data: {
      // title : {
      //     text: '某站点用户访问来源',
      //     subtext: '纯属虚构',
      //     x:'center'
      // },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        // orient: 'vertical',
        center: 'top',
        data: ['微医', '微信', '其他'],
      },
      series: [
        {
          name: '平台分布',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 635, name: '微医' },
            { value: 310, name: '微信' },
            { value: 234, name: '其他' },
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
    },
  }),
  'GET /api/business/no/day/playform/quit': mockjs.mock({
    code: '200',
    data: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {},
      dataset: {
        dimensions: ['product', '当日退', '跨日退'],
        source: [
          { product: '微医', 当日退: 43.3, 跨日退: 85.8 },
          { product: '微信', 当日退: 83.1, 跨日退: 73.4 },
          { product: '其他', 当日退: 86.4, 跨日退: 65.2 },
        ],
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }],
    },
  }),
  'GET /api/business/no/day/playform/trend': mockjs.mock({
    code: '200',
    data: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ['微医', '微信', '其他'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '2011-01-01',
            '2012-01-01',
            '2013-01-01',
            '2014-01-01',
            '2015-01-01',
            '2016-01-01',
            '2017-01-01',
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '微医',
          type: 'bar',
          stack: '微医',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: '微信',
          type: 'bar',
          stack: '微医',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '其他',
          type: 'bar',
          stack: '微医',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        // {
        //     name:'搜索引擎',
        //     type:'bar',
        //     data:[862, 1018, 964, 1026, 1679, 1600, 1570],
        //     markLine : {
        //         lineStyle: {
        //             normal: {
        //                 type: 'dashed'
        //             }
        //         },
        //         data : [
        //             [{type : 'min'}, {type : 'max'}]
        //         ]
        //     }
        // },
      ],
    },
  }),
};
