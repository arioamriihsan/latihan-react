// main
import React, { Component } from 'react';

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// redux
import { connect } from 'react-redux'
import { addToCart } from '../Redux/Action'

// style
import Select from 'react-select'
import { Button } from 'reactstrap'

class ProductDetail extends Component {
    state = { 
        data : {},
        sizes : [
            {value : 40, label: 40},
            {value : 41, label: 41},
            {value : 42, label: 42},
            {value : 43, label: 43},
            {value : 44, label: 44},
            {value : 45, label: 45},
            {value : 46, label: 46},
            {value : 47, label: 47},
            {value : 48, label: 48}
        ],
        selectedSize : false
    }

    componentDidMount() {
        let id = this.props.location.search.split('=')[1]
        // console.log(this)
        // console.log(id)
        Axios.get(`${API_URL}/products/${id}`)
        .then((res) => {
            this.setState({
                data : res.data
            }) 
        })
        .catch(err => console.log(err))
    }

    selectedSize = (sz) => {
        let size = sz.value
        // console.log(size)
        if( size !== 0 ) {
            this.setState({
                selectedSize : true
            })
        }
    }

    handleCart = () => {
        if( this.state.selectedSize ) {
            window.alert('Added to Cart')
            let id = this.props.location.search.split('=')[1]
            // console.log(this)
            // console.log(id)
            Axios.get(`${API_URL}/products/${id}`)
            .then((res) => {
                // console.log(res)
                let { name, brand, price, category, image, id } = res.data
                this.props.addToCart({
                    name,
                    brand,
                    price,
                    category,
                    image,
                    id
                })
            })
            .catch(err => console.log(err))
        } else {window.alert('Please select your size')}
    }

    render() { 
        let { data } = this.state
        return ( 
            <div className='row'>
                <div className='col-4'>
                    <img src={data.image} alt='sepatu' width='300px' />
                </div>
                <div className='col-8'>
                    <div>{data.name}</div>
                    <div>{data.brand}</div>
                    <div>{data.category}</div>
                    <div>
                        Rp.
                        {
                            data.price
                            ?
                            data.price.toLocaleString()
                            :
                            null
                        }
                    </div>
                    <div>
                        <Select options={this.state.sizes} ref={(selSize) => this.selSize = selSize} onChange={this.selectedSize}/>
                    </div>
                    <div>
                        <Button onClick={() => this.handleCart(this.selectedSize)}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { addToCart })(ProductDetail);