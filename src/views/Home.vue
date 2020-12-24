<template>
    <section class="overflow-hidden">
        <div class="float-left w-4/6">
            <ApolloQuery :query="require('@/graphql/queries/publishedPosts.gql')" :variables="{published: true}">
                <template v-slot="{ result: { data },isLoading }">
                    <!-- Loading -->
                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                    <post-card v-else v-for="post in data.posts" :key="post.id" :post="post">
                    </post-card>
                </template>
            </ApolloQuery>
        </div>
        <aside-bar class="float-right w-2/6"></aside-bar>
    </section>
</template>

<script>

    import PostCard from '../components/PostCard';
    import AsideBar from '@/views/partials/AsideBar';
    import GET_POSTS from '@/graphql/queries/publishedPosts.gql';

    export default {
        components: {
            PostCard,
            AsideBar
        },
    }
</script>