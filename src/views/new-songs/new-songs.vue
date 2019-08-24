<template>
    <div>
        <div class="new-song-swipe">
            <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="item in banner" :key="item.id">
              <img :src="item.imgurl" />
            </mt-swipe-item>
        </mt-swipe>
        </div>
         <song-list :song-list="songList"></song-list>
    </div>
   
</template>

  
<script>
import SongList from '@/views/common/song-list/song-list'
export default {
    data(){
        return{
            banner:[],
            songList:[]
        }
    },
    components:{
        SongList
    },
    async created(){
        let {data} = await this.$kugou.getNewSongs();
         this.songList=data.data;
         this.banner=data.banner;
        
       
    },
        
}
</script>

<style scoped>
.new-song-swipe{
    height:2.5rem;
}
.new-song-swipe img{
    width:100%;
}

</style>