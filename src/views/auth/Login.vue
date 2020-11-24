<template>
    <div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-form">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input class="au-input au-input--full" v-model="email" type="email" name="email"
                                    placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input class="au-input au-input--full" v-model="password" type="password"
                                    name="password" placeholder="Password">
                            </div>
                            <button class="au-btn--block btn btn-primary m-b-20" @click="submit">sign
                                in</button>

                        <div class="register-link">
                            <p>
                                You don't have account?
                                <router-link :to="{name: 'Register'}">Register</router-link>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import LOGIN from '@/graphql/mutations/login.gql';

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            submit() {
                this.$apollo.mutate({
                    mutation: LOGIN,
                    variables: {
                        input: {
                            username: this.email,
                            password: this.password
                        }
                    }
                })
                .then(({data}) => {
                    this.$store.dispatch('login',{'apolloClient': this.$apollo.provider.defaultClient,'login': data.login});
                    this.$router.push({
                        name: 'Home'
                    });
                    this.$toast.success('Successfully Logged In!', 'OK');
                })
                .catch(({data}) => {
                    console.log(data);
                });

            }
        },
    }

</script>

<style scoped>

.page-wrapper {
    overflow: hidden;
    background: #e5e5e5;
    padding-bottom: 8vh;
}

.page-content--bge5 {
    background: #e5e5e5;
    height: 100vh;
}

.login-wrap {
    max-width: 540px;
    padding-top: 8vh;
    margin: 0 auto;
}

.login-content {
    background: #fff;
    padding: 30px 30px 20px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
}

.login-form .form-group label {
    display: block;
}

.au-input {
    line-height: 43px;
    border: 1px solid #e5e5e5;
    font-size: 14px;
    color: #666;
    padding: 0 17px;
    border-radius: 3px;
    transition: all 0.5s ease;
}

.au-input--full {
    width: 100%;
}

.au-btn--block {
    display: block;
    width: 100%;
}

.m-b-20 {
    margin-bottom: 20px;
}

</style>
