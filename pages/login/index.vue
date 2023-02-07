<template>
  <div class="form-container">
    <HeaderLoginPage
      titulo="Login"
      subtitulo="Bem-vindo de volta! Por favor insira seus dados."
    />
    <form class="login-form">
      <div class="input-content">
        <label for="emailInput">Email</label>
        <v-text-field
          id="emailInput"
          v-model="email"
          outlined
          :error-messages="emailErrors"
          placeholder="Digite o seu e-mail"
          required
          color="#4CE595"
          hide-details="auto"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
      </div>
      <div class="input-content">
        <label for="senhaInput">Senha</label>
        <v-text-field
          id="senhaInput"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          outlined
          color="#4CE595"
          :error-messages="passwordErrors"
          placeholder="Insira sua senha"
          hide-details="auto"
          required
          :append-icon="
            showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
          "
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          @click:append="showPassword = !showPassword"
        >
        </v-text-field>
      </div>
    </form>
    <div class="container-actions">
      <div class="links">
        <ModalRegistreUsuario />
        <!-- <a href="/products">{{ textCadastrar }}</a> -->
        <a href="/recuperacao"> Esqueci minha senha ></a>
      </div>
      <v-btn color="green darken-2" dark block @click="login"> Entrar </v-btn>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import HeaderLoginPage from '~/components/HeaderLoginPage.vue'
import ModalRegistreUsuario from '~/components/Modais/modalRegistreUsuario.vue'

export default {
  name: 'IndexPage',

  components: {
    HeaderLoginPage,
    ModalRegistreUsuario,
  },

  layout: 'login',

  validations: {
    email: { required, email },
    password: { required },
  },

  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },

  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Adicione um e-mail valido')
      !this.$v.email.required && errors.push('E-mail é obrigatório')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Senha é obrigatório')
      return errors
    },
    ahError() {
      return (
        !this.$v.email.email ||
        !this.$v.email.required ||
        !this.$v.password.required
      )
    },
  },

  methods: {
    async login() {
      if (this.ahError) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      } else {
        const email = this.email
        const password = this.password
        const { error, data } = await this.$supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (!error) {
          this.$store.dispatch('user/updateUser', data)
          this.$store.dispatch('alerta/showAlerta', {
            info: `Usuário logado com sucesso`,
            show: true,
            icon: 'mdi-check',
            error: false,
          })
          return this.$router.push('/')
        }
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erro encontrado: ${error}`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-actions {
  .links {
    padding: 1.75rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    a {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 0.75rem;
      text-decoration: none;
      color: #3db374;
      display: flex;
      align-items: center;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }
}
</style>
