import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import {NavLink} from 'react-router-dom;
// import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; 

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
});

export default function MediaCard({url,redirectTo,title}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} className="w-25">
        <CardMedia
          className={classes.media}
          image={url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>  
      <CardActions>
      <NavLink to={redirectTo}>
        <Button size="small" color="primary">
          Open
        </Button>
      </NavLink>
      </CardActions>
    </Card>
  );
}
