import Vuex from 'vuex';
import pollution from './../assets/pollution.json';
//import axios from 'axios'

//var dataURL = 'https://salty-shelf-74567.herokuapp.com/';

var data = pollution[0].DataSet;

const createStore = () => {
  return new Vuex.Store({
    state: {
      speakingColumns: ['Country', 'Year', 'Waste'],
      data,
      pollution,
    }
    /*,
    actions: {
      loadData ({ commit }) {
        axios
          .get(dataURL)
          .then(r => r)
          .then(pollution => {
          commit('SET_DATA', pollution)
          })
      }
    },
    mutations: {
      SET_DATA (state, pollution) {
        state.pollution = pollution
      }
    }
    */
  });
};

export default createStore;

