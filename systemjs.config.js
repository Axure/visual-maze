/**
 * System configuration.
 */
System.config({
  transpiler: 'ts',
  defaultJSExtensions: false,
  typescriptOptions: {
    'target': 'es5',
    'module': 'commonjs',
    'moduleResolution': 'node',
    'inlinSourceMap': true,
    'emitDecoratorMetadata': true,
    'experimentalDecorators': true,
    'lib': ['es2015', 'dom'],
    'noImplicitAny': false,
    'strictNullChecks': false,
    'suppressImplicitAnyIndexErrors': true
  },
  meta: {'typescript': {'exports': 'ts'}},
  packages: {
    'app': {
      main: './maze',
      format: 'cjs',
      'defaultExtension': 'ts',
    }
  },
  transpiler: 'ts',
  paths: {'npm:': 'https://unpkg.com/'},
  map: {
    app: 'app',

    'ts': 'npm:plugin-typescript@7.0.5/lib/plugin.js',
    'typescript': 'npm:typescript@2.2.1/lib/typescript.js',
  }
});
