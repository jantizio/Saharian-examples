class Tree {
  constructor() {
    // just turning some arbitrary file paths into a tree to have some data to play with
    this.data = {
      value: '__TROOT_value__',
      children: [{
        value: 'package.json',
      }, {
        value: 'public',
        children: [{
          value: 'index.html',
        }],
      }, {
        value: 'src',
        children: [{
          value: 'assets',
          children: [{
            value: 'flag.svg',
          }, {
            value: 'logo.svg',
          }, {
            value: 'star.svg',
          }],
        }, {
          value: 'main.js',
        }, {
          value: 'views',
          children: [{
            value: 'button.js',
          }, {
            value: 'tree',
            children: [{
              value: 'index.html',
            }, {
              value: 'style.css',
            }],
          }],
        }],
      }, {
        value: 'README.md',
      }, {
        value: 'tests',
        children: [],
      }, {
        value: 'tsconfig.json',
      }
      ],
    } // end of data
  }

  children() {
    return this.data.children
  }

}
