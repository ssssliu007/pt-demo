<template>
  <div class="form">
    <b-container>
      <b-row>
        <b-col class="pt-3">
          <h4>填写资料</h4>
        </b-col>
      </b-row>
      <b-form @submit="onSubmit">
        <b-form-group label="校区" label-for="input-1">
          <b-form-select
            id="input-1"
            v-model="form.food"
            :options="areas"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          label="学生姓名"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            type="text"
            required
            placeholder="点击输入姓名"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="年级"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.level"
            type="text"
            required
            placeholder="点击输入年级"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="联系电话"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.phone"
            type="tel"
            required
            placeholder="点击输入联系电话"
            @change="isPhoneOk"
            @input="isPhoneOkI"
          ></b-form-input>
          <b-form-invalid-feedback :state="phoneCk">
            输入的联系电话不是11位，请检查是否输入正确（如果您的手机号不是11位请忽略此提示）
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          label="上课时段"
          label-for="input-5"
          description="请选择期望上课的时段"
        >
          <b-form-select
            id="input-1"
            v-model="form.time"
            :options="times"
            required
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" pill class="submit-buttom liner-color border-0" variant="danger">提交</b-button>
      </b-form>
    </b-container>
    <div v-show="isLoading" class="cover">
      <div id="preloader_1" class="m-auto">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'form',
  data() {
    return {
      areas:[
        { 
          text: '未知',
          value: 0
        },
        { 
          text: '校区1',
          value: 1
        },
        { 
          text: '校区2',
          value: 2
        },
      ],
      times:[
        { 
          text: '上午',
          value: 1
        },
        { 
          text: '下午',
          value: 2
        },
        { 
          text: '晚上',
          value: 3
        },
      ],
      form:{},
      phoneCk: null,
      isLoading: false
    }
  },
  methods:{
    onSubmit(evt){
      evt.preventDefault()
      console.log(JSON.stringify(this.form))
      this.isLoading = true
      setTimeout(() => {
        this.$router.replace('/')
      }, 1200);
    },
    isPhoneOk(e){
      if(e.length>0){
        this.phoneCk = e.length == 11
      }else if(e.length==0){
        this.phoneCk = null
      }
    },
    isPhoneOkI(e){
      if(e.length==11){
        this.phoneCk = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cover{
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .4);
}
.submit-buttom{
  display: block;
  width: 100%;
}
.submit-buttom:active{
  opacity: .9;
}
</style>
