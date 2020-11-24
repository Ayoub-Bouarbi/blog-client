import Vue from 'vue'
import Vuex from 'vuex'

import { onLogin } from '@/vue-apollo.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginedUser: JSON.parse(localStorage.getItem('logined-user')) ,
  },
  mutations: {
    setLoginedUser(state,user){
        state.loginedUser = user;
        localStorage.setItem('logined-user',JSON.stringify(user));
    },
    destroyLoginedUser(state){
        state.loginedUser = null;
        localStorage.removeItem('logined-user');
    }
  },
  getters: {
    getUser(state){
        return state.loginedUser;
    },
    isAuth(state){
        return !!state.loginedUser;
    }
  },
  actions: {
    login({commit}, {apolloClient,login}){
        onLogin(apolloClient,login.access_token);
        commit('setLoginedUser',login.user);
    },
    logout({commit}){
        commit('destroyLoginedUser')
    }
  },
  modules: {
  }
})
