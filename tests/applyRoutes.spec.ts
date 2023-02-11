import express, { Application } from "express";
import { applyRoutes } from "../lib/core";

function getAppRoutes(app: Application) {
  return app._router.stack
    .map((layer) => layer?.route)
    .filter((route) => !!route?.path);
}

describe("Apply routes", () => {
  let app: Application;

  beforeEach(() => {
    app = express();
  });

  it("Should successfully apply routes to Express instance", () => {
    applyRoutes(app, { uri: `tests/api`, logger: false });
    const routes = getAppRoutes(app);

    expect(routes).toHaveLength(5);
    expect(routes[0].path).toBe("/api/hello");
    expect(routes[0].methods.get).toBe(true);

    expect(routes[1].path).toBe("/api/hello");
    expect(routes[1].methods.post).toBe(true);

    expect(routes[2].path).toBe("/api/hello");
    expect(routes[2].methods.patch).toBe(true);

    expect(routes[3].path).toBe("/api/hello");
    expect(routes[3].methods.delete).toBe(true);

    expect(routes[4].path).toBe("/api/users/:userId");
    expect(routes[4].methods.get).toBe(true);
  });


  it("Should fail when uri is not defined and api is not in root folder", () => {
    try {
      applyRoutes(app, { logger: false });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain(
        `There's no api folder in this directory. \nMake sure you have api folder in root directory or add a custom uri through options.`
      );
    }
  });

  it("Should fail when uri is not correct", () => {
    try {
      applyRoutes(app, { uri: "foo/bar", logger: false });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain(
        `There's no api folder in this directory. \nMake sure you have api folder in root directory or add a custom uri through options.`
      );
    }
  });
});
