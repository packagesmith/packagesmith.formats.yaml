import { safeDump as stringify, safeLoad as parse } from 'js-yaml';
export default function yamlFile(process, options = {}) {
  return (contents, ...rest) => stringify(process(parse(contents || '---') || {}, ...rest), options);
}
