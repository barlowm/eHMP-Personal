define(["app/applets/activeMeds/appletLayout","app/applets/activeMeds/gistView"],function(e,i){var a="medication_review_v2",t={id:"activeMeds",viewTypes:[{type:"gist",view:i,chromeEnabled:!0},{type:"summary",view:e.extend({columnsViewType:"summary"}),chromeEnabled:!0}],defaultViewType:"summary"};return function(){ADK.Messaging.getChannel(t.id).on("detailView",function(e){var i=a,t=new ADK.UI.Modal({view:ADK.Views.Loading.create(),options:{size:"large",title:"Loading..."}});t.show();var n=ADK.Messaging.getChannel(i),s=n.request("detailView",e);s.done(function(e){var i=new ADK.UI.Modal({view:e.view,options:{size:"large",title:e.title}});i.show()}),$("#mainModal").modal("show")})}(),t});