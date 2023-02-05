<template>
  <v-app-bar id="header" class="px-6 py-0" outlined color="#FFF" width="100%">
    <div class="header-interno">
      <div class="logo-content">
        <v-img :src="logo" max-height="100%" max-width="120px"></v-img>
      </div>
      <div class="function-content">
        <ButtonCogAction />
        <v-divider class="divider" vertical></v-divider>
        <UserInfo />
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import ButtonCogAction from './ButtonCog.vue'
import UserInfo from './UserInfo.vue'
export default {
  name: 'HeaderPage',
  components: {
    ButtonCogAction,
    UserInfo,
  },
  data() {
    return {
      logo: require('~/static/indecx-logo.svg'),
    }
  },
}
</script>

<style lang="scss">
#header {
  min-height: 70px;
  height: 100% !important;
  > div {
    padding: 0.25rem 0;
    min-height: 70px;
    height: 100% !important;
  }
  .header-interno {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    @media (max-width: 426px) {
      justify-content: center;
    }

    .function-content {
      display: flex;
      align-items: center;

      .divider {
        margin: 0.625rem 1.25rem;
        border-color: #333333;
      }
    }
  }
}
</style>
