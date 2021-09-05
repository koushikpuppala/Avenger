/* eslint-disable no-unused-vars */
const router = require('express').Router(),
	{ SitemapStream, streamToPromise } = require('sitemap'),
	{ createGzip } = require('zlib'),
	{ Readable } = require('stream');
let sitemap;

module.exports = (bot) => {

	router.get('/', (req, res) => {
		res.header('Content-Type', 'application/xml');
		res.header('Content-Encoding', 'gzip');
		// if we have a cached entry send it
		if (sitemap) {
			res.send(sitemap);
			return;
		}

		try {
			const smStream = new SitemapStream({ hostname: 'https://avengers-assemble.tech' });
			const pipeline = smStream.pipe(createGzip());

			// pipe your entries or directly write them.
			smStream.write({ url: '/', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/support' });
			smStream.write({ url: '/vote' });
			smStream.write({ url: '/profile', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/feedback', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/report', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/staff', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/staff/members', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/staff/application', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/partner', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/partner/servers', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/partner/application', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/bots', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/avenger', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/avenger/info', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/avenger/commands', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/avenger/invites' });
			smStream.write({ url: '/avenger/vote' });
			smStream.write({ url: '/musics_dj', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/musics_dj/info', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/musics_dj/commands', changefreq: 'monthly', priority: 0.7 });
			smStream.write({ url: '/musics_dj/invites' });
			smStream.write({ url: '/musics_dj/vote' });
			/* or use
            Readable.from([{url: '/page-1'}...]).pipe(smStream)
            if you are looking to avoid writing your own loop.
            */

			// cache the response
			streamToPromise(pipeline).then(sm => sitemap = sm);
			// make sure to attach a write stream such as streamToPromise before ending
			smStream.end();
			// stream write the response
			pipeline.pipe(res).on('error', (e) => { throw e; });
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});

	return router;
};
