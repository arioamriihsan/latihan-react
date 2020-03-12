import React, { Component } from "react";
import { Link } from 'react-router-dom'

import CardHome from "../Components/CardHome";
import Flip from "react-reveal/Flip";
import { Jumbotron, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import JumboImage from "../Assets/exp.jpg";
import Mencat from "../Assets/$_10.jpg";
import Womencat from "../Assets/womencat.jpg";
import Kidscat from "../Assets/kidscat.jpg";

class Home extends Component {
  state = {
    dataCard: [
      {
        name: "Men",
        image: Mencat
      },
      {
        name: "Women",
        image: Womencat
      },
      {
        name: "Kids",
        image: Kidscat
      }
    ]
  };

  renderCardHome = () => {
    let { dataCard } = this.state;
    return dataCard.map(val => {
      return (
        <div className="col-4">
          <CardHome name={val.name} image={val.image} />
        </div>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Jumbotron
            style={{
              backgroundImage:
                "linear-gradient(to right, #B48C69, #F5F5F5, #F5F5F5, #F5F5F5)",
              height: "500px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <div>
                <Flip>
                  <div>
                    <h1 className="display-3" style={{ color: "#1E2535" }}>
                      Finding the Perfect Pair
                    </h1>
                  </div>
                  <div>
                    <p className="lead" style={{ color: "#1E2535" }}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                  <div>
                    {/* <hr className="my-2" /> */}
                    <p className="lead">
                      <Link to='/product'>
                        <Button style={{ backgroundColor: "#1E2535" }}>
                          Shop Now <FontAwesomeIcon icon={faShoppingCart} />
                        </Button>
                      </Link>
                    </p>
                  </div>
                </Flip>
              </div>
              <div>
                <img src={JumboImage} alt="jmb" style={{ height: "20em" }} />
              </div>
            </div>
          </Jumbotron>
        </div>
        <div style={{ display: "flex" }} className="container">
          {this.renderCardHome()}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;