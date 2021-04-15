import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'
import OrderInfoPage from '@/pages/OrderInfoPage'
import NotFoundPage from '@/pages/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id'
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart'
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order'
  },
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id'
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '/404'
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
