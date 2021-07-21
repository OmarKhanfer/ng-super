import { normalize, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicContext, SchematicsException, template, Tree, url } from '@angular-devkit/schematics';
import { Schema as SchematicComponentHeader } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngSuper(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceAsBugger = tree.read("angular.json");
    if (!workspaceAsBugger) {
      throw new SchematicsException("Not an Angular Project");
    }
    const workspace = JSON.parse(workspaceAsBugger.toString());

    const projectName = _options.project || workspace.defaultProject;
    const project = workspace.projects[projectName];

    let path = `${project.sourceRoot}/${
      project.projectType == "application" ? "app" : "lib"
    }`;

    const sourceTemplate = url("./files");

    const sourceParameterizeTemplate = apply(sourceTemplate, [
      applyTemplates({ ..._options, ...strings }),
      move(normalize(path as string))    ]);

    tree = mergeWith(sourceParameterizeTemplate)(tree,_context) as Tree;

    return tree;
  };
}

