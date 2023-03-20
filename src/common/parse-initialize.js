const Parse = require('parse/node');

export default function initiate(){
  Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
  Parse.serverURL = process.env.PARSE_SERVER_URL;
  return Parse;
}