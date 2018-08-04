import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import ArrowBack from '@material-ui/icons/ArrowBack'
import Search from '@material-ui/icons/Search'
import Cancel from '@material-ui/icons/Cancel'


import TextField from '@material-ui/core/TextField';

const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search?api_key=KGWuif7SMlEV5M6yAivtM93VmlVc0ruG&limit=24&offset=0&rating=G&lang=en&q=';


const styles = {
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
  },
};


class Header extends Component{

  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context)
    this.state={
      search:false
    }
  }


  handleSearch(){
    this.setState({
      search:!this.state.search
    })
  }

  onKeyDown(event){
    if(event.keyCode === 13 && event.target.value!=='' && event.target.value!==this.context.router.history.location.pathname.split('/')[2]){
        this.context.router.history.push('/search/'+event.target.value);
        this.setState({search:false})
        console.log(this.text_ref)
    }
  }
  backOnClick(event) {
    event.preventDefault();
    this.context.router.history.goBack();
  }

  render(){
        const { classes } = this.props;
        return (
            <AppBar position="static" color="secondary">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit">
                
                {this.context.router.history.location.pathname.split('/')[1] == ""?
                <CameraRollIcon />:
                <ArrowBack onClick={this.backOnClick.bind(this)}/>}
                </IconButton>
                
                {!this.state.search?
                <Typography variant="title" color="inherit" className={classes.flex}>
                  GifP@rk
                </Typography>:
                <TextField
                type="search"
                placeholder="Seach for gifs ... "
                className={classes.flex}
                autoFocus={true}
                onKeyDown={this.onKeyDown.bind(this)}
                innerRef={text_ref=>this.text_ref=text_ref}
                />
                }

                {!this.state.search?
                <IconButton color="inherit">
                  <Search onClick={this.handleSearch.bind(this)}/>
                </IconButton>:
                <IconButton color="inherit">
                  <Cancel onClick={this.handleSearch.bind(this)}/>
                </IconButton>
                }

              </Toolbar>
            </AppBar>
         )
    }    
}
 
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);