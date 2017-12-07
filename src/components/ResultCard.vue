<template>
    <el-card class="result-card">
        <div slot="header" class="head">
            <span style="float: left"><el-tag>{{ item.preconditions.upvotes - item.preconditions.downvotes }}</el-tag></span>
            <el-button style="color: #ff6e20" type="text" @click="openCard">{{ item.preconditions.title.toUpperCase() }}</el-button>
        </div>
        <el-progress width="50" type="circle" :percentage="progress" status="exception"></el-progress>
        <div>
            {{ item.preconditions.lifecycle[item.preconditions.phase]['title'] }}           
        </div>
    </el-card>
</template>

<script>
 export default {
     name: 'result-card',
     props: ['item'],
     computed: {
         progress(){
             // deployment & destruction phases are mutually exclusive
             return this.item.preconditions.phase/6*100
         }
     },
     methods: {
         openCard(){
             this.$emit('opencard', this.item.address)
         }
     }
     
 }
</script>

<style>
 .result-card {
     max-width: 250px;
     margin: 4px;
     max-height: 200px;
 }

 
</style>
