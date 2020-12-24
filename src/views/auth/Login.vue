<template>
        <div class="w-3/6 mx-auto">
            <div class="my-2">
                <label class="mb-1 block font-lato">Email Address</label>
                <input class="w-full transition duration-500 ease-in-out border border-primary hover:border-secondary p-2" v-model="email" type="email" name="email" placeholder="Email">
            </div>
            <div class="my-2">
                <label class="mb-1 block font-lato">Password</label>
                <input class="w-full transition duration-500 ease-in-out border border-primary hover:border-secondary p-2" v-model="password" type="password" name="password"
                    placeholder="Password">
            </div>
            <button class="bg-white border border-primary text-base inline-block mt-2 text-primary hover:border-secondary hover:text-secondary transition duration-500 ease-in-out px-3 py-2" @click="submit">Sign
                in</button>

            <div class="mt-10">
                <p>
                    You don't have account?
                    <router-link :to="{name: 'Register'}" class="underline text-primary hover:text-secondary transition duration-500 ease-in-out">Register</router-link>
                </p>
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
                    .then(({ data }) => {
                        this.$store.dispatch('login', {
                            'apolloClient': this.$apollo.provider.defaultClient,
                            'login': data.login
                        });
                        this.$router.push({
                            name: 'Home'
                        });
                        this.$toast.success('Successfully Logged In!', 'OK');
                    })
                    .catch(({ data }) => {
                        console.log(data);
                    });

            }
        },
    }
</script>