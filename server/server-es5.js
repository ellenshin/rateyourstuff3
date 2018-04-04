module.exports=function(e){function t(o){if(s[o])return s[o].exports;var n=s[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var s={};return t.m=e,t.c=s,t.d=function(e,s,o){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=10)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("passport-jwt")},function(e,t,s){"use strict";var o={siteTitle:"OAuth App",dbLocation:"mongodb://localhost/oauth-app",facebookConfig:{appID:"YOUR_APP_ID",appSecret:"YOUR_APP_SECRET",callbackUrl:"http://localhost:3000/auth/login/facebook/callback"},googleConfig:{appID:"YOUR_APP_ID",appSecret:"YOUR_APP_SECRET",callbackUrl:"http://localhost:3000/auth/login/google/callback"},jwtSecret:"myLittlePony"};e.exports=o},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("passport-local")},function(e,t,s){"use strict";var o=s(0),n=s(18),a=o.Schema({email:String,reg_source:String,local:{username:String,password:String},facebook:{id:String,token:String},google:{id:String,token:String}}),r=e.exports=o.model("User",a);e.exports.createLocalUser=function(e,t){n.genSalt(10,function(s,o){n.hash(e.local.password,o,function(s,o){e.local.password=o,e.save(t)})})},e.exports.createFacebookUser=function(e,t){e.save(t)},e.exports.createGoogleUser=function(e,t){e.save(t)},e.exports.createGoogleUser=function(e,t){e.save(t)},e.exports.getUserByLocalUsername=function(e,t){var s={"local.username":e};r.findOne(s,t)},e.exports.getUserByFacebookId=function(e,t){var s={"facebook.id":e};r.findOne(s,t)},e.exports.getUserByGoogleId=function(e,t){var s={"google.id":e};r.findOne(s,t)},e.exports.getUserById=function(e,t){var s={_id:o.mongo.ObjectId(e)};r.findOne(s,t)},e.exports.comparePassword=function(e,t,s){n.compare(e,t,function(e,t){if(e)throw e;s(null,t)})}},function(e,t){e.exports=require("superagent")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,s){"use strict";var o=s(0),n=o.Schema({name:String,rating:{type:Number,default:0},user_id:o.Schema.Types.ObjectId,img_url:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNf0Teecy2bqycPmLAMFuMoOd29LRhR4kKSofmjQq5TxDIXge_xw"},made_by:{type:String,default:"Unknown"}}),a=e.exports=o.model("Tasktag",n);e.exports.createTag=function(e,t){a.create(e,t)},e.exports.updateRating=function(e,t,s){a.findByIdAndUpdate(e,{rating:t},s)},e.exports.deleteTag=function(e,t){a.findByIdAndRemove(e,t)},e.exports.getUserTags=function(e,t){var s={user_id:e};a.find(s,t)},e.exports.getStuff=function(e,t){a.find({_id:{$in:e}},t)},e.exports.deleteTagsInList=function(e,t){a.remove({_id:{$in:e}},t)},e.exports.tagExists=function(e){var t={_id:o.mongo.ObjectId(e)};a.find(t).then(function(e){return!0},function(e){return e&&console.log(e),!1})}},function(e,t,s){"use strict";var o=s(2),n=s(11),a=s(12),r=s(3),i=s(13),u=(s(14),s(0)),l=s(4),c=s(15),g=s(16);process.env.MONGOLAB_URI;u.connect(process.env.MONGOLAB_URI||o.dbLocation);var d=(u.connection,s(17)),f=s(20),m=new r;m.set("view engine","ejs"),m.set("views",c.join(__dirname,"views")),m.use(n.json()),m.use(n.urlencoded({extended:!0})),m.use(a()),m.use(r.static(c.join(__dirname,"static"))),m.use(g({secret:"supersecret",saveUninitialized:!0,resave:!0})),m.use(i({errorFormatter:function(e,t,s){for(var o=e.split("."),n=o.shift(),a=n;o.length;)a+="["+o.shift()+"]";return{param:a,msg:t,value:s}}})),m.use(l.initialize()),m.use(l.session()),m.get("*",function(e,t){return t.status(200).render("index",{markup:""})}),m.post("/testpost",function(e,t){t.status(200).json({message:"test response."})}),m.use("/auth",d),m.use("/api",f);var p=process.env.PORT||3e3;m.listen(p,function(e){return e?console.error(e):console.info("\n      Server running on http://localhost:"+p+" [production]\n      Universal rendering: "+(process.env.UNIVERSAL?"enabled":"disabled")+"\n    ")})},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("express-validator")},function(e,t){e.exports=require("mongodb")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("cookie-session")},function(e,t,s){"use strict";var o=s(2),n=s(6),a=s(7),r=s(8),i=s(4),u=s(1).Strategy,l=s(1).ExtractJwt,c=s(5).Strategy,g=(s(5).Strategy,s(5).Strategy,s(19)),d=(g.plus("v1"),g.auth.OAuth2),f=new d(o.googleConfig.appID,o.googleConfig.appSecret,o.googleConfig.callbackUrl);i.serializeUser(function(e,t){t(null,e.id)}),i.deserializeUser(function(e,t){n.getUserById(e,function(e,s){t(e,s)})}),i.use("jwt",new u({jwtFromRequest:l.fromBodyField("Authorization"),secretOrKey:o.jwtSecret},function(e,t){n.getUserById(e.id,function(e,s){return console.log("USER = "+JSON.stringify(s)),e?(console.log("Throwing error: "+e),t(e,!1)):s?t(null,s):t("You are not authorized",!1)})})),i.use("local",new c(function(e,t,s){n.getUserByLocalUsername(e,function(e,o){if(e)throw console.log("Throwing error"),e;if(!o)return s(null,!1,{message:"Unknown User"});n.comparePassword(t,o.local.password,function(e,t){if(e)throw console.log("Throwing error"),e;return t?s(null,o):s(null,!1,{message:"Invalid password"})})})}));var m=function(e,t){a.get("https://graph.facebook.com/me").query({access_token:e,fields:"name,email"}).set("Accept","application/json").end(function(s,o){!s&&o.ok||t(s);var a=o.body;n.getUserByFacebookId(a.id,function(s,o){if(s)throw console.log("Throwing error"),s;if(o)return t(null,o);var r=new n;r.email=a.email,r.name=a.name,r.reg_source="facebook",r.facebook.id=a.id,r.facebook.token=e,n.createFacebookUser(r,function(e,s){return e?t(e):t(null,r)})})})},f=function(e,t){a.get("https://www.googleapis.com/plus/v1/people/me").query({access_token:e}).set("Accept","application/json").end(function(s,o){!s&&o.ok||t(s),n.getUserByGoogleId(o.id,function(s,a){if(s)throw console.log("Throwing error"),s;if(a)return t(null,a);var r=new n;r.email=o.emails[0].value,r.name=o.displayName,r.reg_source="google",r.google.id=o.id,r.google.token=e,n.createGoogleUser(r,function(e,s){return e?t(e):t(null,r)})})})},p=s(3),b=p.Router();b.post("/login/local",function(e,t){i.authenticate("local",function(s,n,a){return s?(console.log(s),t.status(403).json({message:s})):n?void e.logIn(n,function(e){if(e)return console.log(e),t.status(403).json({message:e});var s={id:n._id},a=r.sign(s,o.jwtSecret);return t.status(200).json({message:"User has been authorized",token:a})}):t.status(401).json(a)})(e,t)}),b.post("/login/facebook",function(e,t){m(e.body.socialtoken,function(e,s,n){if(e)return console.log(e),t.status(403).json({message:e});if(!s)return t.status(401).json(n);var a={id:s._id},i=r.sign(a,o.jwtSecret);return t.status(200).json({message:"User has been authorized",token:i})})}),b.post("/login/google",function(e,t){f(e.body.socialtoken,function(e,s,n){if(e)return console.log(e),t.status(403).json({message:e});if(!s)return t.status(401).json(n);var a={id:s._id},i=r.sign(a,o.jwtSecret);return t.status(200).json({message:"User has been authorized",token:i})})}),b.post("/register/local",function(e,t){var s=e.body.firstname,o=e.body.lastname,a=e.body.email,r=e.body.username,i=e.body.password1;e.body.password2;e.checkBody("firstname","First name is required").notEmpty(),e.checkBody("lastname","Last name is required").notEmpty(),e.checkBody("email","Email name is required").notEmpty(),e.checkBody("username","Username is required").notEmpty(),e.checkBody("password1","Password is required").notEmpty(),e.checkBody("password2","Re-enter your password").notEmpty(),e.checkBody("email","Not a valid email").isEmail(),e.checkBody("password2","Passwords do not match").equals(i);var u=e.validationErrors();if(u)return t.status(403).json({message:"There was an error in the registration form",errors:u});var l=new n;l.name=s+" "+o,l.email=a,l.reg_source="local",l.local.username=r,l.local.password=i;try{n.createLocalUser(l,function(e,t){if(e)throw e;console.log("User has been created: "),console.log(t)})}catch(e){console.log(e),t.status(409).json({message:"User registration could not be fulfilled at this time"})}return t.status(200).json({message:"User registered succesfully."})}),e.exports=b},function(e,t){e.exports=require("bcrypt")},function(e,t){e.exports=require("googleapis")},function(e,t,s){"use strict";var o=(s(2),s(6),s(21)),n=s(9),a=(s(7),s(8),s(4)),r=(s(1).Strategy,s(1).ExtractJwt,s(3)),i=r.Router();i.post("/task_create",a.authenticate("jwt",{session:!1}),function(e,t){var s={};if(e.checkBody("title","Task title is required").notEmpty(),e.checkBody("tags","List of task tags is required in request").exists(),e.validationErrors()&&(s=e.validationErrors()),e.body.tags)for(var a=0;a<e.body.tags.length;a++)n.tagExists(e.body.tags[a])||(s.tags="Tag with id "+e.body.tags[a]+" does not exist in DB");if(0!==Object.keys(s).length)return t.status(400).json({message:"Unable to create task with this title and tags",errors:s});var r=e.body.title,i=e.body.tags,u=new o;u.user_id=e.user._id,u.date_created=new Date,u.title=r,u.marked_done=!1,u.tags=i,o.createTask(u,function(e,s){return e?(console.log("err = "+e),t.status(400).json({message:"Unable to insert task in DB",error:e.message})):s?t.status(200).json({message:"List created succesfully",task:s}):t.status(400).json({message:"Unable to insert task in DB"})})}),i.post("/task_toggledone",a.authenticate("jwt",{session:!1}),function(e,t){if(e.checkBody("id","Id must be a 24 byte hex string ID").isMongoId(),e.validationErrors())return t.status(400).json({message:"Unable to create task with this title and tags",errors:e.validationErrors()});e.body.id;o.toggleDone(e.body.id,function(e,s){return e?(console.log("Error on task toggle = "+e),t.status(400).json({message:"Unable to toggle task in database",error:e.message})):s?t.status(200).json({message:"Task toggled succesfully"}):t.status(400).json({message:"Unable to toggle task in database"})})}),i.post("/task_delete",a.authenticate("jwt",{session:!1}),function(e,t){if(e.checkBody("id","Id must be a 24 byte hex string ID").isMongoId(),e.validationErrors())return t.status(400).json({message:"Unable to delete task with this ID",errors:e.validationErrors()});n.deleteTagsInList(e.body.tags,function(s,n){return s?(console.log("Error on task delete = "+s),t.status(400).json({message:"1Unable to delete task in database",error:s.message})):n?void o.deleteTask(e.body.id,function(e,s){return e?(console.log("Error on task delete = "+e),t.status(400).json({message:"3Unable to delete task in database",error:e.message})):s?t.status(200).json({message:"List deleted succesfully"}):t.status(400).json({message:"4Unable to delete task in database"})}):t.status(400).json({message:"2Unable to delete task in database"})})}),i.post("/tag_newrating",a.authenticate("jwt",{session:!1}),function(e,t){n.updateRating(e.body.id,e.body.newRating,function(e,s){return e?(console.log("Error on task toggle = "+e),t.status(400).json({message:"Unable to toggle task in database",error:e.message})):s?t.status(200).json({message:"Task toggled succesfully"}):t.status(400).json({message:"Unable to toggle task in database"})})}),i.post("/task_rename",a.authenticate("jwt",{session:!1}),function(e,t){o.updateTitle(e.body.id,e.body.new_title,function(e,s){return e?(console.log("Error on task toggle = "+e),t.status(400).json({message:"Unable to toggle task in database",error:e.message})):s?t.status(200).json({message:"Task toggled succesfully"}):t.status(400).json({message:"Unable to toggle task in database"})})}),i.post("/task_getall",a.authenticate("jwt",{session:!1}),function(e,t){o.getUserTasks(e.user._id,function(e,s){return e?(console.log("Error on task getall = "+e),t.status(400).json({message:"Unable to get tasks",error:e.message})):s?t.status(200).json({message:"Tasks retrieved succesfully",tasks:s}):t.status(400).json({message:"Unable to get tasks"})})}),i.post("/tasktag_getall",a.authenticate("jwt",{session:!1}),function(e,t){n.getUserTags(e.user._id,function(e,s){return e?(console.log("Error on task getall = "+e),t.status(400).json({message:"Unable to get tags",error:e.message})):s?t.status(200).json({message:"Tags retrieved succesfully",tags:s}):t.status(400).json({message:"Unable to get tags"})})}),i.post("/tags_getbyid",a.authenticate("jwt",{session:!1}),function(e,t){var s=e.body.list_id;o.getTask(s,function(e,s){return e?(console.log("Error on task getall = "+e),t.status(400).json({message:"Unable to get tags",error:e.message})):s?void n.getStuff(s.tags,function(e,s){return e?(console.log("Error on task getall = "+e),t.status(400).json({message:"Unable to get tags",error:e.message})):s?t.status(200).json({message:"Tags retrieved succesfully",tags:s}):t.status(400).json({message:"Unable to get tags"})}):t.status(400).json({message:"Unable to get tags"})})}),i.post("/tasktag_create",a.authenticate("jwt",{session:!1}),function(e,t){if(e.checkBody("name","Tag name is required").notEmpty(),e.validationErrors())return t.status(400).json({message:"Unable to insert tag in DB",errors:e.validationErrors()});var s=new n;s.user_id=e.user._id,s.name=e.body.name,s.made_by=e.body.made_by,s.img_url=e.body.img_url;var a=e.body.list_id;n.createTag(s,function(s,n){return s?(console.log("err = "+s),t.status(400).json({message:"Unable to insert tag in DB",error:s.message})):n?(console.log("LIST ID IS",e.body.list_id),o.addStuff(a,n._id,function(e,s){return e?(console.log("Error on task toggle = "+e),t.status(400).json({message:"Unable to toggle task in database",error:e.message})):s?void 0:t.status(400).json({message:"Unable to toggle task in database"})}),t.status(200).json({message:"Tag created succesfully",tag:n})):t.status(400).json({message:"Unable to insert tag in DB"})})}),i.post("/tasktag_delete",a.authenticate("jwt",{session:!1}),function(e,t){n.deleteTag(e.body.id,function(s,n){if(s)return console.log("Error on tag delete = "+s),t.status(400).json({message:"Unable to delete tag in database",error:s.message});if(n){var a=e.body.list_id;return o.deleteStuff(a,e.body.id,function(e,s){return e?(console.log("Error on task toggle = "+e),t.status(400).json({message:"Unable to toggle task in database",error:e.message})):s?void 0:t.status(400).json({message:"Unable to toggle task in database"})}),t.status(200).json({message:"Tag deleted succesfully"})}return t.status(400).json({message:"Unable to delete tag in database"})})}),i.post("/example",a.authenticate("jwt",{session:!1}),function(e,t){console.log("Example of a protected api called"),t.status(200).json({message:"You are authorized as "+e.user.name})}),e.exports=i},function(e,t,s){"use strict";var o=(s(9),s(0)),n=o.Schema({user_id:o.Schema.Types.ObjectId,date_created:Date,title:String,marked_done:Boolean,tags:[o.Schema.Types.ObjectId]}),a=e.exports=o.model("Task",n);e.exports.createTask=function(e,t){a.create(e,t)},e.exports.deleteTask=function(e,t){a.findByIdAndRemove(e,t)},e.exports.toggleDone=function(e,t){a.findById(e,function(s,o){s&&t(s);var n=o.marked_done;a.findByIdAndUpdate(e,{marked_done:!n},t)})},e.exports.updateTitle=function(e,t,s){a.findByIdAndUpdate(e,{title:t},s)},e.exports.getTask=function(e,t){a.findById(e,t)},e.exports.addStuff=function(e,t,s){a.findById(e,function(o,n){o&&s(o);n.marked_done;a.findByIdAndUpdate(e,{$push:{tags:t}},s)})},e.exports.deleteStuff=function(e,t,s){a.findById(e,function(o,n){o&&s(o);n.marked_done;a.findByIdAndUpdate(e,{$pull:{tags:t}},s)})},e.exports.getUserTasks=function(e,t){var s={user_id:e};a.find(s,t)}}]);