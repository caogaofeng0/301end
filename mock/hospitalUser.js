import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api/change/status': {
    code: '200',
    data: {
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    },
  },
  'GET /api/user/no/history': mockjs.mock({
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
  'POST /api/hospital/user/list': mockjs.mock({
    code: 200,
    'list|3': [
      {
        'key|+1': 1,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ],
        name: `TradeCode`,
        title: `一个任务名称`,
        owner: '曲丽丽',
        desc: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2019',
        createdAt: '2018',
        progress: Math.ceil(Math.random() * 100),
      },
    ],
    pagination: { total: 46, pageSize: 10, current: 1 },
  }),
  'POST /api/hospital/user/Bind/list': mockjs.mock({
    code: 200,
    'list|3': [
      {
        'key|+1': 1,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ],
        name: `TradeCode`,
        title: `一个任务名称`,
        '@owner': '曲丽丽',
        desc: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2019',
        createdAt: '2018',
        progress: Math.ceil(Math.random() * 100),
      },
    ],
    pagination: { total: 46, pageSize: 10, current: 1 },
  }),
  'POST /api/hospital/user/Bind/list/history': mockjs.mock({
    code: 200,
    'list|3': [
      {
        'key|+1': 1,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ],
        name: mockjs.Random.cname(),
        title: `一个任务名称`,
        owner: '曲丽丽',
        desc: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2019',
        createdAt: '2018',
        progress: Math.ceil(Math.random() * 100),
      },
    ],
    pagination: { total: 46, pageSize: 10, current: 1 },
  }),
  'POST /api/hospital/user/no': mockjs.mock({
    code: 200,
    'list|3': [
      {
        'key|+1': 1,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ],
        // name: `TradeCode`,
        title: `一个任务名称`,
        name: mockjs.mock('@city'),
        desc: '这是一段描述',
        time: Math.floor(Math.random() * 1000),
        time2: Math.floor(Math.random() * 10),
        updatedAt: '2019',
        createdAt: '2018',
        progress: Math.ceil(Math.random() * 100),
        phone: '15699990000',
        address: '八宝山地铁站',
      },
    ],
    pagination: { total: 46, pageSize: 10, current: 1 },
  }),
};
