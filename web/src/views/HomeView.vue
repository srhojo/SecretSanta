<script setup>

</script>

<template>
  <v-container>
    <v-row>
      <!-- Dialog confirm-->
      <v-dialog v-model="dialogConfirm" max-width="480">
        <v-card>
          <v-card-title>Confirmar</v-card-title>
          <v-card-text class="text-center">¿Estás seguro que quieres jugar como <span class="playerName">"{{ playerSelected.NAME }}"</span>?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="this.dialogConfirm = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="play(playerSelected)">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Dialog result -->
      <v-dialog v-model="dialogResult" max-width="480">
        <v-card>
          <v-card-title>Resultado</v-card-title>
          <v-card-text class="text-center">Tú amigo invisible es <span class="playerName">"{{ playerSelectedName }}"</span>!</v-card-text>    
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogResult = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col v-for="player in players" :key="player.id" cols="12" sm="6" md="4" lg="3" v-on:click="confirm(player)">
        <v-card link variant="outlined" :style="'border: 2px solid green;'" class="text-center">

          <v-card-title>{{ player.NAME }}</v-card-title>
          <v-card-text>Pincha para jugar!</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script>
export default {
  data() {
    return {
      dialogConfirm: false,
      dialogResult: false,
      playerSelectedName: '',
      players: [],
      playerSelected: null
    }
  },
  mounted() {
    this.retrievePlayerNoyPlayed()
  },
  methods: {
    retrievePlayerNoyPlayed() {
      this.axios
        .get('/public/players/who-not-played-yet')
        .then((response) => {
          this.players = response.data
        })
        .catch((e) => {
          console.log('error' + e)
        })
    },
    confirm(player) {
      console.log("confirm")
      this.playerSelected = player
      this.dialogConfirm = true
    },
    play(player) {
      this.dialogConfirm = false
      this.axios
        .post('/public/players/play-secret-santa', {playerId: player.ID})
        .then((response) => {
          console.log(response.data)
          this.playerSelectedName = response.data.selectedName
          this.dialogResult = true
          this.retrievePlayerNoyPlayed()          
        })
        .catch((e) => {
          console.log('error' + e)
        })
    },

  }
}


</script>

<style scoped>

.playerName {
  font-weight: bold;
  color: green;
}

</style>
