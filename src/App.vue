<template>
  <div id="app">
    <div v-show="!isShowData" class="selector-load">
      Выберите, какой обьем данных загрузить:
      <button @click="loadData('min')">Загрузить маленький обьем данных</button>
      <button @click="loadData('max')">Загрузить большой обьем данных</button>
      <p 
        v-for="(error, index) in errors"
        :key="index"
        v-show="errors.length > 0"
      >
        {{ error }}
      </p>
    </div>
    <Loader v-if="isLoader" />
    <Table v-if="isShowData" :users="users" />
  </div>
</template>

<script>
import axios from "axios"
import Table from '@/components/Table'
import Loader from "@/components/Loader"

const urlMin = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

const urlMax = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

export default {
  name: 'App',
  components: {
    Table,
    Loader
  },
  data() {
    return {
      isShowData: false,
      isLoader: false,
      users: [],
      errors: []
    }
  },
  methods: {
    async loadData(size) {
      this.isLoader = true
      if (size === "min") {
        await axios.get(urlMin)
          .then(response => {
            if (response.data.length > 0) {
              this.users = response.data
              this.isShowData = true
            }
          })
          .catch(error => {
            this.errors.push(error.message)
          })
      }
      if (size === "max") {
        await axios.get(urlMax)
          .then(response => {
            if (response.data.length > 0) {
              this.users = response.data
              this.isShowData = true
            }
          })
          .catch(error => {
            this.errors.push(error.message)
          })
      }
      this.isLoader = false
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
