const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no "firstName", "lastName", "department" args', ()  => {
        const emp = new Employee({});

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        })
    })

    it('should throw an error if any arg is not a string', () => {
    
        const cases = [{}, []];
        for(let arg of cases) {
            const emp = new Employee({ firstName: arg, lastName: arg, department: arg })
            
            emp.validate(err => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;

              });
        }
    })

    it('should not throw an error if "firstName", "lastName", "department" args are ok', () => {

        const cases = ['examples', 'Lorem Ipsum', 'other'];
        for (let arg of cases) {
            const emp = new Employee({firstName: arg, lastName: arg, department: arg})

            emp.validate(err => {
                expect(err).to.not.exist;
                expect(err).to.not.exist;
                expect(err).to.not.exist;
              });
        }
    })

    after(() => {
        mongoose.models = {};
      });

})