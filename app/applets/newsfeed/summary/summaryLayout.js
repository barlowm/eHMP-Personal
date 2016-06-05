define(["app/applets/newsfeed/newsfeedUtils","app/applets/newsfeed/visitDetail/visitDetailView","hbs!app/applets/newsfeed/summary/formatDateTemplate","app/applets/newsfeed/summary/activityCell","app/applets/newsfeed/collectionHandler","app/applets/newsfeed/eventHandlers"],function(e,t,i,a,n,o){var l=[{name:"activityDateTime",label:"Date & Time",cell:"handlebars",template:i,groupable:!0,groupableOptions:{primary:!0,innerSort:"activityDateTime",groupByFunction:function(e){return e.model.get("activityDateTime")?e.model.get("activityDateTime").toString().substr(0,6):void 0},groupByRowFormatter:function(e){return moment(e,"YYYYMM").format("MMMM YYYY")}},hoverTip:"encounters_datetime"},{name:"activity",label:"Activity",cell:a,sortable:!1,hoverTip:"encounters_activity"},{name:"displayType",label:"Type",cell:"string",groupable:!0,groupableOptions:{innerSort:"activityDateTime"},hoverTip:"encounters_type"}],r=l.concat([{name:"primaryProviderDisplay",cell:"string",label:"Entered By",groupable:!0,groupableOptions:{innerSort:"activityDateTime"},hoverTip:"encounters_enteredby"},{name:"facilityName",label:"Facility",groupable:!0,groupableOptions:{innerSort:"activityDateTime"},hoverTip:"encounters_facility"}]),s=Backbone.Marionette.ItemView.extend({template:_.template("<div>A detail view for this domain is not yet implemented.</div>")}),p={immunization:"immunizations",surgery:"documents",procedure:"documents",consult:"documents",lab:"labresults_timeline_detailview"},d=function(t){return{appletConfig:{id:"newsfeed",instanceId:t},filterFields:["activityDateTimeByIso","activityDateTimeByIsoWithSlashes","activity","summary","typeDisplayName","stopCodeName","locationDisplayName","displayType","primaryProviderDisplay","facilityName"],summaryColumns:l,fullScreenColumns:r,enableModal:!0,collection:void 0,groupable:!0,onClickRow:function(t,i){i.preventDefault();var a=ADK.PatientRecordService.getCurrentPatient(),n={model:t,uid:t.get("uid"),patient:{icn:a.attributes.icn,pid:a.attributes.pid}};e.isCptProcedure(t)&&t.get("visitInfo")&&(n.channelName="visitDetail",n.model=new Backbone.Model(t.get("visitInfo"))),e.isVisit(t)&&(n.channelName="visitDetail");var o=n.uid.split(":")[2],l=p[o]||n.channelName;if(l){var r=new ADK.UI.Modal({view:ADK.Views.Loading.create(),options:{size:"large",title:"Loading..."}});r.show();var d=ADK.Messaging.getChannel(l),c=d.request("detailView",n);c.done(function(e){var t=new ADK.UI.Modal({view:e.view,options:{size:"large",title:e.title}});t.show()})}else{var m=new ADK.UI.Modal({view:new s,options:{size:"large",title:"Detail - Placeholder"}});m.show()}}}},c=ADK.AppletViews.GridView.extend({initialize:function(e){var t=e.appletType||"standard";this._super=ADK.AppletViews.GridView.prototype;var i="";"standard"===t?i="newsfeed":"gdt"===t&&(i="newsfeed-gdt");var a=d(i);a.collection=ADK.PatientRecordService.createEmptyCollection({pageable:!0}),n.queryCollection(this,void 0,a.collection),"standard"===t?this.setupGlobalDateListener():"gdt"===t&&this.setupGDTListener(),this.appletOptions=a,this._super.initialize.apply(this,arguments)},setupGlobalDateListener:function(){var e=this;this.listenTo(ADK.Messaging,"globalDate:selected",function(t){var i={};void 0!==t&&(i.isOverrideGlobalDate=!0,i.fromDate=t.get("fromDate"),i.toDate=t.get("toDate")),i.customFilter="or("+this.buildJdsDateFilter("administeredDateTime",i)+","+this.buildJdsDateFilter("observed",i)+")",i.operator="or",e.dateRangeRefresh("dateTime",i)})},setupGDTListener:function(){var e=this;this.listenTo(ADK.Messaging,"globalDate:updateTimelineSummaryViewOnly",function(t){var i={};void 0!==t&&(i.isOverrideGlobalDate=!0,i.fromDate=t.from,i.toDate=t.to),i.customFilter="or("+this.buildJdsDateFilter("administeredDateTime",i)+","+this.buildJdsDateFilter("observed",i)+")",i.operator="or",i.instanceId=e.appletOptions.instanceId,e.dateRangeRefresh("dateTime",i)})},setupCollectionHandlerListener:function(){},onRender:function(){this._super.onRender.apply(this,arguments)}});return c});