import { message } from 'antd';
import {
  specialityCategory,
  expertDetails,
  specialityProfile,
  specialityCategoryList,
  createSpecialityProfile,
  expertUpdate,
  expertAppend,
  getDoctor,
  getDoctorImg,
} from '@/services/info';

export default {
  namespace: 'info',
  state: {
    expertDetailsList: [],
    specialityCategory: [],
    specialityProfileList: {
      data: [],
      count: 0,
    },
    editDocStatusLoading: false,
    editDocStatus: false,
    editDocDetails: {},
    specialityCategoryList: {},
    specialityCategoryLoading: false,
    expertUpdateStatus: false,
    expertUpdateStatusLoading: false,
    expertKey: '',
    departEditStatus: false,
    doctorList: [],
    editDocDetailsImg: [],
    uploadHeader: {},
    previewVisible: false,
    previewImage: '',
    fileList: [],
  },

  effects: {
    *getCreateSpecialityProfile({ payload, callBack }, { call }) {
      const response = yield call(createSpecialityProfile, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      callBack();
    },
    *getSpecialityCategory({ payload }, { call, put }) {
      yield put({
        type: 'SCLoadingTrue',
      });
      const response = yield call(specialityCategory, payload);
      yield put({
        type: 'SCLoadingFalse',
      });
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      yield put({
        type: 'saveSpecialityCategory',
        payload: response.response_results.speciality_list,
      });
    },
    *getExpertDetails({ payload }, { call, put }) {
      const response = yield call(expertDetails, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      yield put({
        type: 'saveExpertDetails',
        payload: response.response_results.expert_list,
      });
    },
    *getSpecialityProfile({ payload }, { call, put }) {
      const response = yield call(specialityProfile, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      const backData = response.response_results;
      const data = response.response_results.advantage_list.sort((a, b) => a.item_no - b.item_no);
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < data.length; index++) {
        data[index].doctor_listName = data[index].doctor_list.map(v => v.doctor_name).toString('');
        data[index].doctor_list = data[index].doctor_list.map(v => v.doctor_id);
      }
      backData.advantage_list = data;
      yield put({
        type: 'saveSpecialityProfile',
        payload: {
          data: backData,
          count: backData.advantage_list.length + 1,
        },
      });
    },
    // eslint-disable-next-line no-empty-pattern
    *getSpecialityCategoryList({}, { call, put }) {
      const response = yield call(specialityCategoryList);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      yield put({
        type: 'saveSpecialityCategoryList',
        payload: response.response_results.category_list,
      });
    },
    *getExpertAddRemove({ payload, callBack }, { call, put }) {
      const response = yield call(payload.type ? expertAppend : expertUpdate, payload.params);
      if (response === undefined) {
        yield put({
          type: 'changeEditDocStatusLoading',
        });
        message.error(response.error_message);
        return;
      }
      callBack();
    },
    *getDoctors({ payload }, { call, put }) {
      const response = yield call(getDoctor, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      yield put({
        type: 'saveDoctorList',
        payload: response.response_results.doctor_list,
      });
    },
    *getDoctorImgList({ payload }, { call, put }) {
      const response = yield call(getDoctorImg, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      yield put({
        type: 'saveFileList',
        payload: [
          {
            uid: '-1',
            name: response.response_results.doctor_name,
            status: 'done',
            url: `data:image/png;base64,${response.response_results.photo}`,
          },
        ],
      });
    },
  },

  reducers: {
    changeEditDocStatus(state) {
      return {
        ...state,
        editDocStatus: !state.editDocStatus,
      };
    },
    changeEditDocDetails(state, action) {
      return {
        ...state,
        editDocDetails: action.payload,
      };
    },
    changeEditDocDetailsImg(state, action) {
      return {
        ...state,
        editDocDetailsImg: action.payload,
      };
    },
    changeEditDocStatusLoading(state) {
      return {
        ...state,
        editDocStatusLoading: !state.editDocStatusLoading,
      };
    },
    saveSpecialityCategory(state, action) {
      return {
        ...state,
        specialityCategory: action.payload,
      };
    },
    saveExpertDetails(state, action) {
      return {
        ...state,
        expertDetailsList: action.payload,
      };
    },
    saveSpecialityProfile(state, action) {
      return {
        ...state,
        specialityProfileList: action.payload,
      };
    },
    saveSpecialityCategoryList(state, action) {
      return {
        ...state,
        specialityCategoryList: action.payload,
      };
    },
    SCLoadingTrue(state) {
      return {
        ...state,
        specialityCategoryLoading: true,
      };
    },
    SCLoadingFalse(state) {
      return {
        ...state,
        specialityCategoryLoading: false,
      };
    },
    saveExpertUpdateStatus(state, action) {
      return {
        ...state,
        expertUpdateStatus: action.payload,
      };
    },
    saveExpertUpdateLoading(state, action) {
      return {
        ...state,
        expertUpdateStatusLoading: action.payload,
      };
    },
    saveExpertKey(state, action) {
      return {
        ...state,
        expertKey: action.payload,
      };
    },
    changeDepartEditStatus(state) {
      return {
        ...state,
        departEditStatus: !state.departEditStatus,
      };
    },
    saveDoctorList(state, action) {
      return {
        ...state,
        doctorList: action.payload,
      };
    },
    saveUploadHeader(state, action) {
      return {
        ...state,
        uploadHeader: action.payload,
      };
    },
    savePreviewVisible(state, action) {
      return {
        ...state,
        previewVisible: action.payload,
      };
    },
    savePreviewImage(state, action) {
      return {
        ...state,
        previewImage: action.payload,
      };
    },
    saveFileList(state, action) {
      return {
        ...state,
        fileList: action.payload,
      };
    },
  },
};
