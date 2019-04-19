import React, { Component } from 'react';

import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';

class UserLayout extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const { children } = this.props;
    return (
      <DocumentTitle title="301">
        <div className={styles.container}>
          <div className={styles.content}>{children}</div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
