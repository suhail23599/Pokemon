<template>
  <section class="header">
    <img src="@/assets/pokemon.svg" alt="pokemon">
  </section>
  <router-view />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0px;
  font-size: 14px;
  font-family: sans-serif;
}
body {
  margin: 10px;
}
.header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
  img {
    width: 200px;
  }
}

</style>
