define(["backbone","marionette","underscore","hbs!app/applets/immunizations_add_edit/templates/footerEieTemplate"],function(e,o,t,i){"use strict";return e.Marionette.ItemView.extend({events:{"click #remove-immunization":"removeImmunization","click #back-eie":"goBack"},goBack:function(){console.log("eie back")},removeImmunization:function(){console.log("removed!")},template:i})});