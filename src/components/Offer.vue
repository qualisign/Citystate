<template>
    <div class="offer">

        <el-select>
            <el-option>
                
            </el-option>
        </el-select>
    </div>
        
    
</template>
<script>

 export default {
     
     props: ['type'],
     name: 'offer',
     introduction: "A basic example button.",
     description: "A basic button with the ability to be flat, raised, or be a primary button. Nothing super special. (I stink at writing documentation.)",
     token: `<my-button isFlat isPrimary>Button Text</my-button>`,
     props: ['opened'],
     data(){
         return {
             lifecycle: ['creation', 'negotiation', 'voting', 'construction', 'evaluation', 'deployment', 'destruction']
         }
     }
 }
</script>
