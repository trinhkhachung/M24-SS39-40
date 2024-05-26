import { Component } from "react";

// localStorage.setItem('products', JSON.stringify([
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/aryaTap1.jpg', name: 'Arya bàn bên thi thoảng thả thính tôi bằng tiếng Nga', vol: 1, price: 100000, quantity: 15},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/aryaTap2.jpg', name: 'Arya bàn bên thi thoảng thả thính tôi bằng tiếng Nga', vol: 2, price: 112000, quantity: 19},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/aryaTap3.jpg', name: 'Arya bàn bên thi thoảng thả thính tôi bằng tiếng Nga', vol: 3, price: 133000, quantity: 20},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/aryaTap4.jpg', name: 'Arya bàn bên thi thoảng thả thính tôi bằng tiếng Nga', vol: 4, price: 111000, quantity: 14},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/shimotsukiTap1.jpg', name: 'Shimotsuki thích nhân vật nền', vol: 1, price: 100000, quantity: 14},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/shimotsukiTap2.jpg', name: 'Shimotsuki thích nhân vật nền', vol: 2, price: 120000, quantity: 17},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/mobusekaTap1.jpg', name: 'Thể giới Otome Game thật khắc nghiệt với nhân vật quần chúng', vol: 1, price: 123000, quantity: 34},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/mobusekaTap5.jpg', name: 'Thể giới Otome Game thật khắc nghiệt với nhân vật quần chúng', vol: 2, price: 111000, quantity: 24},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/thiensuTap1.jpg', name: 'Thiên sứ nhầ bên khiến tôi trở nên mục ruỗng', vol: 1, price: 115000, quantity: 20},
//   {id: Math.floor(Math.random() * 10000), image: './src/assets/imgs/thiensuTap2.jpg', name: 'Thiên sứ nhầ bên khiến tôi trở nên mục ruỗng', vol: 2, price: 100000, quantity: 30},
// ]))

interface Props {
  products: Product[];
  carts: Product[];
}
interface Product {
  id: number;
  name: string;
  price: number;
  vol: number;
  quantity: number;
  image: string;
}
export default class Products extends Component {
  public state: Props;
  constructor(props: any) {
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem("products") || "[]"),
      carts: JSON.parse(localStorage.getItem("carts") || "[]"),
    };
  }
  addToCart = (id: number) => {
    console.log(id);
    const cartItems = this.state.products.filter((e) => e.id === id);
    this.setState({ carts: this.state.carts.push(...cartItems) });
    this.saveToLocalstorage("carts", this.state.carts);
  };
  saveToLocalstorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  render() {
    return (
      <>
        <header className="header">
          <ul className="menu">
            <li className="menu-item">Trang chủ</li>
            <li className="menu-item">Danh sách sản phẩm</li>
          </ul>
          <div className="cart">
            <i
              style={{ cursor: "pointer" }}
              className="fa-solid fa-cart-shopping"
            ></i>
            <div className="circle">{this.state.carts.length}</div>
            <div className="form">
              <h3>Carts</h3>
              <hr />
              <div className="cart-item">
                <div className="carts-item">
                  <img
                    className="cart-img"
                    src="./src/assets/imgs/aryaTap1.jpg"
                  />
                  <h6>Arya</h6>
                </div>
              </div>
              <hr />
              <h5 style={{ fontSize: "14px" }}>Tổng tiền: </h5>
            </div>
          </div>
        </header>
        <section>
          <div className="product-shop">
            {this.state.products.length > 0
              ? this.state.products.map((e) => {
                  return (
                    <div key={e.id} className="product">
                      <img className="img" src={e.image} />
                      <h3 style={{ textAlign: "center" }}>{e.name}</h3>
                      <h4>
                        {e.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h4>
                      <button
                        onClick={() => this.addToCart(e.id)}
                        className="add-to-cart"
                      >
                        <i className="fa-solid fa-cart-shopping"></i> Thêm vào
                        giỏ hàng
                      </button>
                    </div>
                  );
                })
              : ""}
          </div>
        </section>
      </>
    );
  }
}
