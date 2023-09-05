import React from 'react';
// import { Grid, Segment, Header } from 'semantic-ui-react';
// import { AutoForm, AutoField, ErrorsField } from 'meteor/aldeed:autoform';
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

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      submissionDetail: '',
      pitch: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  submit() {
    const { title, description, submissionDetail, pitch } = this.state;
    const definitionData = { title, description, submissionDetail, pitch };
    const collectionName = Challenges.getCollectionName();
    console.log(definitionData);
    defineMethod.call({ collectionName: collectionName, definitionData: definitionData },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // console.error(error.message);
          } else {
            swal('Success', 'Item added successfully', 'success');
            this.setState({
              title: '',
              description: '',
              submissionDetail: '',
              pitch: '',
            });
            // console.log('Success');
          }
        });
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
              <Form ref={ref => {
                fRef = ref;
              }} schema={formSchema}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                      name="title"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      placeholder="Enter Title"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      name="description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      placeholder="Enter Description"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="submissionDetail">
                  <Form.Label>Submission Detail</Form.Label>
                  <Form.Control
                      name="submissionDetail"
                      type="text"
                      value={this.state.submissionDetail}
                      onChange={this.handleInputChange}
                      placeholder="Enter Submission Detail"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pitch">
                  <Form.Label>Pitch</Form.Label>
                  <Form.Control
                      name="pitch"
                      type="text"
                      value={this.state.pitch}
                      onChange={this.handleInputChange}
                      placeholder="Enter Pitch"/>
                </Form.Group>
                <Button variant="primary" name="submit"
                        onClick={data => this.submit(data, fRef)}>
                  Submit
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
    );
  }
}

export default AddChallenge;
