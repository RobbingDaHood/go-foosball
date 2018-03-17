import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: 20,
  },
  avatar: {
    margin: 20,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    maxWidth: '50%',
  },
  score: {
    padding: 10,
    margin: 5,
  },
  button: {
    margin: 15,
  },
});

function Players(props) {
  const { classes } = props;
  const { data } = props;
  return (
    <div className={classes.row}>
      <Typography className={classes.name} variant="subheading">
        {data[0]}
      </Typography>
      <Avatar className={classes.avatar}>{data[0].substring(0, 2)}</Avatar>
      {data.length > 1 ? (
        <div>
          <Avatar className={classes.avatar}>{data[1].substring(0, 2)}</Avatar>
          <Typography className={classes.name} variant="subheading">
            {data[1]}
          </Typography>
        </div>
      ) : null}
    </div>
  );
}

class Game extends React.Component {
  render() {
    const { classes } = this.props;
    const { data } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Players data={data.rightPlayers} classes={classes} />
          <LinearProgress
            className={classes.score}
            color="secondary"
            variant="determinate"
            value={data.rightScore / (data.rightScore + data.leftScore) * 100}
          />
          <div size="small" className={classes.row}>
            <Button className={classes.button}>{data.table.color.right} wins {data.rightScore} points</Button>
          </div>
          <Divider />
          <div size="small" className={classes.row}>
            <Button className={classes.button}>{data.table.color.left} wins {data.leftScore} points</Button>
          </div>
          <LinearProgress
            className={classes.score}
            color="secondary"
            variant="determinate"
            value={data.leftScore / (data.rightScore + data.leftScore) * 100}
          />
          <Players data={data.leftPlayers} classes={classes} />
        </CardContent>
      </Card>
    );
  }
}

class Games extends React.Component {
  componentWillMount() {
    this.props.fetch(this.props.id);
  }

  render() {
    const { classes } = this.props;
    const { data } = this.props;
    return (
      <div>
        {data.map(game => (
          <Game key={game.uuid} classes={classes} data={game} />
        ))}
      </div>
    );
  }
}

Players.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

Game.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

Games.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
};

export default withRoot(withStyles(styles)(Games));