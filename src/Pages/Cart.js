// main
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux'
import { addToCart } from '../Redux/Action'

// API
// import Axios from 'axios'
// import {API_URL} from '../Support/API_URL'

// style
import { Table, Button } from 'reactstrap';

class Cart extends Component {
    state = {}
    render() {
        return (
            <div>
                <div>
                    <h3>This is Cart Page</h3>
                </div>
                <Table dark>
                    <thead>
                        <tr>
                            <th>ID Product</th>
                            <th>Product name</th>
                            {/* <th>Size</th> */}
                            <th>Image</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        this.props.isCart
                            ?
                            <tbody>
                                <tr>
                                    <td scope="row">{this.props.id}</td>
                                    <td>{this.props.name}</td>
                                    {/* <td>{this.props.size}</td> */}
                                    <td>
                                        <img src={this.props.image} alt={this.props.name} height='60px' width='60px' />
                                    </td>
                                    <td>{this.props.category}</td>
                                    <td>{this.props.price}</td>
                                    <td>
                                        <Button color="danger" className='m-2'>Delete</Button>
                                    </td>
                                </tr>
                            </tbody>
                            :
                            null
                    }
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isCart: state.cart.isCart,
        name: state.cart.name,
        size: state.cart.size,
        category: state.cart.category,
        id: state.cart.id,
        image: state.cart.image,
        price: state.cart.price
    }
}

export default connect(mapStateToProps, { addToCart })(Cart)