/* common functions/etc for all pages||applications */

$(document).ready(function () {

   $('.gp-link').on(
      'click', function(){
         var url = $(this).attr('data-url');
			var tab = $(this).attr('data-tab');
         if ( url ) { window.location = url; }
			if ( tab ) { window.open(tab, '_blank'); }
      }
   );
   //console.log('focusing');
   $('.first-focus'). focus();
});