import { computePathToUrl, isValidMethod } from "../api/helpers";

describe("OS path should be computed", () => {

  it("should convert a basic path to api route", () => {
    const testPath = `D:\\MyProjects\\express-next-router\\api\\authors`

    expect(computePathToUrl(testPath, "api")).toEqual("/api/authors");
  })

  it("should convert a path with param", () => {
    const testPath = `D:\\MyProjects\\express-next-router\\api\\authors\\[authorId].ts`;

    expect(computePathToUrl(testPath, "api")).toEqual("/api/authors/:authorId");
  })

  it("should convert a path with multiple params", () => {
    const testPath = `D:\\MyProjects\\express-next-router\\api\\authors\\[authorId]\\index.ts`;

    expect(computePathToUrl(testPath, "api")).toEqual("/api/authors/:authorId/index");
  })
});


describe("OS path should be computed with customUri", () => {

  it("should convert a path", () => {
    const testPath = "D:\\MyProjects\\express-next-router\\web\\authors"

    expect(computePathToUrl(testPath, "web")).toEqual("/web/authors")
  })
})

describe("Check if method is valid", () => {
  it("should be valid for get", () => {
    expect(isValidMethod("get")).toBe(true);
  })

  it("should be valid for post", () => {
    expect(isValidMethod("post")).toBe(true);
  })

  it("should be valid for put", () => {
    expect(isValidMethod("put")).toBe(true);
  })

  it("should be valid for patch", () => {
    expect(isValidMethod("patch")).toBe(true);
  })

  it("should be valid for delete", () => {
    expect(isValidMethod("delete")).toBe(true);
  })
})