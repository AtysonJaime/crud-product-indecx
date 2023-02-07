<template>
  <div class="form-container">
    <HeaderLoginPage
      titulo="Redefina a sua senha"
      subtitulo="Enviaremos um código em seu email para recuperação da senha."
    />
    <!-- Enviar Codigo -->
    <template v-if="enviarCodigo">
      <form class="login-form">
        <div class="input-content">
          <label for="emailInput">Informe o email cadastrado</label>
          <v-text-field
            id="emailInput"
            v-model="email"
            outlined
            hide-details="auto"
            :error-messages="emailErrors"
            color="#4CE595"
            placeholder="Digite o seu e-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
        </div>
      </form>
      <div class="container-actions">
        <v-btn color="green darken-2" dark block @click="enviarCodigoPorEmail">
          Enviar código
        </v-btn>
      </div>
    </template>

    <!-- Inserir Codigo -->
    <template v-else-if="inserirCodigo">
      <form class="login-form">
        <div class="input-content">
          <label for="codigoInput">Informe o código</label>
          <v-text-field
            id="codigoInput"
            v-model="codigo"
            hide-details="auto"
            outlined
            :error-messages="codigoErrors"
            placeholder="Digite o código"
            required
            color="#4CE595"
            @input="$v.codigo.$touch()"
            @blur="$v.codigo.$touch()"
          ></v-text-field>
        </div>
      </form>
      <div class="container-actions">
        <v-btn color="green darken-2" dark block @click="validaCodigo">
          Validar código
        </v-btn>
      </div>
    </template>

    <!-- Redefinir Senha -->
    <template v-else>
      <form class="login-form">
        <div class="input-content">
          <label for="senhaInput">Nova senha</label>
          <v-text-field
            id="senhaInput"
            v-model="password"
            hide-details="auto"
            :type="showPassword ? 'text' : 'password'"
            outlined
            color="#4CE595"
            :error-messages="passwordErrors"
            placeholder="Insira a nova senha"
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
        <div class="input-content">
          <label for="senhaConfirmeInput">Confirme sua nova senha</label>
          <v-text-field
            id="senhaConfirmeInput"
            v-model="passwordMatch"
            hide-details="auto"
            color="#4CE595"
            :type="showPasswordMatch ? 'text' : 'password'"
            outlined
            :error-messages="passwordMatchErrors"
            placeholder="Confirme sua nova senha"
            required
            :append-icon="
              showPasswordMatch ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            @input="$v.passwordMatch.$touch()"
            @blur="$v.passwordMatch.$touch()"
            @click:append="showPasswordMatch = !showPasswordMatch"
          >
          </v-text-field>
        </div>
      </form>
      <div class="container-actions">
        <v-btn color="green darken-2" dark block @click="redefinirSenha">
          Redefinir senha
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import HeaderLoginPage from '~/components/HeaderLoginPage.vue'

export default {
  name: 'IndexPage',

  components: {
    HeaderLoginPage,
  },

  layout: 'login',

  validations: {
    email: { required, email },
    codigo: { required },
    password: { required },
    passwordMatch: { required },
  },

  data() {
    return {
      email: '',
      codigo: '',
      password: '',
      passwordMatch: '',
      enviarCodigo: true,
      inserirCodigo: false,
      showPassword: false,
      showPasswordMatch: false,
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
    codigoErrors() {
      const errors = []
      if (!this.$v.codigo.$dirty) return errors
      !this.$v.codigo.required && errors.push('Inserir o codigo é obrigatório')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Nova senha é obrigatório')
      return errors
    },
    passwordMatchErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.passwordMatch.required &&
        errors.push('Confirma Senha é obrigatório')
      this.password !== this.passwordMatch &&
        errors.push('As senhas não estão iguais')
      return errors
    },
  },

  methods: {
    enviarCodigoPorEmail() {
      if (!this.$v.email.email || !this.$v.email.required) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      } else {
        this.enviarCodigo = false
        this.inserirCodigo = true
      }
    },

    validaCodigo() {
      if (!this.$v.codigo.required) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      } else {
        this.inserirCodigo = false
      }
    },

    redefinirSenha() {
      if (
        !this.$v.password.required ||
        this.$v.passwordMatch.required ||
        this.password !== this.passwordMatch
      ) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-actions {
  margin-top: 1.75rem;
}
</style>
