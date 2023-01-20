const path = require("path");

module.exports = (plop) => {
  const askModuleName = {
    type: "input",
    name: "moduleName",
    message: "Module Name: ",
  };

  const askTableName = {
    type: "input",
    name: "tableName",
    message: "Table Name: ",
  };

  const createModel = {
    description: "Create a new model",
    prompts: [
      askModuleName,
      askTableName,
      {
        type: "input",
        name: "modelName",
        message: "Model Name: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/models.py"
        ),
        templateFile: path.join(__dirname, "plop_templates", "models.hbs"),
      },
    ],
  };

  const createViewField = {
    description: "Create a new view field",
    prompts: [
      askModuleName,
      {
        type: "input",
        name: "viewFieldName",
        message: "View Field Name: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/view_fields.py"
        ),
        templateFile: path.join(__dirname, "plop_templates", "view_fields.hbs"),
      },
    ],
  };

  const createView = {
    description: "Create a new view",
    prompts: [
      askModuleName,
      {
        type: "input",
        name: "viewName",
        message: "View Name: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/views.py"
        ),
        templateFile: path.join(__dirname, "plop_templates", "views.hbs"),
      },
    ],
  };

  const createRoute = {
    description: "Create a new route",
    prompts: [
      askModuleName,
      {
        type: "input",
        name: "routeName",
        message: "Route Name: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/__init__.py"
        ),
        templateFile: path.join(__dirname, "plop_templates", "init.hbs"),
      },
    ],
  };

  const createSwaggers = {
    description: "Create swagger files",
    prompts: [
      askModuleName,
      {
        type: "input",
        name: "swaggerName",
        message: "Swagger Name: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/swagger/{{snakeCase moduleName}}_list_get.yml"
        ),
        templateFile: path.join(
          __dirname,
          "plop_templates",
          "swagger",
          "swagger_list_get.hbs"
        ),
      },
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/swagger/{{snakeCase moduleName}}_get.yml"
        ),
        templateFile: path.join(
          __dirname,
          "plop_templates",
          "swagger",
          "swagger_retrieve_get.hbs"
        ),
      },
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/swagger/{{snakeCase moduleName}}_post.yml"
        ),
        templateFile: path.join(
          __dirname,
          "plop_templates",
          "swagger",
          "swagger_create_post.hbs"
        ),
      },
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/swagger/{{snakeCase moduleName}}_put.yml"
        ),
        templateFile: path.join(
          __dirname,
          "plop_templates",
          "swagger",
          "swagger_update_put.hbs"
        ),
      },
      {
        type: "add",
        path: path.join(
          process.cwd(),
          "srm_rest_api/{{snakeCase moduleName}}/swagger/{{snakeCase moduleName}}_delete.yml"
        ),
        templateFile: path.join(
          __dirname,
          "plop_templates",
          "swagger",
          "swagger_destroy_delete.hbs"
        ),
      },
    ],
  };

  const createModule = {
    description: "Create a new module",
    prompts: [askModuleName, askTableName],
    actions: (data) => {
      [
        "modelName",
        "routeName",
        "viewFieldName",
        "viewName",
        "swaggerName",
      ].forEach((key) => {
        data[key] = data.moduleName;
      });

      return [
        ...createModel.actions,
        ...createViewField.actions,
        ...createView.actions,
        ...createRoute.actions,
        ...createSwaggers.actions,
      ];
    },
  };

  const generation = {
    models: createModel,
    view_fields: createViewField,
    views: createView,
    routes: createRoute,
    modules: createModule,
  };

  plop.setGenerator("Models", {
    description: generation.models.description,
    prompts: generation.models.prompts,
    actions: generation.models.actions,
  });

  plop.setGenerator("View Fields", {
    description: generation.view_fields.description,
    prompts: generation.view_fields.prompts,
    actions: generation.view_fields.actions,
  });

  plop.setGenerator("Views", {
    description: generation.views.description,
    prompts: generation.views.prompts,
    actions: generation.views.actions,
  });

  plop.setGenerator("Routes", {
    description: generation.routes.description,
    prompts: generation.routes.prompts,
    actions: generation.routes.actions,
  });

  plop.setGenerator("Module", {
    description: generation.modules.description,
    prompts: generation.modules.prompts,
    actions: generation.modules.actions,
  });
};
