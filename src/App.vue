<template>
  <div class="three-canvas" ref="threeTarget">
  </div>
</template>

<script lang="ts">
import { TEngine } from "./assets/ts/TEngine";
import{onMounted, defineComponent, ref} from 'vue'


export default defineComponent({
  setup(){
    const threeTarget = ref(null);

  onMounted(()=>{
    const TE = new TEngine(threeTarget.value!);
    // console.log(TE,threeTarget);
  })

  return{
    threeTarget
  }
  
}
})


</script>

<style scoped>

.three-canvas{
  height: 100%;
  width: 100%;
  /* border: 3px solid wheat; */
  background-color: aqua;
}

</style>
