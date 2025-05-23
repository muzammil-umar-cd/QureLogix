<?php
include('includes/header.php');
?>

<div id="home-intro" class="grid-100 center zero">
    <div class="main-width-constraint-noedge zero constraint-extend thankyou">

        <div class="box-045 right last description-box">
            <div class="vspace-1em mobile-hide"></div>
            <div class="vspace-2em"></div>

            <h1 class="forest-text mobile-center">Custom Book Printing<br /> & Book Design</h1>

            <div class="vspace-075em"></div>

            <h5 class="font-white">Get 10 Free Books for Every 100 You Print*<br />
                <span class="fontsize-070">*Up to 100 Free Books, Excludes Hardcover</span>
            </h5>

            <p class="font-white mobile-center">We are your USA book printer and designers. We offer instant online
                book
                prices and personalized customer service. We print high quality books at affordable prices since
                1976.
                Start your custom
                <a class="forest-text" href="javascript:;">Softcover Book</a>,
                <a class="forest-text" href="javascript:;">Hardcover Book</a>,
                or
                <a class="forest-text" href="javascript:;">Spiral Book</a> journey
                today by using the Book Price tool below or
                <a class="forest-text" href="<?php echo PHONE_HREF ?>">giving us a call</a>!
            </p>

            <div class="vspace-2em"></div>
            <div class="vspace-3em mobile-hide"></div>
        </div>
    </div>

    <picture>
        <source srcset="book-printing-company-banner-apr-251.png" type="image/webp">
        <source srcset="book-printing-company-banner-apr-251.png" type="image/jpeg">
        <img src="book-printing-company-banner-apr-251.png" class="fixed-bg-image mobile-hide"
            alt="2025 book printing company" />
    </picture>

</div>

<div class="grid-100 zero graywrap d-none">
    <div class="zero">

        <div class="guidebook-form-shell zero thankyou">
            <div class="box-060 no-margin zero graywrap text-center">
                <div class="vspace-2em"></div>

                <form method="post" action="" class="contact-form grid-085 zero text-left" style="padding:10px">
                    <h2 class="pb-4"
                        style="font-family: 'Merriweather', serif;font-size: 2.0em;line-height: 1.3em;padding: 10px; text-align: left !important;">
                        Get a Quote</h2>
                    <div class="field full first">
                        <label for="name">Your Name: <span class="font-required">*</span></label>
                        <input type="text" id="name" name="name" class="form-control" required>
                    </div>

                    <div class="field full last">
                        <label for="email">Your Email: <span class="font-required">*</span></label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="field full">
                        <label for="topic">How can we help you today? <span class="font-required">*</span></label>
                        <select id="topic" name="topic" required>
                            <option disabled selected hidden value=""> -- Please select a question -- </option>
                            <option value="quote">I would like a quote for a new/reprint order</option>
                            <option value="meeting">I would like to schedule a meeting with a Print Expert</option>
                            <!--<option value="reprint">I would like to place a reprint order</option>-->
                            <!--<option value="shipping">I have a question about shipping or invoicing</option>-->
                            <!--<option value="ebook">I have a question about eBooks</option>-->
                            <option value="prepress">I have a question about files or Design Services</option>
                            <!--<option value="design">I have a question about Design Services </option>-->
                            <option value="marketing">I have a question about Sales Tools</option>
                            <option value="account">I am having trouble accessing my account</option>
                            <option value="pickup">I would like to schedule an order pickup</option>
                            <option value="general">I have a general question</option>
                        </select>
                    </div>
                    <div class="field full">
                        <label for="message">Message: <span class="font-required">*</span></label>
                        <textarea id="message" name="message" placeholder="" required
                            style="height: 180px !important;"></textarea>
                    </div>

                    <div id="captcha-square"></div>

                    <div id="form-messages" class="grid-100"></div>

                    <div class="field btn-huge left">
                        <button type="submit" class="btn-widget-medium">Submit</button>
                    </div>
                </form>

                <div class="vspace-2em"></div>
                <div class="vspace-050em"></div>
            </div>

            <div class="box-040 no-margin zero description-box text-center">
                <div class="vspace-2em mobile-show"></div>

                <div class="grid-100 zero text-left">
                    <picture>
                        <source srcset="home-contact.png">
                        <source srcset="home-contact.png">
                        <img src="home-contact.png" alt="Contact" style="border-radius: 20px;" />
                    </picture>
                </div>

                <div class="vspace-2em mobile-show"></div>
            </div>
        </div>

    </div>
</div>

<div class="grid-100 zero graywrap d-none">
    <div class="main-width-constraint-noedge zero description-box text-center">

        <div class="vspace-1em mobile-hide"></div>
        <div class="vspace-2em"></div>

        <div class="box-100 text-center zero homepage-header">
            <h2>How Much Does it Cost to Print a Book?</h2>

            <p>In seconds have your book price for a softcover, hardcover, or spiral bound book. Using the tool
                below,
                enter your book’s specifications to see what it costs to print your book using <?php echo WEBSITE_NAME; ?>’s
                standard
                quality paper and cover options. Click 'Next Steps' to choose additional paper choices, book and
                cover
                design as well as other premium options.</p>
        </div>

    </div>

    <div class="main-width-constraint-noedge constraint-extend zero text-center">


        <div class="grid-060 first zero">
            <h2
                style="font-family: 'Merriweather', serif;font-size: 2.0em;line-height: 1.3em;padding: 10px !important;">
                Get A Quote</h2>
            <form method="post" action="send-contact.php" class="contact-form grid-085 zero text-left">
                <div class="field box-050 first">
                    <label for="name">Your Name: <span class="font-required">*</span></label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="field box-050 last">
                    <label for="email">Your Email: <span class="font-required">*</span></label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="field full">
                    <label for="topic">How can we help you today? <span class="font-required">*</span></label>
                    <select id="topic" name="topic" required>
                        <option disabled selected hidden value=""> -- Please select a question -- </option>
                        <option value="quote">I would like a quote for a new/reprint order</option>
                        <option value="meeting">I would like to schedule a meeting with a Print Expert</option>
                        <option value="prepress">I have a question about files or Design Services</option>
                        <option value="marketing">I have a question about Sales Tools</option>
                        <option value="account">I am having trouble accessing my account</option>
                        <option value="pickup">I would like to schedule an order pickup</option>
                        <option value="general">I have a general question</option>
                    </select>
                </div>

                <div class="field full">
                    <label for="message">Message: <span class="font-required">*</span></label>
                    <textarea id="message" rows="5" name="message" placeholder="" required></textarea>
                </div>

                <div class="field btn-huge left">
                    <button type="submit" class="btn-widget-medium">Submit</button>
                </div>
            </form>
        </div>
        <div class="grid-040 last zero text-right">
            <div class="grid-092 zero">
                <div class="homepage-pricebox zero">
                    <div class="height-025"></div>

                    <div class="grid-100 zero">
                        <div class="grid-035">
                            <picture id="book-image">
                                <source
                                    srcset="quoting/public/_includes/images/genre-bindings/fiction/5x8-softcover-fiction.webp"
                                    type="image/webp">
                                <source
                                    srcset="quoting/public/_includes/images/genre-bindings/fiction/5x8-softcover-fiction.png"
                                    type="image/png">
                                <img src="quoting/public/_includes/images/genre-bindings/fiction/5x8-softcover-fiction.png"
                                    alt="book binding selection" />
                            </picture>
                        </div>
                        <div class="grid-065 text-right">
                            <div class="grid-090 text-left">
                                <div class="grid-100 fontsize-120">
                                    <div class="fontsize-150 font-black">Price per Book:</div>
                                    <div class="quote-price-font">
                                        <em class="discount font-d-gray quote-mobile-hide fontsize-070 valign-top"></em>
                                        <em class="real-price font-d-gray"><span>$</span>0.00</em>
                                    </div>

                                    <div class="height-100">&nbsp;</div>

                                    <div class="fontsize-120 font-black">
                                        Print Total: <span class="total-font font-d-gray">$0.00</span>
                                    </div>

                                    <div class="height-075">&nbsp;</div>

                                    <div class="fontsize-120 font-black">
                                        eBook: <span class="ebook-font font-d-gray">$0.00</span>
                                    </div>
                                </div>

                                <div class="height-150">&nbsp;</div>

                                <div class="alert-bg quote-gray">
                                    <div class="free-books font-d-gray">Get <span class="bolded">10 free
                                            books</span> for every 100 you print*</div>
                                    <div class="bulk font-green"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="height-200">&nbsp;</div>

                    <div class="grid-100 text-center font-charcoal fontsize-120">
                        Avg Production Time: <span class="bolded production-font">2 - 3 Weeks</span>
                    </div>

                    <div class="height-050">&nbsp;</div>

                    <div class="grid-100 text-center font-charcoal">
                        Excludes Proofing & Shipping Times
                    </div>

                    <div class="height-150">&nbsp;</div>

                    <!--<div class="grid-100 quote-label-adjust text-left">
                        <div class="grid-100 height-200 font-charcoal">
                            <label for="book_title" class="sublabel inline">Book Title</label>
                        </div>
                        <div class="grid-100">
                            <input id="book_title" type="text" name="book_title" class="text-center jquery" value="" size="44">
                        </div>
                    </div>-->

                    <div class="grid-100 zero">
                        <!--<div class="grid-050 hollow-button text-left">
                            <button id="save-button" type="button" class="btn-widget-medium">Save for Later</button>
                        </div>-->
                        <div class="grid-100 text-right">
                            <button id="customize-button" type="button" class="btn-widget-medium">Next
                                Steps</button>
                        </div>
                    </div>

                    <!--<div class="grid-100 text-center">
                        <p class="font-charcoal fontsize-110">Use <span class="font-orange bolded">NewBook23</span> at checkout on your FIRST order of
                        175+ softcover books to get 25 more free!</p>
                    </div>-->

                    <div class="height-100">&nbsp;</div>

                    <div class="grid-100 text-center fontsize-120 font-charcoal">
                        Questions? <span class="fake-link no-dec-font quotes-view-info" data-id="contact-modal">Contact
                            Us</span>
                    </div>

                    <div class="height-050">&nbsp;</div>

                    <div class="grid-100 text-center font-charcoal">
                        *Up to 100 free books, excludes hardcover
                    </div>
                </div>
            </div>

            <div class="grid-100 height-200">&nbsp;</div>
        </div>

    </div>
</div>


<div class="grid-100 zero text-center description-box white">
    <div class="grid-100 vspace-3em"></div>

    <div class="main-width-constraint-noedge zero">
        <div class="box-100 text-center zero homepage-header">
            <h2>Printing a Book Has Never Been Easier</h2>

            <p><?php echo WEBSITE_NAME; ?> is a Pacific Northwest book printing and binding company that specializes in digital
                book
                printing, design, and eBooks. We print between 25 and 5,000 copies of custom softcover, hardcover,
                and spiral-bound books.</p>

            <p>With over 40 years of industry experience, our team of designers, artists, and craftsmen knows what
                it takes
                to print books of exceptional quality. Whether you're a published author, looking for high-quality
                books, or a
                first-time author, we make it effortless to create a beautiful custom book in only a few easy steps.
            </p>
        </div>

        <div class="grid-100 vspace-2em"></div>
    </div>

    <div class="main-width-constraint-noedge zero constraint-extend text-center">
        <div class="homepage-features-box">
            <div class="text-left homepage-header">
                <h4>Looking for more custom options?</h4>

                <p>Our specialized printing proccess allows us to fully customize our books. A technician will
                    review your book at every stage of production to ensure the highest quality. Use our Get a Price
                    Tool to explore all our custom features.</p>

                <p><a href="catalog.php">Get a quote &nbsp;<i class="fas fa-arrow-right"></i></a>
                </p>
            </div>

            <div class="feature-dots">
                <div>
                    <i class="fas fa-pencil-ruler"></i>
                    <h4>Custom Sizing</h4>
                    <div>We can print almost any size: square, landscape, pocket, and more.</div>
                </div>

                <div>
                    <i class="fas fa-star"></i>
                    <h4>Premium Add-ons</h4>
                    <div>Elevate your book with premium features like foil stamping or 3D Spot UV.</div>
                </div>

                <div>
                    <i class="fas fa-book"></i>
                    <h4>Paper Weight</h4>
                    <div>Choose any of our premium paper stocks from 50lb to 80lb thickness.</div>
                </div>
            </div>
        </div>
    </div>

    <div class="main-width-constraint-noedge zero">
        <div class="grid-100 vspace-3em"></div>

        <div class="grid-100 thankyou zero">
            <div class="box-050 first text-left homepage-header">
                <h2>How to Self Publish a Book</h2>

                <p>New to book printing? Get a copy of our free guide to self-publishing. We've
                    compiled our 40 years of experience as a book binding company into 64 pages
                    of simple steps for how to create your own book. Learn how to successfully publish
                    your book with advice on marketing, book design, and book printing costs. Includes
                    pricing and design tips for softcover, hardcover, and spiral book bindings.</p>

                <p><a href="catalog.php">Learn More &nbsp;<i class="fas fa-arrow-right"></i></a>
                </p>
            </div>

            <div class="box-050 last text-right">
                <a href="catalog.php">
                    <picture>
                        <source srcset="make-a-book-guide.png" type="image/webp">
                        <source srcset="make-a-book-guide.png" type="image/jpeg">
                        <img src="make-a-book-guide.png" alt="self publishing company guide" width="460" height="280" />
                    </picture>
                </a>
            </div>
        </div>

        <div class="grid-100 vspace-1em"></div>

        <hr class="hr-margins">

        <div class="grid-100 vspace-1em"></div>

        <div class="grid-100 thankyou zero">
            <div class="box-050 first text-left">
                <a href="book-design.php">
                    <picture>
                        <source srcset="book-design-company.jpg" type="image/webp">
                        <source srcset="book-design-company.jpg" type="image/jpeg">
                        <img src="book-design-company.jpg" alt="book design company" width="460" height="280" />
                    </picture>
                </a>
            </div>

            <div class="box-050 last text-left homepage-header">
                <h2>Book Design</h2>

                <p>Our professional book designers will create a custom cover and interior
                    layout for your book. Your assigned designer will work closely with your to create
                    a one-of-a-kind book that meets your artistic vision. We have experience designing
                    books from all genres, including memoirs, fiction, history, religious, cookbook
                    books, and more. We offer three design levels to match your book's complexity and
                    budget.</p>

                <p><a href="book-design.php">Learn More &nbsp;<i
                            class="fas fa-arrow-right"></i></a></p>
            </div>
        </div>

        <div class="grid-100 vspace-3em"></div>
    </div>
</div>

<div class="grid-100 zero description-box gray-shadow-block">
    <div class="main-width-constraint-noedge zero">

        <div class="box-050 first text-center homepage-header">
            <div class="grid-100 vspace-3em"></div>

            <h2>Ready to Discuss Your Project?</h2>

            <p>With our unbeatable customer service, you can talk to a real person now
                to get your book printed or learn more.</p>

            <a href="contact-us.php" class="btn-huge">
                <button type="button" class="btn-widget-medium"> Contact Us </button>
            </a>

            <div class="grid-100 text-center phone-email">
                <span><i class="fas fa-phone"></i> <a href="<?php echo PHONE_HREF; ?>"><?php echo PHONE; ?></a></span>
                <span><i class="fas fa-envelope"></i> <a href="mailto:<?php echo ADMIN_EMAIL; ?>">Email
                        Us</a></span>
            </div>
        </div>

        <div class="box-050 text-right last">
            <div class="grid-100 vspace-3em"></div>

            <div class="box-095 zero last">
                <div id="yt-frame">
                    <picture>
                        <source srcset="ready-to-discuss.png" type="image/webp">
                        <source srcset="ready-to-discuss.png" type="image/jpeg">
                        <img src="ready-to-discuss.png" alt="book design company" width="460" height="280">
                    </picture>
                </div>
            </div>
        </div>

        <div class="grid-100 vspace-3em"></div>

    </div>
</div>

<div class="grid-100 description-box zero sky-blue-gradient shadow-block">
    <div class="main-width-constraint-noedge zero constraint-extend text-center">
        <div class="vspace-1em"></div>

        <div class="grid-100 zero thankyou">
            <div class="box-015 text-left first">
                <h4>Customer Reviews</h4>

                <div class="vspace-050em mobile-hide"></div>
            </div>

            <div class="grid-100 vspace-1em mobile-show"></div>

            <div class="inline testimonial-slider zero">
                <div class="home-testimonial text-left zero hidden">
                    <div class="grid-050">
                        <span class="bolded fontsize-120 font-black">Ronald Kincaid</span>
                        <div class="vspace-025em"></div>
                    </div>
                    <div class="grid-050 text-right">
                        <span class="star-rating"><span style="width: 145px;"></span></span>
                        <div class="vspace-025em"></div>
                    </div>

                    <p><?php echo WEBSITE_NAME; ?> is a first-class operation. From start
                        to finish the kind, professional people. . .</p>
                </div>
                <div class="home-testimonial text-left zero hidden">
                    <div class="grid-050">
                        <span class="bolded fontsize-120 font-black">Dick Erickson</span>
                        <div class="vspace-025em"></div>
                    </div>
                    <div class="grid-050 text-right">
                        <span class="star-rating"><span style="width: 130.5px;"></span></span>
                        <div class="vspace-025em"></div>
                    </div>

                    <p>This is the 3rd printing of my book. Easy as can be to
                        do a re-order. Thanks for being a great. . </p>
                </div>
                <div class="home-testimonial text-left zero hidden">
                    <div class="grid-050">
                        <span class="bolded fontsize-120 font-black">Jeffrey Rollins</span>
                        <div class="vspace-025em"></div>
                    </div>
                    <div class="grid-050 text-right">
                        <span class="star-rating"><span style="width: 145px;"></span></span>
                        <div class="vspace-025em"></div>
                    </div>

                    <p>his has been my first experience with QureLogix and it was
                        terrific. . . I am thrilled with final result!</p>
                </div>
                <div class="home-testimonial text-left zero hidden">
                    <div class="grid-050">
                        <span class="bolded fontsize-120 font-black">Dara Marias</span>
                        <div class="vspace-025em"></div>
                    </div>
                    <div class="grid-050 text-right">
                        <span class="star-rating"><span style="width: 145px;"></span></span>
                        <div class="vspace-025em"></div>
                    </div>

                    <p><?php echo WEBSITE_NAME; ?> exemplifies what a business should be by
                        providing top-quality printing services at. . .</p>
                </div>
                <div class="home-testimonial text-left zero ">
                    <div class="grid-050">
                        <span class="bolded fontsize-120 font-black">Ronald Kincaid</span>
                        <div class="vspace-025em"></div>
                    </div>
                    <div class="grid-050 text-right">
                        <span class="star-rating"><span style="width: 145px;"></span></span>
                        <div class="vspace-025em"></div>
                    </div>

                    <p><?php echo WEBSITE_NAME; ?> is a first-class operation. From start
                        to finish the kind, professional people. . .</p>
                </div>
                <div class="home-testimonial text-left zero ">
                    <div class="grid-050">
                        <span class="bolded fontsize-120 font-black">Julie Zander</span>
                        <div class="vspace-025em"></div>
                    </div>
                    <div class="grid-050 text-right">
                        <span class="star-rating"><span style="width: 145px;"></span></span>
                        <div class="vspace-025em"></div>
                    </div>

                    <p><?php echo WEBSITE_NAME; ?> creates high-quality books with terrific
                        customer service. I've printed dozens of titles. . .</p>
                </div>
            </div>

            <div class="grid-100 vspace-1em mobile-show"></div>

            <div class="box-005 last mobile-hide quote-box-info">
                <i class="fas fa-chevron-right fontsize-150 right no-margin" onclick="testScroll();"></i>
            </div>
        </div>

        <div class="vspace-075em"></div>
    </div>
</div>

<?php
include('includes/footer.php');
?>