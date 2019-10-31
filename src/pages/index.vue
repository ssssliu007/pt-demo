<template>
  <div class="index">
    <div v-if="item">
      <div class="toper" :style="{backgroundImage:schools[0] && `url(${schools[0].logo})`}">
        <!-- <h4 class="text-white text-center pt-5">{{header}}</h4> -->
      </div>
      <div class="toper-buffer"></div>
      <div class="p-2">
        <fv-card class="item-top" :img="item.index_logo" :header="item.index_name" :memberInfo="memberInfo"></fv-card>
      </div>
      <b-container class="member-box">
        <!-- <b-row class="member-info">
          <b-col v-if="memberInfo.maxNo != memberInfo.need">
            <span class="text-danger">{{memberInfo.maxNo || 0}}</span>
            <span>人成团，还差</span>
            <span class="text-danger">{{memberInfo.need || 0}}</span>
            <span>人</span>
          </b-col>
          <b-col v-else>
            <span class="text-danger">{{memberInfo.maxNo || 0}}</span>
            <span>人成团。</span>
          </b-col>
        </b-row> -->
        <b-row v-if="memberInfo && memberInfo.list[0]" class="member-list mt-3" align-h="center">
          <b-col
            v-for="(m, mno) in memberInfo.list"
            :key="mno"
            :class="{
              'is-none':m.isNone,
              'is-host':mno == 0,
            }"
            :cols="mno == 0? 12 :'auto'"
            class="member-item text-center p-0"
          >
            <div class="member-icon">
              <img class="member-icon-img" :src="m.icon||''" alt="">
              <div class="member-icon-host liner-color">团长</div>
            </div>
            <div class="member-name">
              {{m.username}}
            </div>
          </b-col>
        </b-row>
        <b-row no-gutters align-h="center">
          <b-col v-if="isShowJoin" cols="12" class="join-btn liner-color" @click="btnClick('join')">
            点击参团
          </b-col>
          <b-col v-if="isShowCreate" cols="12" class="join-btn liner-color" @click="btnClick('create')">
            点击开团
          </b-col>
        </b-row>
        <b-row no-gutters class="btm-footer">
          <b-col cols="12" class="info-box">
            <!-- <h6>规则说明</h6>
            <p v-html="info"></p> -->
            <img width="100%" :src="item.index_img" alt="">
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- <div class="text-info text-center pt-5">
      {{preText}}
    </div> -->
    <div class="pageCover" v-else>
      <div id="preloader_1" class="m-auto">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <p class="no-info text-center">
      Footerstart 2019©feiYang footerenD
    </p>
  </div>
</template>

