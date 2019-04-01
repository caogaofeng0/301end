import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import StandardTable from '@/components/StandardTable';
import EditDoc from './EditDoc';
import styles from './Doctor.less';

const FormItem = Form.Item;

@connect(({ info, loading }) => ({
  info,
  loading: loading.models.info,
}))
@Form.create()
class DoctorList extends PureComponent {
  state = {
    formValues: {},
    ModalText: '301',
  };

  columns = [
    {
      title: '医生姓名',
      width: 100,
      dataIndex: 'owner',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 100,
      align: 'center',
    },
    {
      title: '特长',
      dataIndex: 'content',
      align: 'center',
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handDoctorInfo(text, record)}>编辑</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/fetch',
    });
  }

  /**
   * 编辑信息
   */
  handDoctorInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeEditDocStatus',
    });
  };

  handleStatusChange = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/listStatus',
    });
  };

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      // ...filters,
    };

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  handleAddDoctor = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeEditDocStatus',
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
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

  handleEditModal = e => {
    console.log(e, '-------->ed');
  };

  render() {
    const {
      info: { data, editDocStatus },
      loading,
    } = this.props;
    const { ModalText } = this.state;
    console.log(data, 'data-------->');

    return (
      <Fragment>
        <EditDoc visibleStatus={editDocStatus} ModalText={ModalText} />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <StandardTable
              rowKey={record => record.id}
              selectedRows={[]}
              loading={loading}
              data={data}
              columns={this.columns}
              rowSelection={null}
              onChange={this.handleStandardTableChange}
              // styles={{height: "80%", minHeight: 500}}
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default DoctorList;
