<template>
  <div class="main-container">
    <div class="info">
      <p>
        Выбран пользователь:
        <b>{{ userInfo.firstName }} {{ userInfo.lastName }}</b>
      </p>
      <p>Описание:</p>
      <textarea
        v-model="userInfo.description"
        name="description"
        id=""
        cols="30"
        rows="9"
      >
      </textarea>
      <p>
        Адрес проживания:
        <b>{{ userAdress.streetAddress }}</b>
      </p>
      <p>
        Город:
        <b>{{ userAdress.city }}</b>
      </p>
      <p>
        Провинция/штат:
        <b>{{ userAdress.state }}</b>
      </p>
      <p>
        Индекс:
        <b>{{ userAdress.zip }}</b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    userAdress() {
      return this.userInfo.address ? this.userInfo.address : ""
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  background-color: #ccc;
}
</style>