<template>
    <aside>
        <div class="p-3 relative">
            <input type="text" class="p-2 w-full inline-block border border-gray-500 transition duration-500 ease-in-out hover:border-secondary"
                placeholder="Type a Keyword and hit enter">
            <i class="icon-search absolute top-5 text-xl right-5 text-gray-500"></i>
        </div>
        <div class="p-3">
            <h4 class="text-2xl  bleu-dark font-bebas">Categories</h4>
            <ApolloQuery :query="require('@/graphql/queries/categories.gql')" :variables="{limit: 10}">
                <template v-slot="{ result: { data },isLoading }">
                    <!-- Loading -->
                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                    <ul v-else class="cat mt-6">
                        <li class="mb-4 text-base font-lato" v-for="category in data.categories.data"
                            :key="category.id">
                            <router-link :to="{name: 'Posts',params: {tag: 'category',slug: category.slug}}">
                                {{ category.name }}
                                <span class="float-right text-gray-300">({{ category.posts.length }})</span>
                            </router-link>
                        </li>
                    </ul>
                </template>
            </ApolloQuery>
        </div>
        <div class="p-3">
            <h4 class="text-2xl bleu-dark font-bebas">Tags</h4>
            <ApolloQuery :query="require('@/graphql/queries/tags.gql')" :variables="{limit: 20}">
                <template v-slot="{ result: { data },isLoading }">
                    <!-- Loading -->
                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                    <div v-else class="mt-6">
                        <router-link :to="{name: 'Posts',params: {tag: 'tag',slug: tag.slug}}"
                            v-for="tag in data.tags.data" :key="tag.id">
                            <span
                                class="inline-block font-lato m-1 text-xs border border-gray-500 mb-2 px-2 py-1 rounded hover:border-secondary hover:text-secondary transition duration-500 ease-in-out uppercase">{{ tag.name }}</span>
                        </router-link>
                    </div>
                </template>
            </ApolloQuery>

        </div>
        <div class="mt-6">
            <h4 class="text-2xl  bleu-dark font-bebas">Popular Articles</h4>
            <div class="overflow-hidden mt-6">
                <div class="float-left w-2/6">
                    <img src="../../static/bg_1.jpg" class="w-full h-full" alt="">
                </div>
                <div class="float-left pl-5 w-3/5">
                    <p class="text-base pb-2 font-lato">Even the all-powerful Pointing has no control</p>
                    <span class="text-gray-400 font-lato text-sm">June 28, 2019</span>
                </div>
            </div>
        </div>
    </aside>
</template>