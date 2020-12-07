<template>
    <section class="ftco-section ftco-no-pt ftco-no-pb">
        <div class="container">
            <div class="row d-flex">
                <div class="col-lg-8 px-md-5 py-5">
                    <div class="row pt-md-4">
                        <h1 class="mb-3">{{ post.title }}</h1>
                        <div id="content"></div>
                        <div class="tag-widget post-tag-container mb-5 mt-5">
                            <div class="tagcloud">
                                <router-link to="/tags/getPostByTag" v-for="tag in post.tags" :key="tag.id"
                                    class="tag-cloud-link"> {{ tag.name }} </router-link>
                            </div>
                        </div>
                        <div class="about-author d-flex p-4 bg-light">
                            <div class="bio mr-5">
                                <img v-if="post.user.avatar != null" :src=" process.env.VUE_APP_HTTP +'/storage/uploads/' + post.user.avatar"
                                    alt="Image placeholder" class="img-fluid mb-4">
                                <img v-else src="../static/profile.jpg"
                                    alt="Image placeholder" class="img-fluid mb-4">
                                
                            </div>
                            <div class="desc">
                                <h3>{{ post.user.fullname }}</h3>
                                <p>
                                    {{ post.user.bio }}
                                </p>
                            </div>
                        </div>
                        <div class="pt-5 mt-5">
                            <h3 class="mb-5 font-weight-bold" v-if="post.comments != null">{{ commentLength }}
                                Comments</h3>
                            <ul class="comment-list">
                                <comment-list :comments="post.comments" :postId="post.id" ></comment-list>
                            </ul>
                            <!-- END comment-list -->
                            <div class="comment-form-wrap pt-5">
                                <h3 class="mb-5">Leave a comment</h3>
                                <div class="form-group">
                                    <label for="message">Message</label>
                                    <textarea v-model="comment" id="message" cols="60" rows="10" class="form-control"
                                        placeholder="type Your Message Here"></textarea>
                                </div>
                                <div class="form-group">
                                    <button @click="postComment" class="btn py-3 px-4 btn-primary">Post Comment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <right-aside-bar class="col-xl-4 sidebar bg-light"></right-aside-bar>
            </div>
        </div>
    </section>
</template>

<script>
    import { Quill } from 'vue-quill-editor';
    import arrayToTree from 'array-to-tree';
    import GET_POST from '@/graphql/queries/post.gql';
    import CREATE_COMMENT from '@/graphql/mutations/createComment.gql';
    import CommentList from '@/components/CommentList.vue';
    import RightAsideBar from '@/views/partials/RightAsideBar';

    export default {
        data() {
            return {
                post: {
                    'title': '',
                    'content': '',
                    'tags': [],
                    'user': {},
                    'category': {},
                    'comments': []
                },
                comment: '',
                commentLength: 0
            }
        },
        components: {
            'comment-list': CommentList,
            RightAsideBar
        },
        created() {
            this.$apollo.mutate({
                    mutation: GET_POST,
                    variables: {
                        id: this.$route.params.id
                    },
                })
                .then(({ data }) => {
                    this.post = data.post;

                     this.commentLength = this.post.comments.length;

                    this.post.comments = arrayToTree(this.post.comments, {
                        parentProperty: 'parent_id',
                        customID: 'id'
                    });
                });

        },
        methods: {
            postComment() {
                if (!this.$store.getters.isAuth) {
                    alert("your are not logged in");
                    return;
                }
                this.$apollo.mutate({
                        mutation: CREATE_COMMENT,
                        variables: {
                            'content': this.comment,
                            'approved': true,
                            'post_id': this.post.id,
                            'user_id': this.$store.getters.getUser.id,
                        }
                    })
                    .then(({ data }) => {
                        this.post.comments.push(data.comment);
                        this.comment = '';
                    });
            },
        },
        watch: {
            'post.content': function (newValue, oldValue) {
                if (newValue != null) {
                    var tempQuill = new Quill(document.createElement("div"));
                    tempQuill.setContents(JSON.parse(newValue));

                    document.getElementById('content').innerHTML = tempQuill.root.innerHTML;
                }
            },
        },

    }

</script>
