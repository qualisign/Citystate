<template>
    <div class="profile-setup">
        <el-dialog :visible="show" :before-close="handleClose" fullscreen :title="currentuser.username">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item style="padding: 20px" label="USERNAME">
                            <el-input v-model="user.username" :value="currentuser.username"></el-input>
                        </el-form-item>                        
                    </el-col>
                    <el-col :span="12">
                        <el-form-item style="padding: 20px" label="LOCATION">
                            <el-input v-model="user.location"></el-input>
                        </el-form-item>                                          
                    </el-col>                    
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
 export default {
     name: 'profile-setup',
     data(){
         return {
             active: false,
             user: {
                 username: '',
                 location: ''
                 
             }                 
         }
     },
     props: ['show', 'currentuser'],
     methods: {
         handleClose(){



             this.$emit('closeprofile')
         },

     }
     
 }
</script>
<style>
 .character-button {
     height: 150px;
     width: 150px;
     padding: 20px;
     
 }
</style>
