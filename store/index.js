import Vuex from 'vuex';
import speakerData from './../assets/pollution.json';

const createStore = () => {
  return new Vuex.Store({
    state: {
      speakingColumns: ['Country', 'Waste'],
      speakerData
    }
  });
};

export default createStore;
