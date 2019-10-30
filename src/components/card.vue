<template>
  <b-row class="fv-card p-2">
    <b-col cols="4 px-0">
      <div class="fv-card-img" :style="{backgroundImage:`url(${img})`}"></div>
    </b-col>
    <b-col cols="8 pr-0 pl-2" class="card-right-box">
      <h4 class="fv-card-header">{{header}}</h4>
        <b-row class="member-info mt-auto" v-if="memberInfo">
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
      <!-- <b-row no-gutters class="mt-auto" align-v="end">
        <div class="prc text-danger">
          <span>￥</span>
          <span class="prc-bigger">{{priceNShow[0]}}</span>
          <span>.{{priceNShow[1]}}</span>
        </div>
        <div class="ml-2 prc2 text-muted">
          <span>￥</span>
          <span>{{priceO||'00.00'}}</span>
        </div>
      </b-row> -->
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'card',
  props: {
    header: String,
    img: String,
    priceN: String,
    priceO: String,
    memberInfo: Object
  },
  methods:{
  },
  computed: {
    priceNShow(){
      if(!this.priceN){
        return ['00','00']
      }
      let prc = this.priceN.split('.');
      if(parseInt(prc[1]) > 0){
        prc[1] = prc[1]>10? prc[1] : '0' + prc[1]
      }else{
        prc[1] = '00'
      }
      return prc
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fv-card{
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, .1) 0 3px 6px 3px;
}
.card-right-box{
  display: flex;
  flex-direction: column;
}
.fv-card-img{
  width: 100%;
  padding-top: 100%;
  background: #ececec center/cover no-repeat;
}
.fv-card-header{
  font-size: 16px;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.5em;
  max-height: 3em;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border: 0;
  outline: none;
  background: initial;
}
.prc{
  font-size: 14px;
  .prc-bigger{
    font-size: 1.6em;
    line-height: 1;
  }
}
.prc2{
  font-size: 14px;
}
</style>
