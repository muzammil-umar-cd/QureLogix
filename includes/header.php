<?php
include_once('includes/config.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Self-Publishing Book Printing Service | <?php echo WEBSITE_NAME; ?> </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!-- Meta SPECIFIC to this page-->
    <meta name="keywords" content="<?php echo WEBSITE_NAME; ?> book printer how to print a book" />
    <meta name="description"
        content="Premium in-house book printing service for self publishing authors. Choose softcover, hardcover, or spiral bound book printing. Free quote:">

    <meta name="author" content="<?php echo WEBSITE_NAME; ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="preload" href="_head/css/fonts/0-font/zerowidthspaces.woff" as="font" type="font/woff" crossorigin />
    <link rel="preload" href="https://fonts.googleapis.com/css?family=Karla&display=swap" as="style"
        onload="this.onload=null;this.rel='stylesheet'" />
    <link rel="preload" href="https://fonts.googleapis.com/css?family=Merriweather&display=swap" as="style"
        onload="this.onload=null;this.rel='stylesheet'" />
    <link href="_head/css/site/style.min.1735926157.css" rel='stylesheet' type='text/css' media="all">
    <link href="_head/css/site/style-2015.min.1730145778.css" rel='stylesheet' type='text/css' media="all">
    <link href="_head/css/fonts/font-awesome/css/font-awesome.min.1650577242.css" rel='stylesheet' type='text/css'
        media="all">
    <link rel="stylesheet" type="text/css" href="_head/css/menu/css3menu.min.1734468098.css" media="all">
    <link href="_head/css/fonts/0-font/zerowidthspaces.1616090501.css" rel='stylesheet' type='text/css' media="all">
    <link href="_head/css/site/layouts.min.1735925644.css" rel='stylesheet' type='text/css' media="screen">
    <link href="_head/css/site/fonts.min.1699309051.css" rel='stylesheet' type='text/css' media="all">
    <link href="_head/css/site/colors.min.1650670550.css" rel='stylesheet' type='text/css' media="all">
    <link href="_head/css/site/lists.min.1650670552.css" rel='stylesheet' type='text/css' media="all">
    <link href="_head/css/site/tables.min.1731366313.css" rel='stylesheet' type='text/css' media="all">
    <link href="_head/css/site/widgets.min.1735925749.css" rel='stylesheet' type='text/css' media="all">
    <link rel="stylesheet" type="text/css" href="_head/css/site/testing.min.1689638685.css" media="all">
    <script type="text/javascript" src="_head/js/jquery/jquery-3.7.1.min.1743090635.js"></script>
    <script type="text/javascript" src="_head/js/common.1568131103.js"></script>
    <script type="text/javascript" src="_head/js/site/collapser.1690836465.js"></script>
    <script type="text/javascript"
        src="quoting/public/_includes/js/validate/jquery.validate.min.1743205559.js"></script>

    <link href="quoting/public/_includes/css/forms.min.1679438649.css" rel='stylesheet' type='text/css' media="all">
    <link href="quoting/public/_includes/css/css/base.min.1690835789.css" rel='stylesheet' type='text/css' media="all">
    <link href="quoting/public/_includes/css/quotes/quotes.min.1730484353.css" rel='stylesheet' type='text/css'
        media="all">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body class="inquote">


    <div id="page-top" class="anchor"></div>
    <div id="menu_container">

        <div class="main-width-constraint-noedge constraint-extend zero menu_container">
            <a title="Homepage" href="/">
                <picture>
                    <source srcset="Qure-Logix.png" type="image/png">
                    <source srcset="Qure-Logix.png" type="image/png">
                    <img id="menu_logo" src="Qure-Logix.png" width="351" height="37"
                        alt="To our Home Page" />
                </picture>
            </a>

            <div class="top_menu">
                <div class="tracker-circle">
                    <button type="button" class="single-tracker"
                        onclick="location.href='catalog.php';">
                        <i class="fas fa-book"></i>
                    </button>
                    <a class="fake-menu-link" href="catalog.php">&nbsp;<em class="mobile-hide">Free
                        </em>Printing Guide</a>
                </div>

                <div class="tracker-circle">
                    <button type="button" class="single-tracker"
                        onclick="location.href='<?php echo PHONE_HREF; ?>';">
                        <i class="fas fa-phone"></i>
                    </button>
                    <a class="fake-menu-link" href="<?php echo PHONE_HREF; ?>">&nbsp;<?php echo PHONE; ?></a>
                </div>

                <div class="menu-break"></div>

            </div>
        </div>

        <div class="mobile_collapser">Menu</div>

        <div class="gradient-menu text-center">
            <div class="main-width-constraint-noedge constraint-extend zero main_menu menu_container">
                <div class="">
                    <a class="green-menu-link" href="book-printing.php">BOOK PRINTING</a>
                </div>
                <div class="">
                    <a class="green-menu-link" href="book-design.php">BOOK DESIGN</a>
                </div>
                <div class="">
                    <a class="green-menu-link" href="ebooks.php">EBOOKS</a>
                </div>
                <div class="">
                    <a class="green-menu-link" href="publishing-resources.php">PUBLISHING
                        RESOURCES</a>
                </div>
                <div class="">
                    <a class="green-menu-link" href="our-mission.php">OUR MISSION</a>
                </div>
            </div>
        </div>

    </div>