<template>
  <div>
    <app-header />
    <main class="container mx-auto overflow-hidden my-20">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script>
  import AppHeader from '@/views/partials/AppHeader';
  import AppFooter from '@/views/partials/AppFooter';

  export default {
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>