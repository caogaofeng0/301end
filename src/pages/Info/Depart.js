import React, { Component, Fragment } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import styles from './Depart.less';

@connect(({ info, global }) => ({
  info,
  global,
}))
class Depart extends Component {
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
      global: { clientHeight },
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
