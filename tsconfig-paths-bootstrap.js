import Paths from 'tsconfig-paths';
import TsConfig from './tsconfig.json';
const baseUrl = './dist';
Paths.register({
  baseUrl,
  paths: TsConfig.compilerOptions.paths,
});
