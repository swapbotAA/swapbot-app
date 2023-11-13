<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <BaseLayout/>
  <!-- <MainPage/> -->
  <!-- <Chat/> -->
</template>

<script>
import BaseLayout from './components/BaseLayout.vue'
import MainPage from './components/MainPage.vue'
import Chat from './components/chatBot/Chat.vue'
export default {
  name: 'App',
  components: {
    BaseLayout,
    MainPage,
    Chat
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Miriam+Libre&display=swap');
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Miriam Libre', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
