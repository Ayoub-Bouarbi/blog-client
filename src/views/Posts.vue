<template>
    <section class="overflow-hidden">
        <div class="float-left w-4/6">
            <div class="w-full">
                <ApolloQuery v-if="$route.params.tag == 'category'"
                    :query="require('@/graphql/queries/postsByCategory.gql')"
                    :variables="{slug: $route.params.slug,published: true}">
                    <template v-slot="{ result: { data },isLoading }">
                        <!-- Loading -->
                        <div v-if="isLoading" class="loading apollo">Loading...</div>
                        <post-card v-else v-for="post in data.posts" :key="post.id" :post="post"
                            class="blog-entry d-md-flex">
                        </post-card>
                    </template>
                </ApolloQuery>
                <ApolloQuery v-else :query="require('@/graphql/queries/postsByTag.gql')"
                    :variables="{slug: $route.params.slug,published: true}">
                    <template v-slot="{ result: { data },isLoading }">
                        <!-- Loading -->
                        <div v-if="isLoading" class="loading apollo">Loading...</div>
                        <post-card v-else v-for="post in data.posts" :key="post.id" :post="post"
                            class="blog-entry d-md-flex">
                        </post-card>
                    </template>
                </ApolloQuery>
            </div>
        </div>
        <aside-bar class="float-right w-2/6"></aside-bar>
    </section>
</template>

<script>
    import PostCard from '../components/PostCard';
    import AsideBar from '@/views/partials/AsideBar';

    export default {
        components: {
            PostCard,
            AsideBar
        },
    }
</script>