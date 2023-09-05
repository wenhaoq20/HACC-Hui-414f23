import React, { useState } from 'react';
import swal from 'sweetalert';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, Col, Container, Row } from 'react-bootstrap';
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
const AddChallenge = () => {
  const [challenge, setChallenge] = useState({
    title: '', description: '', submissionDetail: '', pitch: '', invalidFields: [],
  });

  // eslint-disable-next-line no-unused-vars
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChallenge({ [name]: value });
  };
  const validateFields = () => {
    const fieldsToValidate = ['title', 'description', 'submissionDetail', 'pitch'];
    const fields = ['Title', 'Description', 'Submission Detail', 'Pitch'];
    const invalidFields = [];
    let i = 0;
    fieldsToValidate.forEach((fieldName) => {
      const fieldValue = challenge[fieldName].trim();
      if (!fieldValue) {
        invalidFields.push(fields[i]);
      }
      i++;
    });

    return invalidFields;
  };

  /** On submit, insert the data.
   */
  const submit = () => {
    const invalidFields = validateFields();
    if (invalidFields.length > 0) {
      setChallenge({ invalidFields });
    } else {
      const { title, description, submissionDetail, pitch } = challenge;
      const definitionData = { title, description, submissionDetail, pitch };
      const collectionName = Challenges.getCollectionName();
      defineMethod.call({ collectionName: collectionName, definitionData: definitionData },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
              // console.error(error.message);
            } else {
              swal('Success', 'Item added successfully', 'success');
              setChallenge({
                title: '',
                description: '',
                submissionDetail: '',
                pitch: '',
                invalidFields: [],
              });
              // console.log('Success');
            }
          });
    }
  };

  let fRef = null;
  const formSchema = new SimpleSchema2Bridge(schema);
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
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
                      value={challenge.title}
                      onChange={handleInputChange}
                      placeholder="Enter Title"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      name="description"
                      type="text"
                      value={challenge.description}
                      onChange={handleInputChange}
                      placeholder="Enter Description"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="submissionDetail">
                  <Form.Label>Submission Detail</Form.Label>
                  <Form.Control
                      name="submissionDetail"
                      type="text"
                      value={challenge.submissionDetail}
                      onChange={handleInputChange}
                      placeholder="Enter Submission Detail"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pitch">
                  <Form.Label>Pitch</Form.Label>
                  <Form.Control
                      name="pitch"
                      type="text"
                      value={challenge.pitch}
                      onChange={handleInputChange}
                      placeholder="Enter Pitch"/>
                </Form.Group>
                <Button variant="primary" name="submit"
                        onClick={data => submit(data, fRef)}>
                  Submit
                </Button>
                {challenge.invalidFields.length > 0 && (
                    <Alert name="invalidAlert" variant="danger">
                      The following fields require input: {challenge.invalidFields.join(', ')}
                    </Alert>
                )}
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
  );
};

export default AddChallenge;
