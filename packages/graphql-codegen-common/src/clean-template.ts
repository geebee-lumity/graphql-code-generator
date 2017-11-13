import { debugLog } from './debugging';

export function cleanTemplateComments(template: string, debugFilename: string = ''): string {
  debugLog(`[cleanTemplateComments] called, looking for magic comments in ${debugFilename}...`);

  if (template.match(/\/\*\s*gqlgen/ig)) {
    debugLog(`[cleanTemplateComments] Found magic comment 'gqlgen' in template ${debugFilename}...`, template);

    const result = template
      .replace(/.*({{.*}})/ig, (all, group) => {

        if (all.toLowerCase().includes('gqlgen')) {
          return all;
        }

        return all.replace(/{{/g, '\\{{');
      })
      .replace(/\/\*\s*gqlgen\s*(.*?)\s*\*\//gi, (all, group) => group ? group : all);

    debugLog(`[cleanTemplateComments] template ${debugFilename} modified, result is: `, template);

    return result;
  }

  debugLog(`[cleanTemplateComments] ${debugFilename} does not contains any magic comments, skipping...`);

  return template;
}