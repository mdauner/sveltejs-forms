const autoPreprocess = require('svelte-preprocess');

module.exports = {
	preprocess: autoPreprocess({
		postcss: true,
		scss: { includePaths: ['src', 'node_modules'] },
	}),
};
