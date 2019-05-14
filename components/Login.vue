<template lang="html">
<div class="hello">
  <h3 v-if="!loggedIn">You are not logged in</h3>
  <h3 v-if="loggedIn">Hello, {{webId}}</h3>
  <button class="login" type="button" v-if="!loggedIn" @click="popupLogin">Login</button>
  <button class="logout" type="button" v-if="loggedIn" @click="popupLogOut">Log out</button>
</div>
</template>

<script>
import axios from 'axios';
const auth = require('solid-auth-client')
let solid = { auth }


export default {
  data:()=>{
    return {
      loggedIn: false,
      webId: "",
    }
  },
  methods:{
    async popupLogin(){
      let vm = this;
      let session = await solid.auth.currentSession();
      let popupUri = 'https://solid.github.io/solid-auth-client/dist/popup.html';
      if (!session){
        session = await solid.auth.popupLogin({ popupUri });
        alert(`Logged in as ${session.webId}`);
        vm.webId = session.webId
        vm.loggedIn = true;
      }

    }, 
    async popupLogOut(){
        let vm = this;
        vm.webId = ""
        vm.loggedIn = false;
        solid.auth.logout().then(() => alert('Goodbye!'));
  },
  created(){
    let vm = this;
    auth.trackSession(session => {
      if (!session){
        vm.loggedIn = false;
        vm.webId = "";
      }else{
        vm.loggedIn = true;
        vm.webId = session.webId;
        console.log(session);
      }
    });
  }
}
}
</script>

<style lang="css">
.hello{
    position: absolute;
    top: 40px;
    right: 40px;
}

.login {
    position: absolute;
    top: 40px;
    right: 50px;
}

.logout {
    position: absolute;
    top: 40px;
    width: 90px;
}
</style>