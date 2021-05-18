import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from "react-bootstrap/Form";

import styled from 'styled-components'
import bookJson from './catalogTest.json'

import BookService from '../requests/BookService'

//TODO solve multiple authors and subjects display

const Container = styled.div`
/* display: flex; */
/* padding: 50px; */
/* background-color:red; */
border-radius:5px;
width:90%;
height:90%;
/* flex-direction: column; */
`;

export const Catalog = () => {
    const [page, setPage] = useState(1)
    const [binding, setBinding] = useState('All bindings')
    const [edition, setEdition] = useState('All editions')
    const [language, setLanguage] = useState('All languages')
    const [lname, setLname] = useState('')
    const [subject, setSubject] = useState('All subjects')

    // useEffect(() =>{
    //     BookService.filter(page, 'spanish', 'Binding').then(x=>{
    //         console.log(x)
    //     }).catch(err =>{
    //         console.log(err)
    //     })
    // },[page])

    useEffect(() => {
        console.log(page)
    }, [page])

    const handleBindingDropdown = (value) => {
        setBinding(value)
    }

    const handleLanguageDropdown = (value) => {
        setLanguage(value)
    }

    const handleEditionDropdown = (value) => {
        setEdition(value)
    }

    const handleSubjectDropdown = (value) => {
        setSubject(value)
    }

    return (
        <Container>
            <Row>
                <h3 style={{ color: '#0e333e' }}>GTL Books Catalog</h3>
            </Row>
            <Row style={{ padding: 10, marginBottom: 10, display: 'flex', alignItems: 'center', borderRadius: 20, border: '2px solid #0e333e' }}>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' title={binding} size="md" variant="secondary" onSelect={handleBindingDropdown}>
                        <Dropdown.Item eventKey='All bindings' value='value'>All bindings</Dropdown.Item>
                        <Dropdown.Divider />
                        {/* {bindings.map(x => { return <Dropdown.Item key={x.id} eventKey={x.id}>{x.name}</Dropdown.Item>; })} */}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' title={language} size="md" variant="secondary" onSelect={handleLanguageDropdown}>
                        <Dropdown.Item eventKey='All languages' value='value'>All languages</Dropdown.Item>
                        <Dropdown.Divider />
                        {/* {bindings.map(x => { return <Dropdown.Item key={x.id} eventKey={x.id}>{x.name}</Dropdown.Item>; })} */}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' title={edition} size="md" variant="secondary" onSelect={handleEditionDropdown}>
                        <Dropdown.Item eventKey='All editions' value='value'>All editions</Dropdown.Item>
                        <Dropdown.Divider />
                        {/* {bindings.map(x => { return <Dropdown.Item key={x.id} eventKey={x.id}>{x.name}</Dropdown.Item>; })} */}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' title={subject} size="md" variant="secondary" onSelect={handleSubjectDropdown}>
                        <Dropdown.Item eventKey='All subjects' value='value'>All subjects</Dropdown.Item>
                        <Dropdown.Divider />
                        {/* {bindings.map(x => { return <Dropdown.Item key={x.id} eventKey={x.id}>{x.name}</Dropdown.Item>; })} */}
                    </DropdownButton>
                </Col>
                <Col>
                    <Form>
                        {/* <Form.Label>Author</Form.Label> */}
                        <Form.Control type='text' onChange={(e) => { setLname(e.target.value) }} value={lname} placeholder="Author" style={{ backgroundColor: '#F7FAFC', boxShadow: '0px 2px 4px #1717172E', height: 50 }} />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ color: '#0e333e' }}>ISBN</th>
                            <th style={{ color: '#0e333e' }}>Title</th>
                            <th style={{ color: '#0e333e' }}>Description</th>
                            <th style={{ color: '#0e333e' }}>Edition</th>
                            <th style={{ color: '#0e333e' }}>Language</th>
                            <th style={{ color: '#0e333e' }}>Binding</th>
                            <th style={{ color: '#0e333e' }}>Authors</th>
                            <th style={{ color: '#0e333e' }}>Subjects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookJson.payload.data.map(book => {
                            return (<tr>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.edition}</td>
                                <td>{book.language}</td>
                                <td>{book.bindingType}</td>
                                <td>{book.authors}</td>
                                <td>{book.subjects}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Row>
            <Row style={{ paddingBottom: 20, justifyContent: 'flex-end' }}>
                <p>{bookJson.payload.pagination.currentPage}/{bookJson.payload.pagination.lastPage} page ({bookJson.payload.pagination.to}/{bookJson.payload.pagination.total})</p>
                {bookJson.payload.pagination.lastPage === page ? null : <p style={{ cursor: 'pointer', fontWeight: 'bold', paddingLeft: 10 }} onClick={() => setPage(page + 1)}>Next</p>}
            </Row>
        </Container>
    )
}