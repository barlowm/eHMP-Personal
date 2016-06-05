define(["backbone","marionette"],function(e,t){"use strict";function i(e){var t=e.uid.split(":")[2],i=n[t];if(i){var o=new ADK.UI.Modal({view:ADK.Views.Loading.create(),options:{size:"large",title:"Loading..."}});o.show();var d=ADK.Messaging.getChannel(i),s=d.request("detailView",e);s.done(function(e){var t=new ADK.UI.Modal({view:e.view,options:{size:"large",title:e.title}});t.show()})}else{var l=new ADK.UI.Modal({view:new a,options:{size:"large",title:"Detail - Placeholder"}});l.show()}}var a=e.Marionette.ItemView.extend({template:_.template("<div>A detail view for this domain is not yet implemented.</div>")}),n={med:"medication_review_v2"},o={id:"activeMeds",contentRegionLayout:"gridOne",appletHeader:"patient",applets:[{id:"activeMeds",title:"Active Medication",region:"center"}],patientRequired:!0,onStart:function(){var e=ADK.Messaging.getChannel("activeMeds");e.on("displayMedDetail",i),ADK.SessionStorage.setAppletStorageModel("activeMeds","viewMode","summary")},onStop:function(){var e=ADK.Messaging.getChannel("activeMeds");e.off("displayMedDetail",i)}};return o});