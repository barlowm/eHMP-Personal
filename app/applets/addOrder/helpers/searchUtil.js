define(["backbone","marionette"],function(e,t){var n={enableLoadingIndicator:function(e){e?$("#meds-loading-indicator").show():($("#meds-loading-indicator").hide(),$("#meds-loading-indicator").focus())},escapeHtml:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","/":"&#x2F;"};return String(e).replace(/[&<>"'\/]/g,function(e){return t[e]})},performActionWhileTyping:function(e,t,n,i,a){e.type===t&&($(e.target).val().length<=n&&"undefined"!=typeof timeoutHandle?clearTimeout(timeoutHandle):$(e.target).val().length>n&&("undefined"==typeof timeoutHandle?timeoutHandle=_.delay(a,i,e):(clearTimeout(timeoutHandle),timeoutHandle=_.delay(a,i,e))))}};return n});