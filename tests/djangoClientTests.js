import DjangoApiClient from '../backend/api/djangoApiClient.js';
import { expect } from 'chai';





describe('ApiClient', function() {
    const client = DjangoApiClient;
    beforeEach(function() {
        // ...
    });
    
    // case 1
    describe('GET /api/', function() {
        // case 1.1
        it('should make a GET request', function(done) {
            client.get('/').then(response => {
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