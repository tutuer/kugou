<template>
  <div class="m-main" :style="{top:playTop+'rem'}">
    <mt-header class="hide-player" style="font-size:.5rem;" :title="songInfo.songName">
      <div slot="left">
        <mt-button icon="back" @touchstart.native="changetop"></mt-button>
      </div>
    </mt-header>
    <div class="bg-overlay"></div>
    <div class="play-overlay"></div>
    <lyric :rc="rc"></lyric>
    <player-control
    @prev="() =>{$emit('prev')}"
    @playorpause="() =>{$emit('playorpause')}"
    @Next="Next"
    :is-play="isplay"
    :duration="duration"
    :current-time="currentTime"
    @current="(t) =>{$emit('current',t)}"
    ></player-control>
  </div>
</template>

<script>
  import playerControl from '@/components/play-bottom/player/control-control.vue'
  import lyric from '@/components/play-bottom/player/lyric.vue'
  export default {
    props:{
      playTop:{
        type:[Number,String],
        default:15
      },
      songInfo:{
        type:Object,
        default(){
          return{}
        }
      },
      isplay:{
        type:Boolean,
        default:true
      },
      duration:{
        type:Number,
        default:0
      },
      currentTime:{
        type:Number,
        default:0
      },
      rc:{
        type:String,
        default:''
      }
    },
    components: {
      playerControl,
      lyric
    },
    methods:{
      changetop(){
        this.$emit('update:playTop',15)
      },
      Next(){
        this.$emit('Next')
      }
    }
  }
</script>

<style scoped>
.clear:after {
	display: block;
	content: "";
	clear: both;
}

.m-main {
  width: 100%;
	height: 100%;
	position: fixed;
  left: 0;
  top: 100rem;
	box-sizing: border-box;
	color: #fff;
	background: rgba(0,0,0,.6);
	z-index: 10;
	transition: .5s;
}
.bg-overlay {
	background: url(https://y.gtimg.cn/music/photo_new/T002R300x300M000003lFlWa0CwNbA.jpg?max_age=2592000) no-repeat;
	background-size: cover;
	filter: blur(10px);
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.play-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
}


#app .hide-player {
  background: rgba(255,255,255,0);
  color: #fff;
  z-index: 999;
	height: 1rem;
}
</style>

