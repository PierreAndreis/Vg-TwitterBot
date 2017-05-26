import Twitter from "twitter";

const consumer_key        = "";
const consumer_secret     = "";
const access_token_key    = "";
const access_token_secret = "";

const client = new Twitter({
                       consumer_key, 
                       consumer_secret, 
                       access_token_key, 
                       access_token_secret,
                    });

export default client;