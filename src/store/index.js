import Vue from "vue";
import Vuex from "vuex";
import stopwatch from "./stopwatch";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stopwatch
  }
});
