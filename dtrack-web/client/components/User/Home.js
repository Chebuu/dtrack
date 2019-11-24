import React, { useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import withWidth from '@material-ui/core/withWidth'
import { CircularProgress } from '@material-ui/core'

import Appbar from './Appbar'
import ProductUploadModal from './ProductUploadModal'

import loginActionCreator from '../../store/actions/login.js'

const widthQuery = (width, accept) => {
  accept = Array.isArray(accept) ? accept : [accept]
  return !!accept.includes(width)
}

const Home = props => {
  const {
    cookies, 
    isLoading,
    isAuthenticated, 
    setCookieProvider
  } = props

  useEffect(() => {
    setCookieProvider(cookies, false)
  },[])

  return (
    !isAuthenticated ?
      <Redirect to='/login' /> :
      <Box maxWidth='100%' >
        { isLoading && <CircularProgress /> }
        <Box display={ isLoading ? 'none' : 'initial' } >
          <Appbar cookies={ cookies } /> 
          <ProductUploadModal /> 
        </Box> 
      </Box>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.isAuthenticated,
    isLoading: state.login.isLoading,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCookieProvider: (provider) => {
      dispatch(loginActionCreator.setCookieProvider(provider))
    },
    submitLogout: () => {
      dispatch(loginActionCreator.submitLogout())
    },
    checkAuth: () => {
      dispatch(loginActionCreator.checkAuth())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withWidth()(Home) )
