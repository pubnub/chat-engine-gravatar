
const assert = require('chai').assert;
const gravatar = require('./src/plugin.js');

const ChatEngine = require('../chat-engine/src/');

let pluginchat;
let CE;

describe('config', function() {

    it('should be configured', function() {

        CE = ChatEngine.create({
            publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
            subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
        }, {
            namespace: 'test-channel'
        });

        assert.isOk(CE);

    });

});

describe('connect', function() {

    it('should be identified as new user', function(done) {

        CE.connect('robot-tester', 'auth-key', {works: true});

        CE.on('$.ready', (data) => {

            assert.isObject(data.me);
            done();

        });

    });

});

describe('plugins', function() {

    it('list of users should have gravatars', function() {

        let users = {};
        let generate = {
            'ian': {
                email: 'ian@pubnub.com'
            },
            'stephen': {
                email: 'stephen@pubnub.com'
            }
        };

        let results = {
            'ian': '//www.gravatar.com/avatar/1775dcc5f3895ffc7c922bba1241c8f7',
            'stephen': '//www.gravatar.com/avatar/37f1986ae9476552f094ed43ced308e6'
        };

        for(let uuid in generate) {

            user = new CE.User(uuid, generate[uuid]);

            user.plugin(gravatar());

            assert.equal(user.state().gravatar, results[uuid]);

        }

    });

});
