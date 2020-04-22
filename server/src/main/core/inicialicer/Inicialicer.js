const Factory = require('../factory/AbstractFactory');

function inicialize(){
    
    //factoryInstance = factory.getInstancia();
    console.log(Factory.getUserFactory().createUser());
}

module.exports = inicialize();