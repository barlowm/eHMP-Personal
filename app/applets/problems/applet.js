define(["backbone","app/applets/problems/modalView/modalView","app/applets/problems/modalView/modalHeaderView","app/applets/problems/modalView/modalFooterView","hbs!app/applets/problems/list/severityTemplate","hbs!app/applets/problems/list/commentTemplate","app/applets/problems/util","hbs!app/applets/problems/list/tooltip","app/applets/problems/gistView","app/applets/problems_add_edit/deleteModalView"],function(e,t,i,o,a,l,n,r,s,p){"use strict";var d=ADK.Messaging.getChannel("problems"),c=[{name:"problemText",label:"Description",cell:"string",hoverTip:"conditions_description"},{name:"acuityName",label:"Acuity",cell:"handlebars",template:a,hoverTip:"conditions_acuity"},{name:"statusName",label:"Status",cell:"string",hoverTip:"conditions_status"}],m=c.concat([{name:"onsetFormatted",label:"Onset Date",cell:"string",sortValue:function(e,t){return e.get("onset")},hoverTip:"conditions_onsetdate"},{name:"updatedFormatted",label:"Last Updated",cell:"string",sortValue:function(e,t){return e.get("updated")},hoverTip:"conditions_lastupdated"},{name:"providerDisplayName",label:"Provider",cell:"string",hoverTip:"conditions_provider"},{name:"facilityMoniker",label:"Facility",cell:"string",hoverTip:"conditions_facility"},{name:"",cell:"handlebars",template:l}]);m.splice(1,0,{name:"standardizedDescription",label:"Standardized Description",cell:"string",hoverTip:"conditions_standardizeddescription"});var u={parse:function(e){return e=n.getStandardizedDescription(e),e=n.getStatusName(e),e=n.getServiceConnected(e),e=n.getProblemText(e),e=n.getICDCode(e),e=n.getAcuityName(e),e=n.getFacilityColor(e),e=n.getOnsetFormatted(e),e=n.getEnteredFormatted(e),e=n.getUpdatedFormatted(e),e=n.getCommentBubble(e),e=n.getICDName(e),e=n.getTimeSince(e),e=n.getStatusName(e)}},b={resourceTitle:"patient-record-problem",pageable:!1,criteria:{filter:"ne(removed, true)"},cache:!1,viewModel:u},h=ADK.Applets.BaseGridApplet,g=h.extend({className:"",initialize:function(e){this._super=h.prototype;var a={};a.filterEnabled=!0,a.enableModal=!0,a.tblRowSelector="#data-grid-problems tbody tr","expanded"===this.columnsViewType?a.columns=m:"summary"===this.columnsViewType?a.columns=c:(a.summaryColumns=c,a.fullScreenColumns=m),this.fetchOptions=b;var l=this;ADK.UserService.hasPermission("add-patient-problem")&&ADK.PatientRecordService.isPatientInPrimaryVista()&&(a.onClickAdd=function(){d.command("addProblem")}),l.getExposure(),a.toolbarOptions=!0,a.showLinksButton=!0,this.dataGridOptions=a,a.collection=ADK.PatientRecordService.fetchCollection(this.fetchOptions),a.onClickRow=function(e,r,s){e.attributes.exposure=l.exposure;var p,d=new t({model:e,collection:a.collection}),c=ADK.UserService.getUserSession().get("site"),m=e.get("pid")?e.get("pid").split(";")[0]:"";p={title:n.getModalTitle(e),size:"normal",headerView:i.extend({model:e,theView:d}),footerView:o.extend({model:e,onRender:function(){this.$el.find(".problemsTooltip").tooltip()},templateHelpers:function(){return(ADK.UserService.hasPermission("edit-patient-problem")||ADK.UserService.hasPermission("remove-patient-problem"))&&m===c?{data:!0}:{data:!1}}})};var u=new ADK.UI.Modal({view:d,options:p});u.show()},a.collection.on("sync",function(){a.collection.comparator=function(e,t){var i=e.get("statusName")||"",o=t.get("statusName")||"";return 0!==o.localeCompare(i)?-o.localeCompare(i):void 0},a.collection.sort()}),this._super.initialize.apply(this,arguments),d.comply("addProblemListModel",this.handleAddProblemModel,this)},onBeforeDestroy:function(){d.stopComplying("addProblemListModel"),this.dataGridOptions.collection.off("sync"),this.dataGridOptions.collection.comparator=null,this.dataGridOptions.onClickRow=null,this.dataGridOptions.onClickAdd=null},handleAddProblemModel:function(e,t){},exposure:"",getExposure:function(){var e=this,t=ADK.PatientRecordService.fetchCollection({resourceTitle:"patient-record-patient",onSuccess:function(){if(t.models&&t.models[0]&&t.models[0].attributes){var i=t.models[0].attributes.exposure||[];e.exposure=n.parseExposure(i)}}})}}),v=ADK.Messaging.getChannel("problems");v.reply("detailView",function(i){var a={criteria:{uid:i.uid},patient:new e.Model({icn:i.patient.icn,pid:i.patient.pid}),resourceTitle:"patient-record-problem",viewModel:u},l=$.Deferred(),r=ADK.PatientRecordService.fetchCollection(a);return r.on("sync",function(){var e=r.first(),i=ADK.UserService.getUserSession().get("site"),a=e.get("pid")?e.get("pid").split(";")[0]:"";l.resolve({view:new t({model:e,collection:r}),title:n.getModalTitle(e),footerView:o.extend({model:e,onRender:function(){this.$el.find(".problemsTooltip").tooltip()},templateHelpers:function(){return(ADK.UserService.hasPermission("edit-patient-problem")||ADK.UserService.hasPermission("remove-patient-problem"))&&a===i?{data:!0}:{data:!1}}})})},this),l.promise()});var f={id:"problems",viewTypes:[{type:"gist",view:s,chromeEnabled:!0},{type:"summary",view:g.extend({columnsViewType:"summary"}),chromeEnabled:!0},{type:"expanded",view:g.extend({columnsViewType:"expanded"}),chromeEnabled:!0}],defaultViewType:"summary"};return f});