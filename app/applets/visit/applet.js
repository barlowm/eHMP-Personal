define(["backbone","marionette","jquery","async","app/applets/visit/writeback/addselectVisit","./collectionHandler"],function(e,t,i,n,a,r){function s(){var t=new d,i=ADK.PatientRecordService.getCurrentPatient();if(i&&i.has("visit")){var n=JSON.parse(JSON.stringify(i.get("visit")));n&&t.set("contextVisit",new e.Model(n))}var r={size:"large",title:"Change Current Encounter",showProgress:!1,keyboard:!0,steps:[{view:a,viewModel:t}]},s=new ADK.UI.Workflow(r);s.show()}function o(e,t){s()}var c="openVisitSelector",l="visit",v=ADK.Messaging.getChannel(l),d=e.Model.extend({defaults:{visit:{},newVisitDateTimeWarning:"You have selected a future date/time"}});v.comply(c,o);var u={id:"visit"};return u});