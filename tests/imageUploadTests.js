import uploadImage from '../backend/api/uploadImage';
import { expect } from 'chai';





describe('upload images', function() {
    beforeEach(function() {
        // ...
    });
    
    // case 1
    describe('1. upload image from internet link', function() {
        it('1.1 cdn-images.article.com', function(done) {
            uploadImage('https://cdn-images.article.com/products/SKU416/2890x1500/image88321.jpg').then(url => {
                expect(url).to.be.a('string');
                done();
            }).catch(error => {
                done(error);
            });
        });
    });
});