import { appRoutes } from "../../../constants/appRoutes";
import * as core from "../../../core";
import "./dishCard.scss";
import "../../molecules";
import { eventBus } from "../../../core";

export class DishCard extends core.Component {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["title", "poster", "description", "id", "cost", "foodtype"];
  }

  onClick() {
    eventBus.emit("take-in-data", { ...this.props });
  }

  componentDidMount() {
    const button = this.querySelector(".btn");
    button.addEventListener("click", this.onClick.bind(this));
  }

  componentWillUnmount() {
    const button = this.querySelector(".btn");
    button.removeEventListener("click", this.onClick);
  }

  render() {
    console.log(this.props.title);

    return `
        
        <div class="card" style="width: 18rem;">
          <div class="dish-image">
              <it-link to="${appRoutes.dishes}/${this.props.id}">
              <img src="${this.props.poster}" alt="${this.props.title}" />
              </it-link>
          </div>
          <div class="card-body">
            <h5 class="card-title">${this.props.title}</h5>
            <p class="card-text">${this.props.description}</p>
            <p class="card-cost">${this.props.cost}</p>
            <button class="btn give btn-outline-primary"> Добавить в корзину</button>
          </div>
        </div>
        `;
  }
}

customElements.define("dish-card", DishCard);

{
  /* <div class="dish">
            <div class="dish-image">
            <span class="play"><span class="name">${this.props.title}</span></span>
            <it-link to="${appRoutes.dishes}/${this.props.id}">
              <img src="${this.props.poster}" alt="${this.props.title}" />
            </it-link>
            </div>
        </div> */
}
