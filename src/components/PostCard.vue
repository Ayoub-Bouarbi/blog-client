<template>
    <div>
        <div class="text text-2 pl-md-4">
            <h3 class="mb-2">
                <router-link :to="{name:'Post',params:{ 'id': post.id }}">
                    {{ post.title }}
                </router-link>
            </h3>
            <div class="meta-wrap">
                <p class="meta">
                    <span>
                        <i class="icon-calendar mr-2"></i>
                        {{ post.published_at | convertDate}}
                    </span>
                    <span>
                        <router-link :to="{name:'Post',params:{ 'id': post.id }}">
                            <i class="icon-folder-o mr-2"></i>
                            {{ post.category.name }}
                        </router-link>
                    </span>
                    <span>
                        <i class="icon-comment2 mr-2"></i>
                        {{ post.comments.length }} Comment
                    </span>
                </p>
            </div>
            <p class="mb-4">
                {{ post.description }}
            </p>
            <p>
                <router-link :to="{name:'Post',params:{ 'id': post.id }}" class="btn-custom">
                    Read More
                    <span class="ion-ios-arrow-forward"></span>
                </router-link>
            </p>
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
    .btn-custom {
        position: relative;
    }

    .ion-ios-arrow-forward:before {
        position: absolute;
        top: 4px;
        right: -10px;
    }

</style>
