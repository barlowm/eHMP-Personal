define(["app/applets/orders/util","app/applets/orders/modalView/modalContentView"],function(e,i){var t={initialize:function(t,n){var r=ADK.Messaging.getChannel(t);r.reply("detailView",function(t){var r={criteria:{uid:t.uid},patient:new Backbone.Model({icn:t.patient.icn,pid:t.patient.pid}),resourceTitle:n,viewModel:{parse:e.parseOrderResponse},cache:!0},a=$.Deferred(),o=ADK.PatientRecordService.fetchCollection(r);return o.on("sync",function(){var e=o.first();a.resolve({view:new i({model:new Backbone.Model(e.attributes)}),title:e.get("summary")})},this),a.promise()})}};return t});