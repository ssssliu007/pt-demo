<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
.liner-color{
  background-image: linear-gradient(150deg, rgb(252, 40, 10) 0%, rgb(252, 40, 10) 70%, rgb(254,157,45) 100%)
}
#preloader_1{
    position:relative;
}
#preloader_1 span{
    display:block;
    left:-22px;
    bottom:0px;
    width: 9px;
    height: 5px;
    background:rgb(252, 40, 10);
    position:absolute;
    animation: preloader_1 1.5s  infinite ease-in-out;
}  
#preloader_1 span:nth-child(2){
    left:-11px;
    animation-delay: .2s;  
}
#preloader_1 span:nth-child(3){
    left:-0px;
    animation-delay: .4s;
}
#preloader_1 span:nth-child(4){
    left:11px;
    animation-delay: .6s;
}
#preloader_1 span:nth-child(5){
    left:22px;
    animation-delay: .8s;
}
@keyframes preloader_1 {
    0% {height:5px;transform:translateY(0px);background:rgb(254,157,45);}
    25% {height:30px;transform:translateY(15px);background:rgb(252, 40, 10);}
    50% {height:5px;transform:translateY(0px);background:rgb(254,157,45);}
    100% {height:5px;transform:translateY(0px);background:rgb(254,157,45);}
}
</style>
