<template>
    <div class="offer-proposal">
        <el-form>
            
            <el-form-item label="Market">
              
                <el-cascader
                    :options="offerCategories"
                    v-model="conditions.selectedCategories"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="Contract">
                <el-select v-model="conditions.selectedContract">
                    <el-option v-for="contract in contracts" :key="contract['.key']" :value="contract['.key']" :label="contract.title">
                        <span style="float: left">{{ contract.title }}</span>                        
                        <el-tooltip placement="right">
                            <div slot="content">
                                <div><h3>{{ contract.title }}</h3></div><br>
                                <div style="color: rgb(190, 190, 190)">{{  contract.selectedCategories.join('--> ') }}</div>
                                <div>{{ contract.specification.description }}</div><br>
                                <div>{{ contract.specification.feature }}</div>                                
                                <div><b>Pot</b></div><br>
                                <div>Manager: <el-tag size="small">{{ contract.pot.manager }}</el-tag></div>
                                <div>Worker: <el-tag size="small">{{ contract.pot.worker }}</el-tag></div>
                                <div>Evaluator: <el-tag size="small">{{ contract.pot.evaluator }}</el-tag></div><br>
                                <div><b>Dividends</b></div><br>
                                <div>Manager: <el-tag size="small">{{ contract.dividends.manager }}</el-tag></div>
                                <div>Worker: <el-tag size="small">{{ contract.dividends.worker }}</el-tag></div>
                                <div>Evaluator: <el-tag size="small">{{ contract.dividends.evaluator }}</el-tag></div>
                                <div>Backers: <el-tag size="small">{{ contract.dividends.backers }}</el-tag></div>
                            </div>
                            <span @click.stop.prevent="viewContract" style="float: right; color: #8492a6; font-size: 13px">view</span>
                        </el-tooltip>                        
                    </el-option>
                    <el-option>
                        
                    </el-option>
                    
                </el-select>
            </el-form-item>

        </el-form>
    </div>           
</template>
<script>
 import Categories from '../categories.js'
 import NomeConfig from '../nomeConfig.js'
 import app from '../db.js'
 var db = app.database()
 
 export default {     
     props: ['type', 'categories'],
     name: 'offer-proposal',
     introduction: "A basic example button.",
     description: "A basic button with the ability to be flat, raised, or be a primary button. Nothing super special. (I stink at writing documentation.)",
     token: `<my-button isFlat isPrimary>Button Text</my-button>`,
     props: ['opened'],
     data(){
         return {
             
             conditions: {
                 lifecycle: ['creation', 'negotiation', 'voting', 'construction', 'evaluation', 'deployment', 'destruction'],
                 cycle: 0,
                 selectedCategories: [],
                 selectedContract: '',
                 
             },
             offerCategories: Categories[0].children
         }
     },
     methods: {
         handleChange(value) {                        
             var ref = NomeConfig.getName() + '/Offers/' + this.conditions.selectedCategories.join('/') + '/contracts'
             console.log(ref)
             this.$bindAsArray('contracts', db.ref(ref))
         },
         viewContract(){
             console.log('viewContract')
         },
         contractDetails: function(contract){
             var keys=Object.keys(contract)
             var result=keys.reduce(function(val, key){
                 return val+= key + ': ' + contract[key].toString();
             }, '')
             return result
         }         
     },
     computed: {

     }
 }
</script>
<style>
 h3 {
     color: rgb(230, 150, 150);
 }
</style>
