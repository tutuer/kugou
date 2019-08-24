<template>
    <mt-navbar v-model="selected">
       <mt-tab-item 
       :id="item.name"
       v-for="item in navData" :key="item.name"
       @click.native="gotolink(item)"
       >{{item.title}}
       </mt-tab-item>
       
</mt-navbar>
</template>
<script>
import{navData} from '@/router/nav'
export default {
    data(){
        return{
            selected:'Home',
            navData


        }
    },
    watch:{
        $route:{
            handler(){
                 this.selected=this.$route.name
            },
            immediate:true //深度监控
           
        }
    },

    methods:{
        gotolink(item){
            this.$router.push({
                name:item.name
            })
        }
    }
}
</script>