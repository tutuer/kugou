import Vue from 'vue'
import Router from 'vue-router'
import{navData} from '@/router/nav'
import Search from '@/views/search/search'
import SingerList from '@/views/singers/singer-list'
import SingerInfo from '@/views/singers/singer-info'
import GotoBack from '@/components/gotoBack/gotoback'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    ...navData,
    {
      path:'/search',
      name:'Search',
      components:{
        default:Search,
        NavBar:GotoBack
      }
    },
    {
      path:'/singer/list/:id',
      name:'Singer-list',
      components:{
        default:SingerList,
        NavBar:GotoBack
      }
    },
    {
      path:'/singer/info/:id',
      name:'singer_songs',
      components:{
        default:SingerInfo,
        NavBar:GotoBack
      }
    }
  ]
})
