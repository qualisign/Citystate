<template>
    <div class="meta-proposal">        
        
        <el-form-item label="Title">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="Description">
            <el-input></el-input>
        </el-form-item>        
        
    </div>
        
    
</template>
<script>

 
 export default {
     
     name: 'meta-proposal',
     introduction: "A basic example button.",
     description: "A basic button with the ability to be flat, raised, or be a primary button. Nothing super special. (I stink at writing documentation.)",
     token: `<my-button isFlat isPrimary>Button Text</my-button>`,
     props: ['opened'],
     components: {
         
     },
     data(){
         return {
             type: '',                 
             lifecycle: ['creation', 'negotiation', 'voting', 'construction', 'evaluation', 'deployment', 'destruction']
         }
     },
     computed: {
         tryKind(){
             if (this.kind){
                 return this.kind
             }
             return 'meta'
         }
     }
 }
</script>
