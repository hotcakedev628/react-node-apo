import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ters from '../reducers/ter';
import UsersTable from './tables/MealsTable/UsersTable';
import { ApiService } from '../services/data.service';


class Ter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users : []};
      }

    componentDidMount() {
        // setTimeout(()=>{
        //     this.props.getData()
        // },1000)
        // fetch('http://localhost:3001/api/users')

        ApiService.getUsers({}).then(x=>{
            console.log(x)
            this.setState({...this.state, users:x.users})
        }).catch(err=>{  })
        
    }

    onDelete = (item) => {
        fetch(`http://localhost:3001/api/users/${item._id}`,{
            method: 'Delete',
        }).then(x=> x.json()).then(x=>{
            // this.setState({...this.state, users:x.users})
        }).catch(err=>{  })
    }
    
    render() {
        return (
            
             <UsersTable users={this.state.users}  onEditClick={()=>console.log('edit')} onAddClick={()=>console.log('Add')} onDeleteClick={this.onDelete} />

        )

    }

}

const mapStateToProps = state => {
    // console.log(state)
    return {
        ters: state.terState.ters
    }
}
const mapDispatchToProps = dispatch => {
    return ({
        getData: () => dispatch({ type: 'GET_TERS' })
    })
}

const visibleTers = connect(mapStateToProps, mapDispatchToProps)(Ter)

export default visibleTers

Ter.propTypes = {
    getData: PropTypes.func,
    ters: PropTypes.array
}

