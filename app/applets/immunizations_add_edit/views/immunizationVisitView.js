define(["hbs!app/applets/immunizations_add_edit/templates/immunizationVisitTemplate"],function(e){return Backbone.Marionette.ItemView.extend({template:e,model:ADK.PatientRecordService.getCurrentPatient(),events:{"click #immunization-change-visit":"changeVisit"},changeVisit:function(){ADK.Messaging.getChannel("visit").command("openVisitSelector","immunizations_search")}})});