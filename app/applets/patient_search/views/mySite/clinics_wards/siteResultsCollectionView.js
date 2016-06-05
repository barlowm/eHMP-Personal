define(["backbone","marionette","app/applets/patient_search/views/mySite/clinics_wards/singleSearchResultView","app/applets/patient_search/views/common/blankView"],function(e,t,i,l){var o=50,n=100,s=30,a=e.Marionette.ItemView.extend({template:_.template('<h5 class="loading"><i class="fa fa-spinner fa-spin"></i> Loading...</h5>')}),c=e.Marionette.ItemView.extend({template:_.template('<p class="error-message padding" role="alert" tabindex="0">No results found.</p>'),tagName:"p"}),r=e.Marionette.CollectionView.extend({searchView:void 0,locationFilterView:void 0,emptyView:a,initialize:function(e){this.searchView=e.searchView,this.locationFilterView=e.locationListFilterView,this.locationType=e.locationType,this.searchApplet=e.searchApplet;var t=ADK.UserService.getUserSession().attributes.site,i={resourceTitle:"locations-"+this.locationType,criteria:{"site.code":t,itemsPerPage:20},cache:!1,pageable:!0},l=this;i.onError=function(e,t){l.emptyView=c,l.render()},i.onSuccess=function(e){l.emptyView=c,l.collection.setPageSize(s),l.updateResults(l.locationFilterView.model),l.render()},this.collection=ADK.ResourceService.fetchCollection(i),this.listenTo(this.locationFilterView.model,"change:filterString",this.updateResults)},onRender:function(){},childView:i,childViewOptions:function(){return{searchView:this.searchView,locationCollectionView:this,locationType:this.locationType,searchApplet:this.searchApplet}},fields:["displayName"],fetchRows:function(e){var t=e.currentTarget;t.scrollTop+t.clientHeight+o>t.scrollHeight&&this.collection.hasNextPage()&&(console.log("Scroll Event"),e.preventDefault(),this.collection.setPageSize(this.collection.state.pageSize+n))},updateResults:function(e){this.collection.setPageSize(s,{silent:!0}),this.collection.fullCollection.reset(this.collection.originalModels,{silent:!0});var t=_.bind(this.makeMatcher(e.get("filterString").toLowerCase()),this);this.collection.getFirstPage({silent:!0}),this.collection.fullCollection.reset(this.collection.fullCollection.filter(t),{reindex:!1})},makeMatcher:function(e){var t=this.makeRegExp(e);return function(e){for(var i=this.fields||e.keys(),l=0,o=i.length;o>l;l++)if(t.test(e.get(i[l])+""))return!0;return!1}},makeRegExp:function(e){return new RegExp(e.trim().split(/\s+/).join("|"),"i")},tagName:"div",className:"list-group"});return r});