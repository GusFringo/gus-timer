<template>
  <v-container fluid>
    <div class="list">Hola</div>
  </v-container>
</template>

<script>
  export default {
    name: "Times list",
    data() {
      return {
        timesDisplay: []
      };
    }
  };
</script>
<style lang="scss">
  .list {
    color: white;
    font-size: 1.75em;
    display: flex;

    align-items: center;
    margin-bottom: 50px;
  }
</style>
