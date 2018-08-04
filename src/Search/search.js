import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'


import CircularProgress from '@material-ui/core/CircularProgress';

const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search?api_key=KGWuif7SMlEV5M6yAivtM93VmlVc0ruG&limit=24&offset=0&rating=G&lang=en&q=';

const styles = theme => ({
    root: {
      height:'100%',
      overflow: 'hidden',
    },
    gridList: {
      width: window.innerWidth,
      height: '100%',
    },
    subheader: {
      width: '100%',
    },
  });
  

class Random extends Component{
    
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context)
        this.state={
          isLoading:true
        }
    }

    componentWillMount(){
        let cols = window.innerWidth<500?2:4;
        fetch(SEARCH_URL+this.context.router.history.location.pathname.split('/')[2])
        .then(response=>response.json())
        .then(resJson=>this.setState({
            data:resJson,
            isLoading:false,
            cols:cols
        }))
    }

    componentWillReceiveProps(){
        this.setState({isLoading:true})
        let cols = window.innerWidth<500?1:4;
        fetch(SEARCH_URL+this.context.router.history.location.pathname.split('/')[2])
        .then(response=>response.json())
        .then(resJson=>this.setState({
            data:resJson,
            isLoading:false,
            cols:cols
        }))
    }

    render() {
        if(this.state.isLoading){
            //sow the loader
            return(
                <CircularProgress color="secondary" style={{position:'fixed', top:window.innerHeight/2, right:window.innerWidth/2}} />
            )
        }
        
        const { classes } = this.props;

        return (
          <React.Fragment>
                <div className={classes.root}>
                <GridList cellHeight={250} className={classes.gridList} cols={this.state.cols}>
                {this.state.data.data.map(tile => (
                    <GridListTile key={tile.images.original.url} cols={1}>
                    <img src={tile.images.original.url}/>
                    </GridListTile>
                ))}
                </GridList>
                </div>
                <Button variant="fab" color="secondary" style={{position:'fixed', bottom:10, right:10}} onClick={()=>this.context.router.history.push('/')}>
                    <HomeIcon />
                </Button>
          </React.Fragment>
        );
      }
}
Random.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Random);