const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;


describe('Employee', () => {

  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getConnectionString();
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Name 1', lastName: 'Surname 1', department: 'Department #1' });
      await testEmpOne.save();  

      const testEmpTwo = new Employee({ firstName: 'Name 2', lastName: 'Surname 2', department: 'Department #2' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Name 3', lastName: 'Surname 3', department: 'Department #3' });
      await testEmpThree.save();  
    });

    it('should return all data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 3;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ lastName: 'Surname 1' });
      expect(employee.lastName).to.be.equal('Surname 1');
        
    });
    
    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Name 2', lastName: 'Surname 1', department: 'Department #1' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Name 1', lastName: 'Surname 1', department: 'Department #1' });
      await testEmpOne.save();  

      const testEmpTwo = new Employee({ firstName: 'Name 2', lastName: 'Surname 2', department: 'Department #2' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Name 3', lastName: 'Surname 3', department: 'Department #3' });
      await testEmpThree.save();  
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ department: 'Department #1' }, { $set: { department: '=Department #1=' }});
      const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ department: 'Department #1' });
      employee.department = '=Department #1=';
      await employee.save();
    
      const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { department: 'Updated!' }});
      const employee = await Employee.find({ department: 'Updated!' });
      expect(employee.length).to.be.equal(3);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => { 

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Name 1', lastName: 'Surname 1', department: 'Department #1' });
      await testEmpOne.save();  

      const testEmpTwo = new Employee({ firstName: 'Name 2', lastName: 'Surname 2', department: 'Department #2' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Name 3', lastName: 'Surname 3', department: 'Department #3' });
      await testEmpThree.save();  
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ lastName: 'Surname 2' });
      const removedEmployee = await Employee.findOne({ firstName: 'Name 2' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({  firstName: 'Name 2' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ lastName: 'Surname 2' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const removedEmployee = await Employee.find();
      expect(removedEmployee.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

  });
  
  after(() => {
    mongoose.models = {};
  });

});