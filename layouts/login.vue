<template>
  <v-app>
    <v-main id="login-layout">
      <div class="container-principal" elevation="2">
        <AlertaTemplate :eh-interno="false" />
        <div class="logo-content">
          <v-img :src="icon" width="220"></v-img>
        </div>
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AlertaTemplate from '~/components/AlertaTemplate.vue'
export default {
  name: 'LoginLayout',

  components: {
    AlertaTemplate,
  },

  data() {
    return {
      icon: require('~/static/indecx-logo.svg'),
    }
  },
}
</script>

<style lang="scss">
html {
  overflow: auto !important;
}
#login-layout {
  font-family: 'Source Sans Pro', sans-serif !important;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 1.5rem !important;

  .container-principal {
    min-height: 36.25rem;
    max-width: 33.4375rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 3.75rem;
    background-color: #fff;
    box-shadow: 0 0.125rem 0.375rem 0 #29466133;
    border-radius: 0.25rem;

    @media (max-width: 600px) {
      padding: 1.875rem;
    }
    @media (max-width: 400px) {
      padding: 0.9375rem;
    }

    .logo-content {
      margin: 0 auto;
      margin-bottom: 5rem;

      @media (max-width: 600px) {
        margin-bottom: 2.5rem;
      }
      @media (max-width: 400px) {
        margin-bottom: 1.25rem;
      }
    }
  }
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
  .v-input__append-inner {
    margin: auto !important;
  }
}
</style>
