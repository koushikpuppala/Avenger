/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const { Readable } = require('stream');
let sitemap;

router.get('/sitemap.xml', function(req, res) {
	res.header('Content-Type', 'application/xml');
	res.header('Content-Encoding', 'gzip');
	// if we have a cached entry send it
	if (sitemap) {
		res.send(sitemap);
		return;
	}

	try {
		const smStream = new SitemapStream({ hostname: 'https://avengers-assemble.tech/' });
		const pipeline = smStream.pipe(createGzip());

		// pipe your entries or directly write them.
		smStream.write({ url: '/', changefreq: 'yearly', priority: 0.3 });
		smStream.write({ url: '/staff/application', changefreq: 'monthly', priority: 0.7 });
		smStream.write({ url: '/server-info', changefreq: 'monthly', priority: 0.7 });
		smStream.write({ url: '/musics_dj', changefreq: 'weekly', priority: 0.5 });
		smStream.write({ url: '/musics_dj/commands', changefreq: 'weekly', priority: 0.5 });
		smStream.write({ url: '/avenger', changefreq: 'weekly', priority: 0.5 });
		smStream.write({ url: '/avenger/commands', changefreq: 'weekly', priority: 0.5 });
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

module.exports = router;