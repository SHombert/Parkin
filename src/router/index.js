import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ParkingList from '../components/ParkingList.vue'
import ParkingDetail from '../components/ParkingDetail.vue'
import Map from '../components/Map.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/parkings',
    name: 'ParkingList',
    component: ParkingList
  },
   {
    path: '/parking-detail/:id',
    name: 'ParkingDetail',
    props: true,
    component: ParkingDetail
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router