import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import data from "../../data.json";

class Game extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount() {
        this.setState({ data: this.shuffleData(this.state.data) });
        console.log(data);
    }

    handleCorrectGuess = newData => {
        const { topScore, score } = this.state;
        const newScore = score + 1;
        const newTopScore = newScore > topScore ? newScore : topScore;
        this.setState({
            data: this.shuffleData(newData),
            score: newScore,
            topScore: newTopScore
        });
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
     }

     handleItemClick = id => {
        let guessedCorrectly = false;
        const newData = this.state.data.map(item => {
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
            </div>
         );
     }
}

export default Game;