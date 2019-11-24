import React from 'react'
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const widthQuery = (width, accept) => {
  accept = Array.isArray(accept) ? accept : [accept]
  return !!accept.includes(width)
}

const breakpointQuery = (width) => {
  const breaks = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }
  return breaks(width)
}

const dimQuery = (id, rule) => {
  const element = document.getElementById(id)
  return element[`offset${rule}`]()
}

const useStyles = makeStyles({
  root:{
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
      position: props => widthQuery(props.width, ['xs', 'sm']) ? 'absolute' : 'relative',
      width: '100%',
      height: 'fit-content',
      top: '0px',
      margin: '20px 0px',
      justifyContent: props => widthQuery(props.width, ['xs', 'sm']) ? 'flex-end' : 'center'
  },
  buttonBox:{
    width: 'fit-content',
    height: 'fit-content',
    margin: props => widthQuery(props.width, ['xs', 'sm']) ?  '0px' : '0px 40px',
    marginLeft: props => widthQuery(props.width, ['xs', 'sm']) ?  '5px' : 'initial',
    fontSize: props => widthQuery(props.width, ['xs', 'sm']) ? '12px' : '15px',
    letterSpacing: props => widthQuery(props.width, ['xs', 'sm']) ? '3px' : '5px',
  },
  link: {
    textDecoration: 'none'
  },
  button:{
    width: '95px',
    height: '37px',
  }
})

const Splash = props => {
  const classes = useStyles(props)
  return (  
    <Grid container className={ classes.root }>
      <Grid container className={ classes.buttonContainer } >
        <Grid item className={ classes.buttonBox } >
          <Link to="/login" className={ classes.link }>
            <Button to="/login" variant="contained" className={ classes.button } > Login </Button>
          </Link>
        </Grid>
        <Grid item className={ classes.buttonBox } >
          <Link to="/signup" className={ classes.link }>
            <Button variant="contained" className={ classes.button } > Signup </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withWidth()(Splash)