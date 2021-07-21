import {  normalize, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicsException,    Tree, url,   } from '@angular-devkit/schematics';
import { Schema as SchematicComponentHeader } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngSuper(options: SchematicComponentHeader): Rule {
  return (tree: Tree) => {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    // convert workspace to string
    const workspaceAsBugger = tree.read("angular.json");
    if (!workspaceAsBugger) {
      throw new SchematicsException("Not an Angular Project");
    }
    const workspace = JSON.parse(workspaceAsBugger.toString());

    if (!options.project) {
      options.project = workspace.defaultProject;
    }

    const projectName = options.project as string;

    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    options.selector = options.selector || buildSelector(options, project && project.prefix || '')

    const templateSource = apply(url('./files'), [
      applyTemplates({
       ...strings,
        name: options.name,
        store: options.store,
        selector: options.selector,
      }),
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}
function buildSelector(options: SchematicComponentHeader, projectPrefix: string) {
  let selector = strings.dasherize(options.name);
  if (projectPrefix) {
    selector = `${projectPrefix}-${selector}`;
  }

  return selector;
}
