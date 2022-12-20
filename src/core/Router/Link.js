import { appEvents } from "../../constants/appEvents";
import { Component } from "../Component";
import { eventBus } from "../EventBus";

export class Link extends Component {
  constructor() {
    super();
    this.isShadow = true;
  }

  static get observedAttributes() {
    return ["to", "classname"];
  }

  onClick = (evt) => {
    evt.preventDefault();
    eventBus.emit(appEvents.changeRoute, { target: this.props.to });
  };

  componentDidMount() {
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }

  render() {
    return `
    <style>
      .it-link {
        text-decoration: none;
      }
      .header-link {
        display: flex;
        justify-content: space-between;
        color: white;
        margin-top: auto;
        padding: 5px;
      }
    </style>
      <a href="${this.props.to}" class="${this.props.classname} it-link">
          <slot></slot>
      </a>
    `;
  }
}

customElements.define("it-link", Link);
