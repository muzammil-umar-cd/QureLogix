/*
Hideously complex, REALLY needs to be refactored...  but not today 2017-01-14 sjm

*/

$.extend(
{
   redirectPost: function(location, args, target ) {
      var form = '';
      $.each( args, function( j, o ) {
          j = j;
         // value = encodeURIComponent( value );
         //console.log( 'setting key/value. key: ' + o.name + ' value: ' + o.value );
          form += '<input type="hidden" name="'+ o.name +'" value="'+ o.value +'">';
      });
      $('<form action="' + location +'" ' + target + ' method="POST">'+form+'</form>').appendTo('body').submit();
   }
});


//$(document).ready(function () {
//   quotes.init();
//});

//function setAlerts(args) {
//   quotes.alerts = args;
//}
//console.log( 'loading quotes');
var quotes;

quotes = {

    last_page : '',
    this_page : '',
    next_page : '',
 
    allowed_circles: [],
 
    firstfocus: '',

    form_ID:  '#theForm',

    quote_url: '/quoting/quote',

    order: {
        //'binding'     :    1,
        'quantities'    :    1,
        //'trim'        :    3,
        'paper'         :    2,
        'cover'         :    3,
        'coverdesign'   :    4,
        'textdesign'    :    5,
        'review'        :    6,
        'save'          :    7,
        'order'         :    7,
        'reprint'       :    8,
        'shipping'      :    9,
        'summary'       :    10,
        'payment'       :    11,
        'thankyou'      :    12
    },

    // could pass arg(s) I suppose, but not for now
    // well, OK, we pass a list if/as needed, but default to all
    //bind_list: [ 'nav','circles'],
    bind_list:   '',

    init: function( args ) {
        // console.log('initing quotes');
        var that = this;
        $.each( args, function( i, row ){
           that[row[0]] = row[1];
        });
  
        // we always want to bind nav, so..
        this.bind_list = this.bind_list ? this.bind_list : [ 'nav' ];
    },



    bind: function( binds){
        binds = binds ? binds : this.bind_list;
        var that = this;
        $.each( binds, function( j, k ){
            var func = 'bind_' + k;  // console.log( 'binding ' + func );
            that[func]();
        });
    },


    bind_nav: function( page ) {

        page = page ? page : this.this_page;
  
        if( page ) { this.new_page = page; }
  
        var that = this;  // context is king....

        $('.page-nav').off();
        $('#quantity .page-nav').bind( "click", function() {
            var black_pages = $('input[name=black_pages]').val();
			var color_pages = $('input[name=color_pages]').val();
            var total_pages = $('input[name=pages]').val();

            if( total_pages % 2 != 0 ) {
				if( color_pages == 0 ) {
                	$('input[name=black_pages]').val(parseInt(black_pages) + 1);
				} else {
					$('input[name=color_pages]').val(parseInt(color_pages) + 1);
				}
                $('input[name=pages]').val(parseInt(total_pages) + 1);
            }
		});
        
        $('#shipping .page-nav').bind( "click", function() {
            that.verifyAddress();
		});

        $('.page-nav').on('click touch', function () {
			if( $(this).closest('.nav-section').length ) {
                if( $( this ).is('.prev-button') && $('.add-on-column').is(':visible') && !$('.add-on-column .tab:first-child').hasClass('selected') ) {
                    $('.tab.selected').prev().click();
                } else if( $( this ).is('.next-button') && $('.add-on-column').is(':visible') && !$('.add-on-column .tab:last-child').hasClass('selected') ) {
                    $("form .radio-parent:visible").find("input, select").valid();
                    if( !$('.tab.selected').hasClass('input-alert') ) {
                        $('.tab.selected').next().click();
                    }
				} else {
					that.panel_nav(this);
				}
			} else if( $(this).hasClass('hollow-check') ) {
                if( !$(this).parent('.hollow-button').length ) {
                    that.panel_nav(this);
                }
            } else {
				that.panel_nav(this);
			}
		});

        $('.page-nav').on('keyup', function(ev) {
            var code = (ev.keyCode ? ev.keyCode : ev.which);
            if ( code == 13 ) {
                if( $(this).hasClass('hollow-check') ) {
                    if( !$(this).parent('.hollow-button').length ) {
                        that.panel_nav(this);
                    }
                } else {
                    that.panel_nav(this);
                }
            }
        });

		$('.toggle').on (
			 'change', function(ev) { ev=ev;
				  that.toggle( this );
			 }
		);

        $('.mousetoggle').off();
        $('.mousetoggle').on('mouseup touch', function () {  that.toggle( this );  });

        $('.info-link').off();
        $('.info-link').on('mouseup touch', function () {
            var go    = $(this).attr('data-go');
            var blank = true; //false;

            if ( go.match(/\.pdf/ ) ) { blank = true; }

            if ( blank ) {
                window.open(go, '_blank');
                return true;
            }
            else{   $.redirectPost( go, {} ); }
                return true;
        });

        $('#use_address').change(function() {
            //alert( "Handler for .change() called." );
            that.load_shipping();
        });

        $('.quotes-view-specs').off();
        $('.quotes-view-specs').on('mouseup touch', function () {
            var pos = $('.quote-specs-box').position();
            if( pos.left < 0 ){
               $('.quote-modal').position( { my: "left", at: "left", of: window } );
               $('.quote-specs-box').position( { my: "top", at: "top", of: $(this) } );
            }
            else{
               $('.quote-specs-box').css( "left", '-6000px' );
               $('.quote-modal').css( "left", '-6000px' );
            }
        });

        //$('.quotes-view-info').off();
        $('.quotes-view-info').on('mouseup touch', function (e) {
            if( !$(e.target).is(".tooltip, .close, .x") ) {
				// we have an id, let's use it...
                var id   = $(this).attr('data-id');
                var info = $('#' + id);
                var pos  = $(info).position();
    
                if( pos.left < 0 ) {
                    $('.quote-modal').css( "left", '0px' );
                    if( $(info).hasClass('sticky-cursor') ) {
                        var hor = $(this).offset().left - ( $(info).width() / 2 );
                        var ver = $(this).offset().top - ( $(info).height() / 2 );
                        $(info).css( "left", hor + 'px' ).css( "top", ver + 'px' );
                    } else {
                        $(info).css( "left", '50%' ).css( "top", '50%' ).css('transform', 'translate(-50%, -50%)');
                    }
                }
                else {
                   $(info).css( "left", '-6000px' );
                   $('.quote-modal').css( "left", '-6000px' );
                }
            }
		});

		$(".specs-title").click(function () {
         var attr = $(this).attr('data-go');
			if( !$(".quote-specs-box").is(':animated') && ( typeof attr == typeof undefined || attr == false ) ) {
            //$('.quote-tracker').fadeToggle(500);
				$(".spec-items").slideToggle(500, function () {
				});
				$(".specs-title i, .specs-title svg").toggleClass('fa-expand-arrows-alt fa-compress-arrows-alt');

				//var maxWidth = $(".quote-specs-box").css('max-width');
				//var cssObj = maxWidth == '160px' ? {'max-width' : '300px'} : {'max-width' : '160px'};
				//$('.quote-specs-box').animate(cssObj,'slow');
			}
		});

		$(".quote-accordian.toggle").click(function () {
			if( !$(".dropdown").is(':animated') ) {
				$header = $(this);
				$content = $header.next();
				if( ( $content ).is(':visible') ) { return false; }
				$header.find(".fas").toggleClass('fa-minus fa-plus');

				$.each( $('.dropdown'), function() {
					if( $(this).is(':visible') ) {
						$(this).hide(500);
						$(this).prev().find(".fas").toggleClass('fa-minus fa-plus');
					}
				});

				var totalHeight = 0;
				$.each( $('.quote-accordian'), function() {
					 totalHeight += $(this).height();
				});
				$content.height(0).show().animate( { height: ( $('.quote-right-box').height() - totalHeight - $('.nav-section').height() ) }, 500 );
			}
		});

      	that.firstFocus();

		that.alertPos();

     },

    panel_nav:  function( el ){
        var that = this;
        var go   = '';
        go       = $(el).attr('data-go');
  
        //console.log( 'go: ' + go );

        if( ! go ){
           console.log( 'lost next page, dammit....');
           return false;
        }

		var form = this.form_ID;
  
        var params   = '';
        
        var areyousure = $(el).attr('data-confirm');

		if( areyousure ) {
            if( ! confirm( areyousure ) ){
               return false;
            }
		} else {
            params   = this.get_params( this.page, el ); //$(form).serializeArray();
        }

        var location = this.quote_url + '/' + go;

		var validator = $( form ).validate();
		var noval = $(el).attr('data-noval');

		if( noval ) { canGo = true; }
		else {
			canGo = validator.form();
		}

		if ( canGo ) {
			$.redirectPost(location, params);
		}

     },

    firstFocus: function() {
        if( this.firstfocus ) {
            thisone = this.firstfocus;
            $(window).on('load', function() {
                $(thisone).focus();
            });
        }
    },

    load_shipping: function ( ) {
        //console.log('to load_shipping');
        var id = forms.Get('theForm', 'use_address');
        if( id ) {
            var data = shiplist[id];
            var fields = ['shipto','company','address','address2','city','state','zip','phone'];
            $.each( fields, function(i, k) {
               i=i;
               if( data[k] ) { forms.Set('theForm', k, data[k] ); }
               else { forms.Set('theForm', k, '' ); }

            });
        }
    },

	verifyAddress: function() {
		var address 	= $('#address').val();
		var apt 			= $('#address2').val();
		var address2 	= apt.replace(/[^a-z0-9]/gi,'');
		var city 		= $('#city').val();
		var state 		= $('#state').val();
		var zip 			= $('#zip').val();

		$.ajax({
			url: `https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=
					<AddressValidateRequest USERID="259GORHA1642">
						<Revision>1</Revision>
						<Address ID="0">
							<Address1>` + address2 + `</Address1>
							<Address2>` + address + `</Address2>
							<City>` + city + `</City>
							<State>` + state + `</State>
							<Zip5>` + zip + `</Zip5>
							<Zip4></Zip4>
						</Address>
					</AddressValidateRequest>`,
			type: 'GET',
			async: false,
			success: function(data) {
				var xmlString = (new XMLSerializer()).serializeToString(data);

				if( $(xmlString).find('Address2').text() 	) { $('#address').val( $(xmlString).find('Address2').text() ); }
				if( $(xmlString).find('Address1').text() 	) { $('#address2').val( $(xmlString).find('Address1').text() ); }
				if( $(xmlString).find('City').text() 		) { $('#city').val( $(xmlString).find('City').text() ); }
				if( $(xmlString).find('State').text() 		) { $('#state').val( $(xmlString).find('State').text() ); }
				if( $(xmlString).find('Zip5').text() && $(xmlString).find('Zip4').text() ) {
					$('#zip').val( $(xmlString).find('Zip5').text() + '-' + $(xmlString).find('Zip4').text() );
				}
			}
		});
    },

    bind_circles: function( that ) {
        // really should only be one .quote-tracker on any page... FLW, so we'll stick with a class instead of an id
        var circles = $('.quote-tracker').find('.tracker-circle');
  
        var allowed = this.allowed_circles;
  
        //console.log( JSON.stringify( allowed, null, 2 ));

        var here       = this.this_page;  // set at init() phase
        var here_class = 'tracker-circle-highlight';
        var which;

        $.each( circles, function( i, circle ){
            which = $(this).attr('data-here');
            if( which == here    ){
               $(this).addClass( here_class );
               return true;
            }
            if( ! allowed[which] ){ // sets visble text to gray
               $(this).find( 'button' ).attr("disabled", "disabled");
               $(this).find( 'span' ).css("color", "#ddd");
            }
        });

		var num_gaps 		= circles.length - 1;
		var num_enabled 	= circles.find( 'button:enabled' ).length - 1;
		var percentage 	= String(num_enabled / num_gaps * 100) + '%';

		$('.quote-tracker hr').css('background-image', 'linear-gradient(90deg, #437c4c ' + percentage + ', #ddd ' + percentage + ' 100%)');
		//$('.quote-tracker hr').css('background-image', 'linear-gradient(90deg, transparent, transparent 50%, #fff 50%, #fff 100%), linear-gradient(90deg, #437c4c ' + percentage + ', #eee ' + percentage + ' 100%)');
    },

    // specific to radio button selections
    bind_radios: function( that ){
		var that = this;

        var selected   		= 'quote-box-selected';
        var selections 		= $('.quote-selection-box');
		var big_checkbox 	= $('.big-checkbox');
		var labeled_switch 	= $('.labeled-switch > label');
		var parent   		= $('.radio-parent');
		var underlined   	= $('.underlined-switch');
		var addon	   		= $('.add-on-column label');
		var design_table	= $('label.design-table');

        // iniitalize, sort of
        $.each( selections, function( i, o ) {
            if( $(this).find('input').is(':checked') && !$(this).closest('.fadedout').length ){
               $(this).addClass( selected );
            }
        });

        $.each( design_table, function() {
           if( $(this).find('input').is( ':checked'  ) ){
                $(this).addClass( selected );
                $(this).find('img').hide();
                $(this).find('.fa-check').show();
                $(this).find('button span').html('Selected');
            }
        });

        $(selections).add(design_table).off();
        $(selections).add(design_table).on( 'click', function(e) {

        if( ( $(e.target).is(".quote-box-selected") || $(e.target).parents().is(".quote-box-selected") ) && $(e.currentTarget).find("input:radio").length ) { return false; }

			e.preventDefault();

            var box = $(this).closest('.radio-parent');

            if( !$(e.target).is(".quote-box-info i, .quote-box-info svg, .tooltip, .close, .x") && !$(box).find('.product-image').is(':animated') ) {                
				if( $(this).find('input').is(':checkbox') ) {
					var checkbox = $(this).find('input');
					checkbox.prop("checked", !checkbox.prop("checked")).change();

					if( checkbox.prop("checked") ) {
						$(this).addClass( selected );
					} else {
						$(this).removeClass( selected );
					}

                    if( $(box).parents().is('.flex-dropdown ') ) {
                        that.dropdownTitle(box);
                    }
				} else {
					$(box).find('input:radio').prop('checked', false);

					$(box).find('.quote-selection-box, .design-table').removeClass( selected );
                    $(box).find('.quote-selection-box:not(.color-swatch)').css("background", "");

					if( $(this).is(design_table) ) {
						$(box).find('.design-table').find('.image-circle, .design-title, button').removeAttr('style');
						$(box).find('.design-table:not(.recommend) img, .design-table.recommend .fa-star').fadeTo(0, 100);
						$(box).find('.design-table .fa-check').fadeTo(0, 0);
						$(box).find('.design-table button span').html('Select');
						//$(box).find('.design-table.recommend button span').html('Recommended');
					}

					$(this).addClass( selected );

					var radio = $(this).find('input:radio');
					$(radio).prop('checked', 'checked').change();
					$(radio).valid();
                    
                    if( $(box).parents().is('.flex-dropdown ') ) {
                        that.dropdownTitle(box, radio);
                    }

					if( $(this).is(design_table) ) {
						$(this).find('img, .fa-star').fadeTo(150, 0).promise().done(function() {
							$(box).find('.design-table.quote-box-selected .fa-check').fadeTo(150, 100);
						});
						$(this).find('button span').fadeTo(150, 0).promise().done(function() {
							$(box).find('.design-table.quote-box-selected button span').html('Selected').fadeTo(150, 1);
						});
					}
				}

			}

        });

		$(selections).on( 'mouseover', function(e) {
			if( !$(e.target).is(".tooltip, .close, .x, .quote-box-selected") && !$(this).is(".color-swatch") ) {
				$(this).css('background', '#d7e9d9');
			}
		}).mouseout(function(){
			if( !$(this).hasClass("quote-box-selected") && !$(this).is(".color-swatch") ) {
				$(this).css('background', '#ededed');
			}
		});

		$(design_table).on( 'mouseover', function(e) {
			if( !$(e.target).is(".tooltip, .close, .x, .quote-box-selected") && !$(e.target).parents().is(".quote-box-selected") ) {
				$(this).find('button, .design-title').css('background', '#d7e9d9');
			}
		}).mouseout(function(){
			if( !$(this).hasClass("quote-box-selected") ) {
				if( $(this).hasClass('recommend') ) {
					$(this).find('button, .design-title').css('background', '#dfeaf5');
				} else {
					$(this).find('button, .design-title').css('background', '#ededed');
				}
			}
		});

        $.each( big_checkbox, function() {
            if( $(this).find('input:not(.secret)').is( ':checked' ) ){
                $(this).closest('.icon-box').addClass( 'quote-box-selected' );
            }
        });

        $(big_checkbox).add(big_checkbox.parents('.icon-box')).on( 'click', function(e) {
            
            e.preventDefault();

			if( !$(e.target).is(".quote-box-info i, .quote-box-selected, .quotes-view-info") && !$(e.target).closest('.quote-box-selected').length ) {
                var label 	= $(this).closest('.icon-box');
                var box 	= label.closest('.radio-parent');

                $(box).find('input').prop('checked', false);

                $(box).find('.icon-box').removeClass( 'quote-box-selected' );
                label.addClass( 'quote-box-selected' );

                var input = $(this).find('input');
                if( input.attr('type') == 'checkbox' ) {
                   $(input).prop("checked", !input.prop('checked')).change();
                } else {
                    $(input).prop('checked', 'checked').change();
                }
                $(input).valid();

                if( $(box).parents().is('.flex-dropdown ') ) {
                    that.dropdownTitle(box, input);
                }
			}

        });

        //$(addon).off();
        $(addon).on( 'click', function(e) {

			e.preventDefault();

            var box = $(this).closest('.radio-parent');

			if( !$(e.target).is(".tooltip, .close, .x") ) {
                //UV Warning
                //if( $('.tab.selected').find('input:radio').attr('data-show') == 'cover-stock' && $('input[name=lamination][value=uv]').is(':checked') ) {
                //    if( ! confirm( 'UV is a liquid coating, which makes it vulnerable to scuffs on the cover and spine. We recommend Gloss for dark colored covers.' ) ){
                //       return false;
                //    }
                //}
                
				$(box).find('input:radio').prop('checked', false);

				$(box).find('.tab').removeClass( 'selected' );
				$(this).addClass( 'selected' );

				var radio = $(this).find('input:radio');
				$(radio).prop('checked', 'checked').change();
                
                if ( $(box).parent().hasClass('dropdown-tabs') ) {
                    var label;
                    
                    if( $(this).is( $('.tab').last() ) ) {
                        label = $('.long-btn.next-button').attr('data-go');
                        if ( label == 'review' ) {
                            label = 'Order Review';
                        }
                    } else if( $('.long-btn.next-button:contains("RETURN")').length == 0 ) {
                        label = $('.tab.selected').next('.tab').find('.sublabel').html();
                    }
                    
                    $('.long-btn.next-button').wrapInner('<span class="temp"></span>');
                    
                    $('.long-btn.next-button .temp').fadeTo(250, 0).promise().done(function() {
                        $('.long-btn.next-button .temp').html('Continue to <span class="bolded">' + label + '</span>');
                        $('.long-btn.next-button .temp').fadeTo(250, 1);
                    });
                } else {
                    $.each( $(box).find('.tab'), function() {
                        var show = $(this).find('input:radio').attr('data-show');
    
                        var spec_input = '';
                        var spec_val = '';
    
                        if( $('.' + show).find('select').length ) {
                            spec_val = $('.' + show).find('select').val();
                        } else if( $('.' + show).find('.design-table.quote-box-selected').length ) {
                            spec_val = $('.design-table.quote-box-selected .sublabel').text();
                        } else if( $('.' + show).find('.quote-box-selected input').length ) {
                            spec_input = $('.' + show).find('.quote-box-selected input');
    
                            if(spec_input.val() == 'pdf') {
                                spec_val = 'PDF Upload';
                            } else if(spec_input.val() == 'default') {
                                spec_val = 'Default';
                            } else if(spec_input.val() == '') {
                                if( spec_input.attr('name') == 'lamination') {
                                    spec_val = 'Not Included';
                                } else {
                                    spec_val = 'Not Selected';
                                }
                            } else if(spec_input.parent().is('.color-swatch')) {
                                spec_val = spec_input.val().replace('_', ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                            } else {
                                spec_val = $('label[for="' + spec_input.attr('id') + '"]').text();
                            }
                        } else if( $('.' + show).find('.labeled-switch.selected').length ) {
                            spec_input = $('.' + show).find('.labeled-switch.selected input');
    
                            if(spec_input.val() == '1') {
                                if( spec_input.attr('name') == 'cover_printed_proof') {
                                    spec_val = 'Printed Proof';
                                } else if( spec_input.attr('name') == 'wire_o') {
                                    spec_val = 'Wire-O';
                                } else {
                                    spec_val = 'Included';
                                }
                            } else if(spec_input.val() == '0') {
                                if( spec_input.attr('name') == 'cover_printed_proof') {
                                    spec_val = 'Digital Proof';
                                } else {
                                    spec_val = 'Not Included';
                                }
                            } else {
                                spec_val = $('label[for="' + spec_input.attr('id') + '"] h2').text();
                            }
                        } else {
                            spec_val = 'Not Selected';
                        }
    
                        spec_val = spec_val.charAt(0).toUpperCase() + spec_val.slice(1);
    
                        $(this).find('.extra').html(spec_val);
                        $(this).find('.extra').attr('title', spec_val);
                    });
    
                    $('.nav-section .dot').removeClass('selected');
                    $('.nav-section .dot').eq( $(this).index() ).addClass('selected');
    
                    if( $(this).is( $('.tab').last() ) ) {
                        $('.long-btn.next-button').parent().removeClass('hollow-button');
                    } else if( $('.long-btn.next-button:contains("RETURN")').length == 0 ) {
                        $('.long-btn.next-button').parent().addClass('hollow-button');
                    }
    
                    if( $(this).is( $('.tab').first() ) ) {
                        $('.long-btn.prev-button').parent().removeClass('hollow-button');
                    } else {
                        $('.long-btn.prev-button').parent().addClass('hollow-button');
                    }
                }
			}

        });

		$(addon).on( 'mouseover', function(e) {
			if( !$(e.target).is(".tooltip, .close, .x") ) {
				$(this).addClass('hovered');
			}
		}).mouseout(function(){
			if( !$(this).hasClass("quote-box-selected") ) {
				$(this).removeClass('hovered');
			}
		});

        $.each( parent, function() {
			var checked = $(this).find('.labeled-switch input:checked').length;
			if ( checked == 0 ) {
				$(this).find('.switch-highlight').hide();
			} else {
				$.each( labeled_switch, function() {
					if( $(this).find('input:radio').is( ':checked' ) ){
						var label 		= $(this).closest('.labeled-switch');
						var box 			= label.closest('.radio-parent');
						var highlight 	= box.find('.labeled-switch').length - label.index() - 1;

						label.addClass( 'selected' );
						$(box).find('.switch-highlight').css('right', String( (label.width() * highlight) + ( (parseInt(label.css('padding-left')) * 2) * highlight ) ) + 'px');
					}
				});
			}
        });

        $(labeled_switch).off();
        $(labeled_switch).on( 'click', function(e) {

			if( $(e.target).is(".quote-box-info") || $(e.target).parents('.labeled-switch').is(".selected") ) { return false; }

			e.preventDefault();

			var label 	= $(this).closest('.labeled-switch');
			var box 		= label.closest('.radio-parent');

			if( !$(box).find('.switch-highlight').is(':animated') && !$(this).is(':animated') ) {
				$(box).find('.labeled-switch input:radio').prop('checked', false);

				$(box).find('.labeled-switch').removeClass( 'selected' );
				label.addClass( 'selected' );

				var highlight = box.find('.labeled-switch').length - label.index() - 1;
				if( $(box).find('.switch-highlight').is(":hidden") ) {
					$(box).find('.switch-highlight').show();
					$(box).find('.switch-highlight').css('right', String( (label.width() * highlight) + ( (parseInt(label.css('padding-left')) * 2) * highlight ) ) + 'px');
				} else {
					$(box).find('.switch-highlight').animate({
								  'right': String( (label.width() * highlight) + ( (parseInt(label.css('padding-left')) * 2) * highlight ) ) + 'px'
								}, 300);
				}
				var input = $(this).find('input');
				$(input).prop('checked', 'checked').change();
				$(input).valid();
			}

        });

		$.each( underlined, function() {
            if( $(this).find('input:radio').is( ':checked'  ) ){
                $(this).addClass( 'selected' );
            }
        });

        $(underlined).off();
        $(underlined).on( 'click', function( ev ){

            var box = $(this).closest('.radio-parent');
   
            $(box).find('input:radio').prop('checked', false);
   
            $(box).find('.underlined-switch').removeClass( 'selected' );
            $(this).addClass( 'selected' );
   
            var radio = $(this).find('input:radio');
            $(radio).prop('checked', 'checked').change();

        });
        
        $('.dropdown-title').click(function(e) {
            if( !$(e.target).is(".quote-box-info i, .quote-box-info span") && !$(this).siblings('.select-toggle').is(':animated') && $(this).parent('.flex-dropdown').css('opacity') == 1 ) {
                if( !$( this ).hasClass('opened') ) {
                    $( '.dropdown-title.opened' ).find('.edit-arrow').fadeTo(250, 0).promise().done(function() {      
                        $( this ).html('<i class="fas fa-chevron-down"></i><br/>edit').fadeTo(250, 1);
                    });          
                    $('.dropdown-title.opened').removeClass('opened').siblings('.select-toggle').slideUp(500);
          
                    $( this ).find('.edit-arrow').fadeTo(250, 0).promise().done(function() {
                        $( this ).html('<i class="fas fa-chevron-up"></i><br/>close').fadeTo(250, 1);
                    });
                    $( this ).addClass('opened').siblings('.select-toggle').slideDown(500);  
                } else {
                    $( this ).find('.edit-arrow').fadeTo(250, 0).promise().done(function() {      
                        $( this ).html('<i class="fas fa-chevron-down"></i><br/>edit').fadeTo(250, 1);
                    });          
                    $( this ).removeClass('opened').siblings('.select-toggle').slideUp(500);
                }
            }
        });

	},

    bind_checkboxes: function( that ){
 
 
    },

    bind_tooltip: function() {

		var that = this;

		$(window).on('load', function () {
			that.tooltipPos();
		});

		window.onclick = function(event) {
			if( !$(event.target).is('.tooltip') && $('.tooltip').is(':visible') ) {
				$('.tooltip:visible:not(:animated)').fadeOut(250);
			}
		};

    },

	bind_price: function(){
        
        that = this;
        
        var quantity	    = $('.books-spec').length ? $('.books-spec').text() : '';    
        if ( quantity.indexOf('+') >= 0 ) {
            quantity        = parseFloat(quantity.split("+")[0]) + parseFloat(quantity.split("+")[1]);
        } else {
            quantity        = parseFloat(quantity);
        }
        
        var baseline 	    = parseFloat($('.prod-cost').text().replace("$", ""));
        var ebook_base 	    = parseFloat($('.ebook-cost').text().replace("$", ""));
        var design_base 	= parseFloat($('.design-cost').text().replace("$", ""));

		$('.price-update').change(function() {
			if( !$(this).hasClass('no-update') ) {
				var new_base        = baseline;
                var new_design_base	= design_base;
                
                [new_base, new_design_base] = that.prod_price( new_base, new_design_base );
                new_design_base             = that.design_price( new_design_base );
                    
				if( new_design_base != parseFloat($('.design-cost').text().replace("$", "")) ) {
                    $('.design-cost').fadeTo(250, 0).promise().done(function() {
                        $('.design-cost').html('<span>$</span>' + new_design_base.toFixed(2));
                        $('.design-cost').fadeTo(250, 1);
                    });
                }

                if( new_base != parseFloat($('.prod-cost').text().replace("$", "")) ) {
                    $('.prod-cost').fadeTo(250, 0).promise().done(function() {
                        $('.prod-cost').html('$' + new_base.toFixed(2));
                        $('.prod-cost').fadeTo(250, 1);
                    });
                    
                    diff = (new_base / quantity).toFixed(2);

                    $('.perbook-price').fadeTo(250, 0).promise().done(function() {
                        $('.perbook-price span').html('$' + diff);
                        $('.perbook-price').fadeTo(250, 1);
                    });
                }

				var ebook_cost 	= parseFloat($('.ebook-cost').text().replace("$", ""));
				var design_cost = new_design_base;
				
				var subtotal = (new_base + design_cost + ebook_cost).toFixed(2);
                if( parseFloat($('.subtotal-cost').text().replace("$", "")) != subtotal ) {
                    $('.subtotal-cost').fadeTo(250, 0).promise().done(function() {
                        $('.subtotal-cost').html('<span>$</span>' + subtotal);
                        $('.subtotal-cost').fadeTo(250, 1);
                    });
                }
			}
		});
        
        $('.ebook-update').change(function() {
			if( !$(this).hasClass('no-update') ) {
				var new_ebook_base	= ebook_base;

                new_ebook_base = that.ebook_price( new_ebook_base );

				$('.ebook-cost').fadeTo(250, 0).promise().done(function() {
					$('.ebook-cost').html('<span>$</span>' + new_ebook_base.toFixed(2));
					$('.ebook-cost').fadeTo(250, 1);
				});

				var prod_cost 	= parseFloat($('.prod-cost').text().replace("$", ""));
				var design_cost = parseFloat($('.design-cost').text().replace("$", ""));
				
				var subtotal = (prod_cost + design_cost + new_ebook_base).toFixed(2);
                if( parseFloat($('.subtotal-cost').text().replace("$", "")) != subtotal ) {
                    $('.subtotal-cost').fadeTo(250, 0).promise().done(function() {
                        $('.subtotal-cost').html('<span>$</span>' + subtotal);
                        $('.subtotal-cost').fadeTo(250, 1);
                    });
                }
			}
		});
        
        $('.design-update').change(function() {
			if( !$(this).hasClass('no-update') ) {
				var new_design_base	= design_base;
                var new_base        = baseline;

                [new_base, new_design_base] = that.prod_price( new_base, new_design_base );
                new_design_base             = that.design_price( new_design_base );

				$('.design-cost').fadeTo(250, 0).promise().done(function() {
					$('.design-cost').html('<span>$</span>' + new_design_base.toFixed(2));
					$('.design-cost').fadeTo(250, 1);
				});

				var prod_cost 	= parseFloat($('.prod-cost').text().replace("$", ""));
				var ebook_cost  = parseFloat($('.ebook-cost').text().replace("$", ""));

                var subtotal = (prod_cost + ebook_cost + new_design_base).toFixed(2);
                if( parseFloat($('.subtotal-cost').text().replace("$", "")) != subtotal ) {
                    $('.subtotal-cost').fadeTo(250, 0).promise().done(function() {
                        $('.subtotal-cost').html('<span>$</span>' + subtotal);
                        $('.subtotal-cost').fadeTo(250, 1);
                    });
                }
			}
		});

   	},
    
    prod_price: function( new_base, new_design_base ) {
        $.each( $('.radio-parent:has(.price-update)'), function() {
            var starting		= 0;
            var selected		= 0;
            
            var starting_design	= 0;
            var selected_design	= 0;

            $.each( $(this).find('input.price-update:checked'), function() {
                var selected_add	= 0;

                if( $(this).closest('label').attr('data-bleeds') && $('input[name="bleeds"]:checked').val() == '1' ) {
                    selected_add = parseFloat($(this).closest('label').attr('data-bleeds'));
                } else {
                    selected_add = parseFloat($(this).closest('label').attr('data-content'));
                }
                
                if( $(this).closest('label').attr('data-design') ) {                            
                    var selected_design_add = parseFloat($(this).siblings().closest('label').attr('data-design'));
                
                    selected_design = selected_design + selected_design_add;
                }

                selected = selected + selected_add;
            });

            $.each( $(this).find('.starting-stock'), function() {
                var starting_add	= 0;

                if( $(this).attr('data-bleeds') && $('input[name="bleeds"][value="1"').parent('label').hasClass('starting-stock') ) {
                    starting_add = parseFloat($(this).attr('data-bleeds'));
                } else {
                    starting_add = parseFloat($(this).attr('data-content'));
                }
                
                if( $(this).attr('data-design') ) {
                    var starting_design_add = parseFloat($(this).attr('data-design'));
                
                    starting_design = starting_design + starting_design_add;
                }

                starting = starting + starting_add;
            });

            new_base = new_base - starting + selected;
            
            new_design_base = new_design_base - starting_design + selected_design;
        });
        
        return [new_base, new_design_base];
    },
    
    design_price: function( new_design_base ) {
        $.each( $('.radio-parent:has(.design-update)'), function() {
            var starting		= 0;
            var selected		= 0;

            $.each( $(this).find('input.design-update:checked'), function() {
                var selected_add = parseFloat($(this).siblings().closest('label').attr('data-content'));
                
                selected = selected + selected_add;
            });

            $.each( $(this).find('.starting-stock'), function() {
                var starting_add = parseFloat($(this).attr('data-content'));
                
                starting = starting + starting_add;
            });

            new_design_base = new_design_base - starting + selected;
        });
        
        return new_design_base;
    },
    
    ebook_price: function( new_ebook_base ) {
        $.each( $('.radio-parent:has(.ebook-update)'), function() {
            var starting		= 0;
            var selected		= 0;

            $.each( $(this).find('input.ebook-update:checked'), function() {
                var selected_add = parseFloat($(this).closest('label').attr('data-content'));
                
                selected = selected + selected_add;
            });

            $.each( $(this).find('.starting-stock'), function() {
                var starting_add = parseFloat($(this).attr('data-content'));
                
                starting = starting + starting_add;
            });

            new_ebook_base = new_ebook_base - starting + selected;
        });
        
        return new_ebook_base;
    },

   	toggle: function( obj ){
		//var hides = [];

		//console.log('to toggle');
		var hide   	= $(obj).attr('data-hide');
		var show   	= $(obj).attr('data-show');
		var toggle 	= $(obj).attr('data-toggle');
		var fadeout = $(obj).attr('data-fadeout');
		var fadein 	= $(obj).attr('data-fadein');

		if ( toggle ) {
			 $('#' + toggle ).toggle(500);
			 return true;
		}

		if( $(obj).next('.quote-slider').hasClass('reversed') ) {
			[hide, show] = [show, hide];
		}

		if( $(obj).is(':checkbox') && !$(obj).is(':checked') ) {
			[hide, show] = [show, hide];
		}

		if ( hide && show ) {
			var list1 = hide.split(',');
			var list2 = show.split(',');

			this.toggleFade( list1, list2, obj );
		} else {
			if ( hide ) { this.hideList( hide.split(',') );  }

			if ( show ) { this.showList( show.split(',') );  }
		}

		if ( fadeout ) { this.fadeoutList( fadeout.split(',') );  }

		if ( fadein ) { this.fadeinList( fadein.split(',') );  }

		if ( $(obj).parent().hasClass('quote-switch') ) {
			$(obj).prop( "disabled", true );
			setTimeout(function() {
				  $(obj).prop( "disabled", false );
			}, 500);
		}

		//this.bind_page_nav();
		return true;
   	},

	hideList: function(list) {
		 $.each( list, function( i, v ) {
			  i = i;
			  if( v ) {
					//console.log('hiding ' + v );
					$('.' + v ).hide(500);
			  }
		 });
	},

	showList: function(list) {
		$.each( list, function( i, v ) {
			i = i;
			if( v ) {
				//console.log('showing ' + v )
				$('.' + v ).show(500);
			}
		});
	},

   toggleFade: function(list1, list2, obj) {
			var that = this;

			$.each( list1, function( i, v ) {
				$('.' + v ).stop();
			});

			$.each( list1, function( i, v ) {
            i = i;
            if( v ) {
				if( $(obj).hasClass('flex-force') ) {
					if( $('.' + v ).parents('.select-toggle').is(':visible') ) {
						$('.' + v ).parents('.select-toggle').slideUp(500).promise().done(function() {   
							$('.' + v ).css('display','none');
							$.each( list2, function( i, v ) {
								i = i;
								if( v ) {	
									if( $('.' + v ).is('.flex-selections') ) {
										$('.' + v ).css('display','flex');
									} else {
										$('.' + v ).css('display', 'block');
									}
								}
							});
							$('.' + v ).parents('.select-toggle').slideDown(500);
						});
					} else {
						$('.' + v ).css('display','none');
						$.each( list2, function( i, v ) {
							i = i;
							if( v ) {	
								if( $('.' + v ).is('.flex-selections') ) {
									$('.' + v ).css('display','flex');
								} else {
									$('.' + v ).css('display', 'block');
								}
							}
						});
					}
				} else if( $('.' + v ).is(':visible') ) {
					$('.' + v ).fadeTo(250, 0).promise().done(function() {
						$('.' + v ).hide(0);
						$.each( list2, function( i, v ) {
							i = i;
							if( v ) {
								$('.' + v ).fadeTo(250, 1);

								if( $(obj).parent().is('.tab') ) {
									that.alertPos();
									that.tooltipPos();
								}

								if( $('.' + v ).is('label') ) {
										$('.' + v ).css('display', 'block');
								} else if( $('.' + v ).is('.portrait, .landscape, .cover-design-levels, .text-design-levels') ) {
									$('.' + v ).css('display', 'flex');
								}
							}
						});
					});
				}
            }
        });
    },

	fadeoutList: function(list) {
		var that    = this;

		 $.each( list, function( i, v ) {
			i = i;
			if( v && $('.' + v ).css('opacity') == 1 ) {
				$('.' + v ).animate({opacity:0.3}, 300);

				if( $('.' + v ).parents().is('.flex-dropdown ') && $('.' + v ).find('input:not(.secret):checked').length ) {
					$('.' + v ).find('input:not(.secret):checked').prop( "checked", false );
					var box = $('.' + v ).closest('.radio-parent');
					that.dropdownTitle(box);
				} else {
					$('.' + v ).find('input[type=radio]:not(.secret), input[type=checkbox]:not(.secret)').prop( "checked", false );
				}

				//$('.' + v ).find('input[type=text]').val('');
				$('.' + v ).find('input, label, select, textarea, .icon-box, .quote-box-info i, .quote-box-info svg, button, .dropdown-title').css('pointer-events', 'none');
				$('.' + v ).find('.quote-selection-box, .design-table, .icon-box').removeClass('quote-box-selected');
				$('.' + v ).find('.design-table:not(.recommend) img, .design-table.recommend .fa-star').fadeTo(300, 100);
				$('.' + v ).find('.design-table .fa-check').fadeTo(300, 0);
				$('.' + v ).find('.design-table button span').html('Select');
				//$('.' + v ).find('.design-table.recommend button span').html('Recommended');
			}
		});
	},

	fadeinList: function(list) {
		$.each( list, function( i, v ) {
			i = i;
			if( v ) {
				if( $('.' + v ).css('opacity') != 1 ) {
					//console.log('showing ' + v )
					$('.' + v ).animate({opacity:1}, 300);
					$('.' + v ).find('input, label, select, textarea, .icon-box, .quote-box-info i, .quote-box-info svg, button, .dropdown-title').css('pointer-events', 'auto');
					$('.' + v ).find('input:checked').parents('.quote-selection-box').addClass('quote-box-selected');
					$('.' + v ).find('.tooltip').animate({opacity:1}, 300);
				}
			}
		});
	},

   	tooltipPos: function() {

		$('.tooltip:visible, .tooltip.initial').each(function() {
			var tooltip_pos	= $(this).parent().find('.tooltip-pos');
			var top 				= tooltip_pos.offset().top;
			top 					+= ( tooltip_pos.outerHeight() / 2 );
			var left 			= tooltip_pos.offset().left;
			var adjust 			= 46;

			if( tooltip_pos.is('.tab') ) { adjust = tooltip_pos.outerWidth() * 0.95; }

			if( $('.tooltip').is('.spec-tooltip') ) { adjust = -215; }

			$(this).css({
				 top: top +"px",
				 left: (left + adjust) + "px"
			});

			if( $(this).hasClass('initial') ) {
				$(this).fadeTo(250, 1).promise().done(function() {
					$(this).removeClass('initial');
				});
			}
		});

   	},

	alertPos: function() {
		$('.alert-pos').find('.top').removeClass('top');
		$('.alert-pos').find('.bottom').removeClass('bottom');

		$('.alert-pos > div:visible').has('div:visible').first().find('div:visible:not(:empty)').addClass('top');
		$('.alert-pos > div:visible').has('div:visible').last().find('div:visible:not(:empty)').addClass('bottom');
	},

	clearShipping: function( formID ) {
		 formID = formID ? formID : 'theForm';
		 forms.clearForm(formID);
	},

	resetShipping: function( ){
		$('.shipping_fields input').val(function() {
			return this.defaultValue;
		});

		$('.shipping_fields select option').prop('selected', function() {
			return this.defaultSelected;
		});
	},

	dropdownTitle: function( box, radio ) {
		var dropdown = $(box).parents('.flex-dropdown');
		var label;
		var text_area;

		if( radio != undefined ) {
            if( $(radio).closest('.icon-box').length ) {
                label = $(radio).attr('title');
            } else {
                var id  = $(radio).attr('id');
                label   = $('#' + id + '_label').text();
                
                if( $(radio).parents('.floating-box').find('.extra.font-orange').length ) {
                    $(dropdown).find('.rec-select').find('i').delay(250).fadeTo(250, 1);
                } else {
                    $(dropdown).find('.rec-select').find('i').fadeTo(250, 0);
                }
            }
		} else {
            $(dropdown).find('.rec-select').find('i').fadeTo(250, 0);
			var length  = $(box).find('input:checked').length;
			if ( length == 0 ) {
				label = 'None';
			} else {
				var plural  = length == 1 ? '' : 's';
				label       = length + ' Feature' + plural;
			}
		}

		text_area = $(dropdown).find('.rec-select').find('.font-green');
		$(text_area).fadeTo(250, 0).promise().done(function() {
			$(text_area).html(label).fadeTo(250, 1);
		});
	},

    radio_names: {
        'binding'       : true,
        'text_stock_id' : true,
        'cover_stock_id': true,
        'spiral_color'  : true,
        'cover_mat_code': true,
        'foil_color'    : true
    },

    //select_names: {
    //    'foil_color': true
    //},

    //hacks: {
    //    'trim':   'set_orientation',
    //    'design': 'set_design',
    //},

    get_params: function( page, obj ) {
        var form    = this.form_ID;        
        
        var params  =  $(form).serializeArray();
        
        var that    = this;

        $.each( params, function( i, k ) {
            i=i;
            var name = k.name;
            if ( that.radio_names[name] ) {
                var txt = that.get_radio_name( name );
                if( txt ) {  // pl, foil, and dj won't have labels, so...
                    name = name.replace( /_id$/, '');
                    //console.log( 'name is ' + name );
                    var col = name + '_name';
                    params.push( { name: col, value: txt } );
                }
            }
            //if( that.select_names[name] ) {
            //    var optxt = $( '#' + name + ' option:selected' ).text();
            //    var tname = name + '_name';
            //    params.push( { name: tname, value: optxt } );
            //}
            return true;
        });

        //if( that.hacks[page] ) {
        //    //console.log('page is ' + page );
        //    var func = that.hacks[page];
        //    //console.log( 'func is ' + func);
        //    params = that[func]( params );
        //}

        var ret = $(obj).attr('data-return');
        var act = $(obj).attr('data-action');
        if ( ret ) { params.push( { 'name': 'return_to', 'value': ret } ); }
        if ( act ) { params.push( { 'name': 'action', 'value': act } ); }

        return params;
    },

    get_radio_name: function( name ) {
        var id  = '';
        var txt = ''; //name=name_of_your_radiobutton
        $("input[name='" + name + "']:checked").each(function() {
            id = $(this).attr( 'id' );
            txt = $('label[for="' + id + '"]').text();
        });
        return txt;
    },

};