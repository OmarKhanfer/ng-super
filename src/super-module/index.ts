import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { normalize, strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { Schema as SchematicComponentHeader } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function superModule(options: SchematicComponentHeader): Rule {
  return (tree: Tree, context: SchematicContext) => {

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

    const projectType = project.projectType === "application" ? "app" : "lib";

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    } else {
      options.path = `${project.sourceRoot}/${projectType}/${options.path}`;
    }

    options.selector =
      options.selector ||
      buildSelector(options, (project && project.prefix) || "");

    const templateSource = apply(url("./files"), [
      options.store ? noop() : filter((path) => !path.includes("store")),
      options.resolver ? noop() : filter((path) => !path.includes("resolvers")),
      applyTemplates({
        ...strings,
        ...options,
      }),
      move(normalize(options.path as string)),
    ]);

    return chain([
      mergeWith(templateSource),
      options && options.store ? addRequiredPackages(tree, context) : noop(),
    ]);
  };
}

function buildSelector(
  options: SchematicComponentHeader,
  projectPrefix: string
) {
  let selector = strings.dasherize(options.name);
  if (projectPrefix) {
    selector = `${projectPrefix}-${selector}`;
  }

  return selector;
}

function addRequiredPackages(_tree: Tree, _context: SchematicContext) {
  return (_host: Tree) => {
    if (_tree.exists("package.json")) {
      const packageJsonString = _tree.read("package.json")!.toString("utf-8");
      const packageJson = JSON.parse(packageJsonString);
      let runScript = false;
      packages.forEach((element) => {
        if (!packageJson[element.type]) {
          packageJson[element.type] = {};
        }
        if (!packageJson[element.type][element.name]) {
          packageJson[element.type][element.name] = element.version;
          _tree.overwrite("package.json", JSON.stringify(packageJson, null, 2));
          runScript = true;
        }
      });
      _context.logger.log(
        "info",
        `Required pacakages has been added to package.json`
      );
      if (runScript) {
        _context.addTask(new NodePackageInstallTask());
      }
    }
    return _tree;
  };
}

const packages = [
  { type: "dependencies", name: "@ngrx/store", version: "12.2.0" },
  { type: "dependencies", name: "@ngrx/effects", version: "12.2.0" },
  { type: "dependencies", name: "@ngrx/store-devtools", version: "12.2.0" },
];
