import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending?api_key=KGWuif7SMlEV5M6yAivtM93VmlVc0ruG&limit=20&rating=G';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex:'1',
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

class Trending extends Component{

    constructor(){
        super();
        this.state={
          isLoading:true
        }
    }
    componentWillMount(){
        let cols = window.innerWidth<500?2:4;
        fetch(TRENDING_URL)
        .then(response=>response.json())
        .then(resJson=>this.setState({
          data:resJson,
          isLoading:false,
          cols:cols
        }));
    }

    render(){
        if(this.state.isLoading){
            return(<p>Loading...</p>)
        }
        
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Typography style={{textAlign:'center',color:'#FFF'}}>#TRENDING</Typography>
                <GridList cellHeight={160} className={classes.gridList} cols={this.state.cols}>
                {this.state.data.data.map(tile => (
                    <GridListTile key={tile.images.original.url} cols={1}>
                    <img src={tile.images.original.url}/>
                    </GridListTile>
                ))}
                </GridList>
            </div>
        )
    }
}

  
Trending.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Trending);