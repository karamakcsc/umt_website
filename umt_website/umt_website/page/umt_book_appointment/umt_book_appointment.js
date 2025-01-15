frappe.pages['umt_book_appointment'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Book Appointment',
        single_column: true
    });

    var html_context = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Car Trading Company</title>
		<style>
            /* Reset some default browser styles */
            body, h1, h2, p, ul, li, form, input, textarea, button, select {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, sans-serif;
            }
            body {
                line-height: 1.6;
            }
            .umt-navbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: white;
                color: white;
                padding: 10px 20px;
            }
            .umt-navbar img {
                height: 120px;
            }
            .umt-navbar ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                display: flex;
            }
            .umt-navbar ul li {
                margin: 0 10px;
            }
            .umt-navbar ul li a {
                text-decoration: none;
                color: black;
                padding: 5px 10px;
                transition: background-color 0.3s;
                font-weight: bold;
            }
            .umt-navbar ul li a:hover {
                background-color: black;
                border-radius: 5px;
                color: white;
            }
            .intro {
                padding: 2rem 0;
                background: #333;
                color: #f4f4f4;
                text-align: center;
            }
            .intro h2 {
                margin-bottom: 1rem;
                font-size: 2rem;
            }
            .intro p {
                margin-bottom: 1rem;
                font-size: 1rem;
                color: white;
            }
            .appointment {
                padding: 2rem 0;
            }
            .appointment h2 {
                text-align: center;
                margin-bottom: 1.5rem;
                font-size: 2rem;
            }
            .appointment form {
                max-width: 600px;
                margin: auto;
                background: #f4f4f4;
                padding: 2rem;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .appointment label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: bold;
            }
            .appointment input,
            .appointment textarea,
            .appointment select {
                width: 100%;
                padding: 0.7rem;
                margin-bottom: 1rem;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .appointment button.btn {
                display: block;
                width: 100%;
                background: #333;
                color: #fff;
                padding: 0.7rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
            }
            .appointment button.btn:hover {
                background: #555;
            }
            /* Floating Contact Us Button */
            #contactButton {
                position: fixed;
                top: 50%;
                right: 0;
                transform: translateY(-50%) rotate(180deg); /* Rotate the button 180 degrees */
                transform-origin: center; /* Rotate around the center */
                z-index: 1000;
                white-space: nowrap; /* Prevent text from wrapping */
                padding: 10px 20px; /* Add padding for better appearance */
                background: #6d83f2;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                writing-mode: vertical-rl; /* Make text vertical */
                letter-spacing: 2px; /* Reduce spacing between letters */
                font-weight: bold;
            }
            /* Dialog Window Styling */
            #contactDialog {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                max-width: 800px;
                background: white;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                z-index: 1001;
            }
            #contactDialog .row-container {
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }
            .contact-div {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                transition: opacity 0.3s ease;
                cursor: pointer; /* Add pointer cursor for clickable divs */
            }
            .contact-div:hover {
                opacity: 0.7;
            }
            .contact-div img {
                width: 100px;
                height: 100px;
                margin-bottom: 10px;
            }
            .contact-div p {
                margin: 0;
                font-size: 18px;
            }
            #overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
            }
            .footer {
                background-color: #f5f5f5;
                padding: 40px 20px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            .footer .column {
                flex: 1;
                min-width: 200px;
                margin: 10px;
            }
            .footer h3 {
                margin-bottom: 20px;
                font-size: 18px;
                text-transform: uppercase;
            }
            .footer ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .footer ul li {
                margin-bottom: 10px;
            }
            .footer ul li a {
                text-decoration: none;
                color: black;
                transition: color 0.3s;
            }
            .footer ul li a:hover {
                color: #1dbf73;
            }
            .footer .social-icons {
                display: flex;
                gap: 10px;
            }
            .footer .social-icons a {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #ffffff;
                color: #0a2a3e;
                border-radius: 50%;
                text-decoration: none;
                transition: transform 0.3s;
            }
            .footer .social-icons a:hover {
                transform: scale(1.1);
            }
		</style>
	</head>
	<body>
		<!-- Navigation Bar -->
        <nav class="umt-navbar">
            <div class="Logo">
                <img src="/files/logo.png" alt="Logo">
            </div>
            <ul>
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#our-brands">Our Brands</a></li>
                <li><a href="#after-sales-service">After Sales Service</a></li>
                <li><a href="#news-media">News & Media</a></li>
                <li><a href="#contact-us">Contact Us</a></li>
            </ul>
        </nav>

		<!-- Introduction Section -->
		<section class="intro">
			<div class="container">
				<h2 style="color: #f4f4f4;">About Us</h2>
				<p>At UMT, we offer a seamless experience for car enthusiasts looking to buy or sell vehicles. Our team is dedicated to providing exceptional service and ensuring customer satisfaction.</p>
				<p>With a wide range of cars and a commitment to quality, we are your go-to destination for all things automotive.</p>
			</div>
		</section>

		<!-- Appointment Form Section -->
		<section class="appointment" id="appointment">
			<div class="container">
				<h2>Book an Appointment</h2>
				<form action="#" method="post">
					<label for="name">First Name *</label>
					<input type="text" id="fname" name="fname" required>

					<label for="name">Last Name *</label>
					<input type="text" id="lname" name="lname" required>

					<label for="email">E-mail *</label>
					<input type="email" id="email" name="email" required>

					<label for="phone">Phone Number *</label>
					<input type="tel" id="phone" name="phone" required>

					<label for="website">Website</label>
					<input type="text" id="website" name="website">

					<label for="date">Preferred Date *</label>
					<input type="date" id="date" name="date" required>

					<label for="time-slots">Select a time *</label>
					<select id="time-slots" name="time-slots" required>
						<option value="09:00:00">9:00 AM</option>
						<option value="09:30:00">9:30 AM</option>
						<option value="10:00:00">10:00 AM</option>
						<option value="10:30:00">10:30 AM</option>
						<option value="11:00:00">11:00 AM</option>
						<option value="11:30:00">11:30 AM</option>
						<option value="12:00:00">12:00 PM</option>
						<option value="12:30:00">12:30 PM</option>
						<option value="13:00:00">1:00 PM</option>
						<option value="13:30:00">1:30 PM</option>
						<option value="14:00:00">2:00 PM</option>
						<option value="14:30:00">2:30 PM</option>
						<option value="15:00:00">3:00 PM</option>
						<option value="15:30:00">3:30 PM</option>
						<option value="16:00:00">4:00 PM</option>
						<option value="16:30:00">4:30 PM</option>
						<option value="17:00:00">5:00 PM</option>
						<option value="17:30:00">5:30 PM</option>
					</select>

					<label for="message">Message</label>
					<textarea id="message" name="message" rows="4"></textarea>

					<button id="btnSubmit" type="button" class="btn">Submit</button>
				</form>
			</div>
		</section>

        <div class="footer">
        <div class="column">
            <h3>Menu</h3>
            <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Our Brands</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">After Sales Service</a></li>
            </ul>
        </div>
        <div class="column">
            <ul>
                <li><a href="#">Latest Offers</a></li>
                <li><a href="#">Used Cars</a></li>
                <li><a href="#">Our News</a></li>
                <li><a href="#">Report Violations Of The Code Of Conduct</a></li>
                <li><a href="#">Privacy And Policies</a></li>
            </ul>
        </div>
        <div class="column">
            <h3>Contact</h3>
            <p>Palestine</p>
            <p>Sales: 1700321321</p>
            <p>Aftersales: 1700550550</p>
            <p>Email: info@umtpal.com</p>
        </div>
        <div class="column">
            <h3>Like Us</h3>
            <p>Follow Us On Social Media</p>
            <div class="social-icons">
                <a href="#" style="background-color: #3b5998;">F</a>
                <a href="#" style="background-color: #1da1f2;">T</a>
                <a href="#" style="background-color: #ff0000;">Y</a>
                <a href="#" style="background-color: #e4405f;">I</a>
                <a href="#" style="background-color: #fffc00;">S</a>
            </div>
        </div>
    </div>

        <!-- Floating Contact Us Button -->
    <button id="contactButton" class="btn btn-primary" style="background-color: #007bff;">Contact Us</button>

    <!-- Dialog Window -->
    <div id="contactDialog">
        <div class="row-container">
            <div class="contact-div" id="bookAppointment">
                <img src="/files/appointment.jpg" alt="Book Appointment">
                <p>Book an Appointment</p>
            </div>
            <div class="contact-div" id="inquiry">
                <img src="/files/inquiry.jpg" alt="Inquiry">
                <p>Inquiry</p>
            </div>
            <div class="contact-div" id="testDrive">
                <img src="/files/test_drive.jpg" alt="Test Drive">
                <p>Test Drive</p>
            </div>
        </div>
        <button id="closeDialog" class="btn btn-secondary mt-3">Close</button>
    </div>

    <!-- Overlay -->
    <div id="overlay"></div>
	</body>
	</html>
	`;

    page.body.html(html_context);

    // JavaScript to handle button click and dialog display
    document.getElementById('contactButton').addEventListener('click', function () {
        document.getElementById('contactDialog').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    });

    document.getElementById('closeDialog').addEventListener('click', function () {
        document.getElementById('contactDialog').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    document.getElementById('overlay').addEventListener('click', function () {
        document.getElementById('contactDialog').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    // Redirect to specific pages when a choice is clicked
    document.getElementById('bookAppointment').addEventListener('click', function () {
        window.location.href = 'umt_book_appointment'; // Replace with your actual page URL
    });

    document.getElementById('inquiry').addEventListener('click', function () {
        window.location.href = 'umt_inquiry'; // Replace with your actual page URL
    });

    document.getElementById('testDrive').addEventListener('click', function () {
        window.location.href = 'umt_test_drive'; // Replace with your actual page URL
    });

    document.getElementById('btnSubmit').addEventListener('click', submitToErpnext);

    function submitToErpnext() {
        let fname = document.getElementById('fname').value.trim();
        let lname = document.getElementById('lname').value.trim();
        let email = document.getElementById('email').value.trim();
        let phone = document.getElementById('phone').value.trim();
        let website = document.getElementById('website').value.trim();
        let preferred_date = document.getElementById('date').value.trim();
        let preferred_time = document.getElementById('time-slots').value.trim();
        let message = document.getElementById('message').value.trim();

        if (!fname || !lname || !email || !phone) {
            frappe.msgprint('Please fill out all required fields.');
            return;
        }

        let formData = {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            website: website,
            preferred_date: preferred_date,
            preferred_time: preferred_time,
            message: message
        };

        frappe.call({
            method: 'umt_website.umt_website.functions.umt.set_appointment',
            args: { data: formData },
            callback: function (response) {
                if (response.message) {
                    frappe.msgprint('Appointment Created Successfully!');
                    document.querySelector('form').reset();
                } else {
                    frappe.msgprint('Failed to create Appointment. Please try again.');
                }
            }
        });
    }
}