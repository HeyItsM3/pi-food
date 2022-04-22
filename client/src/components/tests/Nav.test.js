import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";
import Search from "../Organisms/Search";
import Navigation from "../Organisms/Navigation";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
  let nav;

  beforeEach(() => {
    nav = shallow(<Navigation active={true} />);
    expect(isReact.classComponent(Navigation)).toBeFalsy();
  });

  it('Debería renderizar dos <Link to="" />. El primero que vaya a "/home", y el segundo a "/create"', () => {
    expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home"', () => {
    expect(nav.find(Link).at(0).prop("to")).toEqual("/home");
    expect(nav.find(Link).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Create" y que cambie la ruta hacia "/create"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/create");
    expect(nav.find(Link).at(1).text()).toEqual("Create");
  });

  it("Debería renderizar un componente con el valor <Search /> si active={true}", () => {
    expect(nav.find(Search).length).toBeGreaterThanOrEqual(1);
  });
});
