<template>
  <div id="app">
    <div v-show="!isShowData" class="selector-load">
      Выберите, какой обьем данных загрузить:
      <button @click="loadData('min')">Загрузить маленький обьем данных</button>
      <button @click="loadData('max')">Загрузить большой обьем данных</button>
    </div>
    <Loader v-if="isLoader" />
    <Table v-if="isShowData" :users="users" :errors="errors" />
  </div>
</template>

<script>
import API from "@/api/api"
import Table from '@/components/Table'
import Loader from "@/components/Loader"

const api = new API()

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
    async loadData(urlSize) {
      this.isLoader = true
      await api.loadData(urlSize)
        .then(res => {
          if (!res.data) {
            this.errors.push(res.message)
          } else {
            this.users = res.data
          }
        })
      this.isShowData = true
      this.isLoader = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
