// main
import React, { Component } from 'react';
import { Route } from 'react-router-dom'

// API
import Axios from 'axios'
import { API_URL } from './Support/API_URL'

// redux
import { connect } from 'react-redux'
import { Login } from './Redux/Action'

// children
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import LoginPage from './Pages/LoginPage'
import Register from './Pages/Register'
import ProductPage from './Pages/ProductPage'
import ProductDetail from './Pages/ProductDetail'
import ManageProduct from './Pages/ManageProduct'
import Cart from './Pages/Cart'

// style
import './App.css'

class App extends Component {
  state = {  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if( token ) {
      // console.log(JSON.parse(token))
      let tokenParse = JSON.parse(token)
      Axios.get(`${API_URL}/users?username=${tokenParse.username}&password=${tokenParse.password}`)
      .then((res) => {
        // console.log(res.data)
        let { username, email, role, id } = res.data[0]
        this.props.Login({
          username,
          email,
          role,
          id
        })
      })
      .catch(err => console.log(err))
    }
  }

  render() { 
    return ( 
      <React.Fragment>
        <Header />
        <Route path='/' component={Home} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={Register} />
        <Route path='/product' component={ProductPage} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/manage-product' component={ManageProduct} />
        <Route path='/my-cart' component={Cart} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(null, {Login})(App)