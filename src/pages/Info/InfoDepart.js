/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input, Form, Radio } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './InfoDepart.less';

const FormItem = Form.Item;
@connect(({ loading, user, project }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))
@Form.create()
class InfoDepart extends React.Component {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    dispatch({
      type: 'project/fetchNotice',
    });
  }

  onTabChange = key => {
    const { match } = this.props;
    console.log(key, match, 'doctor--------->');
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'doctor':
        router.push(`${match.url}/doctor`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        // dispatch({
        //   type: 'form/submitRegularForm',
        //   payload: values,
        // });
      }
    });
  };

  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const {
      listLoading,
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      match,
      location,
      children,
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const operationTabList = [
      {
        key: 'articles',
        tab: <span>科室信息</span>,
      },
      {
        key: 'doctor',
        tab: <span>科室医生</span>,
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ];
    console.log(location.pathname, 'location.pathname');

    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
              <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem>
                  {getFieldDecorator('name')(<Input placeholder="输入关键字搜索" />)}
                </FormItem>
                <div className={styles.InfoDepartList} />
                {getFieldDecorator('depart', {
                  initialValue: 'all',
                })(
                  <Radio.Group>
                    <Radio.Button value="all">全部</Radio.Button>
                    <Radio.Button value="in">内科</Radio.Button>
                    <Radio.Button value="out">外科</Radio.Button>
                    <Radio.Button value="other">其他</Radio.Button>
                  </Radio.Group>
                )}
              </Form>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={listLoading}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default InfoDepart;
