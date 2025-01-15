frappe.pages['umt'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'UMT',
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


        body {
            margin: 0;
            font-family: Arial, sans-serif;
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


        .hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background-color: white; /* Optional background color */
}

.hero-text {
  max-width: 50%; /* Adjust as needed */
}

.hero-text h1 {
  font-size: 2.5em;
  margin: 0 0 20px;
}

.hero-text p {
  font-size: 1.2em;
  margin: 0 0 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: #0056b3;
  color: white;
}

.hero-image img {
  max-width: 100%;
  border-radius: 15px; /* Rounded corners */
  height: auto; /* Maintain aspect ratio */
}



.new-arrivals {
            text-align: center;
            padding: 20px;
            background-color: white;
        }
        .new-arrivals h1 {
            font-size: 36px;
            margin: 10px 0;
        }
        .new-arrivals p {
            color: #888;
            margin-bottom: 30px;
        }
        .features {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 40px;
        }
        .feature {
            border: 1px solid #ccc;
            padding: 20px;
            text-align: center;
            flex: 1;
            max-width: 200px;
        }
        .feature h3 {
            margin: 0;
            font-size: 18px;
        }
        .feature p {
            margin: 5px 0 0;
            color: #888;
        }
        .cars {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }
        .cars img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }


        .action-section {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            background-color: white;
        }
        .action {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 15px;
            border-radius: 10px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            width: 100%;
            height: 120px;
        }
        .action img {
            width: 150px;
            height: 60px;
            margin-bottom: 10px;
        }
        .action.visit {
            background-color:rgb(15, 149, 166)
;
        }
        .action.book {
            background-color:rgb(117, 114, 114);
        }
        .action.call {
            background-color:rgb(205, 30, 30);
        }


        .brands-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .brands-header h1 {
            font-size: 36px;
            margin: 10px 0;
        }
        .brands-header p {
            color: #888;
        }
        .brands-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        .brand-card {
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
            background-color: white;
            width: 300px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .brand-card img {
            width: 100%;
            height: auto;
        }
        .brand-card .content {
            padding: 15px;
            text-align: center;
        }
        .brand-card .content h3 {
            margin: 10px 0;
            font-size: 20px;
        }
        .brand-card .content p {
            color: #555;
            margin: 10px 0;
        }
        .brand-card .content a {
            color: #d32f2f;
            text-decoration: none;
            font-weight: bold;
        }


        .finance-section {
            padding: 20px;
            background-color: white;
        }
        .finance-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .finance-header h1 {
            font-size: 36px;
            margin: 10px 0;
        }
        .finance-header p {
            color: #888;
        }
        .finance-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        .finance-card {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 15px;
            background-color: white;
            width: 100%;
        }
        .finance-card img {
            width: 60px;
            height: 60px;
            margin-right: 15px;
            border-radius: 50%;
        }
        .finance-card .content {
            text-align: left;
        }
        .finance-card .content h3 {
            margin: 0;
            font-size: 18px;
        }
        .finance-card .content p {
            color: #555;
            margin: 5px 0 0;
        }



        .parts-section {
            padding: 20px;
            background-color: white;
        }
        .parts-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .parts-header h1 {
            font-size: 36px;
            margin: 10px 0;
        }
        .parts-header p {
            color: #888;
        }
        .parts-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        .parts-card {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .parts-card img {
            width: 50%;
            height: auto;
            border-right: 1px solid #ccc;
        }
        .parts-card .content {
            padding: 15px;
            text-align: left;
            width: 50%;
        }
        .parts-card .content h3 {
            margin: 10px 0;
            font-size: 20px;
        }
        .parts-card .content p {
            color: #555;
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

    <!-- Hero Section -->
    <section class="hero" style="padding-top:15px;">
        <div class="hero-text">
            <h1>United Motors Trade Palestine</h1>
            <p>United Motors Palestine is a leading automotive dealer in Palestine.</p>
            <a href="#" class="btn" style="width: 224px; height: 66px;display: flex;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */">Explore Our Vehicles</a>
            <h3 style="overflow-wrap: break-word; white-space: pre-wrap; max-width: 100%; max-height: 100%; background: none; color: rgb(145, 142, 144); font-family: &quot;IBM Plex Serif&quot;; font-size: 26px; line-height: 120%; font-weight: 600; font-style: normal; text-align: left;padding-top:50px;">About         Our Services</h3>
        </div>
        <div class="hero-image">
            <img src="/files/1.png" alt="Descriptive Alt Text">
        </div>
    </section>

    <div class="new-arrivals">
        <p>Discover Our Models</p>
        <h1>New Arrivals</h1>
        <p>Explore our wide selection of the latest models</p>
        <div class="features">
            <div class="feature">
                <h3>Maintenance</h3>
                <p>Spare Parts</p>
            </div>
            <div class="feature">
                <h3>Accessories</h3>
                <p>Upgrades</p>
            </div>
            <div class="feature">
                <h3>Financing</h3>
                <p>Trade-in</p>
            </div>
            <div class="feature">
                <h3>Booking</h3>
                <p>Contact</p>
            </div>
        </div>
        <div class="cars">
            <img src="/files/our_cars.jpg" alt="Car 1">
        </div>
    </div>

    <div class="action-section">
        <div class="action visit">
            <img src="/files/shop-window.svg" alt="Visit Icon">
            Visit Our Shop
        </div>
        <div class="action book">
            <img src="/files/car-front-fill.svg" alt="Book Icon">
            Book Your Car
        </div>
        <div class="action call">
            <img src="/files/telephone.svg" alt="Call Icon">
            Call Us
        </div>
    </div>

    <div class="brands-section">
        <div class="brands-header">
            <p>Welcome to United Motors Palestine</p>
            <h1>Our Brands</h1>
            <p>Discover the Latest Vehicles</p>
        </div>
        <div class="brands-container">
            <div class="brand-card">
                
                <div class="content">
                    <img src="/files/logo1.jpg" alt="Red Cross" style="height=50px;width:50px;text-align:center;">
                    <h3>Audi</h3>
                    <p>United Motors Palestine is proud to partner with Audi.</p>
                    <a href="#">Learn More</a>
                </div>
                <img src="/files/car1.jpg" alt="Chinese Restaurant">
            </div>
            <div class="brand-card">
                <div class="content">
                <img src="/files/logo2.jpg" alt="Red Cross" style="height=50px;width:50px;text-align:center;">
                    <h3>Volskwagen</h3>
                    <p>Audi's new Q concept car showcases the latest in automotive design and technology.</p>
                    <a href="#">Explore the Concept</a>
                </div>
                <img src="/files/car2.jpg" alt="Chinese Restaurant">
            </div>
            <div class="brand-card">
                <div class="content">
                <img src="/files/logo3.jpg" alt="Red Cross" style="height=50px;width:50px;text-align:center;">
                    <h3>Cupra</h3>
                    <p>United Motors Palestine is excited to partner with the renowned Cupra.</p>
                    <a href="#">Learn More</a>
                </div>
                <img src="/files/car3.jpg" alt="Chinese Restaurant">
            </div>
        </div>
    </div>

    <div class="finance-section" style="padding-top:25px;">
        <div class="finance-header">
            <h1>Financing and Trade-in</h1>
            <p>Convenient Financing Options</p>
            <p>United Motors Palestine offers flexible financing solutions and hassle-free trade-in services to make your vehicle purchase or upgrade easy.</p>
        </div>
        <div class="finance-container">
            <div class="finance-card">
                <img src="/files/a.jpg" alt="Financing Icon">
                <div class="content">
                    <h3>Financing</h3>
                    <p></p>
                </div>
            </div>
            <div class="finance-card">
                <img src="/files/b.jpg" alt="Chinese Language Support Icon">
                <div class="content">
                    <h3>Car Estimation</h3>
                    <p></p>
                </div>
            </div>
            <div class="finance-card">
                <img src="/files/c.jpg" alt="Trade-in Icon">
                <div class="content">
                    <h3>Book Your Trade-in</h3>
                    <p></p>
                </div>
            </div>
            <div class="finance-card">
                <img src="/files/a.jpg" alt="Appointment Icon">
                <div class="content">
                    <h3>Book an Appointment</h3>
                    <p></p>
                </div>
            </div>
        </div>
    </div>

    <div class="parts-section">
        <div class="parts-header">
            <p>Parts and Service</p>
            <h1>Genuine Parts</h1>
            <p>Dedicated Service Center</p>
        </div>
        <div class="parts-container">
            <div class="parts-card">
                <img src="/files/car4.jpg" alt="Maintenance">
                <div class="content">
                    <h3>Maintenance</h3>
                    <p>Explore Our Service Offerings</p>
                </div>
            </div>
            <div class="parts-card">
                <img src="/files/car5.jpg" alt="Genuine Parts">
                <div class="content">
                    <h3>Genuine Parts</h3>
                    <p>Schedule Your Service</p>
                </div>
            </div>
            <div class="parts-card">
                <img src="/files/car6.jpg" alt="Book Now">
                <div class="content">
                    <h3>Book Now</h3>
                    <p>Convenient Booking and Support</p>
                </div>
            </div>
            <div class="parts-card">
                <img src="/files/car7.jpg" alt="Phone">
                <div class="content">
                    <h3>Phone</h3>
                    <p>Get in Touch with Our Experts</p>
                </div>
            </div>
        </div>
    </div>

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
	document.getElementById('contactButton').addEventListener('click', function() {
		document.getElementById('contactDialog').style.display = 'block';
		document.getElementById('overlay').style.display = 'block';
	});

	document.getElementById('closeDialog').addEventListener('click', function() {
		document.getElementById('contactDialog').style.display = 'none';
		document.getElementById('overlay').style.display = 'none';
	});

	document.getElementById('overlay').addEventListener('click', function() {
		document.getElementById('contactDialog').style.display = 'none';
		document.getElementById('overlay').style.display = 'none';
	});

	// Redirect to specific pages when a choice is clicked
	document.getElementById('bookAppointment').addEventListener('click', function() {
		window.location.href = 'umt_book_appointment'; // Replace with your actual page URL
	});

	document.getElementById('inquiry').addEventListener('click', function() {
		window.location.href = 'umt_inquiry'; // Replace with your actual page URL
	});

	document.getElementById('testDrive').addEventListener('click', function() {
		window.location.href = 'umt_test_drive'; // Replace with your actual page URL
	});
}