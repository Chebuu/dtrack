import React, { useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import loginActionCreator from '../../store/actions/login.js'

const useStyles = makeStyles({
  container: {
    display: 'initial'
  },
  card: {
    width: 345,
    margin: '110px auto 0px auto',
    boxShadow: '3px 3px 10px rgba(0,0,0,0.2)'
  },
  button: {
    backgroundColor: 'white'
  },
  accountBoxIcon: {
    float: 'right'
  },
  message: {
    color: 'tomato',
    margin: '10px auto',
    width: '90%',
    textAlign: 'center'
  }
})

const Login = props => {

  const { 
    cookies, 
    message, 
    isAuthenticated, 
    setCookieProvider, 
    checkAuth, 
    submitLogin  
  } = props

  const classes = useStyles(props)

  useEffect(()=>{
    setCookieProvider(cookies, true)
    checkAuth()
  },[])

  return(
    isAuthenticated ?
      <Redirect to='/user'/> :
      <>
        <Grid container className={ classes.container } >
            <Card className={ classes.card } >
              <CardContent >
                <AccountBoxIcon className={ classes.accountBoxIcon }/>
                <TextField id='username' label='Username'  autoComplete='username' margin='normal' />
                <TextField id='password' label='Password' type='password' autoComplete='current-password' margin='normal' />
              </CardContent>
              <CardActions>
                <Button className={ classes.button } onClick={ submitLogin } variant='contained' size="small"> Submit </Button>
              </CardActions>
            </Card>
            <p className={ classes.message }> { message } </p>
        </Grid>
      </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.message,
    isLoading: state.login.isLoading
  } 
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCookieProvider: (provider, force) => {
      dispatch(loginActionCreator.setCookieProvider(provider, force))
    },
    submitLogin: () => {
      dispatch(loginActionCreator.submitLogin())
    },
    checkAuth: () => {
      dispatch(loginActionCreator.checkAuth())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)