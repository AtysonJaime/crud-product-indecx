<template>
  <div>
    <v-dialog v-model="openModal" max-width="645" width="100%">
      <template #activator="{ on, attrs }">
        <a class="button-open-modal" v-bind="attrs" v-on="on">{{ cadastro }}</a>
      </template>

      <v-card>
        <v-card-title class="header-modal">
          <h3>Cadastrar novo usúario</h3>
          <v-btn
            small
            icon
            raised
            rounded
            color="grey darken-3"
            @click="
              () => {
                openModal = false
                limparForm()
              }
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <form>
            <v-container>
              <v-row>
                <v-col lg="12">
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
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" sm="12">
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
                </v-col>
                <v-col lg="6" sm="12">
                  <div class="input-content">
                    <label for="senhaConfirmeInput"
                      >Confirme sua nova senha</label
                    >
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
                        showPasswordMatch
                          ? 'mdi-eye-outline'
                          : 'mdi-eye-off-outline'
                      "
                      @input="$v.passwordMatch.$touch()"
                      @blur="$v.passwordMatch.$touch()"
                      @click:append="showPasswordMatch = !showPasswordMatch"
                    >
                    </v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" sm="12">
                  <div class="input-content">
                    <label for="nameInput">Nome</label>
                    <v-text-field
                      id="nameInput"
                      v-model="name"
                      outlined
                      :error-messages="nameErrors"
                      color="#4CE595"
                      placeholder="Digite o seu nome"
                      required
                      hide-details="auto"
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col lg="6" sm="12">
                  <div class="input-content">
                    <label for="sobrenomeInput">Sobrenome</label>
                    <v-text-field
                      id="sobrenomeInput"
                      v-model="sobrenome"
                      outlined
                      :error-messages="sobrenomeErrors"
                      color="#4CE595"
                      placeholder="Digite o seu sobrenome"
                      required
                      hide-details="auto"
                      @input="$v.sobrenome.$touch()"
                      @blur="$v.sobrenome.$touch()"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="12">
                  <div class="input-content">
                    <label for="funcaoInput">Função</label>
                    <v-text-field
                      id="funcaoInput"
                      v-model="funcao"
                      outlined
                      :error-messages="funcaoErrors"
                      placeholder="Digite sua função"
                      required
                      hide-details="auto"
                      color="#4CE595"
                      @input="$v.funcao.$touch()"
                      @blur="$v.funcao.$touch()"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="green darken-2"
            @click="
              () => {
                openModal = false
                limparForm()
              }
            "
          >
            Fechar
          </v-btn>
          <v-btn color="green darken-2" dark @click="criaUser"> Criar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'ModalRegistreUser',

  validations: {
    email: { required, email },
    password: { required },
    name: { required },
    sobrenome: { required },
    funcao: { required },
    passwordMatch: { required },
  },

  data() {
    return {
      openModal: false,
      showPassword: false,
      showPasswordMatch: false,
      email: '',
      password: '',
      passwordMatch: '',
      name: '',
      sobrenome: '',
      funcao: '',
      cadastro: '< Cadastrar novo usuário',
    }
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Nome é obrigatório')
      return errors
    },
    sobrenomeErrors() {
      const errors = []
      if (!this.$v.sobrenome.$dirty) return errors
      !this.$v.sobrenome.required && errors.push('Sobrenome é obrigatório')
      return errors
    },
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
      this.password.length < 8 &&
        errors.push('Senha precisa ter no minino 8 caracteres')
      return errors
    },
    funcaoErrors() {
      const errors = []
      if (!this.$v.funcao.$dirty) return errors
      !this.$v.funcao.required &&
        errors.push('A Função do usuário é obrigatório')
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
    ahError() {
      return (
        this.name === '' ||
        this.sobrenome === '' ||
        this.funcao === '' ||
        this.password === '' ||
        this.password.length < 8 ||
        this.password !== this.passwordMatch
      )
    },
  },

  methods: {
    async criaUser() {
      if (this.ahError) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      } else {
        const { error } = await this.$supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              email: this.email,
              first_name: this.name,
              surname: this.sobrenome,
              function_person: this.funcao,
            },
          },
        })
        if (error) {
          this.$store.dispatch('alerta/showAlerta', {
            info: `Erro ao cadastrar usuário: ${error}`,
            show: true,
            icon: 'mdi-close-circle-outline',
            error: true,
          })
          return
        }
        this.$store.dispatch('alerta/showAlerta', {
          info: 'Usuário criado!, Por favor, valide seu email antes de realizar o login!',
          show: true,
          icon: 'mdi-check',
          error: false,
        })
        this.openModal = false
        this.limparForm()
      }
    },

    async criaProduto() {
      if (this.ahError) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      } else {
        const data = {
          name: this.name,
          tipo: this.tipo,
          valor: this.valor,
        }
        await this.$store
          .dispatch('product/postProdutos', data)
          .then(async (status) => {
            if (status !== 201) {
              this.$store.dispatch('alerta/showAlerta', {
                info: `Erro ${status} ocorreu ao cadastrar produto!`,
                show: true,
                icon: 'mdi-close-circle-outline',
                error: true,
              })
            } else {
              this.$store.dispatch('alerta/showAlerta', {
                info: 'Produto criado com sucesso!',
                show: true,
                icon: 'mdi-check',
                error: false,
              })
              this.openModal = false
              this.limparForm()
              await this.$store.dispatch('product/getProdutos')
            }
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      }
    },

    limparForm() {
      this.email = ''
      this.password = ''
      this.name = ''
      this.sobrenome = ''
      this.funcao = ''
      this.$v.$reset()
    },
  },
}
</script>

<style lang="scss" scoped>
.button-open-modal {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.75rem;
  text-decoration: none;
  color: #3db374;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

.header-modal {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-family: 'Source Sans Pro', sans-serif !important;
  }
}
</style>
