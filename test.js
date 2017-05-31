
const assert = require('chai').assert;
const gravatar = require('./src/plugin.js');

const OpenChatFramework = require('ocf');

let pluginchat;
let OCF;

describe('config', function() {

    it('should be configured', function() {

        OCF = OpenChatFramework.create('test-channel', {
            publishKey: 'demo',
            subscribeKey: 'demo',
            uuid: new Date(),
            state: {}
        });

        assert.isOk(OCF);

    });

});

describe('connect', function() {

    it('should be identified as new user', function() {

        me = OCF.connect('robot-tester', {works: true});
        assert.isObject(me);

    });

});

describe('plugins', function() {

    it('should be created', function() {

        pluginchat = new OCF.Chat('pluginchat' + new Date().getTime());

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

            user = new OCF.User(uuid, generate[uuid]);

            user.plugin(gravatar());

            assert.equal(user.state().gravatar, results[uuid]);

        }

    });

});
