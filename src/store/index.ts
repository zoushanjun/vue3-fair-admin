import { createStore } from "vuex";
import { getJobSvr } from "../network/setup";

export default createStore({
  state: {
    jobSvrData: {},
  },

  actions: {
    //获取作业服务器配置
    getSvrData({ commit }) {
      const params = {
        svrId: 1,
      };

      // getJobSvr(params).then((res) => {
      //   commit("SET_SvrData", res.data);
      // });

      return new Promise((resolve, reject) => {
        getJobSvr(params).then((res) => {
          commit("SET_SvrData", res.data); //将数据存入VUEX
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
  },
  modules: {},
});
