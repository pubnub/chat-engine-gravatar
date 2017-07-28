/**
* Update all {@link Users}'s state and add a gravatar property based on ```user.state().email```. Result assigned to ```user.state().gravatar```.
* @module chat-engine-gravatar
*/

let gravatar = require('gravatar');

/**
* @function
* @example
*
* chat = new ChatEngine.Chat(new Date().getTime());
* user = new OCF.User('ian', {email: 'ian@pubnub.com'});
* user.plugin(gravatar());
* console.log(user.state().gravatar());
*/
module.exports = (config) => {

    class extension {
        construct() {

            if(this.parent.state().email) {

                /**
                @member state()"."gravatar
                @ceextends User
                */
                this.parent.update({
                    gravatar: gravatar.url(this.parent.state().email)
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
