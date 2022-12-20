import { Component, eventBus } from "../../../core";
import { authService } from "../../../services/Auth";
import { appRoutes } from "../../../constants/appRoutes";
import { appEvents } from "../../../constants/appEvents";
import { appFood } from "../../../constants/appFood";
import { FormManager } from "../../../core/FormManager/FormManager";
import { storageService } from "../../../services/Storage";
import { databaseService } from "../../../services/Database";

export class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.form = new FormManager();
  }

  toggleIsLoading() {
    this.setState((state) => {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    });
  }

  createMovie = (data) => {
    this.toggleIsLoading();
    storageService
      .uploadPoster(data.poster)
      .then((snapshot) => {
        storageService.getDownloadURL(snapshot.ref).then((url) => {
          databaseService
            .create("foodstuffs", {
              ...data,
              poster: url,
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.form.init(this.querySelector(".send-data"), {});
    this.addEventListener("submit", this.form.handleSubmit(this.createMovie));
  }

  render() {
    return `
    <it-preloader is-loading="${this.state.isLoading}">
    <div class="container mt-5 ">
      <h1>Страница Администратора</h1>
      <div class="row justify-content-md-center">
        <div class="col-6">
          <form class="send-data">
            <div class="mb-3">
              <label class="form-label">Название продукта</label>
              <input class="form-control" type="text" name="title">
            </div>
            <div class="mb-3">
              <label class="form-label">Фото еды</label>
              <input class="form-control" type="file" id="formFile" name="poster">
            </div>
            <div class="mb-3">
              <label class="form-label">Тип еды</label>
              <select class="form-select" name="foodtype">
              ${appFood.map((item) => {
                return `
                <option value="${item.value}">${item.label}</option>
                `;
              })}
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Описание еды</label>
              <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Стоимость</label>
              <input class="form-control" type="text" name="cost">
            </div>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </form>
        </div>
      <div>
    </div>
    </it-preloader>
    
    `;
  }
}

customElements.define("admin-page", AdminPage);
