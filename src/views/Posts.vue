<template>
    <section class="ftco-section ftco-no-pt ftco-no-pb">
        <div class="container">
            <div class="row d-flex">
                <div class="col-xl-8 py-5 px-md-5">
                    <div class="row pt-md-4">
                        <div class="col-md-12">
                            <ApolloQuery v-if="$route.params.tag == 'category'" :query="require('@/graphql/queries/postsByCategory.gql')" :variables="{slug: $route.params.slug,published: true}">
                                <template v-slot="{ result: { data },isLoading }">
                                    <!-- Loading -->
                                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                                    <post-card v-else v-for="post in data.posts" :key="post.id" :post="post"
                                        class="blog-entry d-md-flex">
                                    </post-card>
                                </template>
                            </ApolloQuery>
                            <ApolloQuery v-else :query="require('@/graphql/queries/postsByTag.gql')" :variables="{slug: $route.params.slug,published: true}">
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
                </div>
                <right-aside-bar class="col-xl-4 sidebar bg-light"></right-aside-bar>
            </div>
        </div>
    </section>
</template>

<script>
    import PostCard from '../components/PostCard';
    import RightAsideBar from '@/views/partials/RightAsideBar';

    export default {
        components: {
            PostCard,
            RightAsideBar
        },
    }

</script>
