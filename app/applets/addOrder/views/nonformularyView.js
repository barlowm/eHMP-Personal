define(["backbone","marionette","hbs!app/applets/addOrder/templates/nonformularyTemplate"],function(e,t,n){"use strict";var a;return a=e.Marionette.ItemView.extend({template:n,className:"text-center",initialize:function(e){this.options=e,this.parentView=e.parentView},events:{"click #ok":"acknowledgeNonforumulary"},acknowledgeNonforumulary:function(e){e.preventDefault(),this.parentView.searchMedsRegion.$el.show(),this.parentView.warningRegion.reset()}})});