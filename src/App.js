import React from 'react';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      pageNum: 1,
      isActive: false
    };
  }

  getProducts() {
    const that = this
    const currentPageNum = this.state.pageNum
    this.setState({ isActive: true })
    fetch(`https://summersalt.com/collections/swimwear/products.json?page=${currentPageNum}&limit=10`).then(
      res => {
        return res.json()
      })
      .then(data => {
        if (that.state.products[0]) {
          this.setState({ isActive: false })
          const test = that.state.products[0]
          const productsArray = test.concat(data.products)
          that.setState({ products: [productsArray], isActive: false })
        }
        else {
          that.setState({ products: [data.products], isActive: false })
        }
      })
  }
  componentDidMount() {
    this.getProducts()
    window.addEventListener('scroll', this.onScroll, false);
  };
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
  onScroll = () => {
    const currentPageNum = this.state.pageNum
    const allProducts = this.state.products
    const isActive = this.state.isActive
    if (allProducts.length > 0) {
      if (
        (!isActive && window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
        this.state.products.length
      ) {
        this.setState({ pageNum: currentPageNum + 1, isActive: true })
        this.getProducts();
      }
    }
  }
  render() {
    const allProducts = this.state.products
    const displayProduct = allProducts.length > 0 && allProducts.map(product => product.map(p => (
      <div key={p.id} id="imageDiv">
        <img src={p.images[0].src} alt={p.title}></img>
        <span> {p.title}</span>
      </div>
    )))
    return (
      <div>
        {displayProduct}
      </div>
    )
  }
}

