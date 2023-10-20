const axios = require('axios');

require('babel-register')({
  presets: ['es2015', 'react'],
});

const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;

async function generateSitemap() {
  var mySitemap = new Sitemap(router).build('https://magicowgs.geryon.space');
  axios.get('https://magicowgs.geryon.space/api/page').then(response => {
    const urls = response.data.map(item => {
      return { url: item.url };
    });
    mySitemap.sitemaps[0].urls = [...mySitemap.sitemaps[0].urls, ...urls];

    for (let i = 0; i < mySitemap.sitemaps[0].urls.length; i++) {
      mySitemap.sitemaps[0].urls[i].changefreq = 'daily';
      mySitemap.sitemaps[0].urls[i].priority = 0.8;
    }
    mySitemap.save('public/sitemap.xml');
  });
}

generateSitemap();
