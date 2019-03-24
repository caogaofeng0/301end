import React, { Component, Fragment } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';

@connect(({ info }) => ({
  info,
}))
class Depart extends Component {
  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '内容介绍',
      dataIndex: 'content',
    },
    {
      title: '相关专家',
      dataIndex: 'aboutBig',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handDoctorInfo(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/fetchDepart',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      // ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'info/fetchDepart',
      payload: params,
    });
  };

  render() {
    const {
      info: { depart },
    } = this.props;
    console.log('进入渲染');
    const data = { list: depart.list, pagination: depart.pagination };
    return (
      <Fragment>
        <Card style={{ width: '100%' }}>
          <Row>
            <Col>学科简介：{depart.abstract}</Col>
          </Row>
          <Row>
            <Col>学科带头人：{depart.leader}</Col>
          </Row>
          <Row>
            <Col>门诊专科特色技术:</Col>
            <Col>
              <StandardTable
                rowKey={record => record.id}
                selectedRows={[]}
                //  loading={loading}
                data={data}
                columns={this.columns}
                rowSelection={null}
                onChange={this.handleStandardTableChange}
              />
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}

export default Depart;
