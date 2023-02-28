<script setup lang="ts">
import { RouterView } from 'vue-router'
 import {useCity} from '../stores/useCity'
 import type {CityInterface} from '../interfaces'
 import {useRouter} from "vue-router"
 const cityStore = useCity();
 cityStore.fetchAllcities();
 const router = useRouter();
 
 function getCityDetail(city:CityInterface){
    router.push({ name: 'detail', params: { city:city.id}, query:{city:city.name} });
    cityStore.fetchCurrentCity(city.id);

 }

</script>

<template>
  
  <div class="home">
    <section class="row">
      <div class="col-md-6 table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Code insee</th>
              <th>City</th>
              <th>Populaton</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(city, index) in cityStore.cities" :key="index"  @click="getCityDetail(city)">
              <td>
                {{ city.insee }}
              </td>
              <td>
                {{ city.name }}
              </td>
              <td>
                {{ city.population }}
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
      

        <RouterView :cities="cityStore.getCityDetail" />
    
    </section>
  </div>
</template>
<style>
 table {
    max-width: 100%;
}
th{
  font-weight:bold
}
</style>

