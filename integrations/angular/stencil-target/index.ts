import { OutputTargetCustom } from '@stencil/core/internal';
import path from 'path';

import { sortComponents } from '../../../src/utils/target';
import { generateAngularFiles } from './generateAngularFiles';

const OUTPUT_DIR = path.resolve(__dirname, '../projects/vime/angular/src');
const PROXIES_FILE = path.resolve(OUTPUT_DIR, 'components/index.ts');
const MODULE_FILE = path.resolve(OUTPUT_DIR, 'VimeModule.ts');

export const angularOutputTarget = (): OutputTargetCustom => ({
  type: 'custom',
  name: 'angular-library',
  async generator(_, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan('angular [start]', true);

    const output = await generateAngularFiles(
      sortComponents(buildCtx.components),
    );

    await compilerCtx.fs.writeFile(PROXIES_FILE, output.entry);
    await compilerCtx.fs.writeFile(MODULE_FILE, output.module);

    await Promise.all(
      output.components.map(file => {
        const filePath = path.resolve(
          OUTPUT_DIR,
          'components',
          `${file.name}.ts`,
        );
        return compilerCtx.fs.writeFile(filePath, file.content);
      }),
    );

    timespan.finish('angular [end]');
  },
});
