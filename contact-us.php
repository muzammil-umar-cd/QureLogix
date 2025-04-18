<?php
include('includes/header.php');
?>

<div id="home-intro" class="grid-100 zero description-box genre-intro">
    <div class="grid-100 vspace-3em"></div>
    
	<div class="main-width-constraint-noedge zero text-center thankyou">
        <div class="box-055 first text-left">
            <h1 class="mobile-center blue-text">Talk to a Real Person</h1>
            
            <p class="mobile-center">For over 40 years, we have printed 100% of our books in the Pacific
            Northwest. Our commitment to quality has made us one of the most trusted companies in the
            industry.</p>
            
            <p class="mobile-center">When you call us, you're guaranteed to talk to a real person, never
            a call center. If you reach us after hours, please leave a voicemail, and we will return
            your call promptly.</p>
        </div>    
        
        <div class="box-045 last text-right">
            <div class="grid-090">
                <img src="images/QureLogix-printing-employees.gif" alt="contact <?php echo WEBSITE_NAME; ?>" class="genre-shadow-img" />
            </div>
        </div>        
    </div>
    
    <div class="grid-100 vspace-6em"></div>
</div>

<div class="grid-100 zero">
	<div class="main-width-constraint-noedge zero">
        <div class="grid-100 vspace-4em"></div>
        
        <div class="guidebook-form-shell zero white thankyou">
            <div class="box-066 no-margin zero graywrap text-center">
                <div class="vspace-2em"></div>
                          
                <form method="post" action="includes/sendmail/sendmail.php" class="contact-form grid-085 zero text-left">
                    <input type="hidden" name="ip_address" value="<?php echo $ip; ?>" />
                    <input type="hidden" name="city" value="<?php echo $locationData->city; ?>" />
                    <input type="hidden" name="country" value="<?php echo $locationData->country; ?>" />
                    <input type="hidden" name="internet_connection" value="<?php echo $locationData->isp; ?>" />
                    <input type="hidden" name="zipcode" value="<?php echo $locationData->zip; ?>" />
                    <input type="hidden" name="region" value="<?php echo $locationData->regionName; ?>" />
                    <div class="field box-050 first">
                        <label for="name">Your Name: <span class="font-required">*</span></label>
                        <input type="text" id="name" name="name" required>
                    </div>
    
                    <div class="field box-050 last">
                        <label for="email">Your Email: <span class="font-required">*</span></label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="field full last">
                        <label for="phone">Your Phone: <span class="font-required">*</span></label>
                        <input type="text" id="phone" name="phone" required>
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
                        <textarea style="height: 100px;" id="message" name="message" placeholder="" required></textarea>
                    </div>
    
                    <div class="field btn-huge left">
                        <button type="submit" class="btn-widget-medium">Submit</button>
                    </div>
                </form>
    
                <div class="vspace-2em"></div>
                <div class="vspace-050em"></div>
            </div>

            <div class="box-033 no-margin zero description-box text-center">
                <div class="vspace-2em mobile-show"></div>
                
                <div class="grid-075 zero text-left">
                    <h4><i class="far fa-building font-orange"></i> &nbsp; <span class="bolded">OUR OFFICE</span></h4>
                    <div class="vspace-050em"></div>
                    <p class="no-margin">
                        <?php echo WEBSITE_NAME; ?><br/>
                        <?php echo ADDRESS; ?>
                    </p>
                    
                    <div class="vspace-2em"></div>
        
                    <h4><i class="fas fa-phone font-orange"></i> &nbsp; <span class="bolded">PHONE NUMBER</span></h4>
                    <div class="vspace-050em"></div>
                    <p class="no-margin">
                    <a href="<?php echo PHONE_HREF; ?>"><?php echo PHONE; ?></a> (Toll Free)
                        <br/>
                    </p>
                    
                    <div class="vspace-2em"></div>
        
                    <h4><i class="far fa-envelope font-orange"></i> &nbsp; <span class="bolded">EMAIL</span></h4>
                    <div class="vspace-050em"></div>
                    <p class="no-margin">
                        Customer Service: <a href="mailto:<?php echo ADMIN_EMAIL; ?>"><?php echo ADMIN_EMAIL; ?></a>
                    </p>
                </div>
                
                <div class="vspace-2em mobile-show"></div>
            </div>
        </div>
        
        <div class="grid-100 vspace-3em"></div>
        
	</div>
</div>

<?php
include('includes/footer.php');
?>