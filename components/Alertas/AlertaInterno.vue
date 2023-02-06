<template>
  <div v-if="alertaInterno.show" class="alert-template">
    <v-alert prominent transition="scale-transition" elevation="2" tile>
      <div
        :class="{
          'alert-container sucesso': !alertaInterno.error,
          'alert-container perigo': alertaInterno.error,
        }"
      >
        <div class="alert-container__infos">
          <v-divider class="divider" vertical></v-divider>
          <v-avatar class="icon-alert" size="30">
            <v-icon dark>
              {{ alertaInterno.icon }}
            </v-icon>
          </v-avatar>
          <p>{{ alertaInterno.info }}</p>
        </div>
        <div class="alert-container__close">
          <v-btn icon @click="closeAlerta">
            <v-icon class="close-icon" dark>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AlertasInterno',

  computed: {
    ...mapState('alerta', ['alertaInterno']),
  },

  methods: {
    closeAlerta() {
      this.$store.dispatch('alerta/closeAlertaInterno')
    },
  },
}
</script>

<style lang="scss" scoped>
.alert-template {
  width: 100%;
  padding: 1.875rem 1.25rem;
  background-color: transparent !important;
  color: #000;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  z-index: 10000;

  .v-alert__wrapper {
    width: 100% !important;
  }

  .v-alert {
    width: 100%;
    max-width: 34.5rem;
    height: 3.875rem;
    padding: 0.5rem 0.75rem;
    display: flex;

    .alert-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 33rem;
      width: 100%;

      .alert-container__infos {
        display: flex;
        align-items: center;
      }

      .close-icon {
        font-size: 1.25rem;
      }

      .icon-alert {
        margin-left: 0.625rem;
        margin-right: 1.25rem;
      }

      .divider {
        border-width: 0.125rem;
        height: 2.875rem;
      }

      p {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.125rem;
      }

      &.sucesso {
        .divider {
          border-color: #4de594;
          background-color: #4de594;
        }
        .icon-alert {
          background-color: #4de594;
        }
      }
      &.perigo {
        .divider {
          border-color: #ff513d;
          background-color: #ff513d;
        }
        .icon-alert {
          background-color: #ff513d;
        }
      }
    }
  }
}
</style>
