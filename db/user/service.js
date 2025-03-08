const model = require('./model');

class Service {
    create(data) {
        let instance = new model(data);
        return instance.save()
    }
    get(query) {
        return model.findOne(query)
    }
    update(query, updateData) {
        return model.findOneAndUpdate(query, updateData, { new: true });
    }
    getPassowrd(query) {
        return model.findOne(query).select('+password')
    }
}

module.exports = new Service();
