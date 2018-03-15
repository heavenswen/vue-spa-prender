<template>
    <div class='page page404'>
        <div class='text-center'  @click='back'>
            <h1>about{{ id }}</h1>
            <p class='small'>点击返回</p>
              <img v-bind:src="logoImg">
        </div>
    </div>
</template>

<script>
import "assets/css/404.scss";
import logo from "assets/img/logo.png";
export default {
  data() {
    return { logoImg: logo }
  },
  computed:{
      id(){
          return this.$route.params.id||""
      }
  },
  methods: {
    //触发路由上1page
    back() {
      history.go(-1);
    }
  }
};
</script>

