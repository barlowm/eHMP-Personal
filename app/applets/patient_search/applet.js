define(["backbone","marionette","underscore","hbs!app/applets/patient_search/templates/patientSearchTemplate","app/applets/patient_search/views/tabView","app/applets/patient_search/views/inputView","app/applets/patient_search/views/pillsView","app/applets/patient_search/views/searchMainView","app/applets/patient_search/views/confirmationView","app/applets/patient_search/views/closeButtonView"],function(e,t,i,a,s,n,h,r,c,o){var p="mySite",l="global",w="",S=(e.Model.extend({defaults:{}}),e.Marionette.LayoutView.extend({events:{"click #global":"changePatientSearchScope","click #mySite":"changePatientSearchScope","click #patient-search-input":"setupPatientSearch"},className:"searchApplet",template:a,regions:{closeButton:"#close-button-container",patientSearchInput:"#patient-search-input",searchType:"#patient-search-tab",mySiteTabs:"#patient-search-pills",searchMain:"#patient-search-main",patientSelectionConfirmation:"#patient-search-confirmation"},initialize:function(){this.initializeViews(),this.initializeListeners()},initializeViews:function(){this.closeButtonView=new o,this.patientSearchView=new n,this.searchTypeView=new s,this.mySiteTabsView=new h,this.searchMainView=new r({searchApplet:this}),this.patientSelectionConfirmationView=new c({searchApplet:this})},initializeListeners:function(){this.listenTo(this.searchTypeView.model,"change:searchType",this.changeSearchInput),this.listenTo(this.mySiteTabsView.model,"change:pillsType",this.changeSubTab),this.listenTo(this.patientSearchView.mySiteModel,"change:searchString",this.executeSearch),this.listenTo(this.patientSearchView.nationwideModel,"change:globalSearchParameters",this.executeSearch),this.listenTo(this.patientSearchView.nationwideModel,"errorMessage",this.displayErrorMessage),this.listenTo(this.patientSearchView.nationwideModel,"newGlobalSearch",this.clearPreviousGlobalSearchResults)},onRender:function(){this.patientSearchInput.show(this.patientSearchView),this.closeButton.show(this.closeButtonView),this.searchType.show(this.searchTypeView),this.mySiteTabs.show(this.mySiteTabsView),this.searchMain.show(this.searchMainView),this.patientSelectionConfirmation.show(this.patientSelectionConfirmationView),this.patientSelectionConfirmation.$el.addClass("hide")},onShow:function(){$('ul a[role="tab"]').attr("tabindex",0)},displayErrorMessage:function(e){this.searchMainView.clearErrorMessage();var t=e[0],i=e[1];this.searchMainView.displayErrorMessage(t,i)},setupPatientSearch:function(){this.mySiteTabsView.clearAllTabs(),this.patientSearchView.$("#patientSearchInput").focus()},clearPreviousGlobalSearchResults:function(){this.searchMainView.clearPreviousGlobalSearchResults(this.searchTypeView.model.get("searchType"))},getPatientPhoto:function(e,t){var i;i=ADK.ResourceService.buildUrl("patientphoto-getPatientPhoto",t);$.ajax({url:i,success:function(t,i,a){base64PatientPhoto="data:image/jpeg;base64,"+t,e.set({patientImage:base64PatientPhoto})},error:function(e,t,i){console.info("There was an issue retrieving the patient image "+e.status)},async:!0})},patientSelected:function(e){this.patientSelectionConfirmationView.updateSelectedPatientModel(e)},changePatientSearchScope:function(e){this.patientSearchView.changeView(this.searchTypeView.model.get("searchType"))},changeSubTab:function(e){$("#patient-search-input input").first().val(w),this.patientSearchView.mySiteModel.set("searchString",w);var t=this.$el.find(".instructions p span");t.hasClass("hidden")||t.addClass("hidden"),this.searchMainView.changeView(this.searchTypeView.model.get("searchType"),this.mySiteTabsView.getTabType()),this.searchMainView.mySiteAllSearchLayoutView.clearSearchResultsRegion(),$("#patientSearchInput").blur()},changeSearchInput:function(){this.patientSelectionConfirmationView.updateTemplateToBlank(),$("a.active").removeClass("active");var e=this.searchTypeView.model.get("searchType");this.patientSearchView.changeView(e),this.mySiteTabsView.changeTemplate(e),this.searchMainView.changeView(e,this.mySiteTabsView.getTabType()),$("#patient-search-input input").first().focus()},removePatientSelectionConfirmation:function(){this.patientSelectionConfirmationView.updateTemplateToBlank()},resetModels:function(){this.mySiteTabsView.resetModels(),this.patientSearchView.resetModels()},executeSearch:function(){var e=this.searchTypeView.model.get("searchType"),t={};e==p?(t.tabType=this.mySiteTabsView.getTabType(),"none"===t.tabType&&(t.searchString=this.patientSearchView.mySiteModel.get("searchString"),this.patientSearchView.mySiteModel.set("searchString",t.searchString,{silent:!0}))):e==l&&(t.globalSearchParameters=this.patientSearchView.nationwideModel.get("globalSearchParameters")),this.patientSelectionConfirmationView.updateTemplateToBlank(),this.searchMainView.clearErrorMessage(e),this.searchMainView.executeSearch(e,t)}})),u={id:"patient_search",getRootView:function(){return S}};return u});