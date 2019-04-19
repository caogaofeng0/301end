/* eslint-disable no-param-reassign */
/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import { Card, Row, Col, Form, Input, Button, Table, Select, message } from 'antd';
import { connect } from 'dva';
import styles from './Depart.less';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  save = (e, v) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      // this.toggleEdit();
      const val = { ...values };
      if (v) {
        val.doctor_list = e;
      }
      handleSave({ ...record, ...val });
    });
  };

  render() {
    // const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      selected,
      departEditStatus,
      doctorList,
      ...restProps
    } = this.props;
    return (
      <td
        {...restProps}
        style={editable && departEditStatus ? { padding: 0 } : { textAlign: 'center' }}
      >
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return departEditStatus ? (
                <FormItem style={{ margin: 0, padding: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    // rules:[{
                    //   required: true,
                    //   message:`${title} is required.`
                    // }],
                    initialValue: record[dataIndex],
                    // initialValue:selected ? this.state.ed : record[dataIndex]
                  })(
                    selected ? (
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        onPressEnter={e => this.save(e, 'sel')}
                        onChange={e => this.save(e, 'sel')}
                      >
                        {doctorList.map(v => {
                          return <Option key={v.user_id}>{v.name}</Option>;
                        })}
                      </Select>
                    ) : (
                      <TextArea
                        // eslint-disable-next-line no-return-assign
                        ref={node => (this.input = node)}
                        rows={4}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  // onClick={this.toggleEdit}
                >
                  {selected ? record.doctor_listName : restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

@connect(({ info, global, loading }) => ({
  info,
  global,
  loading: loading.effects['info/fetchDepart'],
}))
@Form.create()
class Depart extends Component {
  state = {};

  columns = [
    {
      title: '序号',
      dataIndex: 'item_no',
      width: 80,
      fixed: 'left',
      align: 'center',
    },
    {
      title: '特色技术',
      dataIndex: 'advantage',
      width: 200,
      editable: true,
    },
    {
      title: '特色技术介绍',
      dataIndex: 'content',
      editable: true,
    },
    {
      title: '相关专家',
      width: 200,
      dataIndex: 'doctor_list',
      selected: true,
      editable: true,
    },
    {
      title: '操作',
      width: 80,
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleDelete(record.item_no)}>删除</a>
        </Fragment>
      ),
    },
  ];

  handleDelete = key => {
    const {
      info: {
        specialityProfileList: { data, count },
      },
      dispatch,
    } = this.props;
    const dataSource = { ...data };
    dataSource.advantage_list = dataSource.advantage_list.filter(item => item.item_no !== key);
    dispatch({
      type: 'info/saveSpecialityProfile',
      payload: {
        data: dataSource,
        count: count - 1,
      },
    });
  };

  handleAdd = () => {
    const {
      info: {
        specialityProfileList: { data, count },
        expertKey,
      },
      dispatch,
    } = this.props;
    const newData = {
      key: count,
      item_no: count,
      advantage: '',
      content: '',
      doctor_list: [],
    };
    if (!expertKey) {
      message.info('请选择科室');
      return;
    }
    data.advantage_list = [...data.advantage_list, newData];
    dispatch({
      type: 'info/saveSpecialityProfile',
      payload: {
        data,
        count: count + 1,
      },
    });
  };

  handleSave = row => {
    const {
      info: {
        specialityProfileList: { data, count },
      },
      dispatch,
    } = this.props;
    const newData = { ...data };
    const index = newData.advantage_list.findIndex(item => row.item_no === item.item_no);
    const item = newData.advantage_list[index];
    newData.advantage_list.splice(index, 1, {
      ...item,
      ...row,
    });
    dispatch({
      type: 'info/saveSpecialityProfile',
      payload: {
        data: newData,
        count,
      },
    });
  };

  getDepartDetails = () => {
    const {
      dispatch,
      info: { expertKey, departEditStatus },
    } = this.props;
    dispatch({
      type: 'info/getSpecialityProfile',
      payload: expertKey,
    });
    if (departEditStatus) {
      dispatch({
        type: 'info/changeDepartEditStatus',
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      info: { expertKey },
    } = this.props;
    if (!expertKey) {
      message.info('请选择科室');
      return;
    }

    dispatch({
      type: 'info/changeDepartEditStatus',
    });
  };

  handleSaveDepart = () => {
    const {
      form,
      info: {
        specialityProfileList: { data },
        expertKey,
        doctorList,
        departEditStatus,
      },
      dispatch,
    } = this.props;
    if (!expertKey) {
      message.info('请选择科室');
      return;
    }
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const dataList = { ...data };
        if (departEditStatus) {
          dataList.speciality_desc = fieldsValue.speciality_desc;
          dataList.leader_profile = fieldsValue.leader_profile;
        }

        doctorList.forEach(v => {
          dataList.advantage_list.forEach(t => {
            delete t.doctor_listName;
            t.doctor_list.forEach((val, idx) => {
              if (val === v.user_id) {
                t.doctor_list[idx] = {
                  doctor_id: val,
                  doctor_name: v.name,
                  order_no: v.order_no,
                };
              }
            });
          });
        });
        dispatch({
          type: 'info/getCreateSpecialityProfile',
          payload: dataList,
          callBack: this.getDepartDetails,
        });
      }
    });
  };

  render() {
    const {
      info: { specialityProfileList, departEditStatus, doctorList },
      global: { clientHeight },
      form: { getFieldDecorator },
    } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          selected: col.selected,
          departEditStatus,
          doctorList,
        }),
      };
    });

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
    const { data } = specialityProfileList;
    const desc = data && data.speciality_desc;
    const profile = data && data.leader_profile;
    return (
      <Fragment>
        <Card bordered={false} bodyStyle={{ padding: 0 }} className={styles.departBody}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {/* <Form.Item {...tailFormItemLayout}> */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
              <Button type="primary" htmlType="submit">
                编辑
              </Button>
              <Button type="primary" onClick={this.handleSaveDepart} style={{ marginLeft: 20 }}>
                保存
              </Button>
            </div>

            {/* </Form.Item> */}
            <Form.Item label="专科简介：" labelCol={{ span: 3, offset: 0 }}>
              {departEditStatus ? (
                getFieldDecorator('speciality_desc', { initialValue: desc })(<TextArea rows={4} />)
              ) : (
                <p>{desc}</p>
              )}
            </Form.Item>
            <Form.Item label="学科带头人：" labelCol={{ span: 3, offset: 0 }}>
              {departEditStatus ? (
                getFieldDecorator('leader_profile', { initialValue: profile })(
                  <TextArea rows={4} />
                )
              ) : (
                <p>{profile}</p>
              )}
            </Form.Item>
          </Form>
          <Row>
            <Col
              style={{
                display: 'flex',
                flexDirection: 'initial',
                justifyContent: 'space-between',
                paddingBottom: '10px',
              }}
            >
              <span className={styles.feature}>门诊专科特色技术:</span>
              <Button type="primary" onClick={this.handleAdd}>
                新增特色技术
              </Button>
            </Col>
            <Col>
              <Table
                scroll={{ x: '150%', y: clientHeight - 330 }}
                components={components}
                rowKey={key => key.item_no}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={(data && data.advantage_list) || []}
                columns={columns}
                pagination={false}
                className={styles.departTable}
              />
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}

export default Depart;
