import React, { Component, Fragment } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  Input,
  InputAdornment,
  FormHelperText
} from '@material-ui/core'
import { UserContext } from '../Context'

class WorkProfile extends Component {
  static contextType = UserContext

  initState = () => {
    const user = this.context
    const { workingRadius } = user.userDetails
    return {
      workingRadius
    }
  }

  state = {
    ...this.initState(),
    diff: false
  }

  handleChange = event => {
    let { [event.target.name]: original } = this.initState()
    original = String(original)
    console.log('original', original)
    this.setState({
      [event.target.name]: Number(event.target.value),
      diff: event.target.value !== original
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('work', this.state)
  }

  render() {
    const { diff, workingRadius } = this.state

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Work details
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <Input
                  id="customRadius"
                  name="workingRadius"
                  endAdornment={
                    <InputAdornment position="end">km</InputAdornment>
                  }
                  style={{
                    width: 70,
                    fontSize: '0.875rem'
                  }}
                  type="number"
                  onChange={this.handleChange}
                  value={workingRadius}
                />

                <FormHelperText id="weight-helper-text">Radius</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item container justify="flex-end" xs={12}>
              {diff ? (
                <Button color="primary" variant="contained" type="submit">
                  Save Changes
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled
                  style={{
                    cursor: 'not-allowed',
                    pointerEvents: 'initial'
                  }}
                >
                  Save Changes
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Fragment>
    )
  }
}

export default WorkProfile