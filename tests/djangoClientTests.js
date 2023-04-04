import DjangoApiClient from '../backend/api/djangoApiClient';
import { expect, should } from 'chai';




describe('ApiClient', function() {
    const client = DjangoApiClient;
    beforeEach(function() {
        // ...
    });
    
    // case 1: establishing connections
    describe('establishing connections', function() {
        // case 1.1
        it('GET /api/', function(done) {
            client.get('/').then(response => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                done();
            })
            .catch(error => {
                done(error);
            });
        });
        // case 1.2
        it('GET /api/welcome', function(done) {
            client.get('/welcome').then(response => {
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('object');
                done();
            })
            .catch(error => {
                done(error);
            });
        });
    });
});


import {addToSavedItem, removeFromSavedItem, getFeed} from '../backend/item.js';
describe('function calls to DjangoApiClient', function() {
    describe('1.item and feeds', function() {
        // it('1.1 addToSavedItem', function(done) {
        //     addToSavedItem().then(response => {
        //         expect(response.status).to.equal(200);
        //         expect(response.data).to.be.an('object');
        //         done();
        //     })
        //     .catch(error => {
        //         done(error);
        //     });
        // });
        // it('1.2 removeFromSavedItem', function(done) {
        //     removeFromSavedItem().then(response => {
        //         expect(response.status).to.equal(200);
        //         expect(response.data).to.be.an('object');
        //         done();
        //     })
        //     .catch(error => {
        //         done(error);
        //     });
        // });
        it('1.3 getFeed', function(done) {
            getFeed().then(list => {
                console.log(list)
                expect(list).to.be.an('array');
                expect(list[0]).to.have.keys('id', 'name', 'location', 'posted_date', 'image_url', 'saved_by', 'is_available');
                for(let i = 0; i < list.length; i++){
                    expect(list[i].image_url).to.not.be.empty;
                }
                done();
            })
            .catch(error => {
                done(error);
            });
        });
    });

});

