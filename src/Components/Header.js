// main
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { Logout } from '../Redux/Action'

// style
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const gState = useSelector(({auth}) => {
    return{
      logged : auth.logged,
      username : auth.username
    }
  })
  // console.log(gState)
  const dispacth = useDispatch()
  const logout = () => {
    dispacth(Logout())
    localStorage.removeItem('token')
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand><Link to='/' style={{color: 'gray', textDecoration: 'none'}}>Shoesilo</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>Men</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Women</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Kids</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={faUser} />
              </DropdownToggle>
              {
                gState.logged
                ?
                <DropdownMenu right>
                  <Link to='/my-cart'>
                    <DropdownItem>
                      Cart
                    </DropdownItem>
                  </Link>
                  <Link to='/'>
                    <DropdownItem>
                      Transaction History
                    </DropdownItem>
                  </Link>
                  <Link to='/'>
                    <DropdownItem>
                      Profile
                    </DropdownItem>
                  </Link>
                  <Link to='/'>
                    <DropdownItem onClick={logout}>
                      Logout
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
                :
                <DropdownMenu right>
                  <Link to='/login'>
                    <DropdownItem>
                      Login
                    </DropdownItem>
                  </Link>
                  <Link to='/register'>
                    <DropdownItem>
                      Register
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              }
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Best Marketplace</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;