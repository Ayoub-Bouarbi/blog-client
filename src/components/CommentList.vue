<template>
    <div>
        <comment v-for="comment in comments" :postId="postId" :comment="comment" :key="comment.id"></comment>
    </div>
</template>

<script>
    export default {
        props: ['comments','postId'],
        beforeCreate() {
            this.$options.components.Comment = require('./Comment.vue').default;
        }
    }

</script>
