import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  LongTextField,
} from 'uniforms-semantic';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { _ } from 'lodash';
import SimpleSchema from 'simpl-schema';
import { withRouter } from 'react-router';
import { updateMethod } from '../../../api/base/BaseCollection.methods';
import { Teams } from '../../../api/team/TeamCollection';
import MultiSelectField from '../form-fields/MultiSelectField';

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */

const schema = new SimpleSchema({
  name: String,
  description: String,
  gitHubRepo: String,
});
class AdminEditTeamWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }


  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  submit(data) {

    const {
      name, description, gitHubRepo,
    } = data;
    const id = this.props.doc._id;

    const updateData = {};
	updateData.id = data._id;
	updateData.name = data.name;
	updateData.description = data.description;
	updateData.gitHubRepo = data.gitHubRepo;
	
    const collectionName = Teams.getCollectionName();
    console.log(updateData);
	console.log(collectionName);
    updateMethod.call({ collectionName, updateData },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // console.error(error.message); 
          } else {
            swal('Success', 'Item edited successfully', 'success');
            // console.log('Success');
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms *//**{this.props.team.name}*/
  render() {
    const formSchema = new SimpleSchema2Bridge(schema);
    return (
        <div style={{ backgroundColor: '#C4C4C4' }}>
          <Grid container centered>
            <Grid.Column>
              <div style={{
                backgroundColor: '#393B44', padding: '1rem 0rem', margin: '2rem 0rem',
                borderRadius: '2rem',
              }}>
                <Header as="h2" textAlign="center" inverted>Edit A Team</Header>
              </div>
              <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} model={this.props.doc}
                        style={{
                          paddingBottom: '4rem',
                        }}>
                <Segment style={{
                  borderRadius: '1rem',
                  backgroundColor: '#393B44',
                }} className={'teamCreate'}>
                  <Grid container centered>
                    <Grid.Column style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
					  <TextField name='name' required/>
                      <LongTextField name='description' required/>
                      <TextField name='gitHubRepo' required/>
                    </Grid.Column>
                  </Grid>
                  <div align='center'>
                    <SubmitField value='Submit'
                                 style={{
                                   color: 'white', backgroundColor: '#24252B',
                                   margin: '2rem 0rem',
                                 }}/>
                  </div>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

AdminEditTeamWidget.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
};

const AdminEditTeamCon = withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  return {
    doc: Teams.findOne(documentId),
  };
})(AdminEditTeamWidget);

export default withRouter(AdminEditTeamCon);
