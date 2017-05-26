import config from "./configs";
import cld    from "cld";


const client    = config.twitterClient;
const Blacklist = config.blacklist;

const stream = client.stream('statuses/filter', {
  track: '#lucasreisdemais'
});

function checkBlacklist(string) {

  const regex = new RegExp(Blacklist.join("|"), "gi");

  return regex.test(string);
}

function checkLanguage(string) {

  return cld.detect(string, function(err, res) {
    console.log(string, res);
    return res.languages[0].name.toLowerCase();
  })
}

stream.on('data', function (event) {

  try {

    if (checkBlacklist(event.text.toLowerCase())) throw "Nope, Skipping it.";

      console.log("******---*****");
      const language = checkLanguage(event.text);
      console.log(`${event.user.screen_name} said: ${event.text}`);
      client.post('statuses/update', {
        status: `@${event.user.screen_name} Nice :) You speak ${language}`,
        in_reply_to_status_id: event.id_str,

      }, function (error, tweet, response) {
        if (error) throw error;
        console.log(`We replied: ${tweet.text}`);
        console.log("******---*****");
      });
      
  } 
  
    catch (e) {
    console.log(e);
  };
});

stream.on('error', function (error) {
  throw error;
});