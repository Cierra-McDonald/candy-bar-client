import React, { Component } from 'react'
import { getCandy, getCategories, updateCandy, getCategoryId } from './api-utils.js';
export default class DetailPage extends Component {
    state = {
        name: '',
        yumminess: 1,
        has_chocolate: false,
        category_id: 1,
        categories: []
    }

    componentDidMount = async () => {
        const categories = await getCategories();
    
        const candy = await getCandy(this.props.match.params.candyId);

        const category_id = getCategoryId(candy, categories);
        // this.setState({
        //     has_chocolate: has_chocolate,
        //     name: name,
        //     owner_id: owner_id,
        //     yumminess: yumminess,
        //     category_id: category_id
        // })
        this.setState({
            ...candy,
            category_id,
            categories
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
        await updateCandy(this.props.match.params.candyId, this.state);

        this.props.history.push('/candies');
    }

    render() {
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
                        <input value={this.state.has_chocolate} type="checkbox" onChange={this.handleHasChocolateChange} checked={this.state.has_chocolate}/>
                    </label>
                    <label>
                        <select value={this.state.category} onChange={this.handleCategoryChange}>
                            {
                                this.state.categories
                                    .map(category => 
                                    <option value={category.id} selected={this.state.category_id === category.id}>
                                        {category.name}
                                    </option>
                                )
                            }
                        </select>
                    </label>
                    <button>Update</button>
                </form>
            </div>
        )
    }
}
