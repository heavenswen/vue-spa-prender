// 主内容容器
<template>
    <div class="main">
        <h1 class="text--center">page main</h1>
         <router-link to="/about">about</router-link>
         <router-link to="/about/1">about 1</router-link>
         <router-link to="/about/2">about 2</router-link>
        <transition :name='aniamte' mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>

export default {
    data() {
        return {
            //过渡效果
            aniamte: 'swiper',
            //当前路由
            path: "/",
        }
    },
    //创建完成时执行
    created() {
        //直接访问状态
        // console.log(this.$store.state.title )
        this.$store.commit("setTitle","set title")
    },  
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        let reg = new RegExp(from.path, 'ig');

        next()
    },


}
</script>
