<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" id="logo">
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>

html {
  background: rgb(0,155,255);
  background: radial-gradient(circle, rgba(0,155,255,1) 0%, rgba(85,219,254,1) 50%, rgba(203,240,255,1) 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logo {
  height: 120px;
}
</style>
