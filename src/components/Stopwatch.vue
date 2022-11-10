<template>
  <v-container fluid>
    <Scramble ref="Scramble" v-show="running === false"></Scramble>
    <div id="clock">
      <v-flex class="time" v-if="running === false">{{ time }}</v-flex>
      <v-flex class="time" v-else>Solving</v-flex>
    </div>
    <Stats ref="Stats" :miliseconds="miliseconds" v-show="running === false" />
  </v-container>
</template>

<script>
  import Scramble from "./Scramble";
  import Stats from "./Stats";

  export default {
    data() {
      return {
        time: "00.00",
        timeBegan: null,
        timeStopped: null,
        stoppedDuration: 0,
        started: null,
        running: false,
        miliseconds: 0
      };
    },
    name: "stopwatch",

    computed: {},
    methods: {
      startStop() {
        if (!this.running) {
          this.run();
        } else if (this.running) {
          this.stop();
        }
      },

      run() {
        if (this.running) return;

        if (this.timeBegan === null) {
          this.timeBegan = new Date();
        }

        if (this.timeStopped !== null) {
          this.stoppedDuration += new Date() - this.timeStopped;
        }

        this.started = setInterval(this.clockRunning, 10);
        this.running = true;
      },
      stop() {
        this.running = false;
        this.timeStopped = new Date();
        clearInterval(this.started);
        this.newScramble();
        this.stats();
      },

      clockRunning() {
        var currentTime = new Date(),
          timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration),
          min = timeElapsed.getUTCMinutes(),
          sec = timeElapsed.getUTCSeconds(),
          ms = timeElapsed.getUTCMilliseconds();
        this.miliseconds = timeElapsed.getTime();
        this.time =
          this.zeroPrefix(min, 2) + ":" + this.zeroPrefix(sec, 2) + "." + this.zeroPrefix(ms, 3);
      },
      zeroPrefix(num, digit) {
        var zero = "";
        for (var i = 0; i < digit; i++) {
          zero += "0";
        }
        return (zero + num).slice(-digit);
      },

      newScramble() {
        this.$refs.Scramble.generateScramble();
      },

      stats() {
        this.$refs.Stats.addTimes();
      }
    },
    components: {
      Scramble,
      Stats
    },
    mounted() {
      window.addEventListener("keyup", (e) => {
        var key = e.key;
        // var timing = this.running === false;
        if (key === " ") {
          this.startStop();
        }
      });
    }
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
