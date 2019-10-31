import Vue from 'vue'
import VueCookies from 'vue-cookies'

import Router from 'vue-router'
import index from '@/pages/index'
import form from '@/pages/form'
import login from '@/pages/login'

Vue.use(VueCookies)
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      beforeEnter: (to, from, next)=>{
        let query = to.query;
        query.school && Vue.cookies.set('schoolId', query.school)
        query.host && Vue.cookies.set('hostId', query.host)
        let userInfo = Vue.cookies.get('userInfo')
        if(!query.host && userInfo.open_id){
          next({path:'/',query:{
            host: userInfo.open_id,
            school: query.school
          }})
        }else{
          next()
        }
      }
    },
    {
      path: '/form/',
      name: 'form',
      component: form
    },
    {
      path: '/login/',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next)=>{
        console.log(to)
        let query = to.query
        // query = {
        //   open_id:"o3ybb1Q-x5pLXaCdAOL8tiEbVUZk",
        //   username:"Kuukiliselessness",
        //   icon: "http%3A%2F%2Fwx.maxiaobei.cn%2Fmedia%2Flogo%2Fuser.png",
        //   info_complete: false
        // }
        query.icon = decodeURIComponent(query.icon)
        if(query.open_id){
          Vue.cookies.set('userInfo', query)
          console.log(Vue.cookies.get('userInfo') )
          let host = Vue.cookies.get('hostId') || query.open_id,
          school = Vue.cookies.get('schoolId') || '';
          next({
            path:'/',
            replace: true,
            query:{
              host,
              school
            }
          })
        }
      }
    }
  ]
  // ,beforeEach:((to, from, next)=>{
  //   if(to.name == 'index') {
  //     let schoolId = to.query.school
  //     if(schoolId){
  //       this.$cookies.set('schoolId', schoolId)
  //       next()
  //     }else{
  //       let cookiedSchoolId = this.$cookies.get('schoolId')
  //       if(cookiedSchoolId){
  //         to.query.school = cookiedSchoolId
  //         this.$cookies.remove('schoolId')
  //         next({
  //           path: '/',
  //           query: to.query
  //         })
  //       }
  //     }
  //   }
  // })
})

export default router