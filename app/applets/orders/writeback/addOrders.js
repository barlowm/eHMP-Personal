define(["main/ADK","backbone","marionette","jquery","handlebars","hbs!app/applets/orders/writeback/summaryTemplate","app/applets/orders/writeback/orderCheck","app/applets/orders/writeback/writebackUtils","main/components/sign/models/signModels"],function(e,t,o,n,a,i,l,s,r){var c={control:"container",extraClasses:["row"],items:[{control:"alertBanner",name:"alertMessage",extraClasses:["alert-info"],dismissible:!0}]},d={control:"container",extraClasses:["row"],items:[{control:"alertBanner",name:"errorMessage",title:"Unable to Save Order:",type:"danger",dismissible:!1}]},m={control:"container",extraClasses:["row"],items:[{control:"container",extraClasses:["form-highlight"],items:[{control:"container",extraClasses:["col-xs-12"],items:[{control:"typeahead",name:"availableLabTests",label:"Available Lab Tests",attributeMapping:{label:"name",value:"ien"},required:!0,pickList:[]}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"select",name:"urgency",label:"Urgency",required:!0,attributeMapping:{label:"name",value:"ien"},options:[],pickList:[]}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"select",name:"collectionDateTimePicklist",label:"Collection Date/Time",attributeMapping:{label:"name",value:"code"},options:[],pickList:[]},{control:"datepicker",name:"collectionDate",label:"Collection Date/Time"},{control:"timepicker",name:"collectionTime",label:"Collection Time",srOnlyLabel:!0}]}]}]},p={control:"container",extraClasses:["row"],items:[{control:"container",extraClasses:["col-xs-6"],items:[{control:"select",name:"howOften",label:"How Often?",required:!0,attributeMapping:{label:"name",value:"code"},options:[],pickList:[]}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"input",name:"howLong",label:"How Long?",title:'Enter a number of days, or an "X" followed by a number of times.',disabled:!0}]},{control:"container",extraClasses:["col-xs-6"]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"select",name:"collectionSample",label:"Collection Sample",required:!0,attributeMapping:{label:"name",value:"ien"},options:[],pickList:[]}]},{control:"container",extraClasses:["col-xs-6","hidden","otherCollectionSampleContainer"]},{control:"container",extraClasses:["col-xs-6","hidden","otherCollectionSampleContainer"],items:[{control:"typeahead",name:"otherCollectionSample",label:"Select Other Collection Sample",attributeMapping:{label:"name",value:"ien"},options:[],pickList:[]}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"select",name:"collectionType",label:"Collection Type",required:!0,attributeMapping:{label:"name",value:"code"},options:[],pickList:[]}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"select",name:"specimen",label:"Specimen",required:!0,attributeMapping:{label:"name",value:"ien"},options:[],pickList:[]}]},{control:"container",extraClasses:["col-xs-6"]},{control:"container",extraClasses:["col-xs-6","hidden","otherSpecimenContainer"],items:[{control:"typeahead",name:"otherSpecimen",label:"Select Other Specimen",attributeMapping:{label:"name",value:"ien"},options:[],pickList:[]}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"input",name:"anticoagulant",label:"What Kind of anticoagulant is the patient on?"}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"input",name:"orderComment",label:"Enter order comment:"}]},{control:"container",extraClasses:["col-xs-6","sampleDrawnAtContainer"],items:[{control:"radio",name:"sampleDrawnAt",label:"Sampe drawn at:",options:[{label:"Peak",value:"~Dose is expected to be at &PEAK level."},{label:"Trough",value:"~Dose is expected to be at &TROUGH level."},{label:"Mid",value:"~Dose is expected to be at &MID level."},{label:"Unknown",value:"~Dose is expected to be at &UNKNOWN level."}]}]},{control:"container",extraClasses:["col-xs-6"]},{control:"container",extraClasses:["col-xs-6","doseContainer"],items:[{control:"datepicker",name:"doseDate",label:"Enter the last dose date/time:"},{control:"timepicker",name:"doseTime",label:"",srOnlyLabel:!0,options:{defaultTime:"00:00"}}]},{control:"container",extraClasses:["col-xs-6","drawContainer"],items:[{control:"datepicker",name:"drawDate",label:"Enter draw date/time:"},{control:"timepicker",label:"",name:"drawTime",srOnlyLabel:!0,options:{defaultTime:"00:00"}}]},{control:"container",extraClasses:["col-xs-12","additionalCommentsContainer"],items:[{control:"textarea",name:"additionalComments",label:"Additional Comments",rows:3}]},{control:"container",extraClasses:["col-xs-12","immediateCollectionContainer"],items:[{control:"fieldset",legend:"Immediate Collection Times",items:[{control:"container",extraClasses:["well"],items:[{control:"container",extraClasses:["row"],items:[{control:"container",extraClasses:["col-xs-12"],template:a.compile("{{#each immediateCollection}}{{this}}<br />{{/each}}<br />"),modelListeners:["immediateCollection"]}]},{control:"container",extraClasses:["row"],items:[{control:"container",extraClasses:["col-xs-6"],items:[{control:"datepicker",label:"Date Taken",name:"immediateCollectionDate"}]},{control:"container",extraClasses:["col-xs-6"],items:[{control:"timepicker",label:"Time Taken",name:"immediateCollectionTime"}]}]}]}]}]},{control:"container",extraClasses:["col-xs-12","futureLabCollectTimesContainer"],items:[{control:"fieldset",legend:"Future Lab Collect Times",items:[{control:"container",extraClasses:["well"],items:[{control:"container",extraClasses:["row"],items:[{control:"container",extraClasses:["col-xs-6"],items:[{control:"datepicker",label:"Select a date and a routine lab collect time for that date.",name:"futureLabCollectDate"}]}]},{control:"container",extraClasses:["row"],items:[{control:"select",extraClasses:["col-xs-6"],name:"futureLabCollectTime",label:"Collect Time",pickList:[]}]},{control:"container",extraClasses:["row"],items:[{control:"container",extraClasses:["col-xs-12"],template:a.compile("{{futureLabCollectErrorMessage}}"),modelListeners:["futureLabCollectErrorMessage"]},{control:"container",extraClasses:["col-xs-12","text-left","futureLabCollectInProgress"],template:a.compile('<p><i class="fa fa-spinner fa-spin"></i> Loading...</p>')}]}]}]}]}]},h={control:"container",template:i,modelListeners:["availableLabTests","urgencyText","collectionSampleText","collectionType","specimenText","howOftenText","sampleDrawnAt","additionalComments","anticoagulant","orderComment","doseDate","doseTime","drawDate","drawTime","immediateCollectErrorMessage"],extraClasses:["order-preview"]},u=[{control:"container",extraClasses:["modal-body"],items:[{control:"container",extraClasses:["container-fluid"],items:[d,c,m,p,h]}]},{control:"container",extraClasses:["modal-footer"],items:[{control:"container",extraClasses:["row","col-xs-12"],items:[{control:"container",extraClasses:["col-xs-4","text-left"],template:a.compile('<p><span id="observation-saved-at3">{{savedTime}}</span></p>'),modelListeners:["savedTime"]},{control:"container",extraClasses:["col-xs-4"],items:[{control:"container",extraClasses:["col-xs-12","text-left","inProgressContainer","hidden"],template:a.compile('<h5><i class="fa fa-spinner fa-spin"></i> {{inProgressMessage}}</h5>'),modelListeners:["inProgressMessage"]}]},{control:"container",extraClasses:["col-xs-1","cancelBtnContainer","text-right"],items:[{control:"button",id:"form-close-btn",extraClasses:["btn-primary","btn-sm"],title:"Cancel",label:"Cancel",type:"button",icon:"fa-times",name:"cancel"}]},{control:"container",extraClasses:["col-xs-3","acceptDrpDwnContainer","text-right"],items:[{control:"dropdown",split:!0,id:"acceptDrpDwnContainer",name:"acceptDrpDwnContainer",extraClasses:["dropup","btn-sm"],disabled:!0,label:"Accept & Add Another",type:"submit",items:[{label:"Accept & Add Another",id:"accept-add",extraClasses:[]},{label:"Accept",id:"accept",extraClasses:[]}]}]}]}]}],C=(t.Marionette.ItemView.extend({template:a.compile('{{ui-button "Cancel" title="Click button to cancel your action!"}}'),events:{click:function(){e.UI.Alert.hide()}},tagName:"span"}),t.Marionette.ItemView.extend({template:a.compile('{{ui-button "Continue" classes="btn-success" title="Click button to continue your action!"}}'),events:{click:function(){e.UI.Alert.hide(),e.UI.Workflow.hide()}},tagName:"span"}),t.Model.extend({defaults:{additionalComments:"",alertMessage:"",anticoagulant:"",availableLabTests:"",acceptDrpDwnContainer:"",collectionDateTime:"",collectionSample:"",collectionType:"",doneDate:"",drawTime:"",howLong:"",howOften:"",sampleDrawnAt:"",savedTime:"00:00",specimen:"",theoSection:"",urgency:""}})),g=(t.Marionette.ItemView.extend({template:a.compile("You will lose all work in progress if you delete this lab order. Would you like to proceed?"),tagName:"p"}),t.Marionette.ItemView.extend({template:a.compile("You will lose all work in progress if you close this lab order. Would you like to proceed?"),tagName:"p"})),b=t.Marionette.ItemView.extend({template:a.compile('{{ui-button "Cancel" classes="btn-default" title="Click button to cancel your action!"}}{{ui-button "Continue" classes="btn-primary" title="Click button to continue your action!"}}'),events:{"click .btn-primary":function(){e.UI.Alert.hide(),e.UI.Workflow.hide()},"click .btn-default":function(){e.UI.Alert.hide()}},tagName:"span"}),w=e.UI.Form.extend({model:C,ui:{inProgressContainer:".inProgressContainer",availableLabTests:".availableLabTests",urgency:".urgency",howOften:".howOften",howLong:".howLong",collectionType:".collectionType",collectionDateTimePicklist:".collectionDateTimePicklist",collectionDate:".collectionDate",collectionTime:".collectionTime",specimen:".specimen",otherSpecimen:".otherSpecimen",otherSpecimenContainer:".otherSpecimenContainer",collectionSample:".collectionSample",otherCollectionSample:".otherCollectionSample",otherCollectionSampleContainer:".otherCollectionSampleContainer",anticoagulant:".anticoagulant",sampleDrawnAt:".sampleDrawnAt",sampleDrawnAtContainer:".sampleDrawnAtContainer",additionalComments:".additionalComments",additionalCommentsContainer:".additionalCommentsContainer",orderComment:".orderComment",doseContainer:".doseContainer",drawContainer:".drawContainer",doseDate:".doseDate",doseTime:".doseTime",drawDate:".drawDate",drawTime:".drawTime",immediateCollectionContainer:".immediateCollectionContainer",immediateCollection:".immediateCollection",immediateCollectionDate:".immediateCollectionDate",immediateCollectionTime:".immediateCollectionTime",futureLabCollectTimesContainer:".futureLabCollectTimesContainer",futureLabCollectDate:".futureLabCollectDate",futureLabCollectTime:".futureLabCollectTime",futureLabCollectInProgress:".futureLabCollectInProgress",acceptDrpDwnContainer:".acceptDrpDwnContainer",cancelBtnContainer:".cancelBtnContainer"},isValid:function(){this.model.unset("errorMessage");var e=!0;if("SP"===this.model.get("collectionType")||"WC"===this.model.get("collectionType")){var t=new Date(this.model.get("collectionDate")+" "+this.model.get("collectionTime")),o=new Date(moment().format("MM/DD/YYYY HH:mm"));"TODAY"!==this.model.get("collectionDateTime")&&o>t&&(this.model.set("errorMessage","[Collection Date Time] - Collection times in the past are not allowed"),e=!1)}if("I"===this.model.get("collectionType")&&void 0===this.model.get("immediateCollectionDate")&&(this.model.set("errorMessage","[Immediate Collection Times] - Date is required"),e=!1),void 0!==this.model.get("howLong")&&""!==this.model.get("howLong")){var n=this.model.get("howLong").toLowerCase().replace("x","");(n!=parseInt(n)||parseInt(n)<=0)&&(this.model.set("errorMessage",'[How Long] - For continuous orders, enter a number of days, or an "X" followed by a number of times.'),e=!1)}return"DOSE/DRAW TIMES"===this.model.get("reqCom")&&void 0===this.model.get("doseDate")&&void 0===this.model.get("drawDate")&&(this.model.set("errorMessage","[Dose/Draw Date] - DOSE or DRAW times are required for this order"),e=!1),e},fields:u,onRender:function(){if(this.hideAll(),s.disableAllFields(this,!0),this.$(".acceptDrpDwnContainer").find("button").attr("disabled",!0).addClass("disabled"),this.$(".collectionDateTimePicklist").trigger("control:hidden",!0),this.model.set("acceptDrpDwnContainer","Accept"),s.retrieveAllCollectionSamples(this),s.retrieveAllSpecimens(this),this.model.orderModel){var e=this.model.orderModel.get("orderNumber")+";1";this.model.set("orderId",e)}s.retrieveOrderableItems(this),s.retrieveCollectionTypesUrgencyAndSchedules(this),s.retrieveImmediateCollection(this),this.model.get("orderId")?(this.showInProgress("Loading..."),s.retrieveExisting(this)):s.setInitialCollectionDateTimeValues(this)},events:{"click #acceptDrpDwnContainer-accept":function(e){n("#acceptDrpDwnContainer").text("Accept")},"click #acceptDrpDwnContainer-accept-sign":function(e){n("#acceptDrpDwnContainer").text("Accept & Sign")},"click #acceptDrpDwnContainer-accept-add":function(e){n("#acceptDrpDwnContainer").text("Accept & Add Another")},"click #form-close-btn":function(t){t.preventDefault();var o=new e.UI.Alert({title:"Are you sure you want to close this form?",icon:"fa-exclamation-triangle",messageView:g,footerView:b});o.show()},submit:function(o){o.preventDefault();var i=this,r=i.model.get("componentList");i.model.set("componentList",{});var c={error:function(o,n){var l=JSON.parse(n.responseText).message;if(l){var c=t.Marionette.ItemView.extend({template:a.compile('<span class="col-sm-12 alert alert-danger">{{message}}</span>'),model:new t.Model({message:l})}),d=new e.UI.Alert({title:"Unable To Lock",messageView:c,footerView:t.Marionette.ItemView.extend({template:a.compile('{{ui-button "OK" classes="btn-primary" title="Click button to continue."}}'),tagName:"span",events:{"click .btn-primary":function(){e.UI.Alert.hide(),e.UI.Workflow.hide()}}})});d.show()}o.set("componentList",r),console.log("Failed to accept lab order: "+JSON.stringify(n)),o.set("formStatus",{status:"error",message:"Failed to accept lab order: "+n.responseText}),s.disableAllFields(i,!1),i.hideInProgress(),i.$(i.ui.cancelBtnContainer).find("button").attr("disabled",!1).removeClass("disabled")},success:function(o,d){o.set("componentList",r),console.log("Successfully accepted lab order: "+JSON.stringify(d)),console.log(JSON.parse(d.data.data)),s.disableAllFields(i,!1),i.hideInProgress(),i.$(i.ui.cancelBtnContainer).find("button").attr("disabled",!1).removeClass("disabled");var m=t.Model.extend({}),p=new m({}),h=[JSON.parse(d.data.data)];if(h[0].orderCheckList){var u=_.map(h,function(e,t){var o=e.orderCheckList.length;return _.map(e.orderCheckList,function(e,t){return"(".concat(t+1).concat(" of ").concat(o).concat(") ").concat(e.orderCheck.split("^")[3])})});if(u[0].length>0){var C=t.Marionette.ItemView.extend({template:a.compile('{{ui-button "Accept Order(s)" classes="btn-primary btn-sm" title="Click button to continue your action!"}}{{ui-button "Return to Order(s)" classes="btn-danger btn-sm" title="Click button to cancel your action!"}}'),events:{"click .btn-primary":function(){e.UI.Modal.hide(),o.set("orderCheckList",h[0].orderCheckList),s.save(o,c)},"click .btn-danger":function(){e.UI.Modal.hide(),e.UI.Workflow.hide()}},tagName:"span"}),g={title:"Order Checks",size:"medium",backdrop:!0,keyboard:!0,callShow:!0,footerView:C},b=t.Model.extend({defaults:{orderCheckResponse:u[0]}}),w=new l({model:new b}),f=new e.UI.Modal({view:w,options:g});f.show()}}else{p.set("items",h);var x=function(){var e=new Date,t="",o="";return t=e.getHours()<10?"0"+e.getHours():e.getHours(),o=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),t+":"+o};o.set("savedTime","Accepted at "+x());var D=new e.UI.Alert({title:"Lab Order Accepted",icon:"fa-exclamation-triangle",messageView:t.Marionette.ItemView.extend({template:a.compile("Lab order successfully accepted with no errors."),tagName:"p"}),footerView:t.Marionette.ItemView.extend({template:a.compile('{{ui-button "Continue" classes="btn-primary" title="Click button to continue."}}'),events:{"click .btn-primary":function(t){t.preventDefault(),s.resetForm(i),o.unset("availableLabTests"),e.UI.Alert.hide(),e.UI.Workflow.hide()}},tagName:"span"})}),v=new e.UI.Alert({title:"Lab Order Accepted",icon:"fa-exclamation-triangle",messageView:t.Marionette.ItemView.extend({template:a.compile("Lab order successfully accepted with no errors."),tagName:"p"}),footerView:t.Marionette.ItemView.extend({template:a.compile('{{ui-button "Continue" classes="btn-primary" title="Click button to continue."}}'),events:{"click .btn-primary":function(t){t.preventDefault(),s.resetForm(i),o.unset("availableLabTests"),e.UI.Alert.hide(),s.resetForm()}},tagName:"span"})});"Accept"===n("#acceptDrpDwnContainer").text()?D.show():"Accept & Sign"===n("#acceptDrpDwnContainer").text()?(e.UI.Workflow.hide(),e.SignApi.sign(p,function(e){console.log(h)}),event.preventDefault(),event.stopImmediatePropagation()):v.show(),n('div[data-appletid="orders"] .applet-refresh-button').trigger("click")}}};e.PatientRecordService.getCurrentPatient().get("visit");return this.model.unset("errorMessage"),this.model.set("immediateCollectionIsComplete",!0),this.model.set("howLongIsComplete",!0),this.isValid()&&(s.disableAllFields(this,!0),this.showInProgress("Validating..."),this.$(".inProgressContainer").removeClass("hidden"),this.$(".acceptDrpDwnContainer").find("button").attr("disabled",!0).addClass("disabled"),this.$(".cancelBtnContainer").find("button").attr("disabled",!0).addClass("disabled"),"I"===this.model.get("collectionType")&&(this.model.set("immediateCollectionIsComplete",!1),s.validateImmediateCollectDateTime(this)),void 0!==this.model.get("howLong")&&(this.model.set("howLongIsComplete",!1),s.validateHowLong(this)),this.checkServerSideValidations(c)),!1}},checkServerSideValidations:function(e){var t=this;setTimeout(function(){var o=t.model.get("errorMessage"),n=t.model.get("immediateCollectionIsComplete"),a=t.model.get("howLongIsComplete");n===!0&&a===!0?void 0===o?t.proceedToSave(e):(s.disableAllFields(t,!1),t.hideInProgress(),t.$(".acceptDrpDwnContainer").find("button").attr("disabled",!1).removeClass("disabled"),t.$(".cancelBtnContainer").find("button").attr("disabled",!1).removeClass("disabled")):t.checkServerSideValidations(e)},200)},proceedToSave:function(t){this.showInProgress("Saving..."),console.log("Proceed to save lab orders");var o=e.PatientRecordService.getCurrentPatient(),n=o.get("localId"),a=o.get("uid"),i=e.UserService.getUserSession(),l=i.get("site"),r=i.get("duz")[l];this.model.set("pid",o.get("pid")),this.model.set("dfn",n),this.model.set("provider",r),this.model.set("orderDialog","LR OTHER LAB TESTS"),this.model.set("quickOrderDialog","2"),this.model.set("displayGroup","6"),this.model.set("inputList",s.generateInputList(this.model)),this.model.set("commentList",s.generateCommentList(this)),this.model.set("localId",n),this.model.set("uid",a),this.model.set("kind","Laboratory"),s.save(this.model,t),this.model.unset("formStatus")},hideAll:function(){this.$(".anticoagulant").trigger("control:hidden",!0),this.$(".sampleDrawnAtContainer").trigger("control:hidden",!0),this.$(".additionalCommentsContainer").trigger("control:hidden",!0),this.$(".orderComment").trigger("control:hidden",!0),this.$(".doseContainer").trigger("control:hidden",!0),this.$(".drawContainer").trigger("control:hidden",!0),this.$(".immediateCollectionContainer").trigger("control:hidden",!0),this.$(".futureLabCollectTimesContainer").trigger("control:hidden",!0),this.$(".otherSpecimenContainer").addClass("hidden"),this.$(".otherCollectionSampleContainer").addClass("hidden")},showInProgress:function(e){this.model.set("inProgressMessage",e),this.$(".inProgressContainer").removeClass("hidden")},hideInProgress:function(){this.$(".inProgressContainer").addClass("hidden"),this.model.unset("inProgressMessage")},modelEvents:{"change:sampleDrawnAt":function(e){s.handleSampleDrawnAt(this)},"change:anticoagulant":function(e){s.handleAnticoagulant(this)},"change:orderComment":function(e){s.handleOrderComment(this)},"change:doseDate":function(e){s.handleDoseDrawTimes(this),s.handleDoseDate(this)},"change:doseTime":function(e){s.handleDoseDrawTimes(this),s.handleDoseTime(this)},"change:drawDate":function(e){s.handleDoseDrawTimes(this),s.handleDrawDate(this)},"change:drawTime":function(e){s.handleDoseDrawTimes(this),s.handleDrawTime(this)},"change:futureLabCollectDate":function(e){s.handleFutureLabCollectDate(this)},"change:urgency":function(e){s.handleUrgency(this)},"change:specimen":function(e){s.handleSpecimen(this)},"change:otherSpecimen":function(e){s.handleSpecimen(this)},"change:howOften":function(e){s.handleHowOften(this)},"change:collectionType":function(e){s.handleCollectionType(this)},"change:collectionDate":function(e){s.handleCollectionDateTime(this)},"change:collectionTime":function(e){s.handleCollectionDateTime(this)},"change:collectionDateTimePicklist":function(e){s.handleCollectionDateTimePicklist(this)},"change:collectionSample":function(e){s.handleCollectionSample(this)},"change:otherCollectionSample":function(e){s.updateCollectionSampleText(this)},"change:availableLabTests":function(t){var o=t.get("availableLabTests");""!==o&&o!==n("#availableLabTests").val()&&(this.showInProgress("Loading..."),s.resetForm(this),this.model.set("location",e.PatientRecordService.getCurrentPatient().get("visit").localId),void 0===this.model.get("howOftenAlwaysDisabled")&&s.retrieveMaxDays(this),s.retrieveOrderableItemLoad(this,o))}}});return w});