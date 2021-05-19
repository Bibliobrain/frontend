import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Input } from '../components/Form/Form.styles';

import styled from 'styled-components'

import BookService from '../requests/BookService'

const Container = styled.div`
border-radius:5px;
width:90%;
height:90%;
`;

export const Catalog = () => {
    const [page, setPage] = useState(1)
    const [books, setBooks] = useState([])
    const [pagination, setPagination] = useState([])
    const [formData, setFormData] = useState({
        bindingType: 'All bindings',
        language: 'All languages',
        edition: 'All editions',
        subject: 'All subjects'
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.text || target.value;
        const name = target.name;

        let _formData = { ...formData }
        _formData[name] = value;
        setPage(1)
        setFormData(_formData)
    }

    useEffect(() => {
        if (page >= 1) {
            let params = { ...formData }
            for (const [key, value] of Object.entries(params)) {
                if (value.includes('All')) {
                    delete params[key]
                }
            }
            if (page > 1) { params.page = page }

            BookService.filter(params).then(x => {
                setBooks(x.payload.data)
                let pag = x.payload.pagination;
                if (page > 1) {
                    let newPagination = { ...pagination }
                    newPagination.perPage = pag.perPage
                    newPagination.currentPage = pag.currentPage
                    newPagination.from = pag.from
                    newPagination.to = pag.to
                    setPagination(newPagination)
                } else {
                    setPagination(pag)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [page, formData])

    const bindingTypes = [
        'All binding',
        'Binding',
        'Hardcover',
        'Softcover',
        'Spiral Binding',
        'Wire Binding',
    ]

    const languages = [
        'All languages',
        'english',
        'spanish',
        'chinese'
    ]

    const editions = [
        'All editions',
        'First edition',
        'Fourth edition',
        'Second edition',
        'Third edition'
    ]

    const subjects = [
        'All subjects',
        'Biography',
        'Business/Finance',
        'Children’s',
        'Comic book',
        'Cookbook'
    ]

    return (
        <Container>
            <Row>
                <h3 style={{ color: '#0e333e' }}>GTL Books Catalog</h3>
            </Row>
            <Row style={{ padding: 10, marginBottom: 10, display: 'flex', alignItems: 'center', borderRadius: 5, border: '1px solid #0e333e' }}>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' name='bindingType' id="bindingType" title={formData.bindingType} size="md" variant="secondary" >
                        <Dropdown.Divider />
                        {bindingTypes.map(x => { return <Dropdown.Item name='bindingType' id={x} eventKey={x} onClick={(e) => handleInputChange(e)}>{x}</Dropdown.Item>; })}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' name='language' id="language" title={formData.language} size="md" variant="secondary">
                        <Dropdown.Divider />
                        {languages.map(x => { return <Dropdown.Item name='language' id={x} eventKey={x} onClick={(e) => handleInputChange(e)}>{x}</Dropdown.Item>; })}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' name='edition' id="edition" title={formData.edition} size="md" variant="secondary">
                        <Dropdown.Divider />
                        {editions.map(x => { return <Dropdown.Item name='edition' id={x} eventKey={x} onClick={(e) => handleInputChange(e)}>{x}</Dropdown.Item>; })}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton bsPrefix='dropdown-120' name='subject' id="subject" title={formData.subject} size="md" variant="secondary">
                        <Dropdown.Divider />
                        {subjects.map(x => { return <Dropdown.Item name='subject' id={x} eventKey={x} onClick={(e) => handleInputChange(e)}>{x}</Dropdown.Item>; })}
                    </DropdownButton>
                </Col>
                <Col>
                    <Input id="lname" type="text" name="lname" text={formData.lname} placeholder="Filter authors name" onChange={handleInputChange} />
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
                        {books.map(book => {
                            return (<tr>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.edition}</td>
                                <td>{book.language}</td>
                                <td>{book.bindingType}</td>
                                <td>{book.authors.map(author => { return (<p>{author}</p>) })}</td>
                                <td>{book.subjects.map(subject => { return (<p>{subject}</p>) })}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Row>
            <Row style={{ paddingBottom: 20, justifyContent: 'flex-end' }}>
                <p>{pagination.currentPage}/{pagination.lastPage} page ({pagination.to}/{pagination.total})</p>
                {pagination.lastPage === page ? null : <p style={{ cursor: 'pointer', fontWeight: 'bold', paddingLeft: 10 }} onClick={() => setPage(page + 1)}>Next</p>}
            </Row>
        </Container>
    )
}