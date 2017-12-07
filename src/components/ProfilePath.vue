<template>
    <div class="profile-path">
        <el-dialog fullscreen :visible.sync="show" :before-close="close" title="PATHS">
            <div v-if="Object.keys(selectedPath).length>0">
                <el-dialog :visible.sync="Object.keys(selectedPath).length>0" append-to-body :before-close="closeOuter" :title="selectedPath.name">
                    <template slot="header"></template>
                    
                    <el-steps :active="pathIndex" finish-status="success" align-center>
                        <el-step v-for="step in character.steps" :title="step.instructions">                        
                        </el-step>
                    </el-steps>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="closeOuter">Cancel</el-button>
                        <el-tooltip :content="prereqTip"><el-button :disabled="!checkPrerequisites" type="primary" @click="takePath">Take Path</el-button></el-tooltip>
                    </div>
                </el-dialog>
            </div>
            <div v-for="character in characters" :key="character.name" @click="selectedPath=character" style="    display:inline-block;">
                <el-card style="width: 250px; height: 350px; margin: 5px">
                    <span v-if="character.visible"><h3>{{ character.name }}</h3></span><span v-else><h3>?</h3></span>
                    <div >
                        <el-row>
                            <div style="padding: 20px">
                                {{ character.description }}
                            </div>
                            <div style="padding: 20px">
                                <el-tag v-for="req in character.prerequisites">{{ req }}</el-tag>
                            </div>
                        </el-row>                                
                    </div>
                </el-card>
            </div>
            


            
        </el-dialog>
    </div>
</template>

<script>
 import app from '../db.js'
 import Icon from 'vue-awesome/components/Icon' 
 import characters from '../characters.js'

 var db = app.database()
 
 export default {
     props: ['show', 'currentuser', 'userid'],
     name: 'profile-path',
     components: {
         Icon
     },
     data(){
         return {
             characters: characters,
             activeItem: 0,
             selectedPath: {},
             stepIndex: 1,
         }
     },
     methods: {
         close(){
             this.$emit('close')
         },
         closeOuter(){
             this.selectedPath = {}
         },
         handleChange(item){
             console.log('changed')
             this.activeItem = item;
         },
         showPath(char){
             
         },
         addPermission(){
             var index;
             var self=this;
             console.log(self.currentuser.username + ' will be adding ' + self.selectedPath['name'])
             try {
                 index = self.currentuser.paths[self.selectedPath['name']]['level']
                 console.log('level is ' + index)
             }
             catch(err){
                 index=0
             }             
             var nextPermission=this.selectedPath['steps'][index]['permission']
             var self=this;
             var permissions;           
             var val;
             db.ref('Global/users').child(self.userid).once('value', function(snapshot){
                 
                 try {
                     var obj = val = snapshot.val()
                     val = obj['permissions']
                     console.log(val)
                 }
                 catch(err){
                     console.log('no permissions found')
                     val = {}
                 }
                 val[nextPermission] = true;
                 
             }).then(function(){
                 
                 db.ref('Global/users').child(self.userid).update({permissions: val})
             })
         },
         takePath(){
             
             this.addPermission()
         },  
     },
     computed: {
         prereqTip(){
             if (this.checkPrerequisites){
                 return 'yes'
             }
             return 'Prerequisites not met.'
         },
         pathIndex(){             
             var self=this
             if (Object.keys(self.selectedPath).length>0){
                 
                 try {
                     return self.currentuser.paths[self.selectedPath['name']]['level']
                 }
                 catch(err){
                     return 0
                 }
             }
             return 0
         },
         checkPrerequisites(){             
             var self = this;
             
             // true == enabled , false == disabled             
             if(Object.keys(self.selectedPath).length>0){
                 console.log(self.selectedPath['prerequisites'])
                 var permissions = Object.keys(self.currentuser['permissions']).map(function(key){
                     if (self.currentuser['permissions'][key]){
                         return key
                     }
                 })
                 console.log(permissions + ' are the perms')

                 return self.selectedPath.prerequisites.every(function(prereq){
                     console.log('hi')
                     console.log('checking this out: ' + prereq.value)
                     
                     if (prereq.kind==='permission'){
                         console.log('permissions being checked: ' + prereq['value'])
                         
                         return permissions.indexOf(prereq['value'])>-1
                     }
                     return true
                 })
                 return true
                 
             }
         }                
     }

 }
</script>
<style>
 
 .el-carousel__item h3 {
     color: #475669;
     font-size: 20px;
     opacity: 0.75;
     line-height: 200px;
     margin: 0;
 }

 .el-carousel__item h3:hover {
     color: white;
     
     
 }
 

 .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
 }

 .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
 } 
</style>
