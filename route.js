var Car = require("./models.js");

module.exports = function(server) {

	server.route({
		method: "GET",
		path: "/vehicles/{id?}",
		handler: function(req, reply) {
			var q = req.params.id ?
				Car.findOne({
					_id: req.params.id
				}) :
				Car.find();

			q.exec().then(function response(data) {
				reply(data);
			}, function(e) {
				reply({
					message: "Ocorreu um erro interno",
					statusCode: 500
				}).code(500);
			});
		}
	});

	server.route({
		method: "POST",
		path: "/vehicles",
		handler: function(req, reply) {
			var r = req.payload;

			var newCar = new Car({
				name: r.name,
				brand_id: r.brand_id,
				model_id: r.model_id,
				license_plate: r.license_plate
			});

			newCar.save().then(function(car) {
				reply(car);
			}, function(e) {
				reply({
					message: e.code == 11000 ? "Já existe um veículo com essa placa" : "Campos preenchidos incorretamente",
					statusCode: 500
				}).code(500);
			});
		}
	});

	server.route({
		method: "PUT",
		path: "/vehicles/{id?}",
		handler: function(req, reply) {
			var r = req.payload;

			Car.findOne({
				_id: r.id
			}).exec().then(function(car) {
				if (car) {
					car.name = r.name;
					car.brand_id = r.brand_id;
					car.model_id = r.model_id;
					car.license_plate = r.license_plate;

					return car.save();
				}

				return {
					message: "Veículo não encontrado",
					statusCode: 500
				};
			}).then(function(car) {
				reply(car);
			}, function(e) {
				reply({
					message: "Campos preenchidos incorretamente",
					statusCode: 500
				}).code(500);
			});
		}
	});

	server.route({
		method: "DELETE",
		path: "/vehicles/{id?}",
		handler: function(req, reply) {
			var id = req.params.id || req.payload.id;

			Car.findByIdAndRemove(id).exec().then(function(argument) {
				reply(argument);
			});
		}
	});
};