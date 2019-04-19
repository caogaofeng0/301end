import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, message } from 'antd';
import StandardTable from '@/components/StandardTable';
import EditDoc from './EditDoc';
import styles from './Doctor.less';

const FormItem = Form.Item;

@connect(({ info, loading, global }) => ({
  info,
  global,
  loading: loading.models.info,
}))
@Form.create()
class DoctorList extends PureComponent {
  state = {
    handleSearch: false,
    handleSearchData: [],
    ModalText: '301',
  };

  columns = [
    {
      title: '姓名',
      width: 100,
      dataIndex: 'doctor_name',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 100,
      align: 'center',
    },
    {
      title: '特长简介',
      dataIndex: 'advantage',
      align: 'center',
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handDoctorInfo(text, record)}>编辑</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    // this.handleExpertDetails();
  }

  handleExpertDetails = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/getExpertDetails',
      payload: '',
    });
  };

  /**
   * 编辑信息
   */
  handDoctorInfo = t => {
    const {
      dispatch,
      info: { expertKey },
    } = this.props;
    dispatch({
      type: 'info/changeEditDocStatus',
    });
    dispatch({
      type: 'info/changeEditDocDetails',
      payload: t,
    });
    dispatch({
      type: 'info/saveUploadHeader',
      payload: {
        user_id: t.doctor_id,
        name: t.doctor_name,
      },
    });
    dispatch({
      type: 'info/getDoctorImgList',
      payload: {
        code: expertKey,
        id: t.doctor_id,
      },
    });
    // dispatch({
    //   type:'info/saveFileList',
    //   payload:[{
    //     uid:'-1',
    //     name:t.photo,
    //     status:'done',
    //     url:'http://C:/Users/Administrator/Desktop/weiyi/301end/301end/301end/public/favicon.png'
    //   }]
    // })
  };

  // saveGetDoctoreImg = () => {

  // }

  handleStatusChange = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/listStatus',
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      handleSearch: false,
      handleSearchData: [],
    });
  };

  // 新增医生
  handleAddDoctor = () => {
    const {
      dispatch,
      info: { expertKey },
    } = this.props;
    if (!expertKey) {
      message.info('请选择科室');
      return;
    }
    dispatch({
      type: 'info/changeEditDocStatus',
    });
    dispatch({
      type: 'info/changeEditDocDetails',
      payload: {},
    });
    dispatch({
      type: 'info/saveUploadHeader',
      payload: {},
    });
    dispatch({
      type: 'info/saveFileList',
      payload: [],
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const {
      info: { expertDetailsList },
      form,
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { name } = fieldsValue;
      const handleSearchData = expertDetailsList.filter(v => v.doctor_name.includes(name));
      this.setState({
        handleSearch: true,
        handleSearchData,
      });
    });
  };

  // eslint-disable-next-line react/sort-comp
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label={null}>
              {getFieldDecorator('name')(<Input placeholder="输入姓名搜索" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <div style={{ overflow: 'hidden', float: 'right' }}>
              <div style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={this.handleAddDoctor}>
                  新增医生
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      info: { expertDetailsList, editDocStatus },
      loading,
      global: { clientHeight },
    } = this.props;
    const { ModalText, handleSearch, handleSearchData } = this.state;
    const data = {
      list: handleSearch ? handleSearchData : expertDetailsList || [],
      pagination: false,
    };
    return (
      <Fragment>
        <EditDoc visibleStatus={editDocStatus} ModalText={ModalText} />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <StandardTable
              scroll={{ x: '150%', y: clientHeight - 330 }}
              selectedRows={[]}
              rowKey={record => record.doctor_name}
              loading={loading}
              data={data}
              columns={this.columns}
              rowSelection={null}
              className={styles.doctorTable}
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default DoctorList;
