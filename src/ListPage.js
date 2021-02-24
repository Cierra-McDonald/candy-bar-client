import React, { Component } from 'react'
import { getCandies } from './api-utils.js';
import Spinner from './Spinner.js';
export default class ListPage extends Component {
    state = {
        candies: [],
        loading: false
    }

    componentDidMount = async () => {
        this.setState({ 
            loading: true,
         });

        // we need to await anything that returns a Promise
        const candies = await getCandies();

        this.setState({ 
            candies: candies,
            loading: false
        })
    }

    render() {
        return (
            <div className="list">
                { this.state.loading && <Spinner />}
                
                { this.state.candies.map(candy => <div className="candy">
                    <p>{candy.name}</p>
                    <p>{candy.category}</p>
                    <p>{candy.yumminess}</p>
                    <p>{candy.has_chocolate ? 'it has has chocolate' : 'choco-free'}</p>
                </div>
                    )}
            </div>
        )
    }
}
