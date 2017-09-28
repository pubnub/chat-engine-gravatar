
const assert = require('chai').assert;
const gravatar = require('./src/plugin.js');

const ChatEngine = require('chat-engine');

let pluginchat;
let CE;

describe('config', function() {

    it('should be configured', function() {

        CE = ChatEngine.create({
            publishKey: 'pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6',
            subscribeKey: 'sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe',
        }, {
            endpoint: 'http://localhost:3000/insecure',
            globalChannel: 'test-channel'
        });

        assert.isOk(CE);

    });

});

describe('connect', function() {

    it('should be identified as new user', function(done) {

        CE.connect('robot-tester', {works: true}, 'auth-key');

        CE.on('$.ready', (data) => {

            assert.isObject(data.me);
            done();

        });

    });

});

describe('plugins', function() {

    it('should be created', function() {

        pluginchat = new CE.Chat('pluginchat' + new Date().getTime());

    });

    it('list of users should have gravaars', function() {

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

            console.log(user.state)

            assert.equal(user.state.gravatar, results[uuid]);

        }

    });

});
