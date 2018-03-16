<template>
    <div class='page page404'>
        <div class='text-center'  @click='back'>
            <h1>{{ con.title }}</h1>
            <p>
              {{con.content}}
            </p>
            <p class='small'>点击返回</p>
              <img v-bind:src="logoImg">
        </div>
    </div>
</template>

<script>
import "assets/css/404.scss";
import logo from "assets/img/logo.png";
import data from "assets/js/data.js";
export default {
  data() {
    return { logoImg: logo }
  },
  computed:{
      con(){
          let id = this.$route.params.id||""
        if(id){
          
          return data[id];
        }else{
          return {title:"about",content:""}
        }
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

