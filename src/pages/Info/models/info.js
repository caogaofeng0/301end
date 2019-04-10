import {
  getDoctorList,
  departInfo,
  departInfoList,
  specialityCategory,
  expertDetails,
  specialityProfile,
} from '@/services/info';

export default {
  namespace: 'info',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    depart: {
      list: [],
      pagination: {},
      abstract: '',
      leader: '',
    },
    expertDetailsList: [],
    specialityCategory: [],
    specialityProfileList: {},
    editDocStatusLoading: false,
    departList: [],
    editDocStatus: false,
    editDocDetails: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getDoctorList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDepart({ payload }, { call, put }) {
      const response = yield call(departInfo, payload);
      yield put({
        type: 'saveDepart',
        payload: response,
      });
    },
    *fetchDepartList({ payload }, { call, put }) {
      const response = yield call(departInfoList, payload);
      yield put({
        type: 'saveDepartList',
        payload: response,
      });
    },
    *getSpecialityCategory({ payload }, { call, put }) {
      const response = yield call(specialityCategory, payload);
      yield put({
        type: 'saveSpecialityCategory',
        payload: response.response_results.speciality_list,
      });
    },
    *getExpertDetails({ payload }, { call, put }) {
      const response = yield call(expertDetails, payload);
      yield put({
        type: 'saveExpertDetails',
        payload: response.response_results.expert_list,
      });
    },
    *getSpecialityProfile({ payload }, { call, put }) {
      const response = yield call(specialityProfile, payload);
      yield put({
        type: 'saveSpecialityProfile',
        payload: response.response_results,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveDepart(state, action) {
      return {
        ...state,
        depart: action.payload,
      };
    },
    saveDepartList(state, action) {
      return {
        ...state,
        departList: action.payload,
      };
    },
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
  },
};
