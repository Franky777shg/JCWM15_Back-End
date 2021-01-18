import React from 'react';
import Axios from 'axios'

import {
    Card,
    Button,
    Modal,
    Image
} from 'react-bootstrap'

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            detail: false,
            slctdProduct: {},
            qty: 1
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/product/getProduct')
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch(err => console.log(err))
    }

    selectProduct = (index) => {
        // if (!this.props.email) return this.setState({ loginFirst: true })
        this.setState({ detail: true, slctdProduct: this.state.data[index] })
    }

    minus = () => {
        if (this.state.qty === 1) return
        this.setState({ qty: this.state.qty - 1 })
    }

    plus = () => {
        if (this.state.qty === this.state.slctdProduct.stock) return
        this.setState({ qty: this.state.qty + 1 })
    }

    render() {
        const { data, detail, slctdProduct, qty } = this.state
        console.log(data)
        return (
            <div style={{ margin: "60px 20px" }}>
                <h1>Products</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {data.map((item, index) => {
                        return (
                            <Card key={index} style={{ width: '18rem', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                                <Card.Img variant="top" src={item.image} style={{ height: 250 }} />
                                <Card.Body style={styles.cardBody}>
                                    <Card.Title style={{}}>{item.name}</Card.Title>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div>
                                            IDR {item.price.toLocaleString()}
                                        </div>
                                        <div>
                                            Stock: {item.stock}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                        <Button style={{ width: '80px' }} variant="warning" >
                                            <i className="far fa-heart"></i>
                                        </Button>
                                        <Button variant="primary" onClick={() => this.selectProduct(index)} >Buy Now</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
                <Modal centered show={detail} onHide={() => this.setState({ detail: false, qty: 1 })} size="lg" style={{}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{slctdProduct ? slctdProduct.name : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Image src={slctdProduct ? slctdProduct.image : ''} style={{ height: 270, width: 350 }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
                            <strong>IDR {slctdProduct ? slctdProduct.price : ''}</strong>
                            <strong>Stock: {slctdProduct ? slctdProduct.stock : ''}</strong>
                            <strong>Description: </strong>
                            <p>{slctdProduct ? slctdProduct.description : ''}</p>
                            <div style={{ display: 'flex', width: 120, justifyContent: 'space-between' }}>
                                <Button onClick={this.minus}>-</Button>
                                <h3>{qty}</h3>
                                <Button onClick={this.plus}>+</Button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ detail: false, qty: 1 })}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.addToCart}>
                            Add To Cart
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

const styles = {
    cardBody: {
        // backgroundColor: 'lightgreen',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
}

export default Product;
