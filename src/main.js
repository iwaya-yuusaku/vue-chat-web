import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app"
import "./assets/css/tailwind.css"

Vue.config.productionTip = false

// Your web app's Firebase configuration
  var firebaseConfig = {
    // apiKey: "AIzaSyBVKgJlR2crXmg0C8ueXSnyXA3dPXghTIM",
    // authDomain: "vue-slack-3ed95.firebaseapp.com",
    // databaseURL: "https://vue-slack-3ed95-default-rtdb.firebaseio.com",
    // projectId: "vue-slack-3ed95",
    // storageBucket: "vue-slack-3ed95.appspot.com",
    // messagingSenderId: "688059406400",
    // appId: "1:688059406400:web:9400383c16703b7e3167a5"
   

    apiKey: "AIzaSyDRtqhu0IwLJtAcTxljFBeLHORsodmcbCA",
    authDomain: "vue-chat-2f13a.firebaseapp.com",
    databaseURL: "https://vue-chat-2f13a-default-rtdb.firebaseio.com",
    projectId: "vue-chat-2f13a",
    storageBucket: "vue-chat-2f13a.appspot.com",
    messagingSenderId: "675236529479",
    appId: "1:675236529479:web:9e1ced6c60fe9135267862",
    measurementId: "G-S52YR47LY5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

