<template>
  <div class="index">
    <div v-if="item">
      <div class="toper">
        <h4 class="text-white text-center pt-5">{{header}}</h4>
        <fv-card class="item-top" :img="item.img" :header="item.name"></fv-card>
      </div>
      <b-container class="member-box">
        <b-row class="member-info">
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
        </b-row>
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
              {{m.name}}
            </div>
          </b-col>
        </b-row>
        <b-row no-gutters align-h="center">
          <b-col v-if="isShowJoin" cols="12" class="join-btn liner-color" @click="btnClick('join')">
            点击参团
          </b-col>
          <b-col v-if="isShowCreat" cols="12" class="join-btn liner-color" @click="btnClick('creat')">
            点击开团
          </b-col>
        </b-row>
        <b-row no-gutters class="btm-footer">
          <b-col cols="12" class="info-box">
            <h6>规则说明</h6>
            <p v-html="info"></p>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="text-info text-center pt-5" v-else>
      {{preText}}
    </div>
    <p class="no-info text-center">
      FooterStart CopyRight 2019©feiyang FooterEnd
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
      header: '拼团标题 & LOGO',
      item: false,
      memberInfo: false,
      info: '',
      userId: 0,
      groupId: 0,
      preText: '加载中 ...',
      isShowJoin: false,
      isShowCreat: false
    }
  },
  created(){
    this.userId = this.$route.query.user;
    this.groupId = this.$route.query.group;
    this.initUserInfo().then(()=>{
      return this.initGroup()
    }).then(()=>{
      this.initBtns()
    })
  },
  methods:{
    btnClick(){
      this.$router.push('/form/')
    },
    initGroup(id=this.groupId, isError){
      // this.axios.get('/')
      // return this.axios.get('/json/member-info.json').then(({data})=>{
      let url = isError?'/json/member-info-none.json':'/api/info/group_info/'
      return this.axios.get(url, {params:{id}}).then(({data})=>{
        console.log(data.member.list.length)
        data.member.need = data.member.maxNo - data.member.list.length
        if(data.member.list.length>0){
          for(let k=data.member.list.length; k<data.member.maxNo; k++){
            console.log(k)
            data.member.list.push({
              name: "待邀请",
              isNone: true
            })
          }
        }
        this.memberInfo = data.member
        this.item = data.item
        this.info = data.info
      }).catch(()=>{
        this.initGroup(null, true)
      })
    },
    initUserInfo(id = this.userId){
      return this.axios.get('/api/info/user_login_info/',{
        params:{id}
      })
    },
    initBtns(){
      let hasHost,
      hasEmpty,
      hasU,
      isEmpty = true;
      this.memberInfo && this.memberInfo.list.find((i)=>{
        !hasHost && (hasHost = i.isHost)
        !hasEmpty && (hasEmpty = i.isNone)
        !hasU && (hasU = i.id == this.userId)
        isEmpty && i.isNone
        // console.log(i)
        return hasHost && hasEmpty && !hasU
      });
      this.isShowJoin = hasHost && hasEmpty
      this.isShowCreat = isEmpty || hasU
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
  height: 30vh;
  background: linear-gradient(180deg, rgb(254,157,45) 0%, rgb(252, 94, 78) 100%);
  padding: 0 25px;
  position: relative;
}
.item-top{
  position: absolute;
  bottom: -50px;
  left: 25px;
  right: 25px;
}
.member-box{
  margin-top: 70px;
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
