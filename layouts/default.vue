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
label {
  font-family: 'Source Sans Pro', sans-serif !important;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1rem;
  color: #242424;
  margin-bottom: 0.5rem;
}

.input-content {
  .v-input__slot {
    margin-top: 0.5rem;
    min-height: 2.5rem !important;
    border-radius: 0.125rem;
  }
  .v-select__selections {
    min-height: 2.5rem !important;
    padding: 0 !important;
  }
  .v-input__append-inner {
    margin: auto !important;
  }
}
</style>
