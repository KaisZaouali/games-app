import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Games from "./features/games/Games";

describe("App Component", () => {
  let container: any;
  beforeEach(() => (container = shallow(<App />)));

  it("should component be rendering ", () => {
    expect(container.find("div").length).toEqual(1);
  });

  it("should render the Games component", () => {
    expect(container.containsMatchingElement(<Games />)).toEqual(true);
  });
});
