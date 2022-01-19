import React from "react";
import axios from "axios";
import { AuthStr, HOST } from "../../data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./category.css";
import { Link } from "react-router-dom";
export default class FormAddProducts extends React.Component {
  state = {
    name: "",
    sold: 0,
    view: 0,
    rating: 0,
    price: 0,
    priceBeforeDiscount: 0,
    file: [],
    urlImage: [],
    quantity: 0,
  };

  handleChangePicture = (event) => {
    // this.setState({ name: event.target.value });
    let file = event.target.files;
    this.setState({ file: file });
  };
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };
  handleChangeSold = (event) => {
    this.setState({ sold: event.target.value });
  };
  handleChangeView = (event) => {
    this.setState({ view: event.target.value });
  };
  handleChangePrice = (event) => {
    this.setState({ price: event.target.value });
  };
  handleChangePriceBefore = (event) => {
    this.setState({ price_before_discount: event.target.value });
  };
  handleChangeQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };
  handleChangeRating = (event) => {
    this.setState({ rating: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let file = this.state.file;
    let formData = new FormData();
    console.log(typeof this.state.urlImage);
    for (let i = 0; i < file.length; i++) {
      formData.append("images", file[i]);
    }
    axios
      .post(HOST + "/admin/products/upload-images/", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: AuthStr },
      })
      .then((res) => {
        this.setState.urlImage = res.data.data;
        const data = {
          images: res.data.data,
          price: this.state.price,
          rating: this.state.rating,
          price_before_discount: this.state.priceBeforeDiscount,
          quantity: this.state.quantity,
          sold: this.state.sold,
          view: this.state.view,
          name: this.state.name,
          image: res.data.data[0],
          category: "61e83d597686ea268c74e0c9",
        };
        axios
          .post(HOST + "/admin/products", data, {
            headers: { Authorization: AuthStr },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <Link to="/products">
            <ArrowBackIcon className="icon-back" />
          </Link>
        </div>
        <h2 className="page-header">Add Products</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <form onSubmit={this.handleSubmit}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Tên sản phẩm</td>
                        <td>
                          <input type="text" name="name" onChange={this.handleChangeName} />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Giá sản phẩm</td>
                        <td>
                          <input type="text" name="price" onChange={this.handleChangePrice} />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Giá sản phẩm trước khuyến mãi</td>
                        <td>
                          <input
                            type="text"
                            name="priceBeforeDiscount"
                            onChange={this.handleChangePriceBefore}
                          />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Số lượng còn sẵn</td>
                        <td>
                          <input type="text" name="quantity" onChange={this.handleChangeQuantity} />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Số lượng đã bán</td>
                        <td>
                          <input type="text" name="sold" onChange={this.handleChangeSold} />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Lượt xem</td>
                        <td>
                          <input type="text" name="view" onChange={this.handleChangeView} />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Đánh giá</td>
                        <td>
                          <input type="text" name="name" onChange={this.handleChangeRating} />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Chọn hình ảnh</td>
                        <td>
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            name="uploadImage"
                            onChange={this.handleChangePicture}
                            multiple
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
