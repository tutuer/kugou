<template>
        <div class="singer" >
        <mt-cell 
        class="song-cell singer-song-list"
        v-for="item in singer"
        :key="item.classid"
        :title="item.classname"
        @click.native="gotosingerlist(item)"
        >
        </mt-cell>
    </div>
</template>
<script>
export default {
    data(){
        return{
            singer:[]
        }
    },
    async created(){
        let {data} = await this.$kugou.getSingers();
        this.singer=data.data;
        console.log(data)

    },
    methods:{
        gotosingerlist(item){
            this.$router.push({
                name:'Singer-list',
                params:{
                    id:item.classid
                }
            })
        }
    }
}
</script>
<style scoped>

.singer-song-list{ 
    border:1px solid #e5e5e5;
    margin: .3rem;
}



</style>