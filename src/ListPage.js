import React, { Component } from 'react'
import { getCandies } from './api-utils.js';
import { Link } from 'react-router-dom';
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
        console.log('=============================\n')
        console.log('|| this.props', this.props)
        console.log('\n=============================')

        return (
            <div className="list">
                { this.state.loading && <Spinner />}
            
                { this.state.candies.map(candy => <Link
                to={`/candies/${candy.id}`} key={candy.name}>
                    <div className="candy">
                    <p>{candy.name}</p>
                    <p>{candy.category}</p>
                    <p>{candy.yumminess}</p>
                    <p>{candy.has_chocolate ? 'it has has chocolate' : 'choco-free'}</p>
                </div>
                </Link>
                    )}
            </div>
        )
    }
}
