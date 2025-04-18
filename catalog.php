<?php
include('includes/header.php');
?>

<div class="grid-100 white">

    <div id="how-design-works" class="guidebook-title mobile-hide zero">
        <picture>
            <source srcset="cata-log.jpg" type="image/webp">
            <source srcset="cata-log.jpg" type="image/jpg">
            <img src="cata-log.jpg" alt="self publishing guide title">
        </picture>
    </div>

    <div class="grid-100">
        <div class="main-width-constraint-noedge zero text-center description-box thankyou">
            <div class="box-040 first guidebook-adjust text-center">
                <div class="vspace-1em"></div>

                <picture>
                    <source srcset="publishing-book.png" type="image/webp">
                    <source srcset="publishing-book.png" type="image/png">
                    <img src="publishing-book.png" alt="free self publishing guide book" width="350" height="328" />
                </picture>
            </div>

            <div class="box-060 last text-left homepage-header">
                <div class="vspace-3em mobile-show"></div>
                <div class="vspace-2em"></div>

                <h1>Learn How to Publish Your Book</h1>

                <p>There has never been a better time than 2024 to print a book. Print technology
                    has made it easy and affordable to make your book a reality.</p>

                <p>From editing and formatting to printing and marketing, our guidebook teaches you
                    how to successfully print and publish a custom book. Our free, 64-page guide covers
                    the basics of securing a copyright, choosing a typeface, getting an ISBN, and more.</p>

                <div class="vspace-025em mobile-hide">&nbsp;</div>
                <div class="vspace-1em"></div>
            </div>
        </div>
    </div>

    <div class="grid-100 zero catalog-bg">
        <div class="main-width-constraint-noedge zero">

            <div class="vspace-4em"></div>

            <div class="grid-100 zero description-box text-center">
                <div class="box-085 zero white guidebook-form-shell">

                    <form class="the-form" autocomplete="off" action="includes/sendmail/sendmail.php" method="post">
                        <input type="hidden" name="ip_address" value="<?php echo $ip; ?>" />
                        <input type="hidden" name="city" value="<?php echo $locationData->city; ?>" />
                        <input type="hidden" name="country" value="<?php echo $locationData->country; ?>" />
                        <input type="hidden" name="internet_connection" value="<?php echo $locationData->isp; ?>" />
                        <input type="hidden" name="zipcode" value="<?php echo $locationData->zip; ?>" />
                        <input type="hidden" name="region" value="<?php echo $locationData->regionName; ?>" />
                        <div class="grid-100 zero" style="background: #707504;">
                            <div class="vspace-1em"></div>

                            <div class="box-085 first last homepage-header text-left">
                                <div id="guidebook" class="anchor anchor-adjust"></div>
                                <h2 class="font-white">Get your free guidebook</h2>
                                <p class="font-white">Fill out this form, and we'll mail you our free 64-page
                                    publishing guide (USA only). We'll even
                                    pay the shipping and handling.</p>
                            </div>

                            <div class="vspace-1em"></div>
                        </div>

                        <div class="grid-100 zero">
                            <div class="vspace-2em"></div>

                            <div class="box-085 zero guidebook-form">
                                <div class="vspace-1em mobile-hide"></div>

                                <div id="catalog-form" class="box-095 quote-label-adjust zero">
                                    <div class="grid-050 text-left">
                                        <div class="box-085 text-left first">
                                            <div class="grid-100">
                                                <label id="firstname_label" for="firstname" class=" inline">Full Name
                                                    <span class="inline font-required valign-top">*</span></label>
                                            </div>
                                            <div class="grid-100">
                                                <input id="firstname" type="text" name="name" class=" jquery" value=""
                                                    title="Full Name" size="35" required tabindex="1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-050 text-left">
                                        <div class="box-085 text-left first">
                                            <div class="grid-100">
                                                <label id="email_label" for="email" class=" inline">Email <span
                                                        class="inline font-required valign-top">*</span></label>
                                            </div>
                                            <div class="grid-100">
                                                <input id="email" type="text" name="email" class=" jquery" value=""
                                                    title="Email" size="35" required tabindex="5">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-050 text-left">
                                        <div class="box-085 text-left first">
                                            <div class="grid-100">
                                                <label id="phone_label" for="phone" class=" inline">Phone</label>
                                            </div>
                                            <div class="grid-100">
                                                <input id="phone" type="text" name="phone" class=" jquery" value=""
                                                    title="Phone" size="35" tabindex="6">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-050 text-left">
                                        <div class="box-050 text-left first">
                                            <div class="grid-100">
                                                <label for="message" class="inline font-required valign-top">Message: </label>
                                            </div>
                                            <div class="grid-100">
                                                <textarea style="width: 278px;" id="message" name="message" class=" jquery" size="35" placeholder=""></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="vspace-1em mobile-hide"></div>
                            </div>

                            <div class="vspace-075em"></div>

                            <div class="box-085 zero">
                                <button type="submit" class="btn-widget-medium">Submit Request</button>
                            </div>

                        </div>

                    </form>

                    <div class="grid-100 zero">
                        <div class="box-085 fontsize-090">
                            We will not share your information with any company or organization.
                        </div>
                    </div>

                    <div class="vspace-2em"></div>
                </div>
            </div>

            <div class="vspace-4em"></div>

        </div>
    </div>

    <div class="grid-100 zero">
        <div class="main-width-constraint-noedge zero">

            <div class="vspace-3em"></div>

            <div class="grid-100 text-left zero level-title">
                <p>Guidebook Features</a>
                    <hr class="hr-margins">
            </div>

            <div class="vspace-1em"></div>

            <div class="grid-100 zero description-box">
                <h4>A Commitment to Quality</h4>

                <p>Not only is the guidebook full of helpful information, but it also doubles as a sample book
                    since we print it right here in our Pacific Northwest print shop. The book is printed on 60lb
                    uncoated
                    white paper, and the cover is printed on 12pt white paper with gloss lamination. The cover and
                    interior layout was made by our in-house design team.</p>

                <p>When your guidebook arrives, take a moment to admire its craftsmanship and quality.
                    Our guidebook serves as a tangible example of our commitment to producing professional,
                    handcrafted books.</p>
            </div>

            <div class="vspace-2em"></div>

            <div class="grid-100 zero centered">
                <picture>
                    <source srcset="images/guidebook-pages.webp" type="image/webp">
                    <source srcset="images/guidebook-pages.png" type="image/png">
                    <img src="images/guidebook-pages.png" alt="how to self publish guidebook pages" width="550"
                        height="570" />
                </picture>
            </div>

            <div class="vspace-2em"></div>

            <div class="grid-100 zero footer-box design-experience description-box">

                <div class="grid-100 zero">
                    <div class="box-050 first">
                        <span>
                            <i class="fas fa-book"></i>
                        </span>
                        <span>
                            <h4>Choosing a Book Binding</h4>
                            <p>We specialize in printing softcover, hardcover and spiral bound books.
                                Explore the features of each binding, as well as paper and premium
                                material options.</p>
                        </span>
                    </div>

                    <div class="box-050 last">
                        <span>
                            <i class="fas fa-paint-brush"></i>
                        </span>
                        <span>
                            <h4>Cover & Interior Design</h4>
                            <p>Whether you need a professional touch-up or a completely custom
                                design, learn how our team of designers can craft you a one-of-a-kind
                                cover and interior.</p>
                        </span>
                    </div>
                </div>

                <div class="grid-100 vspace-1em"></div>

                <div class="grid-100 zero">
                    <div class="box-050 first">
                        <span>
                            <i class="fas fa-images"></i>
                        </span>
                        <span>
                            <h4>Preparing Your Files for Print</h4>
                            <p>File preparation is key when deciding the look and feel of your book.
                                Learn how to expertly navigate PDFs, images and typefaces to create the
                                perfect layout.</p>
                        </span>
                    </div>

                    <div class="box-050 last">
                        <span>
                            <i class="fas fa-chart-line"></i>
                        </span>
                        <span>
                            <h4>How to Sell Your Book</h4>
                            <p>Even the best-written books need a good marketing plan to get off
                                the ground. Use our marketing checklist to reach your target audience
                                and maximize sales.</p>
                        </span>
                    </div>
                </div>

            </div>

            <div class="vspace-3em"></div>

            <div class="grid-100 vspace-3em mobile-show"></div>


        </div>
    </div>

</div>

<script>
$().ready(function() {

    // validate form on keyup and submit
    $("#theForm").validate({
        rules: {
            firstname: 'required',
            lastname: 'required',
            address: 'required',
            //address2    : 'required',
            state: 'required',
            city: 'required',
            zip: 'required',
            //company     : 'required',
            email: 'required',
            referred_by: 'required',
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            address: 'Please enter a mailing address',
            //address2    : 'required',
            state: 'Please select a state',
            city: 'Please enter your city',
            zip: 'Please enter your postal code',
            //company     : 'required',
            email: 'Please enter your Email address',
            referred_by: 'Please tell us how you found us'

        },
        errorClass: 'font-alert'
    });

});
</script>
<?php
include('includes/footer.php');
?>