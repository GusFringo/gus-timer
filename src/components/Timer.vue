<template>
  <v-container fluid>
    <Scramble ref="Scramble"></Scramble>
    <div id="timeOut" class="time">
      <span id="min"></span><span id="colon"></span
      ><span id="sec">0</span>.<span id="decimal">00</span>
    </div>
    <Stats ref="Stats" />
  </v-container>
</template>

<script>
import Scramble from "./Scramble";
import Stats from "./Stats";
export default {
  data() {
    return {
      time: "00:00.000",
      running: false,
      interval: "",
      decimal: 0,
      sec: 0,
      min: 0,
      cs: 0,
      decimalOut: document.getElementById("decimal"),
      secOut: document.getElementById("sec"),
      minOut: document.getElementById("min"),
      colon: document.getElementById("colon"),
      timesOut: document.getElementById("timeOut"),
      timesList: document.getElementById("timeList"),
      clearAll: document.getElementById("clear"),
      timesDisplay: new Array(),
      csTimes: new Array(),
      avAll: 0,
      avAllOut: document.getElementById("overallAv"),
      best: 999999999999999999,
      bestOut: document.getElementById("fastest"),
      worst: 0,
      numSolves: 0,
      total: 0,
      numSolvesOut: document.getElementById("solveNum"),
    };
  },
  name: "stopwatch",

  computed: {},
  methods: {
    timer() {
      this.decimal++;
      this.cs++; //counts time in centiseconds
      this.decimalOut = this.decimal;
      if (this.decimal >= 100) {
        this.decimal = 0;
        this.sec++;

        if (this.sec > 59) {
          this.sec = 0;
          this.min++;
          this.colon = ":";
          this.minOut = this.min;
        }
        if (this.sec <= 9 && this.min > 0) {
          this.sec = "0" + this.sec;
        }
        this.secOut = this.sec;
      }

      if (this.decimal <= 9) {
        this.decimal = "0" + this.decimal;
        this.decimalOut = this.decimal;
      }
    },

    run() {
      if (!this.running) {
        this.decimal = 0;
        this.sec = 0;
        this.min = 0;
        this.cs = 0;
        this.secOut = "0";
        this.minOut = "";
        this.colon = "";
        this.running = true;
        this.scramble = "";
        this.newScramble();
        this.interval = setInterval(this.timer, 10);
      } else if (this.running) {
        this.running = false;
        clearInterval(this.interval);
        this.timesDisplay.push(" " + this.timesOut);
        this.csTimes.push(this.cs);
        this.timesList = this.timesDisplay;
        this.stats();
      }
    },
    newScramble() {
      this.$refs.Scramble.generateScramble();
    },

    stats() {
      this.$refs.Stats.calculateStats();
    },
  },
  components: {
    Scramble,
    Stats,
  },
  mounted() {
    window.addEventListener("keyup", (e) => {
      var key = e.key;
      // var timing = this.running === false;
      if (key === " ") {
        this.run();
      }
    });
  },
};
</script>
<style lang="scss">
$color: rgb(200, 200, 200);
$color-light: white;

@import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono");

html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  background-color: rgb(10, 10, 10);
  font-family: "Share Tech Mono", sans-serif;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
}

#clock {
  order: 0;
  flex: 0 1 auto;
  align-self: center;

  color: $color;
  //text-shadow: 0px 0px 25px $color;

  .time {
    font-size: 6.5em;
    text-align: center;
    margin: 0 auto;
  }

  .text {
    margin-top: 30px;
    font-size: 1em;
    color: rgba($color, 0.15);
    text-align: center;

    a {
      text-decoration: none;
      color: inherit;

      transition: color 0.1s ease-out;

      &:hover {
        color: $color;
      }
    }
  }

  .btn-container {
    display: flex;
    margin-top: 15px;

    a {
      text-align: center;
      font-family: "Share Tech Mono", sans-serif;
      background: transparent;
      //border: 3px solid $color;
      border: none;
      color: $color;
      padding: 10px 15px;
      margin: 0 10px;
      text-transform: uppercase;
      font-size: 2em;
      cursor: pointer;
      //text-shadow: 0px 0px 10px $color;

      flex-grow: 1;

      transition: color 0.1s ease-out;

      &:hover {
        color: $color-light;
      }
    }
  }
}
</style>
