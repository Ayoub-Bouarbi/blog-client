<template>
    <div>
        <aside id="blog-aside" role="complementary" class="js-fullheight">
            <h1 id="blog-logo" class="mb-5">
                <router-link :to="{name:'Home'}" class="logo">
                    Andrea
                    <span>Moore</span>
                </router-link>
            </h1>
            <nav id="blog-main-menu" role="navigation">
                <ul>
                    <li>
                        <router-link :to="{name: 'Home'}" tag="a">Home</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'About'}" tag="a">About</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'Contact'}" tag="a">Contact</router-link>
                    </li>
                </ul>
            </nav>


			<div class="colorlib-footer">
				<p class="pfooter">
					<!-- Link back to colorlib can't be removed. Template is licensed under CC BY 3.0. -->
					Copyright &copy;2020 All rights reserved | This template is made with <i class="icon-heart"
						aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">colorlib</a>
					<!-- Link back to colorlib can't be removed. Template is licensed under CC BY 3.0. -->
				</p>
			</div>
        </aside>
    </div>
</template>

<style lang="css">
    .colorlib-footer{
        position: absolute;
        bottom: 0;
    }
</style>
