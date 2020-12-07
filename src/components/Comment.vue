<template>
    <div>
        <li>
            <div class="vcard bio">
                <img v-if="comment.user.avatar != null" :src="imgUrl"
                    alt="Image placeholder" class="img-fluid mb-4">
                <img v-else src="../static/profile.jpg"
                    alt="Image placeholder" class="img-fluid mb-4">
            </div>
            <div class="comment-body">
                <h3> {{ comment.user.fullname }} </h3>
                <div class="meta">{{ comment.created_at }}</div>
                <p>{{ comment.content }}</p>
                <p>
                    <a @click="reply" class="reply">Reply</a>
                    <a v-if="$store.getters.getUser != null && $store.getters.getUser.id == comment.user.id"
                        @click="removeComment(comment)" class="reply">Delete</a>
                </p>
                <div v-if="replyToComment == true">
                    <textarea ref="textarea" v-model="replyContent" type="text"
                        @blur="replyContent == '' ? replyToComment = false : ''" class="form-control"></textarea>
                    <button @click="replyTo(comment)" class="btn my-3 btn-primary">Reply</button>
                </div>
                <ul v-if="comment.children" class="children">
                    <comment-list :comments="comment.children" :postId="postId"></comment-list>
                </ul>
            </div>
        </li>
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
        props: ["comment","postId"],
        components: {
            'comment-list': CommentList
        },
        computed: {
            imgUrl(){
                return process.env.VUE_APP_HTTP +'/storage/uploads/' + this.comment.user.avatar;
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
                    })
            },
            reply() {
                this.replyToComment = true;
                this.$nextTick(() => {
                    this.$refs.textarea.focus();
                })
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
