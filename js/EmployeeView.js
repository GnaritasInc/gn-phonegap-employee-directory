var EmployeeView = function(employee) {

	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', this.addLocation);
		this.el.on('click', '.add-contact-btn', this.addToContacts);
	};
	
	this.render = function() {
	    this.el.html(EmployeeView.template(employee));
	    return this;
	};

	this.addLocation = function(event) {
	    event.preventDefault();
	    console.log('addLocation');
	    navigator.geolocation.getCurrentPosition(
		function(position) {
		    $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
		},
		function() {
		    // alert('Error getting location');
		    app.showAlert('Error getting location', 'Error');
		});
	    return false;
	};

	this.addToContacts = function(event) {
	    event.preventDefault();
	    console.log('addToContacts');
	    if (!navigator.contacts) {
		app.showAlert("Contacts API not supported", "Error");
		return;
	    }
	    var contact = navigator.contacts.create();
	    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
	    var phoneNumbers = [];
	    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
	    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
	    contact.phoneNumbers = phoneNumbers;
	    contact.save(function () {
	    	app.showAlert("Contact Saved", "Info");
	    }, 
	    function (err) {
	    	app.showAlert("Error saving contact: "+err.code, "Error");
	    });
	    return false;
	};

	this.initialize();

};

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());