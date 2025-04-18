  <!-- FOOTER / COPYRIGHT -->

  <div class="grid-100 black newsletter-footer text-center">
        <div class="main-width-constraint-noedge zero text-left">
            <div class="grid-100 vspace-2em">&nbsp;</div>

            <div class="box-035 zero first">
                <div class="grid-050 link-list">
                    <h4>Quick Links</h4>

                    <a href="/">Home</a>
                    <a href="our-mission.php">Our Mission</a>
                    <a href="contact-us.php">Contact Us</a>
                </div>

                <div class="grid-050 link-list">
                    <h4>Services</h4>

                    <a href="book-printing.php">Book Printing</a>
                    <a href="book-design.php">Book Design</a>
                    <a href="ebooks.php">EBooks</a>
                </div>

                <div class="grid-100 vspace-1em"></div>
            </div>

            <div class="box-020">
                
            </div>

            <div class="box-045 last">
                <h4>Contact</h4>

                <p><i class="fas fa-phone"></i> &nbsp; <a href="<?php echo PHONE_HREF; ?>"><?php echo PHONE; ?></a></p>
                <p><i class="fas fa-envelope"></i> &nbsp; <a href="mailto:<?php echo ADMIN_EMAIL; ?>"><?php echo ADMIN_EMAIL; ?></a></p>
                <p><i class="fas fa-map-marker-alt"></i> &nbsp; <?php echo ADDRESS; ?></p>

                <a href="javascript:;"><i
                        class="fab fa-facebook-square fa-fw"></i></a>
                <a href="javascript:;"><i class="fab fa-twitter-square fa-fw"></i></a>
                <a href="javascript:;"><i class="fab fa-pinterest fa-fw"></i></a>
                <a href="javascript:;"><i class="fab fa-instagram fa-fw"></i></a>

                <p>&#169; 2025 <?php echo WEBSITE_NAME; ?>. All rights reserved. <a href="privacy_policy.php">Privacy
                        Statement</a></p>
            </div>
        </div>

        <div class="grid-090">
            <a href="#page-top" class="right fontsize-090">Back to Top &nbsp;<i class="fas fa-arrow-up"></i></a>
        </div>

        <div class="grid-100 vspace-1em"></div>
    </div>

    <script>

        $(document).ready(function () {
            $('.quotes-view-info').off();
            $('.quotes-view-info').on('mouseup touch', function (e) {
                if (!$(e.target).is(".tooltip, .close, .x")) {
                    // we have an id, let's use it...
                    var id = $(this).attr('data-id');
                    var info = $('#' + id);
                    var pos = $(info).position();

                    if (pos.left < 0) {
                        $('.quote-modal').css("left", '0px');
                        if ($(info).hasClass('sticky-cursor')) {
                            var hor = $(this).offset().left - ($(info).width() / 2);
                            var ver = $(this).offset().top - ($(info).height() / 2);
                            $(info).css("left", hor + 'px').css("top", ver + 'px');
                        } else {
                            $(info).css("left", '50%').css("top", '50%').css('transform', 'translate(-50%, -40%)');
                        }
                    }
                    else {
                        $(info).css("left", '-6000px');
                        $('.quote-modal').css("left", '-6000px');
                    }
                }
            });

            var selected = 'quote-box-selected';
            var selections = $('.quote-selection-box');

            $.each(selections, function (i, o) {
                if ($(this).find('input').is(':checked') && !$(this).parents().hasClass('fadedout')) {
                    $(this).addClass(selected);
                }
            });

            $(selections).off();
            $(selections).on('click', function (e) {

                if (($(e.target).is(".quote-box-selected") || $(e.target).parents().is(".quote-box-selected")) && $(e.currentTarget).find("input:radio").length) { return false; }

                e.preventDefault();

                var box = $(this).closest('.radio-parent');

                if (!$(e.target).is(".quote-box-info i, .quote-box-info svg, .tooltip, .close, .x") && !$(box).find('.product-image').is(':animated')) {
                    if ($(this).find('input').is(':checkbox')) {
                        var checkbox = $(this).find('input');
                        checkbox.prop("checked", !checkbox.prop("checked")).change();

                        if (checkbox.prop("checked")) {
                            $(this).addClass(selected);
                        } else {
                            $(this).removeClass(selected);
                        }

                    } else {
                        $(box).find('input:radio').prop('checked', false);

                        $(box).find('.quote-selection-box, .design-table').removeClass(selected);
                        $(box).find('.quote-selection-box:not(.color-swatch)').css("background", "");

                        $(this).addClass(selected);

                        var radio = $(this).find('input:radio');
                        $(radio).prop('checked', 'checked').change();
                        $(radio).valid();
                    }

                }

            });

            $(selections).on('mouseover', function (e) {
                if (!$(e.target).is(".tooltip, .close, .x, .quote-box-selected") && !$(this).is(".color-swatch")) {
                    $(this).css('background', '#d7e9d9');
                }
            }).mouseout(function () {
                if (!$(this).hasClass("quote-box-selected") && !$(this).is(".color-swatch")) {
                    $(this).css('background', '#fff');
                }
            });

            var labeled_switch = $('.labeled-switch > label');

            $(labeled_switch).off();
            $(labeled_switch).on('click', function (e) {

                if ($(e.target).is(".quote-box-info") || $(e.target).parents().is(".selected")) { return false; }

                e.preventDefault();

                var label = $(this).closest('.labeled-switch');
                var box = label.closest('.radio-parent');

                if (!$(box).find('.switch-highlight').is(':animated') && !$(this).is(':animated')) {
                    $(box).find('.labeled-switch input:radio').prop('checked', false);

                    $(box).find('.labeled-switch').removeClass('selected');
                    label.addClass('selected');

                    var highlight = box.find('.labeled-switch').length - label.index() - 1;
                    if ($(box).find('.switch-highlight').is(":hidden")) {
                        $(box).find('.switch-highlight').show();
                        $(box).find('.switch-highlight').css('right', String((label.width() * highlight) + ((parseInt(label.css('padding-left')) * 2) * highlight)) + 'px');
                    } else {
                        $(box).find('.switch-highlight').animate({
                            'right': String((label.width() * highlight) + ((parseInt(label.css('padding-left')) * 2) * highlight)) + 'px'
                        }, 300);
                    }
                    var input = $(this).find('input');
                    $(input).prop('checked', 'checked').change();
                    $(input).valid();
                }

            });

            var big_checkbox = $('.big-checkbox');

            $.each(big_checkbox, function () {
                if ($(this).find('input:not(.secret)').is(':checked')) {
                    $(this).closest('.icon-box').addClass('quote-box-selected');
                }
            });

            $(big_checkbox).add(big_checkbox.parents('.icon-box')).on('click', function (e) {

                e.preventDefault();

                if (!$(e.target).is(".quote-box-info i, .quote-box-selected, .quotes-view-info") && !$(e.target).closest('.quote-box-selected').length) {
                    var label = $(this).closest('.icon-box');
                    var box = label.closest('.radio-parent');

                    $(box).find('input').prop('checked', false);

                    $(box).find('.icon-box').removeClass('quote-box-selected');
                    label.addClass('quote-box-selected');

                    var input = $(this).find('input');
                    if (input.attr('type') == 'checkbox') {
                        $(input).prop("checked", !input.prop('checked')).change();
                    } else {
                        $(input).prop('checked', 'checked').change();
                    }
                    $(input).valid();

                    if ($(box).parents().is('.flex-dropdown ')) {
                        that.dropdownTitle(box, input);
                    }
                }

            });

            freeShip(1);
            trimCheck();
            materialCheck(1);
            checklist();

            $('input[name="binding"]').change(function () {
                freeShip();
                materialCheck();
                checklist();

                var binding = $(this).val();
                $('select[name="binding-select"]').val(binding);
            });

            $('select[name="binding-select"]').change(function () {
                var binding = $(this).val();
                $('input[name="binding"][value="' + binding + '"]').parents('.quote-selection-box').trigger("click");
            });

            $('input[name="material"]').change(function () {
                materialCheck();
                checklist();

                var binding = $('input[name="binding"]:checked').val();
                materialMatch(binding);
            });

            $('select[name="hardcover-material-select"], select[name="spiral-material-select"]').change(function () {
                var material = $(this).val();
                $('input[name="material"][value="' + material + '"]').parents('.quote-selection-box').trigger("click");
            });

            $('select[name="trim-select"]').change(function () {
                trimCheck();
                checklist();
            });

            $('select[name="genre"]').change(function () {
                checklist();
                materialCheck();
            });

            $('input[name="ebook"]').change(function () {
                checklist();
            });

            $('input[name="custom-trim"]').change(function () {
                $('#trim_w').val(0);
                $('#trim_h').val(0);
                $("#trim-select option:eq(0)").prop("selected", true);

                if ($(this).is(':checked')) {
                    $('.trim-dropdown').fadeTo(250, 0).promise().done(function () {
                        $(this).hide();
                        $('.trim-sizes').css('display', 'inline-block').hide().fadeTo(250, 1);
                    });
                } else {
                    $('.trim-sizes').fadeTo(250, 0).promise().done(function () {
                        $(this).hide();
                        $('.trim-dropdown').css('display', 'inline-block').hide().fadeTo(250, 1);
                    });
                }
            });

            $('#trim_w, #trim_h').on(
                'input', function () {
                    checklist();
                });

            $('#black_pages, #color_pages').on(
                'input', function (ev) {
                    ev = ev;
                    var black = parseInt($('#black_pages').val());
                    var color = parseInt($('#color_pages').val());

                    black = black ? black : 0;
                    color = color ? color : 0;

                    $('#black_pages').val(black).removeClass('input-alert');
                    $('#color_pages').val(color).removeClass('input-alert');

                    var pages = black + color;
                    $('#pages').val(pages);

                    checklist();
                }
            );

            $('#black_pages, #color_pages').on(
                'blur', function () {
                    if ($('#pages').val()) {
                        $('#pages').valid();
                    }
                }
            );

            $('#books').on(
                'input', function (ev) {
                    ev = ev;
                    var books = parseInt($('#books').val());

                    books = books ? books : 0;

                    $('#books').val(books);

                    freeShip();
                    checklist();
                }
            );

            $('#customize-button').on('click', function () {
                var form = $("#theForm");

                var validator = $(form).validate();

                var canGo = false;
                var params = '';

                canGo = validator.form();
                if (canGo) {

                    params = baseParams(form);

                    var data = '';
                    $(params).each(function (j, o) {
                        j = j;
                        data += '<input type="hidden" name="' + o.name + '" value="' + o.value + '">';
                    });

                    $('<form id="tmp" action="' + 'quoting/quote/paper' + '" method="POST">' + data + '</form>').appendTo('body').submit().remove();

                    return false;
                }
            });

            $('#save-button').on('click', function () {
                var form = $("#theForm");

                var validator = $(form).validate();

                var canGo = false;
                canGo = validator.form();
                if (canGo) {
                    $('.quote-modal').css("left", '0px');
                    $('#save-modal').css("left", '50%').css("top", '50%').css('transform', 'translate(-50%, -50%)');
                }
            });
        });

        window.addEventListener("click", function (event) {
            if ($(event.target).is('.quote-modal')) {
                $('.quote-modal > .quote-info-box').css("left", '-6000px');
                $('.quote-modal').css("left", '-6000px');
            }
        });

        function materialMatch(binding) {
            var material = $('input[name="material"]:checked').val();
            $('select[name="' + binding + '-material-select"]').val(material);
        }

        function saveSend() {
            var form = $("#book-title-form");

            var validator = $(form).validate();

            var canGo = false;
            var params = '';

            canGo = validator.form();
            if (canGo) {
                params = $(form).find('input').serializeArray();
                params = params.concat(baseParams('#theForm'));

                var data = '';
                $(params).each(function (j, o) {
                    j = j;
                    data += '<input type="hidden" name="' + o.name + '" value="' + o.value + '">';
                });

                $('<form id="tmp" action="' + 'quoting/quote/save' + '" method="POST">' + data + '</form>').appendTo('body').submit().remove();

                return false;
            }
        }


        function baseParams(form) {
            if ($('#pages').val() % 2 != 0) {
                var num = 0;
                if ($('#color_pages').val() == 0) {
                    num = +$('#black_pages').val() + 1;
                    $('#black_pages').val(num);
                } else {
                    num = +$('#color_pages').val() + 1;
                    $('#color_pages').val(num);
                }
                var total_num = +$('#pages').val() + 1;
                $('#pages').val(total_num);
            }

            params = $(form).find('input:not(input[name=binding]), select:not(select[name=trim-select])').serializeArray();

            var binding = $('input[name="binding"]:checked').val();
            var material = $('input[name="material"]:checked').val();

            var cover_mat_code = '';
            var cover_mat_name = '';
            if (binding == 'hardcover') {
                if (material != 'printed') {
                    binding = 'hardcover_foil';
                } else {
                    binding = 'hardcover_pl';
                }

                if (material == 'cloth') {
                    cover_mat_code = 'fabric_BL-10050';
                    cover_mat_name = 'Canvas Linen';
                } else if (material == 'imleather') {
                    cover_mat_code = 'imleather_78369';
                    cover_mat_name = 'Dark Brown';
                }
            }

            var binding_name = '';
            switch (binding) {
                case 'perfect': binding_name = 'Softcover'; break;
                case 'spiral': binding_name = 'Spiral Bound'; break;
                case 'hardcover_pl': binding_name = 'Printed Hardcover'; break;
                case 'hardcover_foil': binding_name = 'Cloth Bound Hardcover'; break;
                case 'hardcover_dj': binding_name = 'Cloth Hardcover with Dustjacket'; break;
            }

            var trim_w = $('input[name="trim_w"]').val();
            var trim_h = $('input[name="trim_h"]').val();
            var trim = trim_w + 'x' + trim_h;

            var orientation = parseFloat(trim_w) > parseFloat(trim_h) ? 'landscape' : 'portrait';

            params.push({ name: 'binding', value: binding });
            params.push({ name: 'binding_name', value: binding_name });
            params.push({ name: 'trim', value: trim });
            params.push({ name: 'cover_mat_code', value: cover_mat_code });
            params.push({ name: 'cover_mat_code_name', value: cover_mat_name });
            params.push({ name: 'orientation', value: orientation });

            if (material == 'wire-o') {
                params.push({ name: 'wire_o', value: '1' });
            }

            //params.push({name: 'qqqq', value: '1'});

            return params;
        }

        function testScroll() {
            if (!$('.home-testimonial').is(':animated')) {
                $('.home-testimonial:nth-last-child(3)').css('display', 'inline-block');
                $('.home-testimonial:visible').animate({
                    left: '+=32em'
                }, 500);

                setTimeout(testAppend, 500);
            }
        }

        function testAppend() {
            $('.testimonial-slider').prepend('<div class="home-testimonial text-left zero hidden">' + $('.home-testimonial:last-child').html() + '</div>');
            $('.home-testimonial:last-child').remove();
        }

        function calcBooks() {

            var form = $("#theForm");

            var validator = $(form).validate();

            var canGo = false;
            var params = '';

            canGo = validator.form();
            if (canGo) {
                params = $(form).serialize();
                params += '&calculate=1';
            }

            if (params) {
                $.ajax({
                    url: '',
                    data: params,
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    async: true,
                    beforeSend: function () { $('.spinner').show(); },
                    complete: function () { $('.spinner').hide(); },
                    error: function () {
                        alert('Unknown error: please try again.');
                    },
                    success: function (data) {
                        dataLayer.push({ 'event': 'quick-quote' });
                        ebookUpdate();
                        var totals = data.totals;
                        if (totals.perbook) {
                            $('.real-price').stop().fadeTo(250, 0).promise().done(function () {
                                if (totals.perbook == 0.00) {
                                    $('.real-price').addClass('font-d-gray').removeClass('font-black');
                                } else {
                                    $('.real-price').addClass('font-black').removeClass('font-d-gray');
                                }

                                $('.real-price').html('<span>$</span>' + totals.perbook).fadeTo(250, 1);
                            });
                        }
                        if (totals.nodiscount_perbook != totals.perbook) {
                            $('.quote-price-font .discount').stop().fadeTo(250, 0).promise().done(function () {
                                $('.quote-price-font .discount').html(data.totals.nodiscount_perbook).fadeTo(250, 1);
                            });
                        } else {
                            $('.quote-price-font .discount').stop().fadeTo(250, 0).promise().done(function () {
                                $('.quote-price-font .discount').html('');
                            });
                        }
                        if (data.bulk) {
                            $('.bulk').stop().fadeTo(250, 0).promise().done(function () {
                                $('.bulk').html(data.bulk).fadeTo(250, 1);
                            });
                        } else {
                            $('.bulk').stop().fadeTo(250, 0).promise().done(function () {
                                $('.bulk').html('');
                            });
                        }
                        if (totals.total) {
                            $('.total-font').stop().fadeTo(250, 0).promise().done(function () {
                                if (totals.total == 0.00) {
                                    $('.total-font').addClass('font-d-gray').removeClass('font-black');
                                } else {
                                    $('.total-font').addClass('font-black').removeClass('font-d-gray');
                                }

                                $('.total-font').html('$' + totals.total).fadeTo(250, 1);
                            });
                        }
                        else {
                            alert('Total not found: please try again.');
                        }

                        if ($(window).width() / parseFloat($("body").css("font-size")) < 69) {
                            $('html, body').stop();

                            $('html, body').animate({
                                scrollTop: $('.homepage-pricebox').offset().top - 25
                            });
                        }
                    }
                });
            }

        }

        var prev_books = Math.floor($('input[name="books"]').val() / 100) * 10;
        var binding = $('input[name="binding"]:checked').val();
        if (binding != 'perfect') {
            prev_books = 0;
        } else if (prev_books > 100) {
            prev_books = 100;
        }

        function freeShip(onload = null) {
            var free_books = Math.floor($('input[name="books"]').val() / 100) * 10;
            var binding = $('input[name="binding"]:checked').val();

            if (binding == 'hardcover') {
                free_books = -1;
            } else if (free_books > 100) {
                free_books = 100;
            }

            if (onload) {
                if (binding == 'hardcover') {
                    $('.alert-bg').css('opacity', 0);
                }
                if (free_books) {
                    $('.free-books').removeClass('font-d-gray').addClass('font-green').html('<span class="bolded">' + free_books + ' free additional books</span> added to your print order');
                    $('.alert-bg').removeClass('quote-gray').addClass('light-green');
                }
            } else if (free_books != prev_books) {
                if (free_books == -1) {
                    $('.alert-bg').stop().fadeTo(250, 0);
                } else {
                    if (free_books) {
                        $('.alert-bg').stop().fadeTo(250, 0).promise().done(function () {
                            $('.free-books').removeClass('font-d-gray').addClass('font-green').html('<span class="bolded">' + free_books + ' free additional books</span> added to your print order');
                            $('.alert-bg').removeClass('quote-gray').addClass('light-green').fadeTo(250, 1);
                        });
                    } else {
                        $('.alert-bg').stop().fadeTo(250, 0).promise().done(function () {
                            $('.free-books').addClass('font-d-gray').removeClass('font-green').html('Get <span class="bolded">10 free books</span> for every 100 you print*.');
                            $('.alert-bg').addClass('quote-gray').removeClass('light-green').fadeTo(250, 1);
                        });
                    }
                }
            }

            prev_books = free_books;
        }

        function trimCheck() {
            var trim = $('select[name="trim-select"]').val();
            if (trim) {
                //if (trim != 'other') {
                //    if( $( '.trim-sizes' ).is(':visible') ) {
                //        $( '.trim-sizes' ).fadeTo(250, 0).promise().done(function() {
                //            $(this).hide();
                //        });
                //    }

                var sizes = trim.split('x');

                var trim_w = sizes[0];
                var trim_h = sizes[1];

                $('#trim_w').val(trim_w);
                $('#trim_h').val(trim_h);

                $('#trim-select').removeClass('input-alert');
                //} else {
                //    $( '.trim-sizes' ).css('display', 'inline-block').hide().fadeTo(250, 1);
                //    
                //    $('#trim_w').val( 0 );
                //    $('#trim_h').val( 0 );
                //}
            }
        }

        var prevBinding = '';
        var prevGenre = '';
        var prevSrc = '';

        function materialCheck(onload = null) {
            var binding = $('input[name="binding"]:checked').val();
            var material = $('input[name="material"]:checked').val();
            var genre = $('#genre option:selected').val() ? $('#genre option:selected').val() : 'fiction';

            var path = 'quoting/public/_includes/images' + '/genre-bindings/' + genre + '/';
            var src = 'softcover';
            if (binding == 'hardcover') {
                if (material == 'imleather') {
                    src = 'hardcover_imleather';
                } else if (material == 'cloth') {
                    src = 'hardcover_cloth';
                } else {
                    src = 'hardcover_printed';
                }
            } else if (binding == 'spiral') {
                if (material == 'wire-o') {
                    src = 'spiral_wireo';
                } else {
                    src = 'spiral_plastic';
                }
            }

            src = '5x8_' + src + '_' + genre;

            if (onload) {
                $('#book-image').html(`
            <source srcset="` + path + src + `.webp" type="image/webp">
            <source srcset="` + path + src + `.png" type="image/png">
            <img src="` + path + src + `.png" alt="book binding selection" />                  
        `);

                $('#softcover-image').html(`
            <source srcset="` + path + `5x8_softcover_` + genre + `.webp" type="image/webp">
            <source srcset="` + path + `5x8_softcover_` + genre + `.png" type="image/png">
            <img src="` + path + `5x8_softcover_` + genre + `.png" alt="softcover thumbnail image" />                  
        `);

                $('#hardcover-image').html(`
            <source srcset="` + path + `5x8_hardcover_printed_` + genre + `.webp" type="image/webp">
            <source srcset="` + path + `5x8_hardcover_printed_` + genre + `.png" type="image/png">
            <img src="` + path + `5x8_hardcover_printed_` + genre + `.png" alt="hardcover thumbnail image" />                  
        `);

                $('#spiral-image').html(`
            <source srcset="` + path + `5x8_spiral_plastic_` + genre + `.webp" type="image/webp">
            <source srcset="` + path + `5x8_spiral_plastic_` + genre + `.png" type="image/png">
            <img src="` + path + `5x8_spiral_plastic_` + genre + `.png" alt="spiral thumbnail image" />                  
        `);
            } else {
                if (prevSrc != src) {
                    $('#book-image').fadeTo(250, 0).promise().done(function () {
                        $('#book-image').html(`
                    <source srcset="` + path + src + `.webp" type="image/webp">
                    <source srcset="` + path + src + `.png" type="image/png">
                    <img src="` + path + src + `.png" alt="book binding selection" />                 
                `).fadeTo(250, 1);
                    });
                }

                if (prevGenre != genre) {
                    $('#softcover-image, #hardcover-image, #spiral-image').fadeTo(250, 0).promise().done(function () {
                        $('#softcover-image').html(`
                    <source srcset="` + path + `5x8_softcover_` + genre + `.webp" type="image/webp">
                    <source srcset="` + path + `5x8_softcover_` + genre + `.png" type="image/png">
                    <img src="` + path + `5x8_softcover_` + genre + `.png" alt="spiral thumbnail iamge" />                    
                `).fadeTo(250, 1);

                        $('#hardcover-image').html(`
                <source srcset="` + path + `5x8_hardcover_printed_` + genre + `.webp" type="image/webp">
                    <source srcset="` + path + `5x8_hardcover_printed_` + genre + `.png" type="image/png">
                    <img src="` + path + `5x8_hardcover_printed_` + genre + `.png" alt="hardcover thumbnail iamge" />                   
                `).fadeTo(250, 1);

                        $('#spiral-image').html(`
                    <source srcset="` + path + `5x8_spiral_plastic_` + genre + `.webp" type="image/webp">
                    <source srcset="` + path + `5x8_spiral_plastic_` + genre + `.png" type="image/png">
                    <img src="` + path + `5x8_spiral_plastic_` + genre + `.png" alt="spiral thumbnail image" />                  
                `).fadeTo(250, 1);
                    });
                }
            }

            if (prevBinding != binding) {
                $('.materials .quote-box-selected').removeClass('quote-box-selected').find('input').prop('checked', false);
                if (binding == 'hardcover') {
                    $('#hardcover-materials .material-box:first').find('.quote-selection-box').addClass('quote-box-selected').find('input').prop('checked', true);
                    materialMatch('hardcover');
                } else if (binding == 'spiral') {
                    $('#spiral-materials').find('.quote-selection-box').first().addClass('quote-box-selected').find('input').prop('checked', true);
                    materialMatch('spiral');
                }

                $('.production-font').fadeTo(250, 0).promise().done(function () {
                    if (binding == 'hardcover') {
                        $('.production-font').html('6 - 7 Weeks');
                    } else if (binding == 'spiral') {
                        $('.production-font').html('4 - 5 Weeks');
                    } else {
                        $('.production-font').html('2 - 3 Weeks');
                    }
                    $('.production-font').fadeTo(250, 1);
                });

                $('.materials:visible').fadeTo(250, 0).promise().done(function () {
                    $('.materials').hide();
                    if (binding == 'hardcover') {
                        $('#hardcover-materials').fadeTo(250, 1);
                    } else if (binding == 'spiral') {
                        $('#spiral-materials').fadeTo(250, 1);
                    }
                });
            }

            prevBinding = binding;
            prevGenre = genre;
            prevSrc = src;
        }

        function minMax() {
            var pageHigh = 900;
            var pageLow = 20;

            var binding = $("input[name='binding']:checked").val();
            if (binding == 'perfect') {
                pageHigh = 900;
                pageLow = 32;
            } else if (binding == 'hardcover') {
                pageHigh = 900;
                pageLow = 24;
            } else if (binding == 'spiral') {
                pageHigh = 450;
                pageLow = 20;
            }

            return [pageLow, pageHigh];
        }

        function checklist() {
            var form = $('#theForm');

            var binding = $("input[name='binding']:checked").val();
            var pageLimits = minMax();

            if (binding == 'perfect') {
                $('input[name="material"]').addClass('ignore-field');
            } else {
                $('input[name="material"]').removeClass('ignore-field');
            }

            var go = true;

            if ($('input[name="trim_w"]').val() < 4 || $('input[name="trim_w"]').val() > 11) {
                go = false;
            }

            if ($('input[name="trim_h"]').val() < 4 || $('input[name="trim_h"]').val() > 11) {
                go = false;
            }

            if ($('input[name="trim_w"]').val() < 5 && $('input[name="trim_h"]').val() < 5) {
                go = false;
            }

            if ($('input[name="trim_w"]').val() > 8.5 && $('input[name="trim_h"]').val() > 8.5) {
                go = false;
            }

            if (!form.find('select[name="genre"]').val()) {
                go = false;
            }

            if ($('input[name="books"]').val() < 25 || $('input[name="books"]').val() > 5000) {
                go = false;
            }

            if ($('input[name="pages"]').val() < pageLimits[0] || $('input[name="pages"]').val() > pageLimits[1]) {
                go = false;
            }

            if (binding == 'hardcover' || binding == 'spiral') {
                if (!form.find('input[name="material"]:checked').val()) {
                    go = false;
                }
            }

            if (go) {
                calcBooks();
            }
        }

        //EBOOK SALE
        //var ebook_sale = 0;
        var ebook_sale = 0.25;

        function ebookUpdate() {
            $('.ebook-font').stop().fadeTo(250, 0).promise().done(function () {
                $('.ebook-font').addClass('font-black').removeClass('font-d-gray');

                var ebook_total = '0.00';
                if ($('input[name=ebook][value=1]').is(":checked")) {
                    ebook_total = calcEbook();
                }

                if (ebook_sale != 0 && ebook_total != 0) {
                    var no_discount = Math.round(ebook_total / (1 - ebook_sale));
                    $('.ebook-font').html('<span class="discount font-d-gray">$' + no_discount + '</span> <span class="font-green bolded">$' + ebook_total + '</span>').fadeTo(250, 1);
                } else {
                    $('.ebook-font').html('$' + ebook_total).fadeTo(250, 1);
                }
            });
        }

        function calcEbook() {
            var std_reflow = '175.0000';
            var std_fixed = '200.0000';
            var ea_reflow = '1.7500';
            var ea_fixed = '2.0000';

            var total = 0;
            if ($('#pages').val() < 100) {
                total = $('#genre option:selected').attr('data-format') == 'fixed' ? std_fixed : std_reflow;
            } else {
                var ea = $('#genre option:selected').attr('data-format') == 'fixed' ? ea_fixed : ea_reflow;
                total = ea * $('#pages').val();
            }

            if (ebook_sale != 0) {
                total = total - (total * ebook_sale);
            }

            total = parseFloat(total).toFixed(2);

            return total;
        }

        $.validator.addMethod('fiveinches', function (value, element) {
            return $('input[name="trim_w"]').val() >= 5 || $('input[name="trim_h"]').val() >= 5;
        },
            'At least one trim side must greater than or equal to 5 inches');

        $.validator.addMethod('eleveninches', function (value, element) {
            return $('input[name="trim_w"]').val() <= 8.5 || $('input[name="trim_h"]').val() <= 8.5;
        },
            'At least one trim side must less than or equal to 8.5 inches');

        $.validator.addMethod('pagemin', function (value, element) {
            var pageLimits = minMax();
            return value >= pageLimits[0];
        }, function (params, element) {
            return 'Total page count must be greater than or equal to ' + minMax()[0] + ' pages';
        });

        $.validator.addMethod('pagemax', function (value, element) {
            var pageLimits = minMax();
            return value <= pageLimits[1];
        }, function (params, element) {
            return 'Total page count must be less than or equal to ' + minMax()[1] + ' pages';
        });

        $("#theForm").validate({
            groups: {
                calculate: 'binding trim_w trim_h material books pages genre'
            },
            rules: {
                binding: 'required',
                trim_w: { required: true, min: 4, max: 11, fiveinches: true, eleveninches: true },
                trim_h: { required: true, min: 4, max: 11, fiveinches: true, eleveninches: true },
                material: 'required',
                books: { required: true, min: 25, max: 5000 },
                pages: { required: true, pagemin: true, pagemax: true },
                genre: 'required',
            },
            messages: {
                binding: 'Please select a binding',
                material: 'Please select a material',
                trim_w: {
                    required: 'Please enter a trim width',
                    min: 'Trim width must be at least 4 inches',
                    max: 'Trim width must be less than 11 inches'
                },
                trim_h: {
                    required: 'Please enter a trim width',
                    min: 'Trim height must be at least 4 inches',
                    max: 'Trim height must be less than 11 inches'
                },
                books: {
                    required: 'Please enter a quantity',
                    min: 'Quantity must be at least 25 books',
                    max: 'Quantity must be less than 5000 books'
                },
                pages: {
                    required: 'Please enter a page count',
                },
                genre: 'Please select a genre',
            },
            errorPlacement: function (error) {
                error.appendTo($('#theForm .quote-error-alert'));
            },
            errorClass: 'font-alert',
            errorElement: 'div',
            focusInvalid: false,
            onfocusout: function (element) {
                if ($(element).is('#trim_w') || $(element).is('#trim_h')) {
                    if ($('#trim_w').val() != 0 && $('#trim_h').val() != 0) {
                        $(element).valid();
                    }
                } else {
                    $(element).valid();
                }
            },
            highlight: function (element) {
                if ($(element).is('#pages')) {
                    $('#black_pages, #color_pages').addClass('input-alert');
                } else if (($(element).is('#trim_w') || $(element).is('#trim_h')) && $('#trim_w').is(":hidden") && $('#trim_h').is(":hidden")) {
                    $('#trim-select').addClass('input-alert');
                } else {
                    $(element).addClass('input-alert');
                }
            },
            unhighlight: function (element) {
                if ($(element).is('#pages')) {
                    $('#black_pages, #color_pages').removeClass('input-alert');
                } else {
                    $(element).removeClass('input-alert');
                }
            },
            invalidHandler: function (form, validator) {
                if (validator.numberOfInvalids()) {
                    if ($(window).width() / parseFloat($("body").css("font-size")) < 69) {
                        $('html, body').stop();

                        $('html, body').animate({
                            scrollTop: $('#theForm').offset().top - 25
                        });
                    }
                }
            }
        });

        $("#contact-form").validate({
            groups: {
                contact: 'contact_name contact_email contact_message'
            },
            rules: {
                contact_name: 'required',
                contact_email: { required: true, email: true },
                contact_message: 'required',
            },
            messages: {
                contact_name: 'Please a contact name',
                contact_email: 'Please enter a valid email address',
                contact_message: 'Please enter a message',
            },
            errorPlacement: function (error) {
                error.appendTo($('#contact-form .quote-error-alert'));
            },
            errorClass: 'font-alert',
            errorElement: 'div',
            highlight: function (element) {
                $(element).addClass('input-alert');
            },
            unhighlight: function (element) {
                $(element).removeClass('input-alert');
            },
            submitHandler: function () {
                contactSend();
            }
        });

        $("#book-title-form").validate({
            rules: {
                book_title: 'required',
            },
            messages: {
                book_title: 'Please a book title',
            },
            errorPlacement: function (error) {
                error.appendTo($('#book-title-form .quote-error-alert'));
            },
            errorClass: 'font-alert',
            errorElement: 'div',
            highlight: function (element) {
                $(element).addClass('input-alert');
            },
            unhighlight: function (element) {
                $(element).removeClass('input-alert');
            },
            submitHandler: function () {
                saveSend();
            }
        });
    </script>

</body>

</html>