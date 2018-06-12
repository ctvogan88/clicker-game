import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import data from "../../data.json";
import Favicon from 'react-favicon';
//import { Link } from 'react-router-dom';

class Game extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    /* constructor() {
        super()
        this.state = {
            sideBar: true,
            open: false
        }
    } */

    componentDidMount() {
        this.setState({ data: this.shuffleData(this.state.data) });
        console.log(data);
    };

    toggleSide = () => {
        this.setState({
            sideBar: !this.state.sideBar
        })
    }

    handleCorrectGuess = newData => {
        //console.log(newData);
        
        const { topScore, score } = this.state;
        const newScore = score + 1;
        console.log(newScore);
        const newTopScore = newScore > topScore ? newScore : topScore;
        this.setState({
            data: this.shuffleData(newData),
            score: newScore,
            topScore: newTopScore
        });
        //console.log(this.state.score);
    };

    handleIncorrectGuess = data => {
        this.setState({
            data: this.resetData(data),
            score: 0
        });
    };

     resetData = data => {
        const resetData = data.map(item => ({ ...item, clicked: false}));
        return this.shuffleData(resetData);
     };

     // this is a Fisher-Yates-Durstenfeld shuffle
     shuffleData = data => {
         // set i to an integer equal to the number of objects being shuffled
         let i = data.length - 1;
         // for loop while i is not zero
         while (i > 0) {
             // set j to an integer equal to the sum of i and a
             const j = i + Math.floor(Math.random() * (data.length - i));
             const temp = data[j];
             data[j] = data[i];
             data[i] = temp;
             i--;
         }
         return data;
     };

     handleItemClick = id => {
        console.log(id + "! ");
        const { topScore, score } = this.state;
        const newScore = score + 1;
        this.setState({
            score: newScore
        });
        

        let guessedCorrectly = false;
        const newData = this.state.data.map(item => {
            //console.log({...item});
            const newItem = { ...item };
                if (newItem.id === id) {
                    if (!newItem === id) {
                        newItem.clicked = true;
                        guessedCorrectly = true;
                    }
                }
                return newItem;
            });
            guessedCorrectly
            ? this.handleCorrectGuess(newData)
            : this.handleIncorrectGuess(newData);
            console.log(newData);
        };


     render() {
         return (
            <div>
                <Nav score={this.state.score} topScore={this.state.topScore} />
                <Header />
                <Container>
                    {this.state.data.map(item => (
                        <ClickItem
                            key={item.id}
                            id={item.id}
                            shake={!this.state.score && this.state.topScore}
                            handleClick={this.handleItemClick}
                            image={item.image}
                        />
                    ))}
            </Container>
            <Footer />
            {/* <nav id="sidebar" className={this.state.sideBar ? "" : "active"}>

                    <div className="sidebar-header">
                        <h3>Whistlr</h3>
                        <strong>W</strong>
                    </div>


                    <ul className="list-unstyled components">
                        <li>
                            <Link to="/">
                                <i className="glyphicon glyphicon-home"></i>
                                Home
                    </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                <i className="glyphicon glyphicon-briefcase"></i>
                                About
                    </Link>

                        </li>
                        <li>
                            <a id="logOut" onClick={this.handleLogout}>
                                <i className="glyphicon glyphicon-remove-sign"></i>
                                Log Out
                    </a>
                        </li>
                    </ul>
            <button onClick={() => { this.toggleSide() }} type="button" id="sidebarCollapse" className="btn btn-primary navbar-btn">
                    <i className="glyphicon glyphicon-resize-horizontal"></i>
                    </button>
                </nav>

                <div id="content" className={this.state.sideBar ? "" : "contentActive"}>
                    <div className="row contentBody">
                        <div className="col-sx-12">
                            <Posts /> 
                        </div>
                    </div>

                </div> */}
            <Favicon url="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/skull.png" />
            </div>
         );
     }
}

export default Game;