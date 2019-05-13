<template>
  <section>
    <login></login>
    <h1>Pollution Visualizer</h1>
    <h3>Lab Web</h3>
    <br>
      <button type="button" name="button" @click="data='Plastic'">Plastic</button>
      <div class="divider"/>
      <button type="button" name="button" @click="data='Water'">Water</button>
      <br>
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
import Login from '~/components/Login.vue'
//import { mapState } from 'vuex'

var dataURL = 'https://salty-shelf-74567.herokuapp.com/';


export default {
  components: {
    SpeakingGlobe,
    SpeakingTable,
    MoreInfo,
    Login,
  },
  data() {
    return {
      filteredText: '',
      selectedFilter: '',
      jsonData: [],
      option1: true,
      pollutionVal: "Plastic",
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
    //this.$store.dispatch('loadData')
  },
  computed: {
    data: {
    // getter
    get: function () {
        return this.$store.state.data;
    },
    // setter
    set: function (newValue) {
      if(newValue == "Water"){
        this.pollutionVal = "Water";
        this.$store.state.data = this.$store.state.pollution[1].DataSet;
        this.foreRerender();
      }else {
        this.pollutionVal = "Plastic";
        this.$store.state.data = this.$store.state.pollution[0].DataSet;
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

.divider{
    width:5px;
    height:auto;
    display:inline-block;
}

button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  color: white;
  background-color:#121212;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
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
