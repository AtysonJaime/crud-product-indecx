<template>
  <div class="text-center">
    <v-menu offset-y>
      <template #activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              icon
              raised
              rounded
              color="grey darken-3"
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >
              <v-icon>mdi-cog-outline</v-icon>
            </v-btn>
          </template>
          <span>Configurações</span>
        </v-tooltip>
      </template>
      <v-list color="light">
        <v-list-item>
          <v-btn text @click="logout">
            <v-list-item-content class="list-content">
              <v-list-item-title>Sair do sistema</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ButtonCogAction',
  methods: {
    async logout() {
      await this.$supabase.auth
        .signOut()
        .then((res) => {
          this.$store.dispatch('user/updateUser', { session: [], user: [] })
          this.$store.dispatch('alerta/showAlerta', {
            info: `Usuário deslogado com sucesso`,
            show: true,
            icon: 'mdi-check',
            error: false,
          })
          return this.$router.push('/login')
        })
        .catch((err) => {
          this.$store.dispatch('alerta/showAlerta', {
            info: `Erro encontrado ao deslogar: ${err}`,
            show: true,
            icon: 'mdi-close-circle-outline',
            error: true,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.list-content {
  font-family: 'Source Sans Pro', sans-serif !important;
}
</style>
