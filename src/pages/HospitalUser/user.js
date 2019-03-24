/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

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
    return <PageHeaderWrapper title={null}>{children}</PageHeaderWrapper>;
  }
}

export default User;
