/**
* Update all {@link Users}'s state and add a gravatar property based on ```user.state.email```. Result assigned to ```user.state.gravatar```.
* @module chat-engine-gravatar
*/

let gravatar = require('gravatar');
const dotty = require("dotty");

/**
* @function
* @param {Object} [config={}] The plugin config object
* @param {String} [config.prop="email"] The {@link User#state} property to use as gravatar.
* @example
*
* chat = new ChatEngine.Chat(new Date().getTime());
* user = new OCF.User('ian', {email: 'ian@pubnub.com'});
* user.plugin(gravatar());
* console.log(user.state.gravatar;
*/
module.exports = (config = {}) => {

    config.prop = config.prop || 'email';

    class extension {
        construct() {

            if(dotty.exists(this.parent.state, config.prop)) {

                /**
                @member state()"."gravatar
                @ceextends User
                */
                this.parent.update({
                    gravatar: gravatar.url(dotty.get(this.parent.state, config.prop))
                });

            }

        }
    }

    return {
        namespace: 'gravatar',
        extends: {
            User: extension,
            Me: extension,
        }
    }

}
