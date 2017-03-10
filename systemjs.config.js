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
  paths: {'mods': './mods', '*': 'mods/*'},
  map: {
    app: 'app',
    'two.js': 'mods/two.js/build/two.js',
    'rxjs': 'mods/rxjs/bundles/Rx.js',
    'ts': 'mods/plugin-typescript/lib/plugin.js',
    'typescript': 'mods/typescript/lib/typescript.js',
  }
});
