<template>
  <div>
    <v-card @click.prevent="download"
        v-ripple
        class="main-button card-colored outer-card"
        :class="{'enter-button': hover}"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        elevation="8"
    >
      <v-card
          v-ripple
          class="first-nested card-colored inner-card"
          :class="{'inside': hover}"
          elevation="8"
      >
        <v-icon
            :class="{'inside': hover}"
            style="color: #bfbfbf; padding: 3px">mdi-file-download</v-icon>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DownloadButton",

  props: {
    fileName: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    hover: false
  }),

  methods: {
    download()  {
      // creation d'un tableau de string contenant les infos (et séparateurs)
      const entete = Object.keys(this.data[0]);
      let tableur = [];
      entete.forEach((el) => tableur.push(el, ','));
      tableur.push('\n');
      this.data.forEach((obj) => {
        entete.forEach((attr) => {
          tableur.push(obj[attr], ',');
        });
        tableur.push('\n');
      });

      // création d'une balise type <a></a> et définition des attribut
      const a = document.createElement('a');

      // Attribut:
      // lien vers un "fichier" créer dynamiquement
      a.href =
          'data:text/csv;charset=utf-8,' + encodeURIComponent(tableur.join(''));
      a.target = '_blank';
      // download indique que le lien est à télécharger. le nom une fois téléchargé est donné comme valeur
      a.download = `${this.fileName}.csv`;
      // déclenche l'événement onClick sur le lien
      a.click();
    }
  }
}
</script>

<style scoped>
.card-colored {
  background-color: #14202c;
}
.outer-card {
  border-radius: 10px;
  height: 52px;
  width: 52px;
}
.inner-card {
  border-radius: 10px;
  height: 32px;
  width: 32px;
  border: 1px solid #bfbfbf;
  position: absolute;
  top: 10px;
  left: 10px;
}
.enter-button {
  cursor: pointer;
}
.inside {
  color: #fff !important;
}
</style>