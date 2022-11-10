<template>
  <v-container fluid>
    <div id="scram" class="scramble"></div>
  </v-container>
</template>

<script>
  export default {
    name: "Scramble",

    data() {
      return {
        scramble: ""
      };
    },
    methods: {
      generateScramble() {
        var move; //includes face to turn and how to turn it. Ex. 2F
        var face; //Face to turn. Either R, L, F, B, U, or D
        var faceNum; //1-6, corresponds to face R-D
        var lastFaceNum = 10; //The face of the previous turn
        var turn; //How to turn a face. Either ', 2, or nothing.
        var scramble = ""; //inlucdes 25 moves
        var output = document.getElementById("scram");
        for (var x = 0; x < 25; x++) {
          do {
            faceNum = Math.floor(Math.random() * 6) + 1;
          } while (faceNum === lastFaceNum); //the same face can't appear in consecutive moves.
          lastFaceNum = faceNum;
          if (faceNum === 1) {
            face = "R";
          }
          if (faceNum === 2) {
            face = "L";
          }
          if (faceNum === 3) {
            face = "U";
          }
          if (faceNum === 4) {
            face = "D";
          }
          if (faceNum === 5) {
            face = "F";
          }
          if (faceNum === 6) {
            face = "B";
          }
          turn = Math.floor(Math.random() * 3) + 1;
          if (turn === 1) {
            move = face;
          }
          if (turn === 2) {
            move = face + "2";
          }
          if (turn === 3) {
            move = face + "'";
          }

          scramble += move + " ";
        }
        output.innerHTML = scramble;
      }
    },
    mounted() {
      this.generateScramble();
    }
  };
</script>
<style lang="scss">
  .scramble {
    color: white;
    font-size: 1.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }
</style>
