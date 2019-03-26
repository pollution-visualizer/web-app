import Vuex from 'vuex';
import speakerData from './../assets/data.json';
var data = speakerData;

const createStore = () => {
  return new Vuex.Store({
    state: {
      speakingColumns: ['Country', 'Year', 'Waste'],
      data,
    }
  });
};

export default createStore;
