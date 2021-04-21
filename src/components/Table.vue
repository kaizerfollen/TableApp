<template>
  <div class="container-table">
    <button 
      @click="showForm = !showForm"
    >
      Добавить
    </button>
    <p
      class="error"
      v-for="(error, index) in errors" 
      :key="index"
    >
      {{ error }}
    </p>
    <form v-show="showForm">
      <input required type="number" v-model.number="userForm.id" placeholder="ID">
      <input required type="text" v-model="userForm.firstName" placeholder="First name">
      <input required type="text" v-model="userForm.lastName" placeholder="Last name">
      <input required type="text" v-model="userForm.email" placeholder="Email">
      <input required type="text" v-mask="maskPhone" v-model="userForm.phone" placeholder="Phone">
      <button
        v-if="isShowBtnAdd"
        type="button"
        @click="addUser"
      >
        Добавить в таблицу
      </button>
    </form>
    <table class="table">
      <thead>
        <tr class="table__row">
          <td
            class="table__thead__column"
            v-for="(column, index) in columns"
            :key="index"
            @click="sortTable(column)"
          >
            {{ column | capitalize }}
            <div class="arrow"
              v-if="column === sortColumn"
              :class="asc ? 'arrow_up' : 'arrow_down'"
            >
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr
          class="table__body__row"
          v-for="(item, index) in searchUsers"
          :key="index"
          @click="selectItem(item)"
        >
          <td
            class="table__body__column"
            v-for="(column, index) in columns"
            :key="index"
          >
            {{ item[column] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="searchInfo">
      <button
        @click="showInput = !showInput"
      >
        Найти
      </button>
      <input v-model="searchInfo" v-show="showInput" type="text">
    </div>
    <div class="pagination">
      <button
        v-if="page != 1"
        @click="page--"
      >
        Back
      </button>
      <button
        v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
        :key="index"
        @click="page = pageNumber"
      >
        {{ pageNumber }}
      </button>
      <button
        v-if="page < pages.length"
        @click="page++"
      >
        Next
      </button>
    </div>
    <UserInfo
      v-if="selectedItem"
      :user-info="selectedItem"
    />
  </div>
</template>


<script>
import UserInfo from "@/components/UserInfo";

const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: "Table",
  components: {
    UserInfo,
  },

  props: {
    users: {
      type: Array,
      default: () => ([])
    },
    errors: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      asc: false,
      sortColumn: "",
      columns: ["id", "firstName", "lastName", "email", "phone"],
      selectedItem: null,
      page: 1,
      perPage: 50,
      pages: [],
      showInput: false,
      showForm: false,
      searchInfo: "",
      maskPhone: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      userForm: {
        id: null,
        lastName: null,
        firstName: null,
        phone: null,
        email: null
      }
    }
  },

  mounted() {
    this.setPages()
  },

  methods: {
    sortTable(column) {
      if (this.sortColumn === column) {
        this.asc = !this.asc
      } else {
        this.asc = true
        this.sortColumn = column
      }

      this.paginationUsers.sort((a, b) => {
        if (a[column] > b[column]) {
          return this.asc ? 1 : -1
        } else if (a[column] < b[column]) {
          return this.asc ? -1 : 1
        } else {
          return 0
        }
      })
    },

    selectItem(item) {
      this.selectedItem = item
    },

    setPages() {
      let numberOfPages = Math.ceil(this.users.length) / this.perPage
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i)
      }
    },

    validEmail(email) {
      const regExp = regExpEmail
      return regExp.test(email);
    },

    validPhone(phone) {
      let cleaned = ('' + phone).replace(/\D/g, '')
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      }
      return null
    },

    addUser() {
      this.users.unshift({
        id: this.userForm.id,
        lastName: this.userForm.lastName,
        firstName: this.userForm.firstName,
        email: this.userForm.email,
        phone: this.userForm.phone
      })
      this.userForm = {}
    }
  },

  computed: {
    paginationUsers() {
      let from = (this.page * this.perPage) - this.perPage
      let to = (this.page * this.perPage)
      return this.users.slice(from, to)
    },

    searchUsers() {
      if (!this.searchInfo) return this.paginationUsers

      return this.paginationUsers.filter(el => {
        const id = el.id.toString();
        const firstName = el.firstName.toString().toLowerCase()
        const lastName = el.lastName.toString().toLowerCase()
        const phone = el.phone.toString().toLowerCase()
        const email = el.email.toString().toLowerCase()
        return id.includes(this.searchInfo) || firstName.includes(this.searchInfo) || lastName.includes(this.searchInfo) || phone.includes(this.searchInfo) || email.includes(this.searchInfo)
      })
    },

    isShowBtnAdd() {
      return (
        this.userForm.id &&
        this.userForm.firstName &&
        this.userForm.lastName &&
        this.userForm.email &&
        this.userForm.phone &&
        this.validEmail(this.userForm.email) &&
        this.validPhone(this.userForm.phone)
      )
    }
  },

  watch: {
    users() {
      this.setPages()
    },
  },

  filters: {
    capitalize(value) {
      return value.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
}
.table__row {
  border-bottom: 2px solid #ccc;
}
.table__thead__column {
  padding: 10px;
  cursor: pointer;
  background-color: #ccc;

  &:hover {
    color: #fff;
  }
}

.table__body__row {
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
}

.table__body__column {
  padding: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.arrow {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}

.arrow_down {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC')
}

.arrow_up {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=')
}

</style>