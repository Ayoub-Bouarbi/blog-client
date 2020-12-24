<template>
    <div class="w-3/6 mx-auto">
        <div class="login-form">
            <div class="my-2">
                <label class="mb-1 block font-lato">Full Name</label>
                <input class="w-full transition duration-500 ease-in-out hover:border-secondary border border-primary p-2" type="text" name="fullname"
                    placeholder="Full Name" v-model="fullname">
            </div>
            <div class="my-2">
                <label class="mb-1 block font-lato">Username</label>
                <input class="w-full transition duration-500 ease-in-out hover:border-secondary border border-primary p-2" type="text" name="username"
                    placeholder="Username" v-model="username">
            </div>
            <div class="my-2">
                <label class="mb-1 block font-lato">Email Address</label>
                <input class="w-full transition duration-500 ease-in-out hover:border-secondary border border-primary p-2" type="email" v-model="email" name="email"
                    placeholder="Email">
            </div>
            <div class="grid gap-2 grid-cols-2 my-2">
                <div>
                    <label class="mb-1 block font-lato">Password</label>
                    <input class="w-full transition duration-500 ease-in-out hover:border-secondary border border-primary p-2" type="password" name="password"
                        placeholder="Password" v-model="password">
                </div>
                <div>
                    <label class="mb-1 block font-lato">Password Confirmation</label>
                    <input class="w-full transition duration-500 ease-in-out hover:border-secondary border border-primary p-2" type="password" name="password"
                        placeholder="Password" v-model="password_confirmation">
                </div>
            </div>
            <button class="bg-white border border-primary text-base inline-block mt-2 text-primary hover:border-secondary hover:text-secondary transition duration-500 ease-in-out px-3 py-2" @click="register">Register</button>
        </div>
        <div class="mt-10">
            <p>
                Already have account?
                <router-link :to="{name: 'Login'}" class="underline text-primary hover:text-secondary transition duration-500 ease-in-out">Sign In</router-link>
            </p>
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
                    .catch(({ data }) => {
                        console.log(data);
                    });
            }
        },
    }
</script>