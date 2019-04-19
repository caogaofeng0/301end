import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Breadcrumb } from 'antd';
import styles from './UserList.less';
/* eslint react/no-multi-comp:0 */
@connect(({ hUser, loading }) => ({
  hUser,
  loading: loading.models.hUser,
}))
class User extends PureComponent {
  render() {
    const {
      children,
      location,
      hUser: { bindUser, patientUser },
    } = this.props;
    const urlArr = location && location.pathname.slice(1).split('/');
    const analyUrl = () => {
      // eslint-disable-next-line no-nested-ternary
      return urlArr.includes('bindhistory') ? (
        <Link to="/hospitalUser/userlist/bindUser">
          绑定的患者{bindUser.user_name}/{bindUser.user_id}
        </Link>
      ) : urlArr.includes('bindUser') ? (
        `绑定的患者${bindUser.user_name}/${bindUser.user_id}`
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
            {urlArr.includes('bindUser') || urlArr.includes('bindhistory') ? (
              <Link to="/hospitalUser/userlist">医院用户列表</Link>
            ) : (
              '医院用户列表'
            )}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{analyUrl()}</Breadcrumb.Item>
          {urlArr.includes('bindhistory') ? (
            <Breadcrumb.Item>
              患者挂号记录{patientUser.name}/{patientUser.patient_id}
            </Breadcrumb.Item>
          ) : null}
        </Breadcrumb>
        {children}
      </div>
    );
  }
}

export default User;
