const path = require('path');

module.exports = {
  title: 'Style guide example',
  sections: [
    {
      name: 'Components',
      components: 'client/src/components/**/*.tsx',
    },
    {
      name: 'Utilities',
      content: 'client/src/utils/README.md',
    },
  ],
	showSidebar: true,
	theme: {
		baseBackground: '#fdfdfc',
		link: '#274e75',
		linkHover: '#90a7bf',
		border: '#e0d2de',
		font: ['Helvetica', 'sans-serif'],
	},
  styles: function styles(theme) {
		return {
			Playground: {
				preview: {
					paddingLeft: 0,
					paddingRight: 0,
					borderWidth: [[0, 0, 1, 0]],
					borderRadius: 0,
				},
			},
			Code: {
				code: {
					// make inline code example appear the same color as links
					color: theme.color.link,
					fontSize: 14,
				},
			},
		};
	},
  webpackConfig: require('./client/webpack/webpack.common.js'),
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
  require: [
    path.join(__dirname, 'client/src/styles/styleguide-override.css')
  ],
  defaultExample: true,
  template: {
    head: {
        links: [
            {
                rel: 'stylesheet',
                href:  path.join(__dirname, 'client/src/styles/styleguide-override.css')
            }
        ]
    }
},
};

