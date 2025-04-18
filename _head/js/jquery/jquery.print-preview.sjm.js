/*!
 * jQuery Print Previw Plugin v1.0.1
 *
 * Copyright 2011, Tim Connell
 * Licensed under the GPL Version 2 license
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Date: Wed Jan 25 00:00:00 2012 -000
 *
 * serously modified by sjm 2016-03-23
 */

// added this here to allow printing a specific container
function print_this( id, title ) {

	var str = $('#' + id ).clone();

	// out, damned spot.... we don't care about what we're removing, so we don't save it
	var cleanups = [ '.noprint','.validate-widget','.scroll-to'];
	$.each( cleanups, function( i, k ) {
		//console.log('removing ' + k );
		$(str).find(k).remove().end();
	})

	// convert object to html string
	str = $(str).html();

	// sanitizing wrapper
	str = '<div class="text-left white fontsize-090">' + str + '</div>';

	printPreview.loadPrintPreview( title, str );

}

var printPreview = {
	// Private functions
	mask: {},
	size: {},
	print_modal: {},
	print_controls: {},

   loadPrintPreview: function( usetitle, usestring ) {
		// Declare DOM objects
		print_modal = $('<div id="print-modal"></div>');
		print_controls = $('<div id="print-modal-controls">' +
										'<a href="#" class="print" title="Print page">Print page</a>' +
										'<a href="#" class="close" title="Close print preview">Close</a>').hide();
		var print_frame = $('<iframe id="print-modal-content" scrolling="no" border="0" frameborder="0" name="print-frame" />');

		// Raise print preview window from the dead, zooooooombies
		print_modal
			 .hide()
			 .append(print_controls)
			 .append(print_frame)
			 .appendTo('body');

		// The frame lives
		for (var i=0; i < window.frames.length; i++) {
			 if (window.frames[i].name == "print-frame") {
				  var print_frame_ref = window.frames[i].document;
				  break;
			 }
		}

		var title = usetitle ? usetitle : document.title; // sjm
		print_frame_ref.open();
		print_frame_ref.write('<!DOCTYPE HTML>' +
			 '<html lang="en">' +
			 '<head><title>' + title + '</title>' +
			 '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
			 '<meta name="viewport" content="width=device-width">' +
			 '</head>' +
			 '<body></body>' +
			 '</html>');
      print_frame_ref.close();

		// Grab contents and apply stylesheet
		var $iframe_head = $('head link[media=all],  head link[media=print]' ).clone();

		// sjm
		var $iframe_body = 'lost string';
		if ( usestring ) {
			$iframe_body =  usestring;
		}
		else {
			$iframe_body = $('body > *:not(#print-modal):not(script):not(.noprint)').clone();
		}

		$iframe_head.each(function() {
			 $(this).attr('media', 'all');
		});

//		console.log('returning 68');
//      return;
		//if (!$.browser.msie && !($.browser.version < 7) ) {
		    $('head', print_frame_ref).append($iframe_head);
		    $('body', print_frame_ref).append($iframe_body);
		//}
		//else {
		//$('body > *:not(#print-modal):not(script)').clone().each(function() {
		//	 $('body', print_frame_ref).append(this.outerHTML);
		//});
		//$('head link[media*=print], head link[media=all]').each(function() {
		//	 $('head', print_frame_ref).append($(this).clone().attr('media', 'all')[0].outerHTML);
		//});
		//}

//		console.log('returning 80');
//      return;
		// Disable all links
		$('a', print_frame_ref).bind('click.printPreview', function(e) {
			 e.preventDefault();
		});

		// Introduce print styles
		$('head').append('<style type="text/css">' +
			 '@media print {' +
				  '/* -- Print Preview --*/' +
				  '#print-modal-mask,' +
				  '#print-modal {' +
						'display: none !important;' +
				  '}' +
			 '}' +
			 '</style>'
		);

		// Load mask
		printPreview.loadMask();

		// Disable scrolling
		$('body').css({overflowY: 'hidden', height: '100%'});
		$('img', print_frame_ref).load(function() {
			 print_frame.height($('body', print_frame.contents())[0].scrollHeight);
		});

		// Position modal
		starting_position = $(window).height() + $(window).scrollTop();
		var css = {
				  top:         starting_position,
				  height:      '100%',
				  overflowY:   'auto',
				  zIndex:      10000,
				  display:     'block'
			 }
		print_modal
			 .css(css)
			 .animate({ top: $(window).scrollTop()}, 400, 'linear', function() {
				  print_controls.fadeIn('slow').focus();
			 });
		print_frame.height($('body', print_frame.contents())[0].scrollHeight);

		// Bind closure
		$('a', print_controls).bind('click', function(e) {
			 e.preventDefault();
			 if ($(this).hasClass('print')) {
				// print-frame
				window.frames["print-frame"].focus();
				window.frames["print-frame"].print();
				//window.print();
			}
			 else { printPreview.distroyPrintPreview(); }
		});
    	},

   distroyPrintPreview: function() {
    	    print_controls.fadeOut(100);
    	    print_modal.animate({ top: $(window).scrollTop() - $(window).height(), opacity: 1}, 400, 'linear', function(){
    	        print_modal.remove();
    	        $('body').css({overflowY: 'auto', height: 'auto'});
    	    });
    	    mask.fadeOut('slow', function()  {
    			mask.remove();
    		});

    		$(document).unbind("keydown.printPreview.mask");
    		mask.unbind("click.printPreview.mask");
    		$(window).unbind("resize.printPreview.mask");
	    },

    	/* -- Mask Functions --*/
	loadMask: function() {
	        size = printPreview.sizeUpMask();
            mask = $('<div id="print-modal-mask" />').appendTo($('body'));
    	    mask.css({
    			position:           'absolute',
    			top:                0,
    			left:               0,
    			width:              size[0],
    			height:             size[1],
    			display:            'none',
    			opacity:            0,
    			zIndex:             9999,
    			backgroundColor:    '#000'
    		});

			mask.css({display: 'block'}).fadeTo('400', 0.75);

			$(window).bind("resize..printPreview.mask", function() {
						printPreview.updateMaskSize();
					});

			mask.bind("click.printPreview.mask", function(e)  {
						printPreview.distroyPrintPreview();
					});

				$(document).bind("keydown.printPreview.mask", function(e) {
						 if (e.keyCode == 27) {  printPreview.distroyPrintPreview(); }
					});
        },

   sizeUpMask: function() {
            //if ($.browser.msie) {
            //	// if there are no scrollbars then use window.height
            //	var d = $(document).height(), w = $(window).height();
            //	return [
            //		window.innerWidth || 						// ie7+
            //		document.documentElement.clientWidth || 	// ie6
            //		document.body.clientWidth, 					// ie6 quirks mode
            //		d - w < 20 ? w : d
            //	];
            //} else {
               return [$(document).width(), $(document).height()];
            //}
        },

   updateMaskSize: function() {
    		var size = printPreview.sizeUpMask();
    		mask.css({width: size[0], height: size[1]});
        }
};