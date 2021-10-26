"use strict";

export default class HashedModuleIDsPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    const context = compiler.options.context;

    compiler.hooks.compilation.tap("ChangeModuleIdsPlugin", (compilation) => {
      compilation.hooks.beforeModuleIds.tap(
        "ChangeModuleIdsPlugin",
        (modules) => {
          const chunkGraph = compilation.chunkGraph;
          for (const module of modules)
            if (module.libIdent) {
              const origId = module.libIdent({ context });
              if (!origId) continue;
              chunkGraph.setModuleId(
                module,
                `${origId}__${module.buildInfo.hash}`
              );
            }
        }
      );
    });
  }
}
