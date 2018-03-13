import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import Button from 'material-ui/Button';
import Launch from 'material-ui-icons/Launch';

const styles = theme => ({
  button: {
    position: 'absolute',
    top: theme.spacing.unit * 4,
    right: theme.spacing.unit * 5,
  },
});

class Start extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Button
        variant="fab"
        color="scondary"
        aria-label="add"
        className={classes.button}
      >
        <Launch />
      </Button>
    );
  }
}

Start.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Start));
