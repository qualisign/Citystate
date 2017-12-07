<template>
    <div class="profile-menu">
        <el-menu style="text-align: left; border-style: solid; border-width: 2px; border-color:  #EEF1F6; height: 100%; width: 10%; border-top: 0px; border-bottom: 0px; left: 0px; top: 0px; position: absolute; background: white; z-index: 1005"  default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <h1>P</h1><!-- <icon name="bars" color=" #8391A5"></icon> -->
                </template>
                <el-menu-item-group>
                    <!--  -->
                    <template></template>
                    <span slot="title">Group One</span>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">item four</span>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><h1>O</h1></template>
                <!-- <template slot="title">                                
                     <icon name="inbox" color="#8391A5"></icon>                                
                     </template>
                     <el-menu-item :index="'2-' + index+1" v-for="(item, index) in currentuser.messages"><div @click.stop.prevent="openMessage(item)">
                     <span style="padding-right: 5px">{{ item }}</span>
                     <span style="position: absolute; right: 10px"><icon :name="item.icon"></icon></span>
                     <span style="position: absolute; right: 10px"><el-tag type="gray">1</el-tag></span>
                     </div>
                     </el-menu-item> -->
                <h1>O</h1>
                
            </el-submenu>
            <el-submenu index="3">
                <!-- <template slot="title">
                     <icon name="book" color="#8391A5"></icon>
                     </template>             -->
                <template slot="title"><h1>L</h1></template>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <h1>I</h1>
                    <!--<div @click="showPath"><icon name="road" color=" #8391A5"></icon></div>  -->
                </template>
            </el-submenu>
            <el-submenu index="5" >            
                <template slot="title">
                    <!-- <div @click="showProfile"><icon style="padding: 0px" name="id-card-o" color=" #8391A5"></icon></div> -->
                    <h1>S</h1>
                </template>
            </el-submenu>

        </el-menu>

        <profile-path :show="controls.path" :currentuser="currentuser" :userid="userid" @close="controls.path=false">
            
        </profile-path>
    </div>
    
</template>
<script>
 import Icon from 'vue-awesome/components/Icon'
 
 import ProfilePath from './ProfilePath'
 
 export default {
     name: 'profile-menu',
     props: ['currentuser', 'userid'],
     components: {
         Icon,

         ProfilePath
     },
     data(){
         return {
             isCollapse: true,
             controls: {
                 profileSetup: false,
                 path: false
             }
         }
     },
     methods: {
         openMessage: function(item){
             console.log('sending the object ' + item.obj)
             this.$emit('openmessage', item.obj)
         },
         showProfile: function(){
             console.log('clicked')
             this.controls.profileSetup=true
         },
         showPath: function(){
             console.log('clicked')
             this.controls.path=true
         }
     }
 }
</script>
<style>
 h1 {
     margin: 0px;
     padding: 0px;
     text-align: center;
     font-size: 25px;
     }
</style>
