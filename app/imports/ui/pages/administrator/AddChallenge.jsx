import React from 'react';
// import { Grid, Segment, Header } from 'semantic-ui-react';
// import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Challenges } from '../../../api/challenge/ChallengeCollection';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
  title: String,
  description: String,
  submissionDetail: String,
  pitch: String,
});

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class AddChallenge extends React.Component {

  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  submit(data, formRef) {
    const { title, description, submissionDetail, pitch } = data;
    const definitionData = { title, description, submissionDetail, pitch };
    const collectionName = Challenges.getCollectionName();
    console.log(definitionData);
    /* defineMethod.call({ collectionName: collectionName, definitionData: definitionData },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // console.error(error.message);
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            // console.log('Success');
          }
        }); */
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);
    return (
        <Container>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <h2>Add a challenge</h2>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="Title" type="text" placeholder="Enter Title"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control name="Description" type="text" placeholder="Enter Description"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmissionDetail">
                  <Form.Label>Submission Detail</Form.Label>
                  <Form.Control name="SubmissionDetail" type="text" placeholder="Enter Submission Detail"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pitch">
                  <Form.Label>Pitch</Form.Label>
                  <Form.Control name="Pitch" type="text" placeholder="Enter Pitch"/>
                </Form.Group>
                <Button variant="primary" name="submit"
                        onClick={data => this.submit(data, fRef)}
                >
                  Submit
                </Button>
              </AutoForm>
            </Col>
            <Col></Col>
          </Row>
        </Container>
    );
  }
}

export default AddChallenge;
