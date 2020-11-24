<template>
  <div class="blog-page">
    <left-aside-bar />
    <div id="blog-main">
        <router-view />
    </div>
  </div>
</template>

<script>
  import LeftAsideBar from '@/views/partials/LeftAsideBar';

  export default {
    components: {
      LeftAsideBar
    }
  }
</script>
