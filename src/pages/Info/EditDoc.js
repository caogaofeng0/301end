import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, Input, Icon, Radio, Upload } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ info, loading }) => ({
  info,
  loading: loading.models.info,
}))
@Form.create()
class EditDoc extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  hideEditModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeEditDocStatus',
    });
  };

  handleEditModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeEditDocStatusLoading',
    });
    setTimeout(() => {
      dispatch({
        type: 'info/changeEditDocStatus',
      });
      dispatch({
        type: 'info/changeEditDocStatusLoading',
      });
    }, 4000);
  };

  render() {
    const {
      visibleStatus,
      info: { editDocStatusLoading, editDocDetails },
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <Modal
          title="医生信息"
          visible={visibleStatus}
          onOk={this.handleEditModal}
          confirmLoading={editDocStatusLoading}
          onCancel={this.hideEditModal}
          width="60%"
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="姓名">
              {getFieldDecorator('doctor_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的姓名!',
                  },
                ],
                initialValue: editDocDetails.doctor_name,
              })(<Input placeholder="请输入您的姓名!" />)}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('sex', {
                rules: [
                  {
                    required: true,
                    message: '请选择您的性别!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
                initialValue: editDocDetails.sex,
              })(
                <RadioGroup initialValue="a">
                  <RadioButton value="a">男</RadioButton>
                  <RadioButton value="b">女</RadioButton>
                  <RadioButton value="c">未知</RadioButton>
                </RadioGroup>
              )}
            </Form.Item>
            <Form.Item
              label="Upload"
              // extra="地址"
            >
              {getFieldDecorator('photo', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: editDocDetails.photo,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> 点击上传头像
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item label="职称">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入您的职称！', whitespace: true }],
                initialValue: editDocDetails.title,
              })(<Input placeholder="请输入您的职称!" />)}
            </Form.Item>
            <Form.Item label="教学职务">
              {getFieldDecorator('teachWork', {
                rules: [{ required: true, message: '请输入教学职务', whitespace: true }],
                initialValue: editDocDetails.teachWork,
              })(<Input placeholder="请输入教学职务" />)}
            </Form.Item>
            <Form.Item label="导师职务">
              {getFieldDecorator('teaching', {
                rules: [{ required: true, message: '请输入导师职务', whitespace: true }],
                initialValue: editDocDetails.teaching,
              })(<Input placeholder="请输入导师职务" />)}
            </Form.Item>
            <Form.Item label="职务">
              {getFieldDecorator('duty', {
                rules: [{ required: true, message: '请输入职务', whitespace: true }],
                initialValue: editDocDetails.duty,
              })(<Input placeholder="请输入职务" />)}
            </Form.Item>
            <Form.Item label="其他职务">
              {getFieldDecorator('job', {
                rules: [{ required: true, message: '请输入其他职务', whitespace: true }],
                initialValue: editDocDetails.job,
              })(<Input placeholder="请输入其他职务" />)}
            </Form.Item>
            <Form.Item label="特长简介">
              {getFieldDecorator('speciality', {
                rules: [{ required: true, message: '请输入特长简介', whitespace: true }],
                initialValue: editDocDetails.speciality,
              })(<Input placeholder="请输入特长简介" />)}
            </Form.Item>
            <Form.Item label="专业特长">
              {getFieldDecorator('advantage', {
                rules: [{ required: true, message: '请输入专业特长', whitespace: true }],
                initialValue: editDocDetails.advantage,
              })(<Input placeholder="请输入专业特长" />)}
            </Form.Item>
            <Form.Item label="学术任职">
              {getFieldDecorator('academics', {
                rules: [{ required: true, message: '请输入学术任职', whitespace: true }],
                initialValue: editDocDetails.academics,
              })(<Input placeholder="请输入学术任职" />)}
            </Form.Item>
            <Form.Item label="科学研究">
              {getFieldDecorator('research', {
                rules: [{ required: true, message: '请输入科学研究', whitespace: true }],
                initialValue: editDocDetails.research,
              })(<Input placeholder="请输入科学研究" />)}
            </Form.Item>
            <Form.Item label="教育培训">
              {getFieldDecorator('education', {
                rules: [{ required: true, message: '请输入教育培训', whitespace: true }],
                initialValue: editDocDetails.education,
              })(<Input placeholder="请输入教育培训" />)}
            </Form.Item>
            <Form.Item label="表彰奖励">
              {getFieldDecorator('award', {
                rules: [{ required: true, message: '请输入表彰奖励', whitespace: true }],
                initialValue: editDocDetails.award,
              })(<Input placeholder="请输入表彰奖励" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default EditDoc;
