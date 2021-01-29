import React from 'react';
import { connect } from 'react-redux'

import {
    Button,
    Table,
    Form
} from 'react-bootstrap'

import { getProduct, addProduct, delProduct } from '../actions'

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getProduct()
    }

    addProduct = () => {
        const name = this.refs.name.value
        const category_id = this.refs.id.value
        const price = this.refs.price.value
        const stock = this.refs.stock.value

        const body = {
            name,
            category_id,
            price,
            stock
        }

        // console.log(body)
        this.props.addProduct(body)
        this.refs.name.value = ''
        this.refs.id.value = ''
        this.refs.price.value = ''
        this.refs.stock.value = ''
    }

    tableHead = () => {
        return (
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }

    tableBody = () => {
        return (
            this.props.product.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.id_products}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.category}</td>
                        <td>
                            <Button variant="warning">Edit</Button>
                            <Button variant="danger" onClick={() => this.props.delProduct(item.id_products)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        )
    }

    tableAdd = () => {
        return (
            <tr>
                <td>#</td>
                <td><Form.Control type="text" placeholder="Enter Product Name" ref="name" /></td>
                <td><Form.Control type="number" placeholder="Enter Product Price" ref="price" /></td>
                <td><Form.Control type="number" placeholder="Enter Product Stock" ref="stock" /></td>
                <td><Form.Control type="number" placeholder="Enter ID Category" ref="id" /></td>
                <td>
                    <Button variant="success" onClick={this.addProduct}>Save</Button>
                </td>
            </tr>
        )
    }

    render() {
        console.log('data product', this.props.product)
        return (
            <Table striped bordered hover variant="dark">
                {this.tableHead()}
                <tbody>
                    {this.tableBody()}
                    {this.tableAdd()}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product.data
    }
}

export default connect(mapStateToProps, { getProduct, addProduct, delProduct })(Product);
