<template>
  <Stopwatch :state="timerState" />
</template>

<script>
  import Stopwatch from "./components/Stopwatch";

  export default {
    name: "App",

    components: {
      Stopwatch
    },

    data: () => {
      return {
        timerState: "stopped",
        ticker: undefined
      };
    }
  };
</script>
