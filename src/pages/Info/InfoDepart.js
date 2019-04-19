/* eslint-disable no-console */
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Row, Col, Input, Form, Radio, Menu, Spin } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './InfoDepart.less';

const FormItem = Form.Item;
@connect(({ loading, info, global }) => ({
  global,
  info,
  loading: loading.effects['info/fetchDepartList'],
}))
@Form.create()
class InfoDepart extends React.Component {
  state = {
    handleSearch: false,
    handleSearchData: [],
  };

  componentDidMount() {
    this.getSpecialityCategoryList();
    this.getDepartList('10');
  }

  getSpecialityCategoryList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/getSpecialityCategoryList',
    });
  };

  getDepartList = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/getSpecialityCategory',
      payload: v,
    });
  };

  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case '/info':
        router.push(`${match.url}`);
        break;
      case 'doctor':
        router.push(`${match.url}/doctor`);
        break;
      default:
        break;
    }
  };

  handleExpertDetails = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/getExpertDetails',
      payload: v,
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleSubmit = e => {
    const {
      form,
      info: { specialityCategory },
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      const { name } = fieldsValue;
      const handleSearchData =
        name === undefined || ''
          ? specialityCategory
          : specialityCategory.filter(v => v.input_code.includes(name.toLocaleUpperCase()));
      this.setState({
        handleSearch: true,
        handleSearchData,
      });
    });
  };

  handleClick = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/getSpecialityProfile',
      payload: e.key,
    });
    dispatch({
      type: 'info/saveExpertKey',
      payload: e.key,
    });
    dispatch({
      type: 'info/getDoctors',
      payload: e.key,
    });
    this.handleExpertDetails(e.key);
  };

  getDepart = e => {
    const depart = e.target.value;
    this.getDepartList(depart);
    this.setState({
      handleSearch: false,
      handleSearchData: [],
    });
  };

  render() {
    const {
      match,
      location,
      children,
      info: { specialityCategory, specialityCategoryList, specialityCategoryLoading },
      global: { clientHeight },
      form: { getFieldDecorator },
    } = this.props;
    const { handleSearch, handleSearchData } = this.state;
    const operationTabList = [
      {
        key: '/info',
        tab: <span>科室信息</span>,
      },
      {
        key: 'doctor',
        tab: <span>科室医生</span>,
      },
    ];
    const sCategory = handleSearch ? handleSearchData : specialityCategory;
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24, height: clientHeight - 70 }}>
              <Form
                // onSubmit={this.handleSubmit}
                hideRequiredMark
                style={{ marginTop: 8, height: '10%' }}
              >
                <FormItem>
                  {getFieldDecorator('name')(
                    <Input
                      placeholder="输入关键字搜索"
                      onChange={this.handleSubmit}
                      onPressEnter={this.handleSubmit}
                    />
                  )}
                </FormItem>
                <div className={styles.infoItem}>
                  <Spin spinning={specialityCategoryLoading}>
                    <Menu
                      theme="light"
                      mode="inline"
                      onClick={this.handleClick}
                      style={{ height: clientHeight - 260 }}
                    >
                      {sCategory &&
                        sCategory.map(v => (
                          <Menu.Item key={v.speciality_code}>
                            <span>科室名称：{v.speciality_name}</span>
                            <span>输入码：{v.input_code}</span>
                          </Menu.Item>
                        ))}
                    </Menu>
                  </Spin>
                </div>
                <div className={styles.departButtton}>
                  {getFieldDecorator('depart', {
                    initialValue: '10',
                  })(
                    <Radio.Group onChange={this.getDepart}>
                      {specialityCategoryList.length > 0 &&
                        specialityCategoryList.map(v => (
                          <Radio.Button value={v.category_code} key={v.category_code}>
                            {v.category_name.slice(0, 2)}
                          </Radio.Button>
                        ))}
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
              defaultactivekey="/info"
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
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
