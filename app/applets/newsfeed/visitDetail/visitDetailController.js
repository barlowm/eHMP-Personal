define(["app/applets/newsfeed/visitDetail/visitDetailView"],function(e){var i={initialize:function(){var i=ADK.Messaging.getChannel("visitDetail");i.reply("detailView",function(i){var t=$.Deferred();return void 0!==i.model&&t.resolve({view:new e({model:i.model}),title:i.model.get("summary")||i.model.get("typeDisplayName")}),t.promise()})}};return i});