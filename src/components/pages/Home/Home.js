import { Component, eventBus } from "../../../core";
import { databaseService } from "../../../services/Database";
import "../../organisms";
import "./home.scss";

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      dishes: {
        все: [],
        бургер: [],
        суши: [],
        шаурма: [],
        пицца: [],
      },
    };
  }

  toggleIsLoading() {
    this.setState((state) => {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    });
  }

  getMovies() {
    this.toggleIsLoading();
    databaseService
      .read("foodstuffs")
      .then((data) => {
        this.setState((state) => {
          return {
            ...state,
            dishes: data.reduce((acc, curr) => {
              acc[curr.foodtype] = acc[curr.foodtype]?.length
                ? [...acc[curr.foodtype], curr]
                : [curr];
              return acc;
            }, {}),
          };
        });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }

  componentDidMount() {
    eventBus.emit("take-in-data");
    this.getMovies();
  }

  render() {
    return `
      <it-preloader is-loading="${this.state.isLoading}">
      <sub-navigation></sub-navigation>
        <div id="content">

          ${Object.keys(this.state.dishes).map((key) => {
            if (!this.state.dishes[key].length) {
              return "";
            }
            return `
                <div class="box">
                    <div class="head">
                      <h2>${key}</h2>
                      <p class="text-right"><a href="#">See all</a></p>
                    </div>
                    <div class="home-container ">
                        ${this.state.dishes[key]
                          .map(
                            ({
                              title,
                              poster,
                              description,
                              id,
                              cost,
                              foodtype,
                            }) => {
                              return `
                                <dish-card
                                title="${title}"
                                poster="${poster}"
                                description="${description}"
                                cost="${cost}"
                                foodtype="${foodtype}"
                                id="${id}"
                              ></dish-card>
                            `;
                            }
                          )
                          .join(" ")}
                    </div>
                </div>
              `;
          })}


          
        </div>
      </it-preloader>
    `;
  }
}

customElements.define("home-page", HomePage);
