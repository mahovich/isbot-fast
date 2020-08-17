let includes = [
  // generic
  'bot', // googlebot, bingbot, telegrambot, twitterbot, yandexbot, etc.
  'check',
  'cloud', // cloudflare, cloudinary, etc.
  'crawler',
  'download',
  'monitor', // monitor & monitoring
  'preview', // skypeuripreview, bingpreview, yahoo link preview, etc.
  'scan',
  'spider', // baiduspider, 360spider, screaming frog seo spider, etc.

  // search engines
  'google',
  'qwantify',
  'yahoo',

  // aggregators, messengers and social networks
  'facebookexternalhit',
  'flipboard',
  'tumblr',
  'vkshare',
  'whatsapp',

  // downloaders
  'curl',
  'perl',
  'python',
  'wget',

  // high activity scanners
  'heritrix',
  'ia_archiver'
];

let excludes = [];

let includesRegex, excludesRegex;

const createRegex = (arr) => new RegExp(`(${arr.join('|')})`, 'i');

function createAllRegex(){
  includesRegex = createRegex(includes);
  excludesRegex = excludes && excludes.length ? createRegex(excludes) : null;
}

createAllRegex();

module.exports = (userAgent, _includes = [], _excludes = []) =>  {

  let _includesRegex = includesRegex;

  if(_includes && _includes.length){
      _includes = includes.concat(_includes);
      _includesRegex = createRegex(_includes);
  }
  
  let _excludesRegex = excludesRegex;

  if(_excludes && _excludes.length){
      _excludes = excludes.concat(_excludes);
      _excludesRegex = createRegex(_excludes);
  }

  let isBot = false;
  let isExluded = false;

  if(_excludesRegex){
    isExluded = _excludesRegex.test(userAgent);
  }

  if(!isExluded){
    isBot = _includesRegex.test(userAgent);
  }
  
  return isBot;

}

module.exports.extend = (additionalBots = [], excludeBots = []) => {
  if(excludeBots.length){
    excludes = [...new Set(excludes.concat(excludeBots))];
  }
  if(additionalBots.length){
    includes = [...new Set(includes.concat(additionalBots))];
  }
  createAllRegex();
};
