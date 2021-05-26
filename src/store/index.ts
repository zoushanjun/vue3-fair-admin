import { createStore } from "vuex";
import { getJobSvr, getSmsGw } from "../network/setup";

export default createStore({
  state: {
    jobSvrData: {},
    smsGwData: {},
  },

  actions: {
    //获取作业服务器配置
    getSvrData({ commit }) {
      const params = {
        svrId: 1,
      };

      return new Promise((resolve, reject) => {
        getJobSvr(params).then((res) => {
          commit("SET_SvrData", res.data); //将数据存入VUEX
          resolve(res.data);
          console.log(reject);
        });
      });
    },

    //获取短信网关器配置
    getSmsData({ commit }) {
      const params = {
        smsgwId: 1,
      };

      return new Promise((resolve, reject) => {
        getSmsGw(params).then((res) => {
          commit("SET_smsData", res.data); //将数据存入VUEX
          resolve(res.data);
          console.log(reject);
        });
      });
    },
  },

  mutations: {
    SET_SvrData(state, jobSvrData) {
      state.jobSvrData = jobSvrData;
    },
    SET_smsData(state, smsGwData) {
      state.smsGwData = smsGwData;
    },
  },
  modules: {},
});
