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
            v-model="form.areas"
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
    <div v-show="isLoading" class="pageCover black">
      <div id="preloader_1" class="m-auto">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <b-modal centered id="modal-done" size="sm" title="提示">
      提交成功。
      <b-button slot="modal-footer" pill class="submit-buttom liner-color border-0" variant="danger" @click="back">返回</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'form',
  data() {
    return {
      schools: [],
      areas: [],
      // times:,
      form:{},
      phoneCk: null,
      isLoading: false,
      doneInfo: null
    }
  },
  created(){
    try {
      this.schools = JSON.parse(localStorage.getItem('school_info'))
      this.areas = this.schools.map(i=>{
          return{
            text: i.school_name,
            value: i.id
          }
        })
    } catch (error) {
      console.log(error)
    }
  },
  methods:{
    onSubmit(evt){
      evt.preventDefault()
      console.log(JSON.stringify(this.form))
      this.isLoading = true

      this.axios.post('/dapi/info/fill_information/', {
        name: this.form.name,
        grade: this.form.level,
        phone: this.form.phone,
        school: this.form.areas,
        study_time: this.form.time,
        type: this.$route.query.type,
        group: this.$route.query.group,
        open_id: this.$route.query.host
      }).then(({data})=>{
        this.doneInfoQuery = {
          group: data.group,
        }
      })

      setTimeout(() => {
        this.$bvModal.show('modal-done')
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
    },
    back(){
      this.$router.replace({path:'/',query: this.doneInfoQuery})
    }
  },
  computed:{
    times(){
      let re = this.schools[0] && this.schools.find(i=>i.id==this.form.areas)
      if(re && re.study_time && re.study_time[0]){
        re = re.study_time.map(i=>{
          return{
            text: i.time,
            value: i.id
          }
        })
      }else if(re && re.study_time && !re.study_time[0]){
        re = [{
          text:'暂无可用时段，请选择其他校区',
          value: null
        }]
      } else{
        re = [{
          text:'请先选择学校',
          value: null
        }]
      }
      console.log(re)
      return re
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.submit-buttom{
  display: block;
  width: 100%;
}
.submit-buttom:active{
  opacity: .9;
}
</style>
