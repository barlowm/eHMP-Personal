define(["app/applets/activeMeds/gistConfig","app/applets/activeMeds/medicationCollectionHandler"],function(e,t){var i=ADK.AppletViews.InterventionsGistView.extend({initialize:function(i){this._super=ADK.AppletViews.InterventionsGistView.prototype;var n=ADK.PatientRecordService.getCurrentPatient().attributes.patientStatusClass;this.appletOptions={filterFields:e.filterFields,gistModel:e.gistModel,collection:t.fetchMedsCollection(e.fetchOptions,n,"gist"),collectionParser:e.transformCollection,gistHeaders:e.gistHeaders,enableTileSorting:!0,onClickRow:function(e,t){var i=e.get("uid"),n=ADK.PatientRecordService.getCurrentPatient();ADK.Messaging.getChannel("activeMeds").trigger("detailView",{uid:i,patient:{icn:n.attributes.icn,pid:n.attributes.pid}})}},this._super.initialize.apply(this,arguments)}});return i});