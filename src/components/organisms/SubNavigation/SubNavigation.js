import { Component } from "../../../core";
import { appFood } from "../../../constants";
import "./subNavigation.scss";

export class SubNavigation extends Component {
  constructor() {
    super();
    this.state = {
      activeGenre: appFood[0].value,
    };
  }

  render() {
    return `
        <div class="sub-navigation">
            <ul>
              ${appFood
                .map((item) => {
                  const isActive =
                    this.state.activeGenre === item.value ? "active" : "";
                  return `
                  <li>
                    <a href="#" class="${isActive}" data-genger="${item.value}">${item.label}</a>
                  </li>
                  `;
                })
                .join(" ")}
            </ul>

        
    </div>
    `;
  }
}

customElements.define("sub-navigation", SubNavigation);
