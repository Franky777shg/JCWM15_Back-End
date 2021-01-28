import React from 'react';
import { connect } from 'react-redux'

import {
    Table,
    Button,
    Form
} from 'react-bootstrap'

import { getCateDetail, addCategory, delCategory, editCategory } from '../actions'

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idEdit: null
        }
    }

    componentDidMount() {
        this.props.getCateDetail()
    }

    addCategory = () => {
        const category = this.refs.category.value
        const parent = parseInt(this.refs.parent.value)
        // console.log(category, parent)

        const body = {
            title: category,
            parent_id: parent
        }

        this.props.addCategory(body)
        this.refs.category.value = ""
        this.refs.parent.value = ""
    }

    delCategory = (index) => {
        // console.log(index)
        this.props.delCategory(index)
    }

    editCategory = (id) => {
        const title = this.refs.cateEdit.value
        const parent_id = parseInt(this.refs.parentEdit.value)

        const body = {
            title,
            parent_id
        }

        // console.log(body, id)

        this.props.editCategory(body, id)

        this.refs.cateEdit.value = ''
        this.refs.parentEdit.value = ''
        this.setState({ idEdit: null })
    }

    tableHead = () => {
        return (
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Parent</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }

    tableBody = () => {
        return (
            <>
                {
                    this.props.detail.map((item, index) => {
                        if (this.state.idEdit === index) {
                            return (
                                <tr key={index}>
                                    <td>#</td>
                                    <td><Form.Control type="text" defaultValue={item.title} ref="cateEdit" /></td>
                                    <td><Form.Control type="number" defaultValue={item.parent_id} ref="parentEdit" /></td>
                                    <td>
                                        <Button variant="warning" onClick={() => this.editCategory(item.id)} >Save</Button>
                                        <Button variant="danger" onClick={() => this.setState({ idEdit: null })} >Cancel</Button>
                                    </td>
                                </tr>
                            )
                        }

                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.parent}</td>
                                <td>
                                    <Button variant="warning" onClick={() => this.setState({ idEdit: index })}>Edit</Button>
                                    <Button variant="danger" onClick={() => this.delCategory(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </>
        )
    }

    tableAdd = () => {
        return (
            <tr>
                <td>#</td>
                <td><Form.Control type="text" placeholder="Enter Category" ref="category" /></td>
                <td><Form.Control type="number" placeholder="Enter Parent ID" ref="parent" /></td>
                <td><Button variant="success" onClick={this.addCategory} >Add</Button></td>
            </tr>
        )
    }

    render() {
        console.log('detail', this.props.detail)
        console.log('idEdit', this.state.idEdit)
        return (
            <div>
                <h1>Category Detail</h1>
                <Table striped bordered hover>
                    {this.tableHead()}
                    <tbody>
                        {this.tableBody()}
                        {this.tableAdd()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        detail: state.category.detail
    }
}

export default connect(mapStateToProps, { getCateDetail, addCategory, delCategory, editCategory })(Category);