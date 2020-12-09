<template>
  <div class="home">
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
import List from "@/components/board/list.vue";

export default {
  name: "Home",
  components: {
    List
  }
};
</script>

<style lang="scss">
.home {
  height: 100vh;
  background-color: #2e2f32;
}
</style>
