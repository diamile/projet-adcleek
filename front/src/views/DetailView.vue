<script setup lang="ts">
 import {defineProps,onMounted} from 'vue'
 import {useCity} from '../stores/useCity'
 const cityStore = useCity();

 let props = defineProps<{
    city: string,
    cities:any
}>();

 onMounted(() => {
  cityStore.fetchCurrentCity(props.city);
})

</script>

<template>

   <div class="col-md-6">
        <div class="row">

          <div class="col-6 mb-4" v-for="forecast in cities" :key="forecast.id">
            <div class="card" style="width: 18rem;">
              <span><i :class="forecast.icon"></i></span>
              <i class=""></i>
              <p>tmin: {{ JSON.parse(forecast.details).tmin }} °C</p><br>
              <p>tmax: {{ JSON.parse(forecast.details).tmax }} °C</p><br>
              <p>Probabilité de pluie: {{ JSON.parse(forecast.details).probarain }} °C</p>
            </div>
          </div>

        </div>
   </div>
</template>
<style scoped>
  .bi{
    font-size:40px;
    
  }
  .card-body{
    color:white
  }
  .temp{
    color:yellow;
  }
</style>

