// Global Variables
var jgTesting = true;
var menuToggle;
var interval;
var closePanel;
var filterValue = 'all';
var selectedProject = 0;
var projectImageSelect = 1;

function jgCheckLoad(){
	if(document.getElementById('lastElement')){
		jgInit();
	}else{
		window.setTimeout(function(){
			jgCheckLoad();
		}, 100)
	}
}

jgCheckLoad();

function jgInit(){
	console.log('init portfolio');
	initMenu();
	populateMasonry(filterValue);
	// Filter Event Listeners
	document.getElementById('all-toggle').addEventListener('click', function(){populateMasonry('all');})
	document.getElementById('web-toggle').addEventListener('click', function(){populateMasonry('Web_Development');})
	document.getElementById('ui-toggle').addEventListener('click', function(){populateMasonry('User_Interface');})
	document.getElementById('ads-toggle').addEventListener('click', function(){populateMasonry('Mobile_Ads');})

	document.getElementById('gallery-back').addEventListener('click', closeDetails);
	document.getElementById('project-next').addEventListener('click', projectNext);
	document.getElementById('project-previous').addEventListener('click', projectPrevious);
}

function initMenu(){
	console.log('init menu');
	menuToggle = document.querySelector('[data-js="menu-toggle"]');

	// Remove this setInterval to trigger the open/close manually through the UI
	interval = setInterval(function() {
	  // menuToggle.click();
	}, 2000);

	// Clear the interval on any click
	document.body.addEventListener('click', function () {
	   clearInterval(interval);
	});

	menuToggle.addEventListener('click', function () {
	  document.body.classList.toggle('panel-open');
	  menuToggle.classList.toggle('open');
	});

	closePanel = document.querySelector('[data-js="hidden-panel-close"]');

	closePanel.addEventListener('click', function () {
	  document.body.classList.remove('panel-open');
	  menuToggle.classList.remove('open');
	});

	setProject(1);
}

// name: 'Surgent Corporate',
// category: 'web_development',
// categoryDetail: 'Web Development',
// codeUsed: 'HTML5, Javascript, CSS, Wordpress',
// description: 'Surgent.com is a custom wordpress install. I am responsible for all themes/templating, and in some cases PHP functionality. This site was built utilizing Divi as a base template and then layering custom CSS/Javascript on top as needed for site functionality.',
// link: 'https://www.surgent.com',
// github: '',
// imagePrefix: 'Surgent',
// noImages: 1,

function populateMasonry(filter){
	document.getElementById('all-toggle').className = '';
	document.getElementById('web-toggle').className = '';
	document.getElementById('ui-toggle').className = '';
	document.getElementById('ads-toggle').className = '';
	switch(filter){
		case 'all':
			document.getElementById('all-toggle').className = 'active';
			break;
		case 'Web_Development':
			document.getElementById('web-toggle').className = 'active';
			break;
		case 'User_Interface':
			document.getElementById('ui-toggle').className = 'active';
			break;
		case 'Mobile_Ads':
			document.getElementById('ads-toggle').className = 'active';
			break;
	}
	console.log(projectData);
	console.log("No of projects: " + projectData.length);
	document.getElementById('brick-layout').innerHTML = "";
	for(var i = 0; i < projectData.length; i++){
		var catOne = projectData[i].category.split('_')[0];
		var catTwo = projectData[i].category.split('_')[1];
		var catIcon;
		if(projectData[i].category == 'Web_Development'){catIcon = 'code';}
		if(projectData[i].category == 'User_Interface'){catIcon = 'desktop';}
		if(projectData[i].category == 'Mobile_Ads'){catIcon = 'mobile';}
		// console.log('Project #' + i);
		if(filter == 'all'){
			// console.log('Project #' + (i + 1));
			let galleryCard = document.createElement('div');
			galleryCard.id = 'gallery-card-' + (i + 1);
			galleryCard.className = 'grid__item';
			galleryCard.setAttribute('onclick', "javscript:revealProject(" + (i) + ")");
			galleryCard.innerHTML = `
				<img class="grid__img" src="images/` + projectData[i].imagePrefix + `_thumb.jpg" alt="` + projectData[i].name + `" />
				<div class="card-overlay">
					<p class="card-title">` + projectData[i].name + `</p>
					<div class="overlay-hover">
						<p>` + catOne + `<span>` + catTwo + `</span></p>
						<i class="far fa-` + catIcon + `"></i>
					</div>
				</div>
			`;
			document.getElementById('brick-layout').append(galleryCard);
			window.setTimeout(function(){
				galleryCard.style.opacity = '1';
			}, (i * 150))
		}else if(filter == projectData[i].category){
			// console.log('Project #' + (i + 1) + " - " + projectData[i].category);
			let galleryCard = document.createElement('div');
			galleryCard.id = 'gallery-card-' + (i + 1);
			galleryCard.className = 'grid__item';
			galleryCard.setAttribute('onclick', "javscript:revealProject(" + (i) + ")");
			galleryCard.innerHTML = `
				<img class="grid__img" src="images/` + projectData[i].imagePrefix + `_thumb.jpg" alt="` + projectData[i].name + `" />
				<div class="card-overlay">
					<p class="card-title">` + projectData[i].name + `</p>
					<div class="overlay-hover">
						<p>` + catOne + `<span>` + catTwo + `</span></p>
						<i class="far fa-` + catIcon + `"></i>
					</div>
				</div>
			`;
			document.getElementById('brick-layout').append(galleryCard);
			window.setTimeout(function(){
				galleryCard.style.opacity = '1';
			}, (i * 150))
		}
	}
	init();
	// applyFx('Hapi');
}

function revealProject(revealNo){
	document.getElementById('brick-layout-holder').className = 'masonryActive';
	window.setTimeout(function(){
		setProject(revealNo);
		var scrollPosition =  $('html').scrollTop();
		if(scrollPosition > 40){
			$('html').scrollTop(0);
			document.getElementById('project-details').className = 'active';
		}else{
			document.getElementById('project-details').className = 'active';
		}
	}, 400)
}

function closeDetails(){
	document.getElementById('project-details').className = '';
	document.getElementById('brick-layout-holder').className = '';
}

function setProject(projectNo){
	selectedProject = projectNo;
	console.log('Project Details - ' + projectNo);
	console.log('Name - ' + projectData[projectNo].name);
	console.log('Category Detail - ' + projectData[projectNo].categoryDetail);
	console.log('Code Used - ' + projectData[projectNo].codeUsed);
	console.log('Description - ' + projectData[projectNo].description);
	console.log('Link - ' + projectData[projectNo].link);
	console.log('Github - ' + projectData[projectNo].github);
	console.log('Image Prefix - ' + projectData[projectNo].imagePrefix);
	console.log('No Images - ' + projectData[projectNo].noImages);

	document.getElementById('project-image').className = "project-image-" + projectNo;

	document.getElementById('project-name').innerHTML = projectData[projectNo].name;
	document.getElementById('project-category').innerHTML = "<i class='far fa-desktop-alt'></i> " + projectData[projectNo].categoryDetail;
	document.getElementById('project-code').innerHTML = "<i class='far fa-code'></i> " + projectData[projectNo].codeUsed;
	document.getElementById('project-description').innerHTML = projectData[projectNo].description;

	if(projectData[projectNo].link != ""){
		document.getElementById('project-link').setAttribute('href', projectData[projectNo].link);
		document.getElementById('project-link').style.display = "block";
	}else{
		document.getElementById('project-link').style.display = "none";
	}

	if(projectData[projectNo].github != ""){
		document.getElementById('project-github').setAttribute('href', projectData[projectNo].github);
		document.getElementById('project-github').style.display = "block";
	}else{
		document.getElementById('project-github').style.display = "none";
	}

	if(typeof projectData[projectNo].noImages == "number"){
		document.getElementById('project-image').innerHTML = "";
		document.getElementById('project-image').style.background = "url(images/" + projectData[projectNo].imagePrefix + "_1.jpg)";
		document.getElementById('project-image-previous').style.display = "none";
		document.getElementById('project-image-next').style.display = "none";
		if(projectData[projectNo].noImages > 1){
			document.getElementById('project-image-previous').style.display = "block";
			document.getElementById('project-image-next').style.display = "block";
			document.getElementById('project-image-previous').addEventListener('click', projectImagePrevious);
			document.getElementById('project-image-next').addEventListener('click', projectImageNext);
		}
	}else{
		try{
			document.getElementById('project-image-previous').removeEventListener('click', projectImagePrevious);
			document.getElementById('project-image-next').removeEventListener('click', projectImageNext);
		}catch(e){}
		document.getElementById('project-image-previous').style.display = "none";
		document.getElementById('project-image-next').style.display = "none";
		document.getElementById('project-image').style.background = "none";
		document.getElementById('project-image').innerHTML = "<iframe src='" + projectData[projectNo].noImages.split("|")[1] + "'>";
	}
	// document.getElementById('project-name').innerHTML = projectData[projectNo].imagePrefix;
}

function projectImageNext(){
	projectImageSelect++;
	if(projectImageSelect > (projectData[selectedProject].noImages)){projectImageSelect = 1;}
	document.getElementById('project-image').style.background = "url(images/" + projectData[selectedProject].imagePrefix + "_" + projectImageSelect + ".jpg)";
}

function projectImagePrevious(){
	projectImageSelect--;
	if(projectImageSelect < 1){projectImageSelect = projectData[selectedProject].noImages;}
	document.getElementById('project-image').style.background = "url(images/" + projectData[selectedProject].imagePrefix + "_" + projectImageSelect + ".jpg)";
}

function projectNext(){
	document.getElementById('project-left').style.opacity = "0";
	document.getElementById('project-right').style.opacity = "0";
	window.setTimeout(function(){
		selectedProject++;
		if(selectedProject > (projectData.length - 1)){selectedProject = 0;}
		setProject(selectedProject);
		document.getElementById('project-left').style.opacity = "1";
		document.getElementById('project-right').style.opacity = "1";
	}, 400)
}

function projectPrevious(){
	document.getElementById('project-left').style.opacity = "0";
	document.getElementById('project-right').style.opacity = "0";
	window.setTimeout(function(){
		selectedProject--;
		if(selectedProject < 0){selectedProject = (projectData.length - 1);}
		setProject(selectedProject);
		document.getElementById('project-left').style.opacity = "1";
		document.getElementById('project-right').style.opacity = "1";
	}, 400)
}

function revealAbout(){
	document.getElementById('about-section').className = 'active';
}

function closeAbout(){
	document.getElementById('about-section').className = '';
}


// JSON Project Object
var projectData = [
	projects = {
		name: 'Surgent Corporate',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS, Wordpress',
		description: 'Surgent.com is a custom wordpress install. I am responsible for all themes/templating, and in some cases PHP functionality. This site was built utilizing Divi as a base template and then layering custom CSS/Javascript on top as needed for site functionality.<br/><br/>This site also includes a custom WooCommerce integration and styling module.',
		link: 'https://www.surgent.com',
		github: '',
		imagePrefix: 'Surgent',
		noImages: 1,
	},
	{
		name: 'Lincoln MKC',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'This creative ran specifically on iPad. When users saw the panel, they could rotate the car by clicking, which would display informational pieces about the car model and also change the color of the car they were viewing.<br/><br/>The sections at the bottom of the ad also activate additional content content areas and the ad was configured to accept touch swiping input in addition to clicks.',
		link: 'http://jginsburg.com/mobileads/Lincoln/index.html',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/Lincoln',
		imagePrefix: 'Lincoln',
		noImages: 1,
	},
	{
		name: 'ABC - Once Upon A Time',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'This was a mobile polite unit. The client had a trailer for the show and wanted to match the animation style with a few of the visual effects in the trailer, such as the smoke and lightning effects.',
		link: '',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/ABC',
		imagePrefix: 'ABC',
		noImages: 'iframe|http://jginsburg.com/mobileads/ABC/index.html',
	},
	{
		name: 'Cricket Wireless',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'This creative has two parts, with the first portion being animation, which matches the style of the commercials. <br/><br/>The second aspect of the creative is a store locator (the feed is no longer active), which grabs the zip code of where the ad is being viewed and then uses it to return the closest store.',
		link: '',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/Cricket_Wireless',
		imagePrefix: 'Cricket',
		noImages: 'iframe|http://jginsburg.com/mobileads/Cricket_Wireless/index.html',
	},
	{
		name: 'Landrover',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'Land Rover utilizes DCO and AdControl, two proprietary products that generate a JSON feed. My creative uses this feed to populate the unit. The feeds return information such as the car model, price, legal terms and copy. Based these returns, the colors, models and wheel types change.<br/><br/>In addition, the feed uses the location where the ad is viewed to determine which local deals are the correct ones to deliver.',
		link: '',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/LandRover',
		imagePrefix: 'Landrover',
		noImages: 'iframe|http://jginsburg.com/mobileads/LandRover/index.html',
	},
	{
		name: 'Greek Solutions Corporate',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS, Telerik, .NET',
		description: 'Shown here is the front-facing website for the Greek Solutions Chapter Management product. The goal of the site was to provide an external face so that both prospective organizations and users would be able to see what our internal system was capable of.<br/><br/>Behind the scenes, this site was built using .NET and Telerik and was managed by our own content management system where templates and individual pages could be updated.',
		link: 'http://www.greek-solutions.com/Corporate/CorporateHome.aspx',
		github: '',
		imagePrefix: 'GSCorporate',
		noImages: 1
	},
 	{
		name: 'Surgent CPA Review',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS, Wordpress',
		description: 'Surgent CPA Review is a custom wordpress install utilizing Woocommerce. I am responsible for all themes/templating, and in some cases PHP functionality.<br/><br/>Depending on the page, this site also has custom Javascript functionality as well as CSS, depending on what functionality is required of a given page. The images shown illustrate a tabbed pricing grid, a product detail page and an SEO focused content page.',
		link: 'https://www.surgentcpareview.com',
		github: '',
		imagePrefix: 'CPAR',
		noImages: 4,
	},
	{
		name: 'Purple Lion',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS, Telerik',
		description: 'Purple Lion is the corporate umbrella under which Greek Solutions sits. While Greek Solutions is one product, Purple Lion has also completed custom web development projects and we wanted a site that would appeal to a more diverse audience.',
		link: 'http://www.purpleliondesign.com/lion/',
		github: '',
		imagePrefix: 'PurpleLion',
		noImages: 1,
	},
	{
		name: 'Autosport',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS, .NET',
		description: 'Autosport is a car reseller specializing in refurbished vintage cars and memorabilia. They needed a rebranded site, as well as new functionality. When we updated the site we allowed customers to easily search for cars as well as find out general information about the products Autosport offers.',
		link: '',
		github: '',
		imagePrefix: 'Autosport',
		noImages: 6,
	},
	{
		name: 'Kelly Sports',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, CSS',
		description: 'Kelly Sports needed a web store focusing on selling team apparel and clothing to high school teams. Their site now has functionality which players, coaches and parents can all utilize. While shopping they can choose which type of sports gear the need, which logos they would like to use, and a required ship date.',
		link: 'https://kellysteamstores.com/Kellys/Products.aspx',
		github: '',
		imagePrefix: 'KellySports',
		noImages: 6,
	},
	{
		name: 'TRACE International',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS, Photoshop',
		description: 'TRACE International requested a portal which allows them to track candidates for potential employment during the vetting process. The system we designed required sections for user management, interview results and other relevant information. The portal shown here was created to track corporate gifts and expenses.',
		link: 'https://tracnumber.com/StaticPages/Home.aspx',
		github: '',
		imagePrefix: 'TraceGift',
		noImages: 3,
	},
	{
		name: 'STS Tire',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'STS Tire needed a rebranding as well as building additional content onto their previously existing site. As a seller of tires and auto services, they needed for customers to be able to browse tire options, schedule maintenance appointments and pay for products with a full checkout process.',
		link: '',
		github: '',
		imagePrefix: 'STS',
		noImages: 3,
	},
	{
		name: 'Hotwire Communications',
		category: 'Web_Development',
		categoryDetail: 'Web Development',
		codeUsed: 'HTML5, Javascript, CSS, Photoshop',
		description: 'Hotwire Communications does a lot of work that involves its customers needing to know the schedule of work. This is a proof of concept of a mini-site that would be used for each property they serviced. The information here would include information about the services offered, as a well as an interactive map of the property in question with information about the progress of the work. Given that it is a proof of concept, not all links are functional.',
		link: 'images/HotwireLaunchSite/events.html',
		github: 'https://github.com/jeginsburg/Hotwire',
		imagePrefix: 'Hotwire',
		noImages: 1,
	},
	{
		name: 'Ford Fusion',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'Ford Fusion had an existing video, but wanted the clickable ad afterwards to mimic the end frame. Their layout also had to change based on whether it is viewed in portrait or in landscape. You can view the ad and rotate your device by clicking the button below.',
		link: '',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/Ford',
		imagePrefix: 'Ford',
		noImages: 'iframe|http://jginsburg.com/mobileads/Ford/index.html',
	},
	{
		name: 'Living Social',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: "This unit is a creative that ran before Valentine's Day. A user would select a few options to the questions, and then, based on their answer, the unit communicated with the Living Social API and returned a JSON feed of events.<br/><br/>The unit then takes that information and populates a graphic with all the deals that the user can view and select. The feed is no longer active in the code example.",
		link: 'http://jginsburg.com/mobileads/Living_Social/index.html',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/Living_Social',
		imagePrefix: 'LivingSocial',
		noImages: 1,
	},
	{
		name: 'Volkswagen',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'This was an exapandable unit, of which the first portion is an animated car driving in the frame. Afterwards, on click, the unit expands to a larger view in which the customer would view one of three videos.<br/><br/>The expanded view also needed to be responsive since the ad did not run exclusively on iOS devices with set tablet dimensions.',
		link: 'http://jginsburg.com/mobileads/Volkswagon/index.html',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/Volkswagon',
		imagePrefix: 'Volkswagen',
		noImages: 1,
	},
	{
		name: 'Ziploc',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'This ad, which appeared on Facebook last summer, was reached by a user clicking on the ad within Facebook itself.<br/><br/>Once the ad expanded, the user can get tips, take a small quiz and click out to view informative sites. This ad was also unique b/c it had to utilize the Facebook advertising API.',
		link: 'http://jginsburg.com/mobileads/Ziploc/index.html',
		github: 'https://github.com/jeginsburg/2016-Portfolio/tree/master/_assets/ads_running/mobileads/Ziploc',
		imagePrefix: 'Ziploc',
		noImages: 1,
	},
	{
		name: 'Patròn Tequila',
		category: 'Mobile_Ads',
		categoryDetail: 'HTML5 Mobile Ads',
		codeUsed: 'HTML5, Javascript, CSS',
		description: 'This utilized both video as well as having a voting element. Once the initial animation plays, each of the possible cocktail options scrolls through, and clicking on any of them would send off a voting pixel as well as taking the user to the vote received page.<br/><br/>The voting pixel was an assembled URL utilizing a voting API and based on data set when a particular drink was selected.',
		link: '',
		github: '',
		imagePrefix: 'Patron',
		noImages: 1,
	},
	{
		name: 'Bayada Home Health Care',
		category: 'User_Interface',
		categoryDetail: 'User Interface',
		codeUsed: 'Adobe Creative Suite',
		description: 'This project involved creating an employee portal in which users could locate local offices for medical care. The screenshot shown is a mockup of the detail page for a given office, after it had come up during a search.',
		link: '',
		github: '',
		imagePrefix: 'Bayada',
		noImages: 1,
	},
	{
		name: 'Sleep Solutions',
		category: 'User_Interface',
		categoryDetail: 'User Interface',
		codeUsed: 'Adobe Creative Suite',
		description: 'Sleep Solutions needed a specific design intended for an iPad display. They required a medical aid application that tracks patients, their test results, and appointments. The application also aided in recording the efficacy of a given medication as well as sleep trials that are being conducted.',
		link: '',
		github: '',
		imagePrefix: 'SleepSolutions',
		noImages: 1,
	},
	{
		name: 'GS1',
		category: 'User_Interface',
		categoryDetail: 'User Interface',
		codeUsed: 'Adobe Creative Suite',
		description: 'GS1 needed a Sharepoint based employee resource portal. The GS1 portal needed to accommodate news, links and videos to showcase top-rated ad content as well as their own video-based announcements.',
		link: '',
		github: '',
		imagePrefix: 'GS1',
		noImages: 1,
	},
	{
		name: 'Greek Solutions Internal',
		category: 'User_Interface',
		categoryDetail: 'User Interface',
		codeUsed: 'Adobe Creative Suite',
		description: 'The main interface for Greek Solutions is the student-focused internal portal. College organizations use this portal to manage members, finances, recruitment, as well as their external website and a host of other features. We also created a mobile and tablet version of the portal due to the popularity of these devices with a younger demographic.',
		link: '',
		github: '',
		imagePrefix: 'GSInternal',
		noImages: 1,
	},
	{
		name: 'Royal Palm',
		category: 'User_Interface',
		categoryDetail: 'User Interface',
		codeUsed: 'Adobe Creative Suite',
		description: 'Royal Palm required a system that could track employee’s completed work and help them keep on schedule. The mockups you see here include their general dashboard as well as various account and task management screens.',
		link: '',
		github: '',
		imagePrefix: 'RoyalPalm',
		noImages: 4,
	},
	{
		name: 'National Tuxedo',
		category: 'User_Interface',
		categoryDetail: 'User Interface',
		codeUsed: 'Adobe Creative Suite',
		description: 'National Tuxedo needed a full website where users could view, rent, and order tuxedos. In addition to ordering tuxedos, the site also needed to support wedding parties. The groomsmen were tracked when they had ordered their suit and had gotten fitted. The screens show the tuxedo builder page as well as the wedding party manager and checkout process.',
		link: '',
		github: '',
		imagePrefix: 'NationalTuxedo',
		noImages: 7,
	},
]
// console.log(projectData);
