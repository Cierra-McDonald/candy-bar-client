import React, { Component } from 'react'
import { getCandy, getCategories, makeCandy, getCategoryId } from './api-utils.js';
export default class DetailPage extends Component {
    state ={
        name: '',
        yumminess: 1,
        has_chocolate: false,
        category_id: 1
    }

    componentDidMount = async () => {
        const categories = await getCategories();
        const { 
            category, 
            has_chocolate, 
            name, 
            owner_id, 
            yumminess,
    } = await getCandy(this.props.match.params.candyId);

        const category_id = getCategoryId({ category }, categories);
        this.setState({
            has_chocolate: has_chocolate,
            name: name,
            owner_id: owner_id,
            yumminess: yumminess,
            category_id: category_id
        })
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
        console.log('=============================\n')
        console.log('|| this.state', this.state)
        console.log('\n=============================')
        return (
            <div>
                DETAIL PAGE
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
                            <option value={1} selected={this.state.category_id === 1}>Classic</option>
                            <option value={2} selected={this.state.category_id === 2}>Modern</option>
                            <option value={3} selected={this.state.category_id === 3}>Nostalgic</option>
                        </select>
                    </label>
                    <button>Create</button>
                </form>
                <button onClick={() => this.setState({ name: 'lady gaga' })}>my candy is called lady gaga</button>
            </div>
        )
    }
}
