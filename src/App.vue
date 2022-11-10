<template>
  <v-container>
    <Stopwatch />
  </v-container>
</template>

<script>
import Stopwatch from "./components/Stopwatch";

export default {
  name: "App",

  data: () => {
    return {
      timerState: "stopped",
      currentTimer: 0,
      ticker: undefined,
    };
  },
  methods: {
    start: function () {
      this.tick();
    },
    tick: function () {
      this.ticker = setInterval(() => {
        this.currentTimer++;
      }, 10);
    },
  },
  components: {
    Stopwatch,
  },
};
</script>
