import { appEvents } from "../../../constants/appEvents";
import { appRoutes } from "../../../constants/appRoutes";
import * as core from "../../../core";
import { eventBus } from "../../../core";
import "./header.scss";
import "../Cart/Cart";

export class Header extends core.Component {
  constructor() {
    super();
    this.state = {
      activePath: window.location.pathname,
    };
  }

  static get observedAttributes() {
    return ["is-logged"];
  }

  onSignOut = (evt) => {
    evt.preventDefault();
    if (evt.target.closest(".sign-out-link")) {
      eventBus.emit(appEvents.userLoggedOut);
    }
  };

  onChangeRoute = (evt) => {
    this.setState((state) => {
      return {
        ...state,
        activePath: evt.detail.target,
      };
    });
  };

  isActiveLink(path) {
    return this.state.activePath === path ? "active" : "";
  }

  componentDidMount() {
    eventBus.on(appEvents.changeRoute, this.onChangeRoute);
    this.addEventListener("click", this.onSignOut);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onSignOut);
  }

  render() {
    return `
    <nav class="navbar navbar-expand-lg bg-secondary" style="--bs-bg-opacity: .3;>
    <div class="container" >
        <a class="navbar-brand" href="#">
            <img src="./assets/images/logo.svg" alt="Bootstrap" width="30" height="24">
            Delivery
        </a>
    </div>
    <div class="container-fluid justify-content-end" >
        
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav  mb-2 mb-lg-0">
                <li class="nav-item">
                  <it-link to='${appRoutes.admin}' classname='header-link' title="">Admin Page</it-link>
                </li>
                <li class="nav-item">
                  <it-link to='${appRoutes.home}' classname='header-link' title="">Home Page</it-link>
                </li>
                <li class="nav-item">
                  <it-link to='${appRoutes.signUp}' classname='header-link' title="">Sign Up</it-link>
                </li>
                <li class="nav-item">
                  <it-link to='${appRoutes.signIn}' classname='header-link' title="">Sign Up</it-link>
                </li>
                <li class="nav-item dropdown ">
                    <span class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Basket
                    </span>
                    <dish-cart></dish-cart>
                </li>
            </ul>
    </div>
</div>
</nav>
        `;
  }
}

customElements.define("it-header", Header);
