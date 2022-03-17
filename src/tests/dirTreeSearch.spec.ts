import { extractFromFolders } from '../api/dirTreeSearch';
import { loadModule } from '../api/helpers';
const dirTree = require("directory-tree");

describe("Directory traversal", () => {
  let tree;

  beforeAll(() => {
    tree = dirTree(`${process.cwd()}/src/tests/api`);
  })

  it("Extracts Hello endpoint from folder", () => {
    expect(tree).toBeDefined();
    const { endpoints } = extractFromFolders(tree, { customUri: tree.name });

    expect(endpoints.length).toEqual(1);
    expect(endpoints[0].methods["get"]).toBeDefined();
    expect(endpoints[0].methods["post"]).toBeDefined();
    expect(endpoints[0].methods["patch"]).toBeDefined();
    expect(endpoints[0].methods["delete"]).toBeDefined();
  })
})