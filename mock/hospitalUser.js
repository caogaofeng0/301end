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
  'GET /api/account/user': mockjs.mock({
    result_code: '',
    error_message: '',
    response_results: [
      {
        user_id: '001',
        login_name: '张磊',
        phone_number: '15978907890',
        email: 'tyu@136.com',
        user_name: '张磊',
        document_type: '身份证',
        document_no: '412712123456785678',
      },
    ],
    pagination: { total: 46, pageSize: 10, current: 1 },
  }),
  'GET /api/account/patients': {
    // console.log(req.query, "user_id");
    // const { user_id } = req.query;
    // console.log(user_id, "user_id");
    // debugger;
    // res.json({
    result_code: '',
    error_message: '',
    response_results: {
      patient_list: [
        {
          patient_id: 'A12345678',
          document_no: '110011201103232345',
          name: '张三',
          sex: '男',
          date_of_birth: '1982‐01‐01',
          charge_type: '全费',
          phone_number: '13812345678',
          status: 1,
          relationship: '0',
        },
      ],
      pagination: { total: 46, pageSize: 10, current: 1 },
    },
    // });
  },
  'GET /api/patient/register': {
    result_code: '',
    error_message: '',
    response_results: {
      register_list: [
        {
          transact_no: '',
          patient_id: '',
          name: '',
          visit_date: '2019-01-01',
          visit_no: 123,
          time_desc: '',
          clinic_label: '09',
          clinic_type: '',
          speciality_name: '',
          charge_type: '',
          sum_fee: 80,
          serial_no: 2,
          scheduled_time: '',
          register_from: '',
          register_status: 0,
        },
      ],
      pagination: { total: 46, pageSize: 10, current: 1 },
    },
  },
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
  'POST /api/account/unbind_patient': {
    result_code: '0',
    error_message: '',
    response_results: {},
  },
  'POST /api/account/add_user_blacklist': {
    result_code: '0',
    error_message: '',
    response_results: {},
  },
  'POST /api/account/remove_user_blacklist': {
    result_code: '0',
    error_message: '',
    response_results: {},
  },
};
