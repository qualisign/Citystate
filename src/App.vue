<template>
    <div id="app">
        <main>
            <div class="sidebar">                
                <div class="side-top">                    
                    <div class="top-left">
                        <div id="profile">
                            
                        </div>
                    </div>
                    <div class="wallet-container" >
                        
                        <div id="balance" style="box-shadow: 0px 1px 1px 1px rgba(32, 160, 255, 0.5); border-radius: 2px; padding: 4px; margin: 5px; min-width: 150px; color: rgb(60, 60 60)">
                                <span id="polis-coins">{{ currentUser.funds }}</span><span id="prefix-plis" style="float: right"></span>                        
                            </div>
                            <div id="balance" style="box-shadow: 0px 1px 1px 1px rgba(32, 160, 255, 0.5);  border-radius: 2px; padding: 4px; margin: 5px;  min-width: 150px; color: rgb(60, 60 60)">
                                </span><icon name="euro"></icon></span><span id="prefix-convert" style="float: right"></span>                        
                            </div>
                            <div>
                                <el-button type="text">LOAD</el-button>                       
                                <el-button type="text">EXCHANGE</el-button>                                  
                            </div>                                                  
                    </div>
                    <div class="logo-container">
                        
                        <div class="logo-left"  style="cursor: pointer" @click="controls.path=true">
                            <span><icon name="road" color="rgba(32, 160, 255, 0.6)" scale="2" ></icon></span>
                        </div>
                        <div class="logo-right"  style="cursor: pointer">
                            <span><icon name="id-card" color="rgba(32, 160, 255, 0.6)" scale="2"></icon></span>
                        </div>
                    </div>
                    <proposal                                
                        @closeproposal="resetControls"
                        :controls="controls"
                        :preset="preset"
                        :preconditions="preconditions"
                        :currentuser="currentUser"                                
                        :address="refstr"                                
                    >
                    </proposal>
                </div>
                <div class="side-bottom">
                    <div class="controls">

                        <el-tooltip position="top" content="make offer"><span :class="{'control-button': true, unavailable: !currentUser['permissions']['makeOffers']}"  size="small" @click="prepareOffer"><icon :color="currentUser['permissions']['makeOffers'] ? 'rgb(60, 60 60)' : 'rgb(200, 200, 200)'" name="qrcode"></icon></span></el-tooltip>

                        <el-tooltip position="top" content="make content"><span  :class="{'control-button': true, unavailable: !currentUser['permissions']['makeContent']}"  size="small" @click="prepareContent"><icon :color="currentUser['permissions']['makeContent'] ? 'rgb(60, 60 60)' : 'rgb(200, 200, 200)'" name="tablet"></icon></span></el-tooltip>

                        <el-tooltip content="make proposal" position="top"><span :class="{'control-button': true, unavailable: !currentUser['permissions']['makeProposals']}" @click="controls.meta=true"><icon :color="currentUser['permissions']['makeProposals'] ? 'rgb(60, 60 60)' : 'rgb(200, 200, 200)'" name="lightbulb-o"></icon></span></el-tooltip>

                        
                        
                        
                    </div>
	            <div class="category-tree">
		        <el-tree   show-checkbox                                   
                                   ref="tree"
                                   @check-change="handleNodeClick"
                                   :default-checked-keys="initialChecked"
                                   :default-expanded-keys="['Offers/', 'Content/']"
                                   style="border-width: 0px; padding-top: 10px"
                                   :data="categories"
                                   :props="defaultProps"
                                   @node-click="handleNodeClick"
                                   node-key="ref"></el-tree>
	            </div>
                </div>
            </div>

            <profile-path :show="controls.path" :currentuser="currentUser" :userid="userid" @close="controls.path=false">
                
            </profile-path>
            <profile-setup :show="controls.profileSetup" @closeprofile="controls.profileSetup=false" :currentuser="currentuser">
                
            </profile-setup>            
            <div class="results">
                <el-menu
                    style="border-width: 0px"
                    background-color="#EEF1F6"
                    text-color="#20A0FF"
                    active-text-color="#20A0FF" :default-active="'1'" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">Global</el-menu-item>                
                    <el-menu-item index="2" style="float: right" v-if="Object.keys(currentUser).length==0"><el-button type="text" @click="showSignup=true">sign up</el-button></el-menu-item>
                    <el-menu-item index="3" style="float: right" v-if="Object.keys(currentUser).length==0"><el-button plain round @click="showLogin=true">log in</el-button></el-menu-item>
                    <el-menu-item index="3" style="float: right" v-if="Object.keys(currentUser).length!=0"><el-button @click="logOut" type="text">log out</el-button></el-menu-item>
                    <el-menu-item index="4" style="float: right" v-if="Object.keys(currentUser).length!=0"><el-button @click="logOut" type="text"><icon name="settings"></icon></el-button></el-menu-item>
                    <el-menu-item index="5" style="float: right"><el-button type="text"><icon name="gear"></icon></el-button></el-menu-item>
                    <el-submenu index="6" style="float: right" >
                        <template slot="title">
                            <icon name="inbox" color="#8391A5"></icon>                                
                        </template>
                        <el-menu-item :index="'2-' + index+1" v-for="(item, index) in currentUser.messages"><div @click.stop.prevent="openMessage(item)" style="text-align: left">
                            <span style="padding-right: 5px">{{ item }}</span>
                            <span style="position: absolute; right: 10px"><icon :name="item.icon"></icon></span>
                            <span style="position: absolute; right: 10px"><el-tag type="gray">1</el-tag></span>
                        </div>
                        </el-menu-item>
                        
                    </el-submenu>
                    
                </el-menu>
                <el-tabs type="card" tab-position="right" >
                    <el-tab-pane label="User" >
                        <span slot="label"><icon name="map"></icon></span>
                        <result-card @opencard="openMessage"  :item="item" v-for="item in filteredItems">                            
                        </result-card>                        
                    </el-tab-pane>
                    <el-tab-pane label="Config">
                        <span slot="label"><icon name="list"></icon></span>                        
                    </el-tab-pane>

                </el-tabs>                
                <!-- sign up -->
                
                <router-view>
                    
                </router-view>
            </div>            
        </main>
        <el-dialog :visible ="showSignup" title="Sign Up" :before-close="closeAuthentication">
            <el-form>
                <el-form-item>
                    <el-input placeholder="email"  v-model="newUser.email" type="email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="password"  v-model="newUser.password" type="password"></el-input>
                </el-form-item>                   
                <el-button @click="addUser">sign up</el-button>
            </el-form>
        </el-dialog>
        <!-- sign in -->
        <el-dialog  :visible="showLogin" title="Log In" :before-close="closeAuthentication">
            <el-form>
                <el-form-item>
                    <el-input placeholder="email" v-model="newUser.email" type="email"></el-input>
                </el-form-item>                    
                <el-form-item>
                    <el-input placeholder="password" v-model="newUser.password" type="password"></el-input>    
                </el-form-item>                    
            </el-form>                
            <el-button @click="logIn">log in</el-button>
        </el-dialog>                    
    </div>
</template>

<script>
 import app from './db.js'
 import Proposal from './components/Proposal'
 import NomeConfig from './nomeConfig.js'
 import Icon from 'vue-awesome/components/Icon'

 import Categories from './categories.js'
 import ResultCard from './components/ResultCard'
 import ProfilePath from './components/ProfilePath'
 import ProfileSetup from './components/ProfileSetup' 
 
 var db = app.database()
 var contractProposalsRef = db.ref('contractProposals');


 //  compute the initial categories to be checked on the tree
 
 
 var initialCats = []

 function recursiveCheck(item){
     
     initialCats.push(item.ref)
     if (item.children){
         item.children.forEach(recursiveCheck)
     }                 
 }
 Categories.forEach(recursiveCheck)
 

 export default {
     components: {
         Proposal,

         ProfilePath,
	 Icon,
         ProfileSetup,         
         ResultCard
     },
     name: 'app',
     data(){
         return {
             refstr: '',
             nome: NomeConfig,             
             newUser: {
                 email: '',
                 password: '',

             },
             userid: '',
             currentUser: {
                 
             },
             userAttributes: {
                 funds: 100                
             },
             usersView: [],
             showSignup: false,
             showLogin: false,
             controls: {           
                 meta: false,
                 offer: false,
                 content: false,
                 path: false,

             },
             preconditions: {},
             preset: '',
             catstr: '',
             offers: [],
             content: [],
             metaProposals: [],
             categories: Categories,
             defaultProps: {
		 children: 'children',
		 label: 'label'
             },
             initialChecked: initialCats,
             checkedCats: initialCats,
             filteredItems: []
             
         }
     },
     watch: {
         checkedCats(val){
             
             var result=[]
             var self=this;
             val.forEach(function(cat){
                 var refstr = self.nome.getName()
                 refstr+='/'+cat
                 db.ref(refstr).child('contracts').once('value', function(snapshot){
                     if (snapshot.val()){
                         var keys = Object.keys(snapshot.val())
                         keys.forEach(function(key){
                             var obj = {}
                             var objref;
                             var item = snapshot.val()[key]
                             if (item['phase']>=2){
                                 objref = refstr + '/contracts/' + key
                                 obj['address'] = objref
                                 obj['preconditions'] = snapshot.val()[key]
                                 result.push(obj)
                                 //result.push(snapshot.val()[key])
                             }
                             else {
                                 console.log('the items phase was ' + item.phase)
                             }
                         })                         
                     }                     
                 })
             })
             this.filteredItems = result
         }
     },
     created: function(){
         var id;
         var self = this;
         app.auth().onAuthStateChanged(function(user) {             
             if (user) {
                 //id=user.uid
                 //console.log(user.uid + ' changed the user state')
                 self.updateUser(user.uid, false)
             } else {
                 // No user is signed in.
             }
         })         
         // set the standard checked categories

     },
     computed: {
	 categoryArr: function(){
	     return this.catstr.split('/')
	 },
         inboxIndex: function(){
             
         }
     },
     updated(){
         this.handleNodeClick()
     },
     methods: {
         rating(item){
             return item.upvotes - item.downvotes;
         },
	 handleNodeClick: function(data){
             console.log('som')
	     this.catstr = data.ref;
             this.checkedCats=this.$refs.tree.getCheckedKeys()
	     //this.showoffers = false;
	 },
         iconnames(item){
             switch(item.kind){
                 case 'contractProposal':
                     return ['lightbulb-o', 'object-ungroup']
             }
         },
         closeAuthentication(){
             this.showSignup=false;
             this.showLogin=false;
         },
         resetControls(){
             console.log('resetting the controls')
             var self = this;
             this.preset='contract';
             var keys = Object.keys(this.controls);
             this.refstr=''
             this.preconditions = {}
             
             keys.forEach(function(key){
                 self.controls[key]=false;
             })
         },
         openMessage(ref){
             var self=this;             
             console.log('the ref is ' + ref)
             this.refstr = ref;
             db.ref(ref).once('value', function(snapshot){
                 self.preconditions = snapshot.val()
                 self.controls.meta=true                 
             })
         },
         prepareOffer(){
             this.controls.offer = true;
             this.preset='offer'
         },
         prepareContent(){
             this.controls.content = true;
             this.preset='content'             
         },
         addMeta(meta){
             this.metaProposals.push(meta)
         },
         addUser: function(){
             var self=this;
             app.auth().createUserWithEmailAndPassword(this.newUser.email, this.newUser.password).catch(function(error) {
                 // Handle Errors here.
                 var errorCode = error.code;
                 var errorMessage = error.message;
                 // ...
             }).then(function(user){
                 console.log(user.uid)
                 self.updateUser(user.uid, true)    
             })
         },
         updateUser: function(uid, newbool, value){
             var usercount;
             var userref = this.nome.getName() + '/users/'             
             var self=this;
             var obj = {}
             var data = {}
             self.userid = uid
             if (newbool){
                 db.ref(userref).once('value', function(snapshot){
                     if (!snapshot.val()){
                         usercount=1;
                     }
                     else {
                         usercount = Object.keys(snapshot.val()).length                 
                     }                     
                     data['messages'] = ['Welcome to Citystate!']
                     data['username'] = 'user' + usercount;
                     data['paths'] = {
                         Consumer: {
                             level: 0
                         },
                         Merchant: {
                             level: 0
                         }
                     },
                     data['permissions'] = {
                         makeOffers: false,
                         acceptOffer: false
                     },
                     data['funds'] = 100
                     obj[uid] = data
                 }).then(function(){
                     db.ref(userref).update(obj).then(function(){                
                         var refStr = self.nome.getName() + '/users/' + uid;
                         console.log('looking for a user at: ' + refStr)
                         db.ref(refStr).once('value', function(subsnap){                 
                             console.log(subsnap.val())
                             self.currentUser = subsnap.val()
                         })
                     })
                 })                 
             }
             else {
                
                 db.ref(userref).child(uid).once('value', function(snapshot){
                     self.currentUser=snapshot.val()
                     if(value){
                         db.ref(userref).child(uid).update(value)
                     }
                 })
             }                         
         },
         logIn: function(){
             var self=this;
             app.auth().signInWithEmailAndPassword(this.newUser.email, this.newUser.password).catch(function(error) {
                 // Handle Errors here.
                 var errorCode = error.code;
                 var errorMessage = error.message;
                 // ...
             }).then(function(user){
                 console.log(user.uid)
                 self.updateUser(user.uid, false)    
             })
         },
         logOut: function(){
             var self=this;
             app.auth().signOut().then(function() {
                 console.log('Signed Out');
             }, function(error) {
                 console.error('Sign Out Error', error);
             }).then(function(){
                 self.currentUser={}
             })
         }
     },
     firebase (){
         return {
             contractProposals: contractProposalsRef
         }
     },         
 }
</script>

<style>

 html, body {
     height: 100%;
     margin: 0px;
 }
 
 #app {
     font-family: 'Arvo', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     

 }

 .sidebar {
     height: 100%;
     width: 37%;
     position: absolute;
     left: 0px;
 }

 .results {
     height: 100%;
     width: 63%;
     position: absolute;
     right: 0px;
     border-color: white;
     border-width: 2px;
     border-style: solid;
     border-top: 0px;
     background: rgba(255, 110, 32, 0.2);
     
 }

 .side-bottom {
     height: 63%;
     width: 100%;
     position: absolute;
     bottom: 0px;

 }

 .side-top {
     background: linear-gradient(to left, #EEF1F6, white);
     height: 37%;
     width: 100%;
     position: absolute;
     top: 0px;
 }

 
 .top-left {
     height: 100%;
     width: 63%;
     left: 0px;    
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;

 }

 .wallet-container {
     height: 63%;
     width: 37%;
     top: 0px;
     right: 0px;
     position: absolute;     
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;

     
     
 }

 .logo-container {

     height: 37%;
     width: 37%;
     position: absolute;
     right: 0px;
     bottom: 0px;
     display: flex;
     align-items: center;
     justify-content: space-around;

 }
 .logo-right: {
     position: absolute;
     height: 100%;
     width: 50%;
     right: 0px;
     border-width: 1px;
     border-color: white;
     border-style: solid;

 }
 .logo-left: {
     position: absolute;
     height: 100%;
     width: 50%;
     left: 0px;
     
 }

 .unavailable {
     background: rgba(32, 160, 255, 0.1);
     pointer-events: none;
 }
 
 .controls {
     border-style: solid;
     display: flex;
     justify-content: space-around;
     border-width: 0px;
 }

 .control-button {
     flex-grow: 1;
     border-width: 2px;
     border-left: 1px;
     border-right: 1px;
     
     border-color: #EEF1F6;
     border-style: solid;
     padding: 8px;

 }

 .control-button:hover {
     background:  #EEF1F6;
     cursor: pointer;
     border-color: #20A0FF;
 }

 .category-tree {
     border-right: 0px;
     border-top: 0px;
     border-bottom: 0px;
     border-left: 0px;
     border-color: blue;
     border-style: solid;
     text-align: left;
 }
 h1 {
     font-size: 30px;
     color: white;
     padding: 0px;
     marginn: 0px;
     text-align: center;
     -webkit-text-stroke: 1px rgba(32, 160, 255, 0.6);
 }
</style>
