<template>
  <v-container fluid>
    <div class="stats">
      <span id="solveNum">Solves: {{ numSolves }}</span>
      <v-spacer></v-spacer>
      <span id="overallAv">Average: {{ formatTime(avg) }}</span>
      <v-spacer></v-spacer>
      <span id="fastest">Best: {{ formatTime(best) }}</span>
    </div>
    <div class="list">1. {{ formatTime(times) }}</div>
  </v-container>
</template>

<script>
  export default {
    name: "Stats",
    data() {
      return {
        stats: null,
        numSolves: 0,
        times: [],
        avg: 0,
        best: "",
        worst: 0,
        total: 0,
        timesDisplay: []
      };
    },
    props: {
      miliseconds: Number
    },

    methods: {
      addTimes() {
        this.numSolves++;
        this.times.push(this.miliseconds);
        this.avg = this.times.reduce((a, b) => a + b, 0) / this.times.length;
        this.best = this.times[0];
        for (let x = 0; x < this.times.length; x++) {
          if (this.times[x] < this.best) {
            this.best = this.times[x];
          }
        }
      },

      formatTime(t) {
        //m = minute, s = second, c = centisecond
        let m = 0,
          s = 0,
          c = 0,
          out = "";
        m = Math.floor(t / 60000);
        t = t % 60000;
        s = Math.floor(t / 1000);
        t = t % 1000;
        c = Math.floor(t);
        if (m < 1) {
          m = "";
        } else {
          m = m + ":";
          if (s < 10) {
            s = "0" + s;
          }
        }
        if (c < 10) {
          c = "0" + c;
        }

        out = "" + m + s + "." + c;
        return out;
      }
    }
  };
</script>
<style lang="scss">
  .stats {
    color: white;
    font-size: 1.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }

  .list {
    color: white;
    font-size: 1.75em;
    display: flex;

    align-items: center;
    margin-bottom: 50px;
  }
</style>
