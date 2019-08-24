<template>
  <div ref="area" class="m-lyric-area"
    @touchstart.prevent="startHandle"
	@touchmove="moveHandle"
	@touchend="endHandle"
  >
    <div ref="lyric" class="m-lyric" :style="{top:yy+'px'}">
      <p v-for="item in rcArr" :key="item[0]"> 
		  {{item[1]}} 
	   </p>
    </div>
  </div>
</template>
<script>
import {parseLyric} from '@/utils/utils.js'
export default {
	props:{
	 rc:{ 
        type:String,
        default:''
      }
	},
	data(){
		return{
			rectY:0,
			y:0,
			minY:0,
			maxY:0 , //????

		}
	},
	computed:{
		yy(){
			if(this.y > this.maxY) this.y=this.maxY;
			if(this.y < this.minY) this.y=this.minY;
			return this.y;
		},
		rcArr(){
			if(this.rc==='') return [[0,'????']]
			return parseLyric(this.rc)
		}
	},
	methods:{
		startHandle(e){
			this.disY=e.changedTouches[0].pageY-this.$refs.lyric.offsetTop;

		},
		moveHandle(e){
			this.y=e.changedTouches[0].pageY - this.disY;

		},
		endHandle(){

		},

	},
	mounted(){
		this.minY=-(this.$refs.area.scrollHeight-this.$refs.area.clientHeight/2)

	}

}
</script>
<style>

.m-lyric-area {
	height: 58%;
	overflow: hidden;
	position: relative;
  z-index: 2;
  margin-top: .6rem;
}

.m-lyric {
	width: 100%;
	position: absolute;
	left: 0;
  top: 0;
}

.m-lyric-area p {
	text-align: center;
	line-height: 1rem;
	font-size: .3rem;
	
}


.m-lyric .bg {
	color: red;
	font-size: .4rem;
}
</style>