<script>
import fvCard from '@/components/card'
export default {
  name: 'index',
  components:{
    fvCard
  },
  data() {
    return {
      // header: '',
      item: false,
      memberInfo: false,
      hostId: 0,
      groupId:0,
      userInfo: false,

      schools:[],
      preText: '加载中 ...',
      isShowJoin: false,
      isShowCreate: false,
      isOwnedGroup: false,
    }
  },
  created(){
    this.initUserInfo()
    this.initGroup().then(()=>{
      return this.initBtns()
    })
    this.initSchool()
  },
  methods:{
    btnClick(typeName){
      let type = 1,
      group = '';
      if(typeName=='join'){
        type = 3
        group = this.groupId
      }else if(typeName=='create'){
        type = 2
      }
      console.log('this.userInfo.info_complete', this.userInfo.info_complete)
      if(this.userInfo.info_complete == true){
        let query = JSON.parse(JSON.stringify(this.$route.query))
        if(typeName=='join'){
          alert('您已经参加过其他团了，请勿重复加入。')
        }else if(typeName=='create'){
          this.axios.post('/dapi/info/fill_information/', {
            type: 2,
            open_id: this.userInfo.open_id
          }).then(()=>{
            this.$router.replace({
              path:'/',
              query: query
            })
          })
        }
      }else{
        this.$router.push({
          path:'/form/',
          query:{
            host: this.hostId,
            user: this.userInfo.open_id,
            school: this.$route.query.school,
            type,
            group
          }
        })
      }
    },
    initGroup(id=this.hostId){
      // this.axios.get('/')
      // return this.axios.get('/json/member-info.json').then(({data})=>{
      // let url = isError?'/json/member-info-none.json':'/dapi/info/group_info/'
      let url = '/dapi/info/group_info/'+ id +'/';
      console.log('this', this)
      return this.axios.get(url).then(({data})=>{
        if(!data.member){
          // 没有 团信息
          data.member = {
            maxNo: 5,
            list:[]
          }
        }
        this.groupId = data.id
        if (data.member){
          data.member.need = data.member.maxNo - data.member.list.length
          if(data.member.list.length>0){
          
            if(data.member.list[0].open_id == this.userInfo.open_id){
              this.isOwnedGroup = true
            }
            for(let k=data.member.list.length; k<data.member.maxNo; k++){
              console.log(k)
              data.member.list.push({
                username: "待邀请",
                isNone: true
              })
            }
          }
          this.memberInfo = data.member
          this.item = data.item
        }
      }).catch((e)=>{
        console.log(e)
        // this.initGroup(null, true)
      })
    },
    initUserInfo(){
      let userInfo = this.$cookies.get('userInfo');
      // debugger
      if (userInfo){
        this.hostId = this.$route.query.host;
        this.userInfo = userInfo

        if(!this.hostId){
          this.hostId = this.userInfo.open_id
        }
        // if(this.$route.query.open_id){
        //   this.userData = this.$route.query
        // }else{
        //   let userData = this.$cookies.get('userData');
        //   if(typeof userData == 'string'){
        //     userData = decodeURIComponent(userData);
        //     userData = JSON.parse(userData);
        //   }
        //   this.userData = userData.open_id
        // }
        // id = this.userData.open_id
        // this.userId = id
        // console.log(this.userData)
      } else {
        // let op_id = this.$route.query.open_id
        // if(op_id){
        //   this.$cookies.set('hostId', op_id)
        // }else{
        //   this.$cookies.set('hostId', 'isNewHere')
        // }
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + [
          ['state', 'STATE'],
          ['response_type', 'code'],
          ['scope','snsapi_userinfo'],
          ['appid', 'wx18a6e8db7f409537'],
          ['redirect_uri', encodeURIComponent('http://wx.maxiaobei.cn/dapi/info/test_1/')]
        ].map(i=>i.join('=')).join('&')+'#wechat_redirect'
        // let url = `https://open.weixin.qq.com/connect/oauth2/authorize?
        // appid=wx18a6e8db7f409537&
        // redirect_uri=http%3A%2F%2Fwx.maxiaobei.cn%2Fdapi%2Finfo%2Ftest_1%2F&
        // response_type=code&
        // scope=snsapi_userinfo&
        // state=STATE#wechat_redirect`

        // history.replaceState(null, document.title, url.split('#')[0] + '#');
        // location.replace('');
        // window.location.href = url
        // this.$router.push(url)
        // window.history.pushState(url)
      }
      // if(id == this.hostId){
      //   this.isOwnedGroup = true
      // }

      // let url = '/dapi/info/user_login_info/'
      // return this.axios.get(url).then(({data})=>{
      // }).catch((e)=>{
      //   this.userData = {
      //     "icon": "http://192.168.0.119:8000/media/user/logo/2019/10/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191030173649.png",
      //     "open_id": "o3ybb1Xb6TZ_V-bobiHciUL7oltA",
      //     "username": "未見。"
      //   }
      // })
    },
    initBtns(){
      let isHost = false,
      hasEmpty = true,
      hasU = false,
      isEmpty = true;
      this.memberInfo && this.memberInfo.list.find((i)=>{
        !isHost && (isHost = i.isHost)
        !hasEmpty && (hasEmpty = i.isNone)
        !hasU && (hasU = i.open_id == this.userId)
        isEmpty && (isEmpty = i.isNone)
      });
      console.log(isHost, hasEmpty, hasU, isEmpty)
      this.isShowJoin = !isEmpty && !isHost && hasEmpty && !hasU
      this.isShowCreate = !this.isOwnedGroup && (isEmpty || hasU)
    },
    initSchool(){
      let url = '/dapi/info/school_info/',
      schoolId = this.$route.query.school
      if(schoolId){
        url+=schoolId+'/'
      }
      this.axios.get(url).then(({data})=>{
        if(schoolId){
          data = [data]
        }
        this.schools = data
        sessionStorage.setItem('school_info',JSON.stringify(data))
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index{
  min-height: 100vh;
  position: relative;
}
.toper{
  // height: 30vh;
  height: 80vw;
  background: linear-gradient(180deg, rgb(254,157,45) 0%, rgb(252, 94, 78) 100%) top center/cover;
  padding: 0 25px;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
}
.toper-buffer{
  height: 65vw;
}
// .item-top{
// }
.member-box{
  margin-top: 70px;
  padding-bottom: 50px;
  .member-info{
    text-align: center;
  }
}
.member-item{
  width: 80px;
  margin-bottom: 20px;
  .member-icon{
    height: 60px;
    width: 60px;
    background: #fafafa;
    border-radius: 50%;
    border: solid 1px #eeeeee;
    display: block;
    margin: 0 auto;
    position: relative;
    .member-icon-img{
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    .member-icon-host{
      font-size: 12px;
      color: #fff;
      display: none;
      position: absolute;
      bottom: -.3em;
      left: 50%;
      margin-left: -1.5em;
      height: 1.4em;
      line-height: 1.4;
      width: 3em;
      border-radius: 1.4em;
    }
  }
  .member-name{
    margin-top: 20px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.member-item.is-none{
  outline: none;
  .member-icon{
    border: dashed 2px #eeeeee;
  }
  .member-name{
    color: #aaa;
  }
}
.member-item.is-host{
  .member-icon-host{
    display: block!important;
  }
}
.join-btn{
  margin: 20px 25px 0 25px;
  font-size: 14px;
  color: #fff;
  height: 3em;
  line-height: 3;
  text-align: center;
  border-radius: 1.5em;
}
.join-btn:hover:active{
  opacity: .9;
}
.info-box{
  padding: 50px 25px 0px 25px;
  padding: 50px 0px 0px 0px;
  color: #888;
  line-height: 1.5;
  font-size: 12px;
}
.no-info{
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  color: #333;
  height: 1em;
  line-height: 1;
  margin: 0;
}
</style>
