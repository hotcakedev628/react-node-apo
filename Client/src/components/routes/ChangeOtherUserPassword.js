import React from 'react'
import Title from '../text/Title';
import { ApiService } from '../../services/data.service';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
    EnhancedChangeOtherUserPasswordForm
} from '../forms/ChangeOtherUserPasswordForm/EnhancedChangeOtherUserPasswordForm';



class ChangeOtherUserPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: {} };
	}
	componentDidMount() {
		this.fetchUser()
	}

	fetchUser() {
		return ApiService.getUser(this.props.match.params.id).then(x => {
			this.setState({ user: x })
		}).catch(err => {
			toast.error(err)
		})
	}

	render() {
		return (
			this.state.user.name ?
				<div>
					<Title> Change {this.state.user.name} Password </Title>
					<EnhancedChangeOtherUserPasswordForm userId={this.state.user._id} />
				</div>
				:
				<p>Waiting</p>
		)
	}
}



ChangeOtherUserPassword.propTypes = {
	match: PropTypes.any
}


export default ChangeOtherUserPassword;