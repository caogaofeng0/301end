/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import styles from './Depart.less';

@connect(({ info, global, loading }) => ({
  info,
  global,
  loading: loading.effects['info/fetchDepart'],
}))
class Depart extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
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
      width: 100,
      fixed: 'right',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handDoctorInfo(text, record)}>删除</a>
        </Fragment>
      ),
      width: 100,
      fixed: 'right',
    },
  ];

  componentDidMount() {
    this.getDepartDetails();
  }

  getDepartDetails = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/fetchDepart',
    });
  };

  handleStandardTableChange = pagination => {
    this.setState({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
    setTimeout(() => {
      this.getDepartDetails();
    }, 100);
  };

  render() {
    const {
      info: { depart },
      global: { clientHeight },
      loading,
    } = this.props;
    const data = { list: depart.list, pagination: depart.pagination };
    return (
      <Fragment>
        <Card bordered={false} bodyStyle={{ padding: 0 }} className={styles.departBody}>
          <Row>
            <Col>
              <span>学科简介：</span>
              {depart.abstract}
            </Col>
          </Row>
          <Row>
            <Col>
              <span>学科带头人：</span>
              {depart.leader}
            </Col>
          </Row>
          <Row>
            <Col>
              <span>门诊专科特色技术:</span>
            </Col>
            <Col>
              <StandardTable
                loading={loading}
                rowKey={record => record.id}
                selectedRows={[]}
                //  loading={loading}
                data={data}
                columns={this.columns}
                rowSelection={null}
                onChange={this.handleStandardTableChange}
                scroll={{ x: '100%', y: clientHeight - 400 }}
              />
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}

export default Depart;
