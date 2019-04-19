/* eslint-disable compat/compat */
import React, { Component } from 'react';
import { connect } from 'dva';
import CryptoJS from 'crypto-js';
import { Modal, Form, Input, Icon, Select, Radio, Upload, message } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;

@connect(({ info, loading }) => ({
  info,
  loading: loading.models.info,
}))
@Form.create()
class EditDoc extends Component {
  handleUploadHeader = () => {
    const appID = 'WEDOCTOR';
    const appKey = '29A9D4F75A7F48DE';
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const randomNum = Math.floor(Math.random() * 1000);
    const signAture = CryptoJS.MD5(appKey + timestamp + randomNum)
      .toString()
      .toUpperCase('');
    return {
      app_id: appID,
      app_key: appKey,
      timestamp,
      random: randomNum,
      signature: signAture,
      user_id: '721',
      assess_token: '',
    };
  };

  hideEditModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeEditDocStatus',
    });
  };

  handleEditModal = e => {
    const {
      dispatch,
      info: { editDocDetails, expertKey, expertDetailsList },
      form,
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'info/changeEditDocStatusLoading',
        });
        const isUpdate = Object.values(editDocDetails).length === 0;
        const val = { ...values };
        val.subject_code = expertKey;
        if (isUpdate) {
          val.order_no = editDocDetails.order_no;
        } else {
          val.order_no = expertDetailsList.length + 1;
        }
        dispatch({
          type: 'info/getExpertAddRemove',
          payload: {
            type: isUpdate,
            params: val,
          },
          callBack: this.getDoctorDetails,
        });
      }
    });
  };

  getDoctorDetails = () => {
    const {
      dispatch,
      info: { expertKey },
    } = this.props;
    dispatch({
      type: 'info/changeEditDocStatus',
    });
    dispatch({
      type: 'info/changeEditDocStatusLoading',
    });
    dispatch({
      type: 'info/getExpertDetails',
      payload: expertKey,
    });
  };

  beforeUpload = file => {
    const {
      info: { uploadHeader },
    } = this.props;
    if (Object.values(uploadHeader).length <= 0) {
      message.error('请先选择人名!');
      return false;
    }
    const Img = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/bmp'];
    const isImg = Img.some(v => file.type === v);
    if (!isImg) {
      return false;
    }
    return true;
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/savePreviewVisible',
      payload: false,
    });
  };

  handlePreview = file => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/savePreviewImage',
      payload: file.url || file.thumbUrl,
    });
    dispatch({
      type: 'info/savePreviewVisible',
      payload: true,
    });
  };

  // eslint-disable-next-line consistent-return
  handleChange = ({ fileList }) => {
    const {
      info: { uploadHeader },
      dispatch,
    } = this.props;
    if (Object.values(uploadHeader).length <= 0) {
      return false;
    }
    const isFileList = fileList.length > 0;
    const Img = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/bmp'];
    const isImg = Img.some(v => isFileList && fileList[0].type === v);
    if (!isImg && isFileList) {
      message.error('请上传图片格式!');
      return false;
    }
    dispatch({
      type: 'info/saveFileList',
      payload: fileList,
    });
  };

  nameChange = (v, k) => {
    const {
      info: { expertKey },
      dispatch,
    } = this.props;
    dispatch({
      type: 'info/saveUploadHeader',
      payload: {
        user_id: v,
        name: k.props.children,
      },
    });
    dispatch({
      type: 'info/getDoctorImgList',
      payload: {
        code: expertKey,
        id: v,
      },
    });
  };

  render() {
    const {
      visibleStatus,
      info: {
        editDocStatusLoading,
        editDocDetails,
        doctorList,
        uploadHeader,
        previewVisible,
        previewImage,
        fileList,
      },
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

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        {visibleStatus ? (
          <Modal
            title="医生信息"
            visible={visibleStatus}
            onOk={this.handleEditModal}
            confirmLoading={editDocStatusLoading}
            onCancel={this.hideEditModal}
            width="60%"
          >
            <Form {...formItemLayout} key={editDocDetails.sex}>
              <Form.Item label="姓名">
                {getFieldDecorator('user_id', {
                  rules: [
                    {
                      required: true,
                      message: '请输入您的姓名!',
                    },
                  ],
                  initialValue: editDocDetails.doctor_id,
                })(
                  <Select placeholder="请选择您的姓名!" onChange={this.nameChange}>
                    {doctorList.map(v => {
                      return <Option key={v.user_id}>{v.name}</Option>;
                    })}
                  </Select>
                )}
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
                  <RadioGroup>
                    <RadioButton value="男">男</RadioButton>
                    <RadioButton value="女">女</RadioButton>
                  </RadioGroup>
                )}
              </Form.Item>
              <Form.Item label="上传头像">
                <Upload
                  action={`/mob301/api/expert/upload?user_id=${uploadHeader.user_id}&name=${
                    uploadHeader.name
                  }`}
                  listType="picture-card"
                  headers={this.handleUploadHeader()}
                  fileList={fileList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  onPreview={this.handlePreview}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img src={previewImage} alt="avatar" style={{ width: '100%' }} />
                </Modal>
              </Form.Item>
              <Form.Item label="职称">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入您的职称！', whitespace: true }],
                  initialValue: editDocDetails.title,
                })(<TextArea placeholder="请输入您的职称!" rows={4} />)}
              </Form.Item>
              <Form.Item label="教学职务">
                {getFieldDecorator('teaching', {
                  rules: [{ required: true, message: '请输入教学职务', whitespace: true }],
                  initialValue: editDocDetails.teaching,
                })(<TextArea placeholder="请输入教学职务" rows={4} />)}
              </Form.Item>
              <Form.Item label="导师职务">
                {getFieldDecorator('tutor', {
                  rules: [{ required: true, message: '请输入导师职务', whitespace: true }],
                  initialValue: editDocDetails.tutor,
                })(<TextArea placeholder="请输入导师职务" rows={4} />)}
              </Form.Item>
              <Form.Item label="职务">
                {getFieldDecorator('duty', {
                  rules: [{ required: true, message: '请输入职务', whitespace: true }],
                  initialValue: editDocDetails.duty,
                })(<TextArea placeholder="请输入职务" rows={4} />)}
              </Form.Item>
              <Form.Item label="其他职务">
                {getFieldDecorator('job', {
                  rules: [{ required: true, message: '请输入其他职务', whitespace: true }],
                  initialValue: editDocDetails.job,
                })(<TextArea placeholder="请输入其他职务" rows={4} />)}
              </Form.Item>
              <Form.Item label="特长简介">
                {getFieldDecorator('specialty', {
                  rules: [{ required: true, message: '请输入特长简介', whitespace: true }],
                  initialValue: editDocDetails.speciality,
                })(<TextArea placeholder="请输入特长简介" rows={4} />)}
              </Form.Item>
              <Form.Item label="专业特长">
                {getFieldDecorator('advantage', {
                  rules: [{ required: true, message: '请输入专业特长', whitespace: true }],
                  initialValue: editDocDetails.advantage,
                })(<TextArea placeholder="请输入专业特长" rows={4} />)}
              </Form.Item>
              <Form.Item label="学术任职">
                {getFieldDecorator('academics', {
                  rules: [{ required: true, message: '请输入学术任职', whitespace: true }],
                  initialValue: editDocDetails.academics,
                })(<TextArea placeholder="请输入学术任职" rows={4} />)}
              </Form.Item>
              <Form.Item label="科学研究">
                {getFieldDecorator('research', {
                  rules: [{ required: true, message: '请输入科学研究', whitespace: true }],
                  initialValue: editDocDetails.research,
                })(<TextArea placeholder="请输入科学研究" rows={4} />)}
              </Form.Item>
              <Form.Item label="教育培训">
                {getFieldDecorator('education', {
                  rules: [{ required: true, message: '请输入教育培训', whitespace: true }],
                  initialValue: editDocDetails.education,
                })(<TextArea placeholder="请输入教育培训" rows={4} />)}
              </Form.Item>
              <Form.Item label="表彰奖励">
                {getFieldDecorator('award', {
                  rules: [{ required: true, message: '请输入表彰奖励', whitespace: true }],
                  initialValue: editDocDetails.award,
                })(<TextArea placeholder="请输入表彰奖励" rows={4} />)}
              </Form.Item>
            </Form>
          </Modal>
        ) : null}
      </div>
    );
  }
}
export default EditDoc;
