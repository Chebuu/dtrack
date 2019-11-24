import React from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputIcon from '@material-ui/icons/Input'
import Slide from '@material-ui/core/Slide'



import ProductFileUpload from './ProductFileUpload'
import ProductFileDropzone from './ProductFileDropzone'
import userActionCreator from '../../store/actions/user'

const useStyles = makeStyles({
  modal: {
    maxWidth: 345,
    marginTop: 200,
    margin: 'auto',
  }
})



const ProductUploadModal = props => {
  const { 
    showProductUploadModal,
    toggleProductUploadModal
  } = props

  const classes = useStyles(props)
  
  return (
    <Slide in={ showProductUploadModal } direction={ 'down' } mountOnEnter unmountOnExit>
      <Box>
        <Modal className= { classes.modal } open={ true } onClose={ toggleProductUploadModal } >
          <Card > 
            <CardContent>
              <ProductDropzone />
              <ProductDropzone />
            </CardContent>
            <CardActions>
              {/* TODO:: */}
            </CardActions>
          </Card>
        </Modal>
      </Box>
    </Slide>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    showProductUploadModal: state.user.productUploadModal.active
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleProductUploadModal: () => {
      dispatch(userActionCreator.toggleProductUploadModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductUploadModal)
