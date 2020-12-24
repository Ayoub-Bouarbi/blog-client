<template>
    <section class="overflow-hidden">
        <div class="float-left w-4/6">
            <div class="mx-7">
                <h1 class="text-5xl mb-6 font-bebas leading-normal opacity-90">{{ post.title }}</h1>
                <div id="content" class="leading-relaxed"></div>
                <div class="my-6">
                    <router-link :to="{name: 'Posts',params: {tag: 'tag',slug: tag.slug}}" v-for="tag in post.tags"
                        :key="tag.id" class="tag-cloud-link">
                        <span
                            class="inline-block font-lato m-1 text-sm border border-gray-400 mb-2 px-2 py-1 rounded hover:border-black transition duration-500 ease-in-out uppercase">{{ tag.name }}</span>
                    </router-link>
                </div>
                <div class="overflow-hidden my-10">
                    <div class="float-left w-1/5">
                        <img v-if="post.user.avatar != null"
                            :src=" process.env.VUE_APP_HTTP +'/storage/uploads/' + post.user.avatar"
                            alt="Image placeholder" class="w-52">
                        <img v-else src="../static/profile.jpg" alt="Image placeholder" class="w-52 rounded">

                    </div>
                    <div class="float-left w-4/6 ml-4">
                        <h3 class="text-3xl mb-5">{{ post.user.fullname }}</h3>
                        <p class=" leading-relaxed font-lato">
                            {{ post.user.bio }}
                        </p>
                    </div>
                </div>
                <div class="pt-5 mt-5">
                    <h3 class="my-6 text-3xl font-lato uppercase" v-if="post.comments != null">{{ commentLength }}
                        Comments</h3>
                    <ul class="comment-list">
                        <comment-list :comments="post.comments" :postId="post.id"></comment-list>
                    </ul>
                    <!-- END comment-list -->
                    <div class="">
                        <h3 class="mb-5 text-xl">Leave a comment</h3>
                        <div>
                            <label for="message" class="block font-lato mb-2">Message</label>
                            <textarea v-model="comment" id="message" cols="60" rows="10" class="border border-primary rounded w-full p-2"
                                placeholder="type Your Message Here"></textarea>
                        </div>
                        <div>
                            <button @click="postComment" class="bg-white border border-primary inline-block  hover:bg-primary hover:text-white transition duration-500 ease-in-out  mt-2 cursor-pointer text-primary rounded px-2 py-1">Post Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <aside-bar class="float-right w-2/6"></aside-bar>
    </section>
</template>

<script>
    import { Quill } from 'vue-quill-editor';
    import arrayToTree from 'array-to-tree';
    import GET_POST from '@/graphql/queries/post.gql';
    import CREATE_COMMENT from '@/graphql/mutations/createComment.gql';
    import CommentList from '@/components/CommentList.vue';
    import AsideBar from '@/views/partials/AsideBar';

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
            'aside-bar': AsideBar
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
<style>
    #content>p {
        padding: 8px 0;
        font-size: 19px;
        font-family: 'Lato';
    }

    #content>pre {
        background-color: #eee;
        padding: 20px;
    }

    #content>h2 {
        font-size: 28px;
    }

    #content>h3 {
        font-size: 26px;
    }

    #content>h4 {
        font-size: 24px;
    }

    #content>h5 {
        font-size: 22px;
    }

    #content>h6 {
        font-size: 20px;
    }

    #content>h2,
    #content>h3,
    #content>h4,
    #content>h5,
    #content>h6 {
        margin: 8px 0;
    }

    #content>h2::before,
    #content>h3::before,
    #content>h4::before,
    #content>h5::before,
    #content>h6::before {
        content: '#';
        padding-right: 5px;
        color: #e56b6f;
    }
</style>