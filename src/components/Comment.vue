<template>
    <div class="overflow-hidden my-10">
        <div class="float-left w-1/5">
            <img v-if="comment.user.avatar != null" :src="imgUrl" alt="Image placeholder" class="w-52">
            <img v-else src="../static/profile.jpg" alt="Image placeholder" class="w-52">

        </div>
        <div class="float-left w-4/6 ml-4 relative">
            <h3 class="text-xl mb-3">{{ comment.user.fullname }}</h3>
            <span class="absolute bg-primary text-xs text-white rounded px-2 right-0 top-0">{{ comment.created_at | convertDate }}</span>
            <p class=" leading-relaxed text-sm font-lato">
                {{ comment.content }}
            </p>
            <div v-if="replyToComment != true">
                <a @click="reply" class="bg-white border border-primary text-xs inline-block mt-2 cursor-pointer text-primary  hover:bg-primary hover:text-white transition duration-500 ease-in-out  rounded px-2 py-1">Reply</a>
                <a v-if="$store.getters.getUser != null && $store.getters.getUser.id == comment.user.id"
                    @click="removeComment(comment)" class="bg-white border border-primary text-xs inline-block mt-2 cursor-pointer text-primary rounded  hover:bg-primary hover:text-white transition duration-500 ease-in-out  px-2 py-1">Delete</a>
            </div>
            <div v-if="replyToComment == true">
                <textarea ref="textarea" v-model="replyContent"
                    @blur="replyContent == '' ? replyToComment = false : ''" class="block w-full mt-3"></textarea>
                <button @click="replyTo(comment)" class="bg-white border border-primary text-xs inline-block mt-2 cursor-pointer text-primary  hover:bg-primary hover:text-white transition duration-500 ease-in-out  rounded px-2 py-1">Reply</button>
            </div>
            <ul v-if="comment.children">
                <comment-list :comments="comment.children" :postId="postId"></comment-list>
            </ul>
        </div>
    </div>
</template>

<script>
    import CommentList from './CommentList';
    import DELETE_COMMENT from '@/graphql/mutations/deleteComment.gql';
    import CREATE_COMMENT from '@/graphql/mutations/createComment.gql';

    export default {
        name: 'Comment',
        data() {
            return {
                replyContent: '',
                replyToComment: false
            }
        },
        props: ["comment", "postId"],
        components: {
            'comment-list': CommentList
        },
        computed: {
            imgUrl() {
                return process.env.VUE_APP_HTTP + '/storage/uploads/' + this.comment.user.avatar;
            }
        },
        methods: {
            removeComment(comment) {
                
                if (this.$store.getters.getUser != null && this.$store.getters.getUser.id != comment.user.id)
                    return;

                this.$apollo.mutate({
                        mutation: DELETE_COMMENT,
                        variables: {
                            id: comment.id
                        }
                    })
                    .then(({ data }) => {
                        console.log("Deleted Successfully");
                    });
            },
            reply() {
                this.replyToComment = true;
                
                this.$nextTick(() => {
                    this.$refs.textarea.focus();
                });
            },
            replyTo(comment) {
                this.$apollo.mutate({
                        mutation: CREATE_COMMENT,
                        variables: {
                            'content': this.replyContent,
                            'approved': true,
                            'post_id': this.postId,
                            'user_id': this.$store.getters.getUser.id,
                            'parent_id': comment.id,
                        }
                    })
                    .then(({ data }) => {
                        this.replyContent = '';
                    });
            },
        },
    }
</script>