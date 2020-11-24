<template>
    <div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-form">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input class="au-input au-input--full" type="text" name="fullname"
                                    placeholder="Full Name" v-model="fullname">
                            </div>
                            <div class="form-group">
                                <label>Username</label>
                                <input class="au-input au-input--full" type="text" name="username"
                                    placeholder="Username" v-model="username">
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input class="au-input au-input--full" type="email" v-model="email" name="email"
                                    placeholder="Email">
                            </div>
                            <div class="row">
                                <div class="col-md-6">

                                    <div class="form-group">
                                        <label>Password</label>
                                        <input class="au-input au-input--full" type="password" name="password"
                                            placeholder="Password" v-model="password">
                                    </div>
                                </div>
                                <div class="col-md-6">

                                    <div class="form-group">
                                        <label>Password Confirmation</label>
                                        <input class="au-input au-input--full" type="password" name="password"
                                            placeholder="Password" v-model="password_confirmation">
                                    </div>
                                </div>
                            </div>
                            <button class="au-btn--block btn btn-primary m-b-20"
                                @click="register">register</button>
                        </div>
                        <div class="register-link">
                            <p>
                                Already have account?
                                <router-link :to="{name: 'Login'}">Sign In</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import REGISTER_USER from '@/graphql/mutations/register.gql'


    export default {
        data() {
            return {
                fullname: '',
                email: '',
                password: '',
                password_confirmation: '',
                username: '',
            }
        },
        methods: {
            register() {
                this.$apollo.mutate({
                        mutation: REGISTER_USER,
                        variables: {
                            input: {
                                fullname: this.fullname,
                                email: this.email,
                                password: this.password,
                                password_confirmation: this.password_confirmation,
                                username: this.username,
                            }
                        }
                    })
                    .then(({ data }) => {
                        this.$router.push({
                            name: 'Login'
                        });
                        this.$toast.success('Successfully Registerd Now you Must Login', 'OK');
                    })
                    .catch(({data}) => {
                        console.log(data);
                    })
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
