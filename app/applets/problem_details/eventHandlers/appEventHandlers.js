define(["backbone","marionette"],function(t,s){var a=function(t,s,a){var e,o=s.hasClass(a),r=s.find("i.fa");e="I"===t.nodeName.toUpperCase()?s.find("th#"+t.parentElement.id).find("i"):s.find("th#"+t.id).find("i"),s.removeClass(function(){var t,s="",a=this.className.split(" ");for(t=0;t<a.length;t++)/sort-ascending-/.test(a[t])&&(s+=a[t]+" ");return s}),r.removeClass("fa-sort-by-attributes fa-sort-by-attributes-alt"),r.addClass("fa-sort"),e.removeClass("fa-sort"),o?e.addClass("fa-sort-by-attributes-alt"):(s.addClass(a),e.addClass("fa-sort-by-attributes"))},e={sortCollection:function(t,s,e,o,r){t.stopPropagation();var i="sort-ascending-"+o;s.hasClass(i)?ADK.utils.sortCollection(e,o,r,!1):ADK.utils.sortCollection(e,o,r,!0),a(t.target,s,i)}};return e});