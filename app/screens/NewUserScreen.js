define(["app/screens/AllergyGridFull","app/screens/VitalsFull","app/screens/ImmunizationsFull"],function(e,t,i){"use strict";var n={med:"medication_review_v2"},s={id:"new-screen",contentRegionLayout:"gridster",appletHeader:"navigation",appLeft:"patientInfo",predefined:!1,applets:[],onResultClicked:function(e){var t=e.uid.split(":")[2],i=n[t];if(i){var s=new ADK.UI.Modal({view:ADK.Views.Loading.create(),options:{size:"large",title:"Loading..."}});s.show();var a=ADK.Messaging.getChannel(i),l=a.request("detailView",e);l.done(function(e){var t=new ADK.UI.Modal({view:e.view,options:{size:"large",title:e.title}});t.show()})}else{var o=new ADK.UI.Modal({view:new DefaultDetailView,options:{size:"large",title:"Detail - Placeholder"}});o.show()}},onStart:function(){e.setUpEvents(),t.setUpEvents();var n=ADK.Messaging.getChannel("activeMeds");n.on("resultClicked",this.onResultClicked),i.setUpEvents()},onStop:function(){var e=ADK.Messaging.getChannel("activeMeds");e.off("resultClicked",this.onResultClicked)},patientRequired:!0};return s});