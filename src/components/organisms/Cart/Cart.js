import { Component } from "../../../core";
import { eventBus } from "../../../core";

export class DishCart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
    };
  }

  takeData = (evt) => {
    console.log("take-in-data", evt);
    const { detail } = evt;
    this.setState((state) => {
      return {
        ...state,
        cartData: [...state.cartData, detail],
      };
    });
  };

  deleteDish(index) {
    this.setState((state) => {
      return {
        ...state,
        cartData: state.cartData.filter((_, indexItem) => indexItem != index),
      };
    });
  }

  componentWillUpdate() {
    const buttons = [...this.querySelectorAll(".delete")];
    buttons.forEach((item) => {
      item.removeEventListener("click", this.deleteDish);
    });
  }

  componentDidUpdate() {
    const buttons = [...this.querySelectorAll(".delete")];
    buttons.forEach((item) => {
      const index = item.getAttribute("id");
      item.addEventListener("click", () => this.deleteDish(index));
    });
  }

  componentDidMount() {
    eventBus.on("take-in-data", this.takeData);
  }

  componentWillUnmount() {
    eventBus.off("take-in-data", this.takeData);
  }

  render() {
    return `
      <table class="table">
        <tbody>
          ${this.state.cartData
            .map((item, index) => {
              return `
            <tr>
              <th scope="row" >
              <img src="${item.poster}" alt="${item.title}" style="width: 30px; height: 25px;">
              </th>
              <td>${item.title}</td>
              <td>${item.cost}</td>
              <td class="delete" id="${index}">delete</td>
            </tr>
            `;
            })
            .join("")}
        </tbody>
      </table>
      <button type="button" class="btn btn-dark">order</button>
      <div class="col">${this.state.cartData.reduce((acc, item) => {
        acc += Number(item.cost);
        return acc;
      }, 0)}</div>
    `;
  }
}

customElements.define("dish-cart", DishCart);
