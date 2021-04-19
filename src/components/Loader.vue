<template>
  <div class="bg">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
}

.loader, .loader:after {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  
}

.loader {
  position: absolute;
  top: calc(50vh - 30px);
  left: calc(50% - 60px);
  border-top: 10px solid #f8f8f8;
  border-right: 10px solid #df0a0a;
  border-bottom: 10px solid #f8f8f8;
  border-left: 10px solid #df0a0a;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>