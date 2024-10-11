<script setup>
</script>

<template>
  <div id="app">
    <div class="links">
      <router-link to="/task1">Go to Task 1</router-link>
      <router-link to="/task2">Go to Task 2</router-link>
      <router-link to="/task3">Go to Task 3</router-link>
    </div>

    <router-view />
  </div>
</template>

<style scoped>
.links {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
</style>
