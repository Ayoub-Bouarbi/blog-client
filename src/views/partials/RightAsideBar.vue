<template>
    <div>
        <div class="sidebar-box pt-md-4">
            <div v-if="!this.$store.getters.isAuth" class="user-auth">
                <router-link tag="a" :to="{name: 'Login'}">
                    <i class="icon-user"></i>
                    Login
                </router-link>
                <router-link tag="a" :to="{name: 'Register'}">
                    <i class="icon-user-plus"></i>
                    Register
                </router-link>
            </div>
            <div v-else class="user-auth">
                <a @click="logout">
                    <i class="icon-user"></i>
                    Log Out
                </a>
            </div>
        </div>

        <div class="sidebar-box ">
            <h3 class="sidebar-heading">Categories</h3>
            <ApolloQuery :query="require('@/graphql/queries/categories.gql')" :variables="{limit: 10}">
                <template v-slot="{ result: { data },isLoading }">
                    <!-- Loading -->
                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                    <ul v-else class="categories">
                        <li v-for="category in data.categories.data" :key="category.id">
                            <router-link :to="{name: 'Posts',params: {tag: 'category',slug: category.slug}}">
                                {{ category.name }}
                                <span>({{ category.posts.length }})</span>
                            </router-link>
                        </li>
                    </ul>
                </template>
            </ApolloQuery>
        </div>
        <div class="sidebar-box ">
            <h3 class="sidebar-heading">Tag Cloud</h3>
            <ApolloQuery :query="require('@/graphql/queries/tags.gql')" :variables="{limit: 20}">
                <template v-slot="{ result: { data },isLoading }">
                    <!-- Loading -->
                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                    <div v-else class="tagcloud">
                        <router-link :to="{name: 'Posts',params: {tag: 'tag',slug: tag.slug}}"
                            v-for="tag in data.tags.data" :key="tag.id" class="tag-cloud-link">{{ tag.name }}
                        </router-link>
                    </div>
                </template>
            </ApolloQuery>
        </div>
    </div>
</template>

<script>
    import LOGOUT_USER from '@/graphql/mutations/logout.gql';
    import {
        onLogout
    } from '@/vue-apollo.js';

    export default {
        methods: {
            logout() {
                this.$apollo.mutate({
                        mutation: LOGOUT_USER
                    })
                    .then(({
                        data
                    }) => {
                        this.$store.dispatch('logout');
                        onLogout();
                    })
                    .catch(({
                        data
                    }) => {
                        console.log(data);
                    })
            },
        },
    }

</script>
<style>
    a {
        cursor: pointer;
    }

</style>
