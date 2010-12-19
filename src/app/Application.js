/*global CAF */

/**
 * Application
 * @author RobinQu
 * @version 0.1
 */

CAF.app.Application = CAF.extend(CAF.util.Observable, {
	name: "App",
	init: function(config) {
		CAF.cloneTo(this, config);
		//create namespace for current app
		CAF.ns(this.name, 
			this.name + ".views",
			this.name + ".controllers",
			this.name + ".models",
			this.name + ".store.fixtures"
		);
		//bind dom ready
		CAF.onReady(this.onReady, this);
		//prepare the fixtures for default Store
		this.Store = CAF.data.Store.create().from(CAF.data.fixture);
	},
	viewport: "",
	lanuch: ""
	
});