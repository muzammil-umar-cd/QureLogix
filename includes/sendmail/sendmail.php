<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer
require_once 'vendor/autoload.php';

if (isset($_POST['send_reserve_req']) || $_SERVER['REQUEST_METHOD'] === 'POST') {
  //Get form data
  $name = isset($_POST['name']) ? $_POST['name'] : '';
  $email = isset($_POST['email']) ? $_POST['email'] : '';
  $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
  $message = isset($_POST['message']) ? $_POST['message'] : 'No Message';
  $topic = isset($_POST['topic']) ? $_POST['topic'] : 'No Topic';

  // DETAILS
  $ip_address = isset($_POST['ip_address']) ? $_POST['ip_address'] : '';
  $city = isset($_POST['city']) ? $_POST['city'] : '';
  $country = isset($_POST['country']) ? $_POST['country'] : '';
  $internet_connection = isset($_POST['internet_connection']) ? $_POST['internet_connection'] : '';
  $zipcode = isset($_POST['zipcode']) ? $_POST['zipcode'] : '';
  $region = isset($_POST['region']) ? $_POST['region'] : '';


  $data = '<h1 style="color: #01163A;text-align: center;">Qure Logix Contact Form</h1><table style="width:100%; border: 1px solid black; border-collapse: collapse;">';
  $data .= '<tr>
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Name<td><br>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $name . '</td><br>
			</tr>
			<tr>
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Email<td><br>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $email . '</td>
			</tr>	
			<tr>
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Phone<td>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $phone . '</td>
			</tr>
			<tr>
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Source<td>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $topic . '</td>
			</tr>
			<tr> 
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Message<td>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $message . '</td>
			</tr>
			<tr>
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Client IP<td>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $ip_address . '</td>
			</tr>
			<tr>
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Client City<td>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $city . '</td>
			</tr> 
			<tr>
				<td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Client Region<td>
				<td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $region . '</td>
			</tr>
			<tr>
          <td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Client Country<td>
          <td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $country . '</td>
      </tr>
      <tr>
          <td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Client Connection<td>
          <td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $internet_connection . '</td>
      </tr>
      <tr>
          <td style="border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px; font-weight: 500;">Client Zipcode<td>
          <td style=" border: 1px solid black; border-collapse: collapse; padding: 15px; text-align: left; font-size:15px">' . $zipcode . '</td>
      </tr>
      ';
  $data .= '</table>';

  // Create a new PHPMailer instance
  $mail = new PHPMailer(true);

  try {
    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF; // Enable verbose debug output
    $mail->isSMTP(); // Send using SMTP
    $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'brandformsubmission@gmail.com'; // SMTP username
    $mail->Password = 'bcicqekxsbhppskd'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port = 587; // TCP port to connect to

    // Recipients
    $mail->setFrom('brandformsubmission@gmail.com', 'Qure Logix');

    $mail->addAddress('info@qurelogix.com'); // Add a recipient

    // Content
    $mail->isHTML(true); // Set email format to plain text
    $mail->Subject = 'Qure Logix - Form Submission';
    $mail->Body = $data;

    if ($mail->send()) {
        
      $urlParameters = "name=" . $_POST['name'] . "&email=" . $_POST['email'] . "&phone=" . (isset($_POST['phone']) ? $_POST['phone'] : '') . "&message=" . (isset($_POST['message']) ? $_POST['message'] : '');

      header("location: /thankyou.php?$urlParameters");
    }
  } catch (Exception $e) {
    echo "There was a problem sending your submission. Error: {$mail->ErrorInfo}";
  }
}
