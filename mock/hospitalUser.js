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
};
