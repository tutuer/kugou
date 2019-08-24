<template>
    <div>
      <div class="play-bottom" :style="{bottom:bottom+'rem'}">
      <div class="play-left" @touchstart="showplayerhandle">
        <img  v-if="songInfo.imgUrl" :src="songInfo.imgUrl | filterImgUrl" alt="">
        <p>
          <span>{{songInfo.songName}}</span>
          <span>{{songInfo.singerName}}</span>
        </p>
      </div>
      <div class="play-right">
        <div class="iconfont  icon-left-circle prev-song"
         @touchstart="prev"></div>
        <div
          class="iconfont play-song"
          :class="{'icon-bofang':!isplay,'icon-zanting':isplay}"
          @touchstart="playorpause"
        ></div>
        <div class="iconfont  icon-right-circle next-song"
        @touchstart="Next"></div>      
      </div>
    </div>
        <audio ref="audio" preload :src="src"></audio>
    <player 
    :play-top.sync="playTop"
    :song-info="songInfo"
     @prev="prev"
    @playorpause="playorpause"
    @Next="Next"
    :is-play="isplay"
    :duration="duration"
    :current-time="currentTime"
    @current="current"
    :rc="rc"
    ></player>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {getSongMp3,getRc} from '@/server/searchMp3'
import { MessageBox } from 'mint-ui';
import Player from '@/components/play-bottom/player/player'
export default {
    data(){
        return{
            
            currentindex:-1,
            src:'',
            rc:'',//记录当前歌曲的歌词
            songInfo:{},
            isplay:true,
            bottom:0,
            playTop:15,
            duration:0,
            currentTime:0

        }
        
    },
    components:{
      Player

    },
  
    computed:{
      ...mapState(['songList','hash'])
    },

    watch:{
        'hash':async function(){
            this.currentindex=this.$store.state.songList.findIndex(item=>item.hash==this.hash);
        /*let {data}  = await getSongMp3({hash:this.hash});
            //向后端发起请求
            this.src=data.url;*/
            this.getSong();
            this.bottom=0;
            
        }
    },
    methods:{
      async getSong(){
        //songList是播放列表，currentIndex是要播放的那首歌的下标
        let hash = this.songList[this.currentindex].hash
        //为了找播放地址
        let {data}  = await getSongMp3({hash:hash});
        if(this.currentindex===1){
          MessageBox('错误提示', 'data.error');
          return{code:data.errcode,error:data.error};
        }

        let {data:rcString} = await getRc({hash:hash,keyword:data.songName})
         this.src=data.url;
         this.songInfo=data;
         this.rc=rcString;
         
         
         
      },
       async Next(){
            this.currentindex++;
            if(this.currentindex > this.songList.length-1){
              this.currentindex = 0;
            }
            let error = await this.getSong();
            if(error){
              this.Next();
            }
        },
        async prev(){
            this.currentindex--;
            if(this.currentindex < 0){
              this.currentindex = this.songList.length-1;
            }
            let error = await this.getSong();
            if(error){
              this.prev();
            }
        },
        playorpause(){
          if(this.$refs.audio.paused){
            this.$refs.audio.play();
            this.isplay=true;
          }else{
            this.$refs.audio.pause();
            this.isplay=false;
            
          }
        },
        showplayerhandle(){
          this.playTop=0;

        },
        current(t){
          this.currentTime=t;
          this.$refs.audio.currentTime=t;

        }
    },
    mounted(){
      let audio=this.$refs.audio;
      //音频加载完成
      audio.addEventListener('loadedmetadata',() => {
        audio.play();
        this.isplay=true;
        this.duration=audio.duration;//播放总时间
        this.currentTime=audio.currentTime;//已经播放的时间
      })
      //播放过程中currentTime改变触发事件
      audio.addEventListener('timeupdate',() => {
        this.currentTime=audio.currentTime;//已经播放的时间
      })
      audio.addEventListener('ended',() => {
        this.Next();
      })
    }
}
</script>
<style>
#app .play-bottom {
  width: 100%;
  height: 1.5rem;
  background-color:rgba(5, 5, 5, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: hidden;
  transition: .3s;
  z-index: 9;
}
.play-left {
  width: 55%;
  height: 100%;
  float: left;
  overflow: hidden;
  position:relative;
  box-sizing: border-box;
  display: flex;
}
.play-left img {
  width: 1.5rem;
  float: left;
}
.play-left p {
  margin: auto 0;
  width: 60%;
  color: #fff;
  float: left;
  font-size: .35rem;
  margin-left: .1rem;
}
.play-left p span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.play-left p span:nth-child(2){
  font-size: .3rem;
}
.play-right {
  position:relative;
  float: left;
  width: 40%;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .1rem;
  height: 100%;
}
.play-right > div {
  font-size: .7rem;
  color: #fff;
}

.play-right > div:active{
  color: #e5e5e5;
}
</style>