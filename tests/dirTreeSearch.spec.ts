import { extractFromFolders } from "../lib/core/dirTreeSearch";
const dirTree = require("directory-tree");

describe("Directory traversal", () => {
  let tree;

  beforeAll(() => {
    tree = dirTree(`${process.cwd()}/tests/api`);
  });

  it("Extracts endpoints from folder", () => {
    expect(tree).toBeDefined();
    const { endpoints } = extractFromFolders(tree, { uri: tree.name });

    expect(endpoints.length).toEqual(2);
    expect(endpoints[0].methods["get"]).toBeDefined();
    expect(endpoints[0].methods["post"]).toBeDefined();
    expect(endpoints[0].methods["patch"]).toBeDefined();
    expect(endpoints[0].methods["delete"]).toBeDefined();

    expect(endpoints[1].methods["get"]).toBeDefined();
  });
});
