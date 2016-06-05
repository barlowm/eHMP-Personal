define(["jquery","underscore","hbs!app/applets/problems_add_edit/search","hbs!app/applets/problems_add_edit/headerTemplate","app/applets/problems_add_edit/typeaheadView","app/applets/problems_add_edit/addEditModalView","app/applets/problems_add_edit/util","typeahead","app/applets/problems_add_edit/util/problemSearchBloodhound"],function(e,t,o,a,n,l,d,s,i){function r(t){var o=ADK.PatientRecordService.getCurrentPatient();b=t,o.get("visit")?p():(f.command("openVisitSelector","problem_add_edit"),f.on("set-visit-success:problem_add_edit",function(){e("#mainModal").one("hidden.bs.modal",p)}))}function p(){u=new w;var t=new ADK.UI.Modal({view:u,options:g});t.show(),e("#modal-lg-region").empty()}function c(){e("#freeTextBtn").attr("disabled",!1)}function m(t){if(t)h.command("openProblemAdd","problem_add",t);else{var o=new Backbone.Model({problemText:e("#bs-problem").val()+" (ICD-9-CM 799.9)"});h.command("openProblemAdd","problem_add",o)}}var b,u,h=ADK.Messaging.getChannel("problem-add-edit"),f=ADK.Messaging.getChannel("visit");h.comply("openProblemSearch",r);var v=Backbone.Marionette.ItemView.extend({template:t.template('<div class="pull-right"><button id="cancelBtn" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button id="freeTextBtn" type="button" class="btn btn-primary" data-dismiss="modal" disabled>Use Entered Term</button></div>'),events:{"click #freeTextBtn":"popAddModal","keydown #freeTextBtn":"handleFreeTextKeyPress","keydown #cancelBtn":"handleCancelKeyPress"},popAddModal:function(e){m()},handleFreeTextKeyPress:function(t){9===t.keyCode&&(t.preventDefault(),t.stopPropagation(),t.shiftKey?e("#cancelBtn").focus():e("button.close").focus())},handleCancelKeyPress:function(t){if(9===t.keyCode)if(t.preventDefault(),t.stopPropagation(),t.shiftKey)if(0===u.problemView.collection.length)e("#uncoded").focus();else{e("#problem-typeahead-list li.focused").removeClass("focused");var o=e("#problem-typeahead-list li").first();o.focus(),o.addClass("focused")}else e("#freeTextBtn").focus()}}),y=Backbone.Marionette.ItemView.extend({template:t.template('<button type="button" id="problemSearchClose" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="mainModalLabel">Add Active Problem</h4>'),events:{"keydown #problemSearchClose":"handleKeyPress"},handleKeyPress:function(t){t.shiftKey&&9===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e("#freeTextBtn").focus())}}),g={title:"Add Active Problem",size:"medium",footerView:v,headerView:y,callShow:!0},w=Backbone.Marionette.LayoutView.extend({template:o,regions:{problem:"#problem-select"},events:function(){var e={};return e["keyup #bs-problem"]="enableFreeTextButton",e["change [name=chkVAT]"]="uncodedSelect",e},initialize:function(){ADK.UserService.getUserSession().get("site");setTimeout(function(){e("#problem").focus(),e("#searchProblemModal .uncoded-tool-tip").tooltip({delay:{show:300,hide:0}})},1e3)},showModal:function(e){e.preventDefault();var t=new ADK.UI.Modal({view:this,options:problemSearchModalOptions});t.show()},onRender:function(){var t=i;t.initialize(),e(this.el).find("#bs-problem").typeahead({minLength:1,highlight:!0,hint:!0},{name:"problem-search-item",displayKey:"value",source:t.ttAdapter()}).on("typeahead:selected",function(e,t){var o=new Backbone.Model({problem:t.value,problemNumber:t.problemNumber,icd:t.icd,lexiconCode:t.lexiconCode,snomed:t.snomed,problemText:t.problemText});m(o)})},enableFreeTextButton:function(){var t=e("#bs-problem").val();t&&t.length>=3&&c()},uncodedSelect:function(t){var o=e("#bs-problem").val();e("#bs-problem").focus().typeahead("val",""),e("#bs-problem").focus().typeahead("val",o)}});return w});