const NewSongs = ()=>import('@/views/new-songs/new-songs')
const Rank = ()=>import('@/views/rank/rank')
const Singer = ()=>import('@/views/singers/singers')
import Nav from '@/components/nav'
export const navData=[
    {
        path: '/',
        name: 'Home',
        title:'新歌',
        components:{
          default:NewSongs,
          NavBar:Nav
        }
      },
      {
        path: '/rank',
        name: 'Rank',
        title:'排行',
        components:{
          default:Rank,
          NavBar:Nav
        }
      },
      {
        path: '/singer',
        name: 'Singer',
        title:'歌手',
        components:{
          default:Singer,
          NavBar:Nav
        }
      },
]