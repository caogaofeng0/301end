/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input, Form, Radio, Menu } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './InfoDepart.less';

const FormItem = Form.Item;
// const SubMenu = Menu.SubMenu;
@connect(({ loading, user, project, global }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  global,
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
      case 'info':
        router.push(`${match.url}`);
        break;
      case 'doctor':
        router.push(`${match.url}/doctor`);
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

  handleClick = e => {
    console.log('click ', e);
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
      global: { clientHeight },
    } = this.props;

    const operationTabList = [
      {
        key: 'info',
        tab: <span>科室信息</span>,
      },
      {
        key: 'doctor',
        tab: <span>科室医生</span>,
      },
    ];
    console.log(clientHeight, clientHeight - 70, 'location.pathname');
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{ marginBottom: 24, height: clientHeight - 70 }}
              loading={currentUserLoading}
            >
              <Form
                onSubmit={this.handleSubmit}
                hideRequiredMark
                style={{ marginTop: 8, height: '10%' }}
              >
                <FormItem>
                  {getFieldDecorator('name')(<Input placeholder="输入关键字搜索" />)}
                </FormItem>
                <div className={styles.infoItem}>
                  <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={this.handleClick}
                    style={{ height: clientHeight - 260 }}
                  >
                    <Menu.Item key="1">
                      <Icon type="user" />
                      <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Icon type="upload" />
                      <span>nav 3</span>
                    </Menu.Item>
                    <Menu.Item key="21">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="22">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="12">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="221">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="224">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>

                    <Menu.Item key="21422">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="21522">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="22122">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="21122">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="21622">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="27122">
                      <span>科室：小儿骨科/</span>
                      <span>输入码：</span>
                    </Menu.Item>
                    <Menu.Item key="21262">
                      <span>科室：小儿骨科/1234567890</span>
                      <span>输入码：</span>
                    </Menu.Item>
                  </Menu>
                </div>
                <div className={styles.departButtton}>
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
                </div>
              </Form>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              defaultActiveKey="info"
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
