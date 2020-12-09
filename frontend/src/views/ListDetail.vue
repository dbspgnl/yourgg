<template>
  <div class="Detail">
    <Detail :no="this.$route.query.no" />
  </div>
</template>

<script>
import Detail from "@/components/board/detail.vue";

export default {
  components: {
    Detail
  }
};
</script>

<style lang="scss"></style>
