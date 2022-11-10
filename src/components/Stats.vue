<template>
  <v-container fluid>
    <div class="stats">
      <span id="solveNum">Solves: {{ numSolves }}</span>
      <v-spacer></v-spacer>
      <span id="overallAv">Average: </span>
      <v-spacer></v-spacer>
      <span id="fastest">Best: </span>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Stats",
  data() {
    return {
      stats: null,
    };
  },
  methods: {
    calculateStats() {
      var csTimes = new Array();
      var avAll = 0;
      var avAllOut = document.getElementById("overallAv");
      var best = "";
      var bestOut = document.getElementById("fastest");
      var worst = 0;
      var numSolves = 0;
      var total = 0;
      var numSolvesOut = document.getElementById("solveNum");
      numSolves++;
      total = 0;
      numSolvesOut.innerHTML = "Solves: " + numSolves;
      for (var x = 0; x < csTimes.length; x++) {
        if (csTimes[x] < best) {
          best = csTimes[x];
        }
        if (csTimes[x] > worst) {
          worst = csTimes[x];
        }
        total += csTimes[x];
      }
      avAll = total / numSolves;
      avAllOut.innerHTML = "Average: " + this.formatTime(avAll);
      bestOut.innerHTML = "Best: " + this.formatTime(best);
    },
    formatTime(t) {
      //m = minute, s = second, c = centisecond
      var m = 0,
        s = 0,
        c = 0,
        out = "";
      m = Math.floor(t / 6000);
      t = t % 6000;
      s = Math.floor(t / 100);
      t = t % 100;
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
    },
  },
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
</style>
