(function () {
  "use strict";

  if (window.jQuery) {
    init(window.jQuery);
  } else {
    loadJqueryAndInvokeInit();
  }

  function init ($) {
    var contentDeliveryUrl = "https://content-delivery.istex.fr/web-header/"
      ;

//    contentDeliveryUrl = ~window.location.hostname.indexOf("127.0.0.1") && window.location.href || contentDeliveryUrl;

    $.ajax({
      url: contentDeliveryUrl + "public/css/main.min.css",
      success: function (data) {

        $("head").append("<style>" + data + "</style>");

        $.ajax({
          url: contentDeliveryUrl + "include/surenteteistex.html",
          success: function (data) {

            var $webHeader =
              $(jQuery.parseHTML(data))
              .filter("#surentete")
              .find("img").each(rewriteImgUrl).end()
              .prependTo($("body"))
              .wrap("<div id='istex-web-header' class='sandbox'></div>")
              .find("[href*=#]").click(preventDefaultEvent).end()
              .find("[href*='" + window.location.hostname + "']").parent("li").remove().end().end()
              ;

            window.location.hostname === "www.istex.fr" && $webHeader.find(".logoistex").remove();
          }

        });
      }
    });

    function rewriteImgUrl () {
        $(this).attr("src", function (index, attr) {
          return attr.replace(/^(?!http)(?:\/?([^/#"]+))+$/i, contentDeliveryUrl + "public/img/$1");
        });
    }
    
  }


  function loadJqueryAndInvokeInit () {
    var script = document.createElement("script");
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
    script.onload = function () {
      init(window.jQuery.noConflict());
    };
    document.head.appendChild(script).parentNode.removeChild(script);

  }

  function preventDefaultEvent (e) {
    e.preventDefault();
  }

}());
