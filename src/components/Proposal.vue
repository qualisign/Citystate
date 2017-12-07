<template>
    <div class="proposal" style="position: absolute; top: 50%">
        
        <el-dialog :before-close="handleClose" :visible="opened" :title="preset.toUpperCase()">                   
            <el-form>                
                <div v-if="preset==''">
                    <el-form-item>
                        <el-button @click="preset='meta'" style="width: 200px; height: 200px">
                            <icon name="object-group" scale="2"></icon><br>
                            <h2>Meta</h2>                            
                        </el-button>
                        <el-button @click="preset='contract'" style="width: 200px; height: 200px">
                            <icon name="object-ungroup" scale="2"></icon><br>
                            <h2>Contract</h2>
                        </el-button>
                    </el-form-item>
                </div>
                <meta-proposal v-if="preset==='meta'" @save="saveMeta">
                </meta-proposal>
                <contract-proposal ref="contractref" :currentuser="currentuser" :nomeconfig="nomeConfig" :categories="categories" v-if="preset==='contract'" @save="saveContract" :preconditions="preconditions" :refstr="address">
                </contract-proposal>
                <content-proposal :currentuser="currentuser" :categories="contentCategories" v-if="preset==='content'"></content-proposal>
                <offer-proposal :categories="categories[0]" v-if="preset==='offer'"></offer-proposal>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
 import MetaProposal from './MetaProposal' 
 import OfferProposal from './OfferProposal'
 import ContentProposal from './ContentProposal'
 import ContractProposal from './ContractProposal'
 import Categories from '../categories.js'
 import NomeConfig from '../nomeConfig.js'
 import Icon from 'vue-awesome/components/Icon'
 
 export default {
     name: 'proposal',
     introduction: "A basic example button.",
     description: "A basic button with the ability to be flat, raised, or be a primary button. Nothing super special. (I stink at writing documentation.)",
     token: `<my-button isFlat isPrimary>Button Text</my-button>`,
     props: ['controls', 'preset', 'preconditions', 'currentuser', 'address', 'resetdata'],
     components: {
         MetaProposal,
         OfferProposal,
         ContentProposal,
         ContractProposal,
         Icon
     },
     computed: {
         opened: function(){
             var self=this;
             var keys = Object.keys(this.controls)
             return keys.some(function(key){
                 console.log(key + ':' +  self.controls[key])
                 return self.controls[key]===true
             })
         },
         contentCategories: function(){
             var val;
             this.categories.forEach(function(cat){
                 if(cat.value==='content'){
                     val=cat
                 }
             })
             return val;
         },
         offerCategories: function(){
             var val;
             this.categories.forEach(function(cat){
                 if(cat.value==='Offers'){
                     console.log(cat + 'yeah')
                     val=cat
                 }
                 else {
                     console.log(cat + ' not an offer')
                 }
             })             
             return val;
         }
     },
     data(){
         return {             
             lifecycle: ['creation', 'negotiation', 'voting', 'construction', 'evaluation', 'deployment', 'destruction'],
             presumptions: [],
             conditions: [],
             kind: '',
	     categories: Categories,
             nomeConfig: NomeConfig,
          
         }
     },
     methods: {
         handleClose(){
             this.resetconditions = true;
             console.log('closing at proposal level')
             if (this.$refs.contractref){
                 this.$refs.contractref.resetconditions()
             }             
             this.$emit('closeproposal')
         },
         saveContract(contract){
             this.$emit('savecontract', contract)
         },
         saveMeta(){

         }
     }
 }
</script>
