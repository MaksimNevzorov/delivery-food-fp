import { appRoutes } from "../../../constants/appRoutes";
import * as core from "../../../core";
import "./dishCard.scss";
import "../../molecules";

export class DishCard extends core.Component {
  static get observedAttributes() {
    return ["title", "poster", "description", "id", "cost", "foodtype"];
  }

  render() {
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
            <button class="btn btn-outline-primary"> Добавить в корзину</button>
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
