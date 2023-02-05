<template>
  <v-app>
    <v-main id="main-layout">
      <v-container fluid pa-0>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss">
html {
  overflow: auto !important;
}
#main-layout {
  font-family: 'Source Sans Pro', sans-serif !important;
  background-color: #fafafa;
}
</style>
