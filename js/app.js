// https://github.com/ccoenraets/react-employee-directory/blob/master/iteration2/js/app.js
// http://coenraets.org/blog/2014/12/sample-mobile-application-with-react-and-cordova/

var Header = React.createClass({
	displayName: 'C-Header',
	render: function() {
		return (
			<header className='bar bar-nav'>
				<a href='#'
			   	   className={'icon icon-left-nav pull-left '+(this.props.back === 'true' ? '' : 'hidden')}></a>
				<h1 className='title'>{this.props.text}</h1>
			</header>
		);
	}
});

var SearchBar = React.createClass({
	displayName: 'C-SearchBar',
	getInitialState: function() {
		return { searchKey: '' };
	},

	searchHandler: function(e) {
		var searchKey = e.target.value;
		this.setState({ searchKey: searchKey });
		this.props.searchHandler(searchKey);
	},

	render: function() {
		return (
			<div className='bar bar-standard bar-header-secondary'>
				<input type="search"
		               value={this.state.symbol}
		               onChange={this.searchHandler} />
		    </div>           
	    );
	} 
/*    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
            <input type="search" ref="searchKey" onChange={this.searchHandler}/>
        );
    }	*/
});

var ContactListItem = React.createClass({
	displayName: 'C-ListItem',
/*	propTypes: {
		id:         React.PropTypes.number.isRequired,
		fio:        React.PropTypes.string.isRequired,		
		mainNumber: React.PropTypes.string.isRequired,
		workNumber: React.PropTypes.string,
		email:      React.PropTypes.string.isRequired,
		birthdate:  React.PropTypes.string,
		notes:      React.PropTypes.string,
	}, */

    render: function() {
        return (
      		<li className="table-view-cell media">      		  
       			<h3 className="name">
          				<a href={"#contacts/" + this.props.contact.id}>
          					<img className="media-object small pull-left"
          						 src={"img/"+this.props.contact.fio+".gif"}
          						 alt={this.props.contact.fio} />
          					{this.props.contact.fio}
          				</a>	
          		</h3>
	       		<section>
	       			<p className="email">E-Mail: {this.props.contact.email}</p>
        		</section>
      		</li>
        );
    }
});

var ContactList = React.createClass({
	displayName: 'C-List',

	render: function() {
		var items = this.props.contacts.map(function(contact) {
			return (<ContactListItem key={contact.id} contact={contact} />);
		});

		return (<ul className="table-view"> {items} </ul>);
	}
});

var MainPage = React.createClass({
	displayName: 'C-Main',

	getInitialState: function() {
		return { contacts: [] }
	},

	searchHandler: function(key) {
		this.props.service.findByFio(key).done(function(result) {
			this.setState({ searchKey: key, contacts: result });
		}.bind(this));
	},

	render: function() {
		return (
			<div>
				<Header text="Contacts List" back="false" />
				<SearchBar searchHandler={this.searchHandler} />
				<div className="content">
					<ContactList contacts={this.state.contacts} />
				</div>	
			</div>
		);
	}
});

var ContactDetailPage = React.createClass({
	displayName: 'C-DetailPage',

	getInitialState: function() {
		return { contact: {} };
	},

	componentDidMount: function() {
		this.props.service.findById(this.props.contactId).done(function(result) {
			this.setState({ contact: result });
		}.bind(this));
	},

	render: function() {
		return (
			<div>
				<Header text='Contact Detail Page' back="true" />				
				<div className='card'>
					<ul className='table-view'>
						<li className='table-view-cell media'>	
							<img className="media-object small pull-left"
          						 src={"img/"+this.state.contact.fio+".gif"}
          						 alt={this.state.contact.fio} />
          					<h3>{ this.state.contact.fio }</h3>	
          					<p>Birth Date: {this.state.contact.birthdate}</p>
          				</li>
          				<li className='table-view-cell media'>	 
							<a href={'tel:'+this.state.contact.workNumber}
							   className='push-right'>
								<span className='media-object pull-left icon icon-call'></span>
								<div className='media-body'>
									Call office <p>{this.state.contact.workNumber}</p>
								</div>	
							 </a>
						</li>
						<li className='table-view-cell media'>	 
							<a href={'tel:'+this.state.contact.mainNumber}
							   className='push-right'>
								<span className='media-object pull-left icon icon-call'></span>
								<div className='media-body'>
									Call Mobile <p>{this.state.contact.mainNumber}</p>
								</div>	
							 </a>
						</li>
						<li className='table-view-cell media'>	 
							<a href={'mailto:'+this.state.contact.email}
							   className='push-right'>
								<span className='media-object pull-left icon icon-call'></span>
								<div className='media-body'>
									Email <p>{this.state.contact.email}</p>
								</div>	
							 </a>
						</li>	
          				<li className='table-view-cell'>	
							<p>Notes: {this.state.contact.notes}</p>
          				</li>	
					</ul>
				</div>
			</div>
		);
	}
});

router.addRoute('', function() {
	React.render(
		<MainPage service={contactsService} />,
		document.body
	);
});

router.addRoute('contacts/:id', function(id) {
	React.render(
		<ContactDetailPage contactId={id} service={contactsService} />,
		document.body
	);
});

router.start();