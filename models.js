var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mongod');

/*
	Não havia especificações de que o id precisava ser numerico e autoincrement
	portanto foi reaproveitado o _id gerado pelo mongodb
*/

var CarSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	brand_id: {
		type: String,
		required: true
	},
	model_id: {
		type: String,
		required: true
	},
	license_plate: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(v) {
				return /^[A-Z]{3}\-\d{4}$/.test(v);
			},
			message: '{VALUE} não é válido para uma placa!'
		},
		set: function(value) {
			return value.toUpperCase();
		}
	},
	id: {
		type: String,
		get: function() {
			return this._id;
		}
	}
}, {
	toJSON: {
		getters: true
	}
});

var Car = mongoose.model("Car", CarSchema);

module.exports = Car;