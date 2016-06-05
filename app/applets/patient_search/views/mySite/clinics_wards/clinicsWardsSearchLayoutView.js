define(["backbone","marionette","handlebars","app/applets/patient_search/views/common/searchResultsCollectionView","app/applets/patient_search/views/common/errorMessageView","app/applets/patient_search/views/common/blankView","app/applets/patient_search/views/mySite/clinics_wards/siteResultsCollectionView","hbs!app/applets/patient_search/templates/mySite/clinics_wards/searchViewTemplate","app/applets/patient_search/views/mySite/clinics_wards/dateRangeSelectorView"],function(t,e,i,s,n,a,o,l,r){var c=t.Model.extend({defaults:{filterString:"",locationType:""}}),p=new c,u=new c,d="MMDDYYYYHHmmss",h=t.Marionette.ItemView.extend({template:i.compile("<input id='wardFilter' type='text' placeholder='Filter {{locationType}}' class='form-control padding'></input>"),model:p,initialize:function(t){this.model.set("locationType",t.locationType),this.model.set("filterString","")},events:{"keyup input":"updateWardsListResults","keydown input":"updateWardsListResults","keypress input":"updateWardsListResults","input input":"updateWardsListResults",change:"updateWardsListResults"},updateWardsListResults:function(t){var e=this;"wardFilter"==t.currentTarget.id&&e.model.set({filterString:$(t.currentTarget).val()})}}),m=t.Marionette.LayoutView.extend({template:i.compile("<input id='clinicFilter' type='text' placeholder='Filter {{locationType}}' class='form-control padding'></input><div id='locationDateRange'></div>"),model:u,regions:{locationDateRange:"#locationDateRange"},initialize:function(t){this.model.set("locationType",t.locationType),this.model.set("filterString",""),this.locationDateRangeView=new r({parent:t.parent})},onRender:function(){this.locationDateRange.show(this.locationDateRangeView)},events:{"keyup input":"updateClinicListResults","keydown input":"updateClinicListResults","keypress input":"updateClinicListResults","input input":"updateClinicListResults",change:"updateClinicListResults"},updateClinicListResults:function(t){this.setModel&&clearTimeout(this.setModel);var e=this,i=t.target.id;"clinicFilter"==i&&(this.setModel=setTimeout(function(){e.model.set({filterString:$(t.target).val()})},200))}}),w=t.Marionette.LayoutView.extend({searchApplet:void 0,template:l,regions:{patientSearchResults:"#patient-search-results",locationListFilterRegion:"#location-list-filter-input",locationListResultsRegion:"#location-list-results"},initialize:function(t){this.searchApplet=t.searchApplet,this.locationType=t.locationType,"clinics"===this.locationType?this.locationsListFilterView=new m({locationType:t.locationType,parent:this}):this.locationsListFilterView=new h({locationType:t.locationType}),this.locationListResultsView=new o({searchView:this,searchApplet:this.searchApplet,locationListFilterView:this.locationsListFilterView,locationType:t.locationType})},onRender:function(){this.locationListFilterRegion.show(this.locationsListFilterView),this.locationListResultsRegion.show(this.locationListResultsView);var t=this;this.$el.find("#location-list-results").on("scroll",function(e){t.locationListResultsView.fetchRows(e)})},locationSelected:function(t){var e;e="clinics"===this.locationType?{uid:t.attributes.uid}:{"ref.id":t.attributes.refId,uid:t.attributes.uid},this.searchApplet.removePatientSelectionConfirmation(),this.executeSearch(e)},executeSearch:function(t){this.searchApplet.removePatientSelectionConfirmation(),this.patientsView&&(this.patientsView.remove=function(){this.collection.on("sync",function(){})},this.patientsView.remove()),"clinics"===this.locationType?this.patientsView=new s({searchApplet:this.searchApplet,templateName:"clinics"}):"wards"===this.locationType?this.patientsView=new s({searchApplet:this.searchApplet,templateName:"roomBedIncluded"}):this.patientsView=new s({searchApplet:this.searchApplet}),this.patientSearchResults.show(this.patientsView),"clinics"===this.locationType&&(t["date.start"]=this.locationsListFilterView.locationDateRangeView.model.get("date.start"),t["date.end"]=this.locationsListFilterView.locationDateRangeView.model.get("date.end"),""!==this.$el.find("#filter-from-date-clinic").val()&&""!==this.$el.find("#filter-to-date-clinic").val()?this.$el.find("button").removeClass("active-range"):(this.$el.find("#filter-from-date-clinic").val(""),this.$el.find("#filter-to-date-clinic").val("")));var e={resourceTitle:"locations-"+this.locationType+"-search",criteria:t,cache:!0},i=this;e.onError=function(t,e){200===e.status?i.patientsView.setEmptyMessage("No results found."):i.patientsView.setEmptyMessage("Error: Unknown"),i.patientsView.render()},e.onSuccess=function(t){i.patientsView.setEmptyMessage("No results found."),1===n.length&&n.at(0).attributes.message&&n.reset(),n.length>0&&n.at(0).attributes.appointmentTime&&(n.comparator=function(t,e){var i=moment(t.attributes.appointmentTime,d,!0),s=moment(e.attributes.appointmentTime,d,!0);return i.isBefore(s)?-1:i.isSame(s)?0:1},n.sort()),i.patientsView.collection=n,i.patientsView.originalCollection=n,i.patientsView.render()};var n=ADK.ResourceService.fetchCollection(e)},refineSearch:function(e,i){if(i&&i.originalCollection&&!i.originalCollection.isEmpty()){if(""!==e){var s=this;i.collection=new t.Collection;var n=_.filter(i.originalCollection.models,function(t){return s.modelAttributeContainsFilterString(t,"fullName",e)?t:s.modelAttributeContainsFilterString(t,"ssn",e)?t:s.modelAttributeContainsFilterString(t,"birthDate",e)?t:void 0});i.collection.reset(n)}else i.collection=i.originalCollection;i.render()}},modelAttributeContainsFilterString:function(t,e,i){return void 0!==t.attributes[e]&&t.attributes[e].toLowerCase().indexOf(i.toLowerCase())>=0?!0:!1}});return w});