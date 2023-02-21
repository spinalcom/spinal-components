<template>
  <v-app>
Hello
  </v-app>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import {
  ISpaceSelectorItem,
  IZoneItem,
  SpaceSelector,
} from './components/SpaceSelector/index';
@Component({
  components: {
    SpaceSelector,
  },
})
class App extends Vue {
  message = 'Hello';
  mounted() {
    console.log(this.message);  
  }
 




}

export default App;

</script>

<style scoped lang="scss">
.v-main {
  background: transparent linear-gradient(121deg, #F8FAFA 0%, #D6E2E6 100%) 0% 0% no-repeat padding-box;
  opacity: 1;
}

.pie-card {
  width: 20%;
}
.bar-card {
  width: 40%;
}
.stat-card {
  width: 25%;
}
</style>