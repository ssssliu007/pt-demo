import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import form from '@/pages/form'


Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/form',
      name: 'form',
      component: form
    }
  ],
  beforeEach:((to, from, next)=>{
    if(to.name == 'index') {
      let schoolId = to.query.school
      if(schoolId){
        this.$cookies.set('schoolId', schoolId)
        next()
      }else{
        let cookiedSchoolId = this.$cookies.get('schoolId')
        if(cookiedSchoolId){
          to.query.school = cookiedSchoolId
          this.$cookies.remove('schoolId')
          next({
            path: '/',
            query: to.query
          })
        }
      }
    }
  })
})

export default router