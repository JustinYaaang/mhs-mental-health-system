var expect = require('chai').expect;
var mongoose = require('../../config/mongoose');
 
var OrganisationModel = require('../../models/organisation')
 
describe('organisations', function() {
    it('should be invalid if role is not in ["ADMIN", "TRUST", "SERVICE"]', function(done) {
        var model = new OrganisationModel({ role: 'UNKNOWN' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.exist;
            done();
        });
    });

    it('should be valid if role is in ["ADMIN", "TRUST", "SERVICE"]', function(done) {
        var model = new OrganisationModel({ role: 'TRUST' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.not.exist;
            done();
        });
    });

    it('should be invalid if name is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if address1 is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.address1).to.exist;
            done();
        });
    });

    it('should be invalid if address2 is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.address2).to.exist;
            done();
        });
    });

    it('should be invalid if postcode is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.postcode).to.exist;
            done();
        });
    });

    it('should be invalid if description is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.description).to.exist;
            done();
        });
    });

    it('should be invalid if link is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.link).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if telephone is empty', function(done) {
        var model = new OrganisationModel();
 
        model.validate(function(err) {
            expect(err.errors.telephone).to.exist;
            done();
        });
    });

    it('should be invalid if organisation_id is not auto generated', function(done) {
        var model = new OrganisationModel();
        
        model.validate(function(err) {
            expect(mongoose.Types.ObjectId.isValid(model.organisation_id));
            done();
        });
    });
});