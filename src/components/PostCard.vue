<template>
    <div class="mt-3 ml-10 mr-10 mb-10">
        <div class="img bg-gray-200 overflow-hidden">
            <img src="../static/bg_1.jpg" class="h-full w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" alt="">
        </div>
        <div class="mt-5">
            <h1 class="text-4xl bold font-bebas">
                <router-link :to="{name:'Post',params:{ 'id': post.id }}">
                    {{ post.title }}
                </router-link>
            </h1>
            <p class="mt-3 text-sm text-gray-500 font-lato"> {{ post.description }}</p>
            <div class="info py-3">
                <span class="text-xs font-lato uppercase"><i class="icon-calendar"></i>
                    {{ post.published_at | convertDate}}</span>
                <span class="text-xs font-lato text-secondary uppercase">
                    <router-link :to="{name: 'Posts',params: {tag: 'category',slug: post.category.slug}}">
                        <i class="icon-card_travel"></i> {{ post.category.name }}
                    </router-link>
                </span>
                <span class="text-xs font-lato uppercase"><i class="icon-comment"></i>
                    {{ post.comments.length }} Comment</span>
            </div>
            <router-link class="text-xs font-lato" :to="{name:'Post',params:{ 'id': post.id }}">
                READ MORE >
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                require: true
            }
        }

    }
</script>

<style>
    .info span::after{
        content: '/';
        padding: 0 10px;
        color: #000;
    }
    .info span:last-child::after{
        content: '';
    }
</style>