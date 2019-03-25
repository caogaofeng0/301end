/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Breadcrumb } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BreadcrumbCon from './BreadcrumbCon';
import styles from './UserList.less';
/* eslint react/no-multi-comp:0 */
@connect(({ hUser, loading }) => ({
  hUser,
  loading: loading.models.rule,
}))
class User extends PureComponent {
  componentDidMount() {
    const { match } = this.props;
    router.push(match.url);
  }

  render() {
    const { match, children, location } = this.props;
    const urlArr = location && location.pathname.slice(1).split('/');
    const analyUrl = () => {
      // eslint-disable-next-line no-nested-ternary
      return urlArr.includes('bindhistory') ? (
        <Link to="/hospitalUser/userlist/bindUser">用户绑定现状</Link>
      ) : urlArr.includes('bindUser') ? (
        '用户绑定现状'
      ) : null;
    };
    return (
      <div>
        <Breadcrumb className={styles.userBread}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>医院用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>
            {urlArr.includes('bindUser') ? (
              <Link to="/hospitalUser/userlist">医院用户列表</Link>
            ) : (
              '医院用户列表'
            )}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{analyUrl()}</Breadcrumb.Item>
          {urlArr.includes('bindhistory') ? <Breadcrumb.Item>患者挂号记录</Breadcrumb.Item> : null}
        </Breadcrumb>
        {children}
      </div>
    );
  }
}

export default User;
