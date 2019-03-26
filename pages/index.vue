<template>
  <section>
    <h1>Pollution Visualizer</h1>
    <h3>Lab Web</h3>
    <div class="tablecontain">
      <p class="mobiletext">You can scroll right to view the rest of the table, but it's easier to read on wider screens</p>
      <label for="filterLabel">Filter By</label>
      <select id="filterLabel" name="select" v-model="selectedFilter">
        <option v-for="column in columns" key="column" :value="column">
          {{ column }}
        </option>
      </select>
      <span v-if="selectedFilter">
        <label for="filterText" class="hidden">{{ selectedFilter }}</label>
        <input id="filteredText" type="text" name="textfield" v-model="filteredText"></input>
      </span>
      <button type="button" name="button" :value="CO2" v-model="pollution" @click="data='CO2'">CO2</button>
      <button type="button" name="button" :value="CO22" v-model="pollution" @click="data='CO22'">CO22</button>
      <speaking-table :filteredData="filteredData"></speaking-table>
    </div>
    <more-info></more-info>
    <speaking-globe :filteredData="filteredData" v-if="option1 == true"></speaking-globe>
  </section>
</template>

<script>

import axios from 'axios'
import SpeakingGlobe from '~/components/SpeakingGlobe.vue'
import SpeakingTable from '~/components/SpeakingTable.vue'
import MoreInfo from '~/components/MoreInfo.vue'
import speakerData from './../assets/data.json';
import speakerData2 from './../assets/data2.json';

var dataURL = 'https://salty-shelf-74567.herokuapp.com/';


export default {
  components: {
    SpeakingGlobe,
    SpeakingTable,
    MoreInfo,
  },
  data() {
    return {
      filteredText: '',
      selectedFilter: '',
      jsonData: [],
      option1: true,
      speakerData,
      speakerData2,
      pollution: "CO2",
    }
  },
  methods: {
    foreRerender(){
      // Remove my-component from the DOM
      this.option1 = false;
      
      this.$nextTick().then(() => {
          // Add the component back in
          this.option1 = true;
        });
    }
  },
  mounted(){
    self = this;
    axios
      .get(dataURL)
      .then(response => {this.jsonData = response})
      .catch(error => {console.error(error)})
      .finally(() => console.log(self.jsonData))
  },
  computed: {
    data: {
    // getter
    get: function () {
        if(this.pollution == 'CO22'){
          return this.speakerData2;
        } else {
          return this.speakerData;
        }
    },
    // setter
    set: function (newValue) {
      if(newValue == "CO22"){
        this.pollution = "CO22";
        this.$store.state.data = this.speakerData2;
        this.foreRerender();
      }else {
        this.pollution = "CO2";
        this.$store.state.data = this.speakerData;
        this.foreRerender();
      }
    }
  },
    columns() {
      return this.$store.state.speakingColumns;
    },
    filteredData() {
      const x = this.selectedFilter,
        filter = new RegExp(this.filteredText, 'i')
      return this.data.filter(el => {
        if (el[x] !== undefined) { return el[x].match(filter) }
        else return true;
      })
    }
  }
}
</script>

<style>
body {
  background: black;
  color: white;
  font-family: "Open Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
}

h1,
h3 {
  font-weight: 300;
}

h3,
p {
  color: #5AB4FC;
}

p {
  margin-bottom: 10px;
}

section {
  padding: 40px;
}

input,
select,
option {
  font-family: "Open Sans", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

select,
input[type="text"] {
  margin: 0 0 0 8px;
  background: transparent;
  color: #b1afb8;
  font-size: 16px;
  border: 1px solid #4f4d53;
  line-height: 20px;
  position: relative;
  z-index: 3000;
  border-radius: 4px;
  padding: 2px 0;
}

a {
  color: white;
  text-decoration: none;
}

input[type="text"] {
  background: #121212;
  transition: 0.3s all ease;
}

.hidden {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.tablecontain {
  margin: 50px 0 0 0;
}

@media (max-width: 800px) {
  .tablecontain {
    margin: 350px 0 0 0;
    width: 80vw;
    overflow: scroll;
  }

  h1 {
    width: 60vw;
  }
}

@media (min-width: 600px) {
  .mobiletext {
    display: none;
  }
}
</style>
