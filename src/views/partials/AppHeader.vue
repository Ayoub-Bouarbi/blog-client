<template>
    <header>
        <div class="container header flex items-center text-white mx-auto">
            <div class="flex-none">
                <router-link :to="{name: 'Home'}"><img src="../../static/logo.png" alt=""></router-link>
            </div>
            <div class="inline-block flex-1 flex">
                <nav class="flex-1 items-center">
                    <ul class="inline-block">
                        <li class="inline-block text-xl font-bebas text-black uppercase px-5">
                            <router-link :to="{name: 'Home'}">Home</router-link>
                        </li>
                        <li class="inline-block text-xl font-bebas text-black uppercase px-5">
                            <router-link :to="{name: 'About'}">About</router-link>
                        </li>
                        <li class="inline-block text-xl font-bebas text-black uppercase px-5">
                            <router-link :to="{name: 'Contact'}">Contact</router-link>
                        </li>
                    </ul>
                </nav>
                <div class="inline-block items-center flex-none">
                    <div v-if="!this.$store.getters.isAuth">
                        <router-link tag="a" :to="{name: 'Login'}" class="inline-block text-xl text-primary pr-6">
                            <i class="icon-user"></i>
                        </router-link>
                        <router-link tag="a" :to="{name: 'Register'}" class="inline-block text-xl text-primary">
                            <i class="icon-user-plus"></i>
                        </router-link>
                    </div>
                    <div v-else>
                        <a @click="logout" class="inline-block text-xl text-primary">
                            <i class="icon-user"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

    import LOGOUT_USER from '@/graphql/mutations/logout.gql';
    import { onLogout } from '@/vue-apollo.js';

    export default {
        methods: {
            logout() {
                this.$apollo.mutate({
                        mutation: LOGOUT_USER
                    })
                    .then(({ data }) => {
                        this.$store.dispatch('logout');
                        onLogout();
                    })
                    .catch(({ data }) => {
                        console.log(data);
                    })
            },
        },
    }

</script>