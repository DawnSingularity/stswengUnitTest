const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        },
        params: { 
            id: "5aa06bb80738152cfd536fdc" // for testing get, delete and update post
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;
    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });
        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };
            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);
            // Act
            PostController.create(req, res);
            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
    });

    describe('index (get all)', () => {
        let updatePostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = [ { 
                    _id: '507asdghajsdhjgasd',
                    title: 'My first test post',
                    content: 'Random content',
                    author: 'stswenguser',
                    date: Date.now()
                }];
        });

        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });

        it('should return array of post or empty array', () => {
            updatePostStub = sinon.stub(PostModel, 'find').yields(null, expectedResult);
            PostController.index(req, res);
            sinon.assert.calledWith(PostModel.find, {});
            sinon.assert.calledWith(res.json, sinon.match.array);
        });

        it('should return status 500 on server error', () => {
            updatePostStub = sinon.stub(PostModel, 'find').yields(error);
            PostController.index(req, res);
            sinon.assert.calledWith(PostModel.find, {});
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('findPost', () => {
        // Implement the findPost test if needed
    });
});