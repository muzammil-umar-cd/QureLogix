$(document).ready(function () {
    $('.main_menu > div').on('click', function(ev) {
        if ( !$(ev.target).is( '.has-submenu' ) ) {
            $(this).toggleClass('collapsed').siblings('.collapsed').removeClass('collapsed');
        }
    });
    
    $('.mobile_collapser, .has-submenu').on('click', function() {        
        $(this).toggleClass('collapsed').siblings('.collapsed').removeClass('collapsed');
    });
    
    $('.top_menu, .bot_menu').on(
		'mouseleave', function() {
            $(this).find('.current').removeClass('current');
		}
	);
    
//    $('.main_menu > div').on(
//		'mouseenter', function() {
//			$(this).addClass('current').siblings().removeClass('current');
//            var i = $(this).index();
//            sessionStorage.setItem('lastMenu', i);
//		}
//	);
    
    $('.bot_menu > div, .top_menu > *').on(
		'mouseenter', function() {
			$(this).addClass('current').siblings().removeClass('current');
		}
	);
    
    //if( sessionStorage.getItem('lastMenu') ) {
    //    var i = sessionStorage.getItem('lastMenu');
    //    $('.main_menu').children().eq(i).addClass('current');
    //}

    //BANNER SLIDE
    //    $('.toggle-banner').on(
    //		'click', function( ) {
    //            $('.banner-slide').slideToggle(500);
    //            $('.toggle-banner .fas').toggleClass('fa-arrow-down fa-arrow-up');
    //        }
    //    );
});

//window.addEventListener('load', function() {
//
//  var popup = document.querySelector('.blue-light-bar');
//  // Check if the user has previously closed the banner and display/hide it accordingly
//  if (!sessionStorage.getItem('closedBanner')) {
//    popup.classList.remove("unscrolled");
//  } else {
//    popup.style.display = "none";
//  }
//
//  document.getElementById('bar-close').onclick = function() {
//    // Save into the user's browser that the popup was closed
//    sessionStorage.setItem('closedBanner', "true");
//
//    this.parentNode.parentNode.remove();
//    return false;
//  };
//});