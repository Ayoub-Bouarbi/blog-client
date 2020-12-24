<template>
    <div class="overflow-hidden">
        <div class="w-3/5 float-left">
            <h1 class="text-3xl mb-6 font-bebas">Contact us</h1>
            <h3 class="text-xl my-3 font-bebas">Get in Touch</h3>
            <p class="font-lato">if you would like to get in touch with us please fill in the form below</p>
            <div>
                <input
                    class="my-5 p-3 block w-full border-black border hover:border-secondary transition duration-500 ease-in-out"
                    type="text" v-model="name" placeholder="Name">
                <input
                    class="mb-5 p-3 block w-full border-black border hover:border-secondary transition duration-500 ease-in-out"
                    type="email" v-model="email" placeholder="Email">
                <input
                    class="mb-5 p-3 block w-full border-black border hover:border-secondary transition duration-500 ease-in-out"
                    type="text" v-model="subject" placeholder="Subject">
                <textarea
                    class="mb-5 p-3 block w-full border-black hover:border-secondary border transition duration-500 ease-in-out"
                    name="message" v-model="message" id="message" cols="30" rows="10" placeholder="Enter your message"></textarea>

                <button
                    class="bg-white border border-primary text-base inline-block mt-2 text-primary hover:border-secondary hover:text-secondary transition duration-500 ease-in-out px-3 py-2"
                    @click="submit">Send Message <i class="icon-envelope-open"></i></button>
            </div>
        </div>
        <div class="mt-36 w-2/5 flex justify-center float-left">
            <div class="w-2/4 text-center">
                <div>
                    <button class="border border-primary font-lato hover:border-secondary hover:text-secondary transition duration-500 ease-in-out bg-transparent text-primary px-8 py-3">BECAME A
                        MEMBER</button>
                    <p class="my-4 font-lato">ALREADY A MEMBER? <a href="" class="text-primary underline hover:text-secondary transition duration-500 ease-in-out">Sign
                            in</a> </p>
                </div>
                <div class="bg-primary text-white">
                    <div class="grid grid-cols-3">
                        <i class="icon-facebook p-5 place-self-center text-2xl"></i>
                        <i class="icon-github p-5 place-self-center text-2xl"></i>
                        <i class="icon-twitter p-5 place-self-center text-2xl"></i>
                    </div>
                    <div class="grid grid-cols-3">
                        <i class="icon-instagram p-5 place-self-center text-2xl"></i>
                        <i class="icon-google p-5 place-self-center text-2xl"></i>
                        <i class="icon-linkedin p-5 place-self-center text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import CONTACT from '@/graphql/mutations/contact.gql';

export default {
    name: 'Contact',
    data() {
        return {
            name: '',
            email: '',
            subject: '',
            message: '',
        }
    },
    methods: {
        submit(){
            this.$apollo.mutate({
                    mutation: CONTACT,
                    variables: {
                        name: this.name,
                        subject: this.subject,
                        email: this.email,
                        message: this.message,
                    },
                })
                .then(res => {
                    console.log(res);
                })
                .catch(res => {
                    console.log(res);
                });
        }
    },
}

</script> 