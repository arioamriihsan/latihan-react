// main
import React, { Component } from 'react';
import Select from 'react-select' 
import { Link } from 'react-router-dom'

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// child
import CardProduct from '../Components/CardProduct'

class ProductPage extends Component {
    state = { data : [] }

    componentDidMount() {
        // console.log(this.state.data)
        Axios.get(`${API_URL}/products`)
        .then((res) => {
            // console.log(res.data)
                this.setState({                    
                data : res.data
            })
            // console.log(this.state.data)
        })
        .catch(err => console.log(err))
    }

    options = [
        {value : 'Jordan', label : 'Jordan'},
        {value : 'Nike', label : 'Nike'},
        {value : 'Adidas', label : 'Adidas'}
    ]

    onHandleCange = (e) => {
        // console.log(e.value)
        Axios.get(`${API_URL}/products?brand=${e.value}`)
        .then((res) => {
            // console.log(res.data)
            this.setState({
                data : res.data
            })
        })
        .catch(err => console.log(err))
    }

    renderCardProduct = () => {
        return this.state.data.map((val) => {
            return(
                <Link to={`/product-detail?id=${val.id}`} key={val.id}>
                    <CardProduct 
                        name = {val.name}
                        image = {val.image}
                        price = {val.price}
                        brand = {val.brand}
                    />
                </Link>
            )
        })
    }

    render() { 
        return ( 
            <div className='d-flex'>
                <div className='col-2 mt-5'>
                    <Select options={this.options} onChange={this.onHandleCange} placeholder='Choose brand'/>
                </div>
                <div className='col-10'>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {this.renderCardProduct()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;