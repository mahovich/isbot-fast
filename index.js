
const BOTS = [
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
  'ia_archiver',
];

let bots, excludes;
let isBotRegex, isExcludeBotRegex;

const createRegex = (arr) => new RegExp(`(${arr.join('|')})`, 'i');

const isExcluded = (userAgent) => excludes.length ? isExcludeBotRegex.test(userAgent) : false;

function reset(){
  excludes = [];
  bots = [].concat(BOTS);
  createAllRegex();
}

function createAllRegex(){
  isBotRegex = createRegex(bots);
  isExcludeBotRegex = createRegex(excludes);
}

reset();

module.exports = userAgent => isExcluded(userAgent) ? false : isBotRegex.test(userAgent);

module.exports.extend = (additionalBots = [], excludeBots = []) => {
  if(excludeBots.length){
    excludes = [...new Set(excludes.concat(excludeBots))];
  }
  if(additionalBots.length){
    bots = [...new Set(bots.concat(additionalBots))];
  }
  createAllRegex();
};

module.exports.reset = function(){
  reset();
}
