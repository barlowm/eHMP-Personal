define(["backbone","marionette","app/applets/lab_results_grid/modal/modalView","hbs!app/applets/lab_results_grid/modal/modalFooterTemplate"],function(e,t,a,l){"use strict";return e.Marionette.ItemView.extend({template:l,events:{"click #modal-close-button":"closeModal"},closeModal:function(e){a.resetSharedModalDateRangeOptions()}})});