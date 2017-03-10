/**
 * System configuration.
 */
System.config({
  transpiler: 'ts',
  defaultJSExtensions: false,
  typescriptOptions: {
    'tsconfig': true // The `"module": "system"` is very important for it to work.
  },
  meta: {'typescript': {'exports': 'ts'}},
  packages: {
    'app': {
      main: './maze',
      format: 'esm', // This is important for it to work.
      'defaultExtension': 'ts',
      transpiler: 'ts',
    },
    'two.js': {
      meta: {'*.json': {loader: 'json-plugin'}},
    },
    'rxjs': {
      meta: {'*.json': {loader: 'json-plugin'}},
    }
  },
  transpiler: 'ts',
  paths: {'node_modules': './node_modules', '*': 'node_modules/*'},
  map: {
    app: 'app',
    'two.js': 'node_modules/two.js/build/two.js',
    'rxjs': 'node_modules/rxjs/bundles/Rx.js',
    'ts': 'node_modules/plugin-typescript/lib/plugin.js',
    'typescript': 'node_modules/typescript/lib/typescript.js',
  }
});
