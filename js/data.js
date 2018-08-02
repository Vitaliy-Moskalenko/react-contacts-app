contactsService = (function() {

	var findById = function(id) {

		var deferred = $.Deferred();
		var contact = null;
		var l = contacts.length;

		for(var i = 0; i < l; i++) {
			if(contacts[i].id == id) {
				contact = contacts[i]; break;
			}
		}

		deferred.resolve(contact);
		return deferred.promise();
	},

	findByFio = function(searchKey) {

		var deferred = $.Deferred();
		var results = contacts.filter(function(element) {			
			var fio = element.fio;
			return  fio.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
		});

		deferred.resolve(results);
		return deferred.promise();
	},

	findByEmail = function(searchKey) {

		var deferred = $.Deferred();
		var results = contacts.filter(function(element) {
			return email === element.emeil;
		});	

		deferred.resolve(results);	
		return deferred.promise();
	}


	contacts = [
			{
				id: '1',
    		    fio: 'Darth Vader',
    		    mainNumber: '+7 666 666666',
    		    workNumber: '+7 666 666667',
    		    email:      'pink-rabbit@empire.net',
    		    birthdate:  'unknown',
    		    notes:      ''
			}, {
				id: '2',
    		    fio: 'Princess Leia',
    	   		mainNumber: '+7 777 777777',
    	   		workNumber: '+7 777 777778',
   		     	email:      'barbie@dw.net',
   	    	 	birthdate:  'unknown',
        		notes:      ''
    		}, {
    			id: '3',
       		 	fio: 'Chewbacca',
        		mainNumber: '+7 888 888888',
       			workNumber: '+7 888 888889',
        		email:      'crazy-bear@mustdie.net',
       			birthdate:  'unknown',
        		notes:      ''
			},
			{
    			id: '4',
       		 	fio: 'Luke Skywalker',
        		mainNumber: '+7 888 888888',
       			workNumber: '+7 888 888889',
        		email:      'stupid-pinguin@tatooine.net',
       			birthdate:  'unknown',
        		notes:      ''
			}
		];  

	// The public API
	return {
		findById:    findById,
		findByFio:   findByFio,
		findByEmail: findByEmail
	};

} ());		