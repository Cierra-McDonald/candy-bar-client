import React, { Component } from 'react'
import { makeCandy } from './api-utils.js';
export default class CreatePage extends Component {
    state ={
        name: '',
        yumminess: 1,
        has_chocolate: false,
        category_id: 1
    }

    handleNameChange = (e) => this.setState({ name: e.target.value })

    handleYumminessChange = (e) => this.setState({ yumminess: Number(e.target.value) })

    handleHasChocolateChange = () => {
        this.setState({ 
        // if has_chocolate is true, make it false. if it's false, make it true
        has_chocolate: !this.state.has_chocolate
     })
    }

    handleCategoryChange = (e) => this.setState({           
        category_id: Number(e.target.value),
     })


    handleSubmit = async (e) => {
        e.preventDefault();

        // supply our form state to the post endpoint
        await makeCandy(this.state);

        this.props.history.push('/candies');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Candy name
                        {/* controlled inputs take all power away from the DOM forms */}
                        <input value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Candy yumminess
                        <input value={this.state.yumminess} type="number" onChange={this.handleYumminessChange} />
                    </label>
                    <label>
                        Has chocolate?
                        <input value={this.state.has_chocolate} type="checkbox" onChange={this.handleHasChocolateChange} />
                    </label>
                    <label>
                        <select value={this.state.category} onChange={this.handleCategoryChange}>
                            <option value={1}>Classic</option>
                            <option value={2}>Modern</option>
                            <option value={3}>Nostalgic</option>
                        </select>
                    </label>
                    <button>Create</button>
                </form>
                <button onClick={() => this.setState({ name: 'lady gaga' })}>my candy is called lady gaga</button>
            </div>
        )
    }
}
