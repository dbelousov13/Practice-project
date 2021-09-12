import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserAction } from '../../actions/actionCreator'
import Spinner from '../Spinner/Spinner'

const withAuth = (Component, props) => {
  class Hoc extends React.Component {
    componentDidMount () {
      const {
        data,
        history: { replace },
        getUser
      } = this.props
      if (!data) {
        getUser(replace)
      }
    }

    render () {
      const { isFetching, history, match } = props
      return (
        <>
          {isFetching ? (
            <Spinner />
          ) : (
            <Component history={history} match={match} {...props} />
          )}
        </>
      )
    }
  }
  const mapStateToProps = state => state.userStore

  const mapDispatchToProps = dispatch => ({
    getUser: data => dispatch(getUserAction(data))
  })
  return connect(mapStateToProps, mapDispatchToProps)(Hoc)
}

export default withAuth
