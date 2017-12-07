<template>
    <div class="contract-proposal">
        <div v-if="conditions.phase>1">FUNDS: <el-tag kind="gray"></el-tag></div>
        <el-steps :active="conditions.phase" align-center style="padding-bottom: 20px">
            <el-step v-for="cycle in conditions.lifecycle" :title="cycle.title"></el-step>
        </el-steps>
        <el-steps></el-steps>
        <el-collapse accordion style="text-align: left; padding: 10px">
            <el-collapse-item>
                <div slot="title">
                    Categories<span>{{ conditions.selectedCategories.length==0 ? '' : ': ' + conditions.selectedCategories.join('/') }}</span>
                </div>
                <el-form-item>
                    <el-cascader
                        :disabled="conditions.phase>=2"
                        :options="categories"
                        v-model="conditions.selectedCategories"
                        :change-on-select="true"
                        expand-trigger="hover"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item>
                <div slot="title">Title<span class="title">{{ conditions.title=='' ? '' : ': ' + conditions.title }}</span></div>
                <el-form-item>
                    <el-input :disabled="conditions.phase>=2" v-model="conditions.title"></el-input>            
                </el-form-item>                
            </el-collapse-item>

            <el-collapse-item title="Specification">
                <!-- specification  -->            
                <el-form-item>
                    <el-tabs type="border-card">
                        <el-tab-pane label="Description">
                            <el-input :disabled="conditions.phase>=2" type="textarea" v-model="conditions.specification.description" ></el-input>
                        </el-tab-pane>
                        <el-tab-pane label=".feature">
                            <el-input :disabled="conditions.phase>=2" v-model="conditions.specification.feature" type="textarea"></el-input>
                        </el-tab-pane>                
                    </el-tabs>
                </el-form-item>
                
            </el-collapse-item>

            <el-collapse-item>
                <!-- roles -->
                <template slot="title">
                    <span style="padding-right: 20px">Roles</span>
                    <span style="padding-right: 20px">Manager</span>
                    <span style="padding-right: 20px">Worker</span>
                    <span style="padding-right: 20px">Evaluator</span>
                </template>
                <el-form-item>
                    <el-row :gutter="24">                        
                        <el-col :span="12">
                            <div>Worker</div>
                            <el-cascader
                                :disabled="conditions.phase>=2"
                                v-model="conditions.roles.worker.domain.value"
                                expand-trigger="hover"
                                :options="domains"
                                :show-all-levels="false"
                            ></el-cascader>
                            <el-input-number v-model="conditions.roles.worker.domain.amount"></el-input-number>
                            <div>
                                <el-select  :disabled="conditions.phase>=2" v-model="conditions.roles.worker.id">
                                    
                                    <el-option :value="user['.key']" v-for="user in users">{{ user['username'] }}</el-option>
                                </el-select>                                
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div>Evaluator</div>
                            <el-cascader
                                :disabled="conditions.phase>=2"
                                v-model="conditions.roles.evaluator.domain.value"
                                expand-trigger="hover"
                                :options="domains"
                                :show-all-levels="false"
                            ></el-cascader>
                            <el-input-number v-model="conditions.roles.evaluator.domain.amount"></el-input-number>
                            <div>
                                <el-select v-model="conditions.roles.evaluator.id">
                                    <el-option  :disabled="conditions.phase>=2" :value="user['.key']" v-for="user in users">{{ user['username'] }}</el-option>
                                </el-select>                        
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>                
            </el-collapse-item>
            <el-collapse-item title="Stakes">
                <!-- stakes -->
                <el-form-item>                    
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <div>Min</div>
                            <el-input-number  :disabled="conditions.phase>=2" v-model="conditions.stakes.min"></el-input-number>
                        </el-col>
                        <el-col :span="6">
                            <div>Max</div>
                            <el-input-number  :disabled="conditions.phase>=2" v-model="conditions.stakes.max"></el-input-number>
                        </el-col>
                        <el-col :span="6">
                            <div>Start</div>
                            <el-input-number :disabled="conditions.phase>=2" v-model="conditions.stakes.start"></el-input-number>
                        </el-col>
                        <el-col :span="6">
                            <div>Goal</div>
                            <el-input-number :disabled="conditions.phase>=2" v-model="conditions.stakes.goal"></el-input-number>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-slider
                            v-model="conditions.stakes.colony"
                            :step="100"
                            :disabled="conditions.phase>=2"
                        >
                        </el-slider>
                    </el-row>            
                </el-form-item>
                
            </el-collapse-item>

            <el-collapse-item title="Pot">
                <!-- pot -->
                <el-form-item>
                    <el-row :gutter="24">
                        <el-col :span="8">
                            Manager
                            <el-slider
                                :disabled="conditions.phase>=2"
                                v-model="conditions.pot.manager"
                                :step="100">
                            </el-slider>
                        </el-col>
                        <el-col :span="8">
                            Worker
                            <el-slider
                                :disabled="conditions.phase>=2"
                                v-model="conditions.pot.worker"
                                :step="100">
                            </el-slider>
                        </el-col>
                        <el-col :span="8">
                            Evaluator
                            <el-slider
                                :disabled="conditions.phase>=2"
                                v-model="conditions.pot.evaluator"
                                :step="100">
                            </el-slider>
                        </el-col>
                    </el-row>
                </el-form-item>                        
            </el-collapse-item>
            <el-collapse-item title="Dividends">
                <!-- dividends -->
                <el-form-item>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            Manager
                            <el-slider
                                :disabled="conditions.phase>=2"
                                v-model="conditions.dividends.manager"
                                :step="100">
                            </el-slider>
                        </el-col>
                        <el-col :span="6">
                            Worker
                            <el-slider
                                :disabled="conditions.phase>=2"
                                v-model="conditions.dividends.worker"
                                :step="100">
                            </el-slider>
                        </el-col>
                        <el-col :span="6">
                            Evaluator
                            <el-slider
                                :disabled="conditions.phase>=2"
                                v-model="conditions.dividends.evaluator"
                                :step="100">
                            </el-slider>
                        </el-col>
                        <el-col :span="6">
                            Backers
                            <el-slider
                                :disabled="conditions.phase>=2"
                                v-model="conditions.dividends.backers"
                                :step="100">
                            </el-slider>
                        </el-col>
                    </el-row> 
                </el-form-item>
                
            </el-collapse-item>
            <el-collapse-item style="pointer-events: none">
                <template slot="title">
                    <span style="color: rgb(170, 170, 170)">Crowd</span>
                </template>
                
                
            </el-collapse-item>           
            
        </el-collapse>
        
        <div slot="footer">
            <el-button v-if="conditions.phase<2 && (compareConditions || conditions.phase===0)" type="success" size="large" @click="saveContract">Submit</el-button>
            <el-button v-if="conditions.phase<2 && (compareConditions || conditions.phase===1)" type="success" size="large" @click="acceptContract">Accept</el-button>
            <el-button v-if="conditions.phase===1" type="danger">Decline</el-button>
            <el-button v-if="conditions.phase===1&&!compareConditions">Reset</el-button>
            <el-button v-if="!compareConditions && conditions.phase===1">Suggest</el-button>
            <el-button @click="voteUp" v-if="conditions.phase===2" ><icon name="thumbs-up"></icon></el-button>
            <el-button @click="voteDown" v-if="conditions.phase===2" ><icon name="thumbs-down"></icon></el-button>        
            <el-button v-if="conditions.phase===2" type="info" @click="makeContribution">Contribute <span style="color: lightblue"> {{ contribute }}</span></el-button>
            <el-input-number v-if="conditions.phase===2" v-model="contribute" controls-position="right" :min="conditions.stakes.min" :max="conditions.stakes.max"></el-input-number>
        </div>
    </div>
</template>
<script>
 import app from '../db.js'
 import domains from '../domains.js'
 import NomeConfig from '../nomeConfig.js'
 import contractConditions from './contractConditions.js'
 import Icon from 'vue-awesome/components/Icon'
 
 var db = app.database()
 export default {         
     name: 'contract-proposal',
     introduction: "A basic UI for agreeing on the conditions of a new contract creation.",
     description: "Outlines the requirements for a new contract, the roles needed to develop it, the funding of the development, and the rewards given to participants",
     token: `<my-button isFlat isPrimary>Button Text</my-button>`,

     props: ['categories', 'nomeconfig', 'preconditions', 'currentuser', 'refstr'],
     components: {
         Icon

     },
     methods: {
         makeContribution(){
             var self=this;
             app.auth().onAuthStateChanged(function(user) {
                 var id;
                 var obj = {}
                 if (user) {
                     id=user.uid
                     //console.log(user.uid + ' changed the user state')                     
                 } else {
                     id=null
                 }
                 obj['id'] = id
                 obj['contribution'] = self.contribute
                 db.ref(self.refstr).child('contributions').push(obj).then(self.checkGoal())
             })
             this.checkGoal()

         },

         checkGoal(){
             var self=this;
             var total = 0;
             var keys;
             
             db.ref(this.refstr).child('contributions').once('value', function(snapshot){
                 
                 keys = Object.keys(snapshot.val())
                 keys.forEach(function(key){
                     total+=snapshot.val()[key]['contribution']
                     
                 })
             }).then(function(){
                 var goal;                 
                 db.ref(self.refstr).child('stakes').child('goal').once('value', function(snapshot){
                     goal = snapshot.val()
                     console.log('goal is ' + goal)
                     if (total>=goal){
                         console.log('goal was achieved')
                         db.ref(self.refstr).child('phase').once('value', function(phasesnap){
                             var phase = phasesnap.val()
                             console.log(phase + ' is the current phase')
                             var nextphase = phase + 1;
                             return db.ref(self.refstr).update({ phase: nextphase})
                         })
                     }
                     else {
                         console.log('still need sum shit')
                     }
                 })                                                 
             })
             
             
         },
         resetconditions(){
             console.log('resetting the data')
             this.conditions = contractConditions;
         },
         voteDown(){
             var self=this
             
             app.auth().onAuthStateChanged(function(user) {
                 var id;
                 var obj = {}
                 if (user) {
                     id=user.uid
                     //console.log(user.uid + ' changed the user state')                     
                 } else {
                     id=null
                 }
                 obj['id'] = id
                 db.ref(self.refstr).child('downvotes').push(obj)

             })
                          
         },
         
         voteUp(){
             var self=this
             
             
             app.auth().onAuthStateChanged(function(user) {
                 var id;
                 var obj = {}
                 if (user) {
                     id=user.uid
                     //console.log(user.uid + ' changed the user state')                     
                 } else {
                     id=null
                 }
                 obj['id'] = id
                 db.ref(self.refstr).child('upvotes').push(obj)
             })            
         },
         checkTime(){
             // see if the time is up
             // destroy the proposal if a goal hasn't been reached
         },
         acceptContract(){
             var self=this;
             var contract=this.conditions;
             console.log('the ref is ' + this.refstr)
             app.auth().onAuthStateChanged(function(user) {
                 var id;
                 if (user) {
                     id=user.uid
                     //console.log(user.uid + ' changed the user state')                     
                 } else {
                     // No user is signed in.
                 }
                 // is user's id equal to either the worker or evaluator?

                 if (id===contract.roles.worker.id){
                     // updated accepted to true
                     var refstr = self.refstr + '/roles/worker'
                     console.log('will be accepting ' + refstr)
                     db.ref(refstr).update({accepted: true})
                     // see if this update means the contract was accepted by all parties
                     self.checkAccepted()
                 }
                 else if (id===contract.roles.evaluator.id){
                     
                     // update accepted to true
                     var refstr = self.refst + '/roles/evaluator'
                     console.log('will be accepting ' + refstr)
                     db.ref(refstr).update({accepted: true})
                     // see if this update means the contract was accepted by all parties                     
                     self.checkAccepted()
                 }
                 /*
                    var ref = self.nome.getName() + '/' + contract.selectedCategories.join('/') + '/contracts/'
                    console.log('the save ref will be ' + ref)
                    db.ref(ref).push(contract).then(function(snap){
                    
                    var recipients = [contract.roles.worker.id, contract.roles.evaluator.id]
                    self.sendInvitations(ref, snap.key, recipients)
                    self.incrementPhase(ref, snap.key)
                    })
                  */

                 // if 

             })
         },
         checkAccepted(){
             var self=this;
             var roles = ['worker', 'evaluator']
             if(roles.every(function(role){
                 var refstr = self.refstr + '/roles/' + role + '/accepted'
                 return db.ref(refstr).once('value', function(snapshot){
                     return snapshot.val()
                 })                 
             })){
                 self.incrementPhase()
             }
         },
         submit(){
             this.$emit('save', this.conditions)
         },
         handleClose(tag) {
             this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
         },
         showInput() {
             this.inputVisible = true;
             this.$nextTick(_ => {
                 this.$refs.saveTagInput.$refs.input.focus();
             });
         },

         handleInputConfirm() {
             let inputValue = this.inputValue;
             if (inputValue) {
                 this.dynamicTags.push(inputValue);
             }
             this.inputVisible = false;
             this.inputValue = '';
         },
         handleChange(value) {
             console.log(value);
         },
         saveContract(){
             // get save ref based on nome id and selected categories
             var contract = this.conditions
             var self = this;
             var id;
             app.auth().onAuthStateChanged(function(user) {             
                 if (user) {
                     id=user.uid
                     //console.log(user.uid + ' changed the user state')                     
                 } else {
                     // No user is signed in.
                 }
                 contract.creator = self.currentuser.username
                 contract.roles.manager.id = id;
                 var ref = self.nome.getName() + '/' + contract.selectedCategories.join('/') + '/contracts/'
                 console.log('the save ref will be ' + ref)
                 db.ref(ref).push(contract).then(function(snap){
                     
                     var recipients = [contract.roles.worker.id, contract.roles.evaluator.id]
                     self.sendInvitations(ref, snap.key, recipients)
                     self.incrementPhase(ref, snap.key)
                 })
             })
         },
         sendInvitations(refstr, key, recipients){
             var userref = this.nome.getName() + '/users'
             var message = {}
             message.read = false
             message.obj = refstr+'/'+key
             recipients.forEach(function(recipient){
                 db.ref(userref).child(recipient).child('messages').push(message)
             })
         },         
         incrementPhase(refstr, key){
             self=this;
             var ref;
             if (!refstr && !key){
                 console.log('increment called without providing arguments')
                 ref = this.refstr
             }
             else {
             
                 ref = refstr+'/'+key
             }                         
             var phase;
             db.ref(ref).once('value', function(snapshot){
                 phase = snapshot.val()['phase']
                 console.log('the phase is ' + phase)
             }).then(function(){
                 var nextPhase = phase+1
                 console.log('got right up next to it')
                 db.ref(ref).update({phase: nextPhase})
                 // if the phase is 4, begin construction
                 self.handlePhaseChange(nextPhase, ref)
             })
         },
         toInbox(cycle, ref){
             
         },
         handlePhaseChange(phase, ref){
             // perform actions based on which phase is current
             // get the users and roles
             switch(this.phase){
                 case 4:
                     this.toInbox('Build', ref)
                 case 5:
                     this.toInbox('Evaluate', ref)
                 case 6:
                     this.toInbox('Deploy', ref)
                 case 7:
                     this.toInbox('Destroy', ref)
             }

         },
         getUser(){
             
             app.auth().onAuthStateChanged(function(user) {
                 
                 if (user) {
                     return user.uid
                     //console.log(user.uid + ' changed the user state')                     
                 } else {
                     return null
                 }
                 // is user's id equal to either the worker or evaluator?
             })

         },             
     },
     computed: {
     
         compareConditions(){
             return JSON.stringify(this.preconditions)===JSON.stringify(this.conditions)
         }
     },
     created() {
         var self = this;
         var ref = db.ref(this.nomeconfig.getName() + '/users/')         
         this.$bindAsArray('users', ref)
         
         if (Object.keys(self.preconditions).length>0){             
             self.conditions = JSON.parse(JSON.stringify(self.preconditions))             
         }
         
     },
     watch: {
         preconditions(val){

             var self=this;
             if(Object.keys(val).length>0){
                 self.conditions = JSON.parse(JSON.stringify(self.preconditions))             
             }
         }
     },
     data(){
         return {
             domains: domains,
             nome: NomeConfig,
             inputValue: '',
             inputVisible: false,
             
             dynamicTags: [],
             contribute: 0,
             conditions: {
                 contributions: [],
                 kind: 'contractProposal',
                 lifecycle: [
                     {
                         title: 'Creation',
                         description: 'Define your conditions'
                     },
                     {
                         title: 'Negotiation',
                         description: 'Agree on conditions'
                     },
                     {
                         title: 'Voting',
                         description: 'Get community approval'
                     },
                     {
                         title: 'Construction',
                         description: 'Build the specification'
                     },
                     {
                         title: 'Evaluation',
                         description: 'Specification fulfilled?'
                     },

                     {
                         title: 'Deployment',
                         description: 'Deploy to blockchain'
                     },
                     {
                         title: 'Destruction',
                         description: 'Remove from results'
                     }
                 ],
                 upvotes: [],
                 downvotes: [],
                 phase: 0,
                 title: '',
                 specification: {
                     description: '',
                     feature: ''
                 },
                 roles: {
                     manager: {
                         id: 1,                                                  
                     },
                     worker: {
                         id: 0,
                         accepted: false,
                         domain: {
                             value: '',
                             amount: 0
                         }

                     },
                     evaluator: {
                         id: 0,
                         accepted: false,
                         domain: {
                             value: '',
                             amount: 0
                         }

                     }                     
                 },
                 stakes: {
                     min: 1,
                     max: 5,
                     goal: 50,
                     start: 5,
                     colony: 50,
                 },
                 pot: {
                     manager: 33,
                     worker: 33,
                     evaluator: 33
                     
                 },
                 dividends: {
                     manager: 16,
                     evaluator: 16,
                     worker: 16,
                     backers: 50
                     
                 },
                 classifiers: [],
                 prerequisites: [                     
                 ],
                 backers: [],
                 selectedCategories: [],
                 
             }
         }
     }
 }
</script>


<style>
 .title {
     color: rgb(100, 100, 100);
     font-weight: bolder
 }
</style>
