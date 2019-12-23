import React from "react"
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
    root: {
      flexGrow: 1,
    },
    paper: {
      paddingTop: '15px',
      margin: 'auto',
      maxWidth: 1000,
    },
    image: {
      width: 128,
    },
    height: 128,
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:  props.match.params.id,
            detailShow :{},
            error:{},
            image :'',
            rating: ''
        };
      }

    render(){
      const { classes } = this.props;
        return (
          <div className={classes.root} style={{ marginTop: 20, padding: 30 }}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={this.state.image}/>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                    {this.state.detailShow.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ID: {this.state.detailShow.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    Language: {this.state.detailShow.language}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Type:{this.state.detailShow.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Gender: { this.state.detailShow.genres }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ratings: { this.state.rating }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Official site: { this.state.officialSite }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Summary: { this.state.summary }
                    </Typography> 
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        );
    }
    
    async componentDidMount() {
        axios.get(`http://api.tvmaze.com/shows/${this.state.id}`)
        .then(res => {
          const detailShow = res.data;
          this.setState({ image : detailShow.image.original ,  
                        detailShow : detailShow , rating : detailShow.rating.average})
        }).catch(error => {
          const Err = error.response;
          this.setState({error : Err});
        });
      }
}
export default withStyles(styles)(Show);