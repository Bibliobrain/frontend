import React, { useState } from "react";
import styled from "styled-components";
import {
  FormGroup,
  Label,
  Input,
  Title,
  FormGroupRow,
  InputContainer,
  Button,
} from "../components/Form/Form.styles";
import { PanelContainer, Panel } from "../components/Register/Register.styles";
import LoanService from "../requests/LoanService";

const Container = styled.div`
  /* display: flex; */
  /* padding: 50px; */
  /* background-color:red; */
  border-radius: 5px;
  width: 90%;
  height: 90%;
  /* flex-direction: column; */
`;

export const Loan = () => {
  const [active, setActive] = useState(1);
  const [memberId, setMemberId] = useState(1);
  const [copyId, setCopyId] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [condition, setCondition] = useState("");

  const createLoan = (e) => {
    e.preventDefault();
    LoanService.loan(copyId, memberId)
      .then((x) => {
        console.log(x);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const returnLoan = async (e) => {
    e.preventDefault();
    try {
      const res = await LoanService.return(
        copyId,
        memberId,
        condition,
        borrowDate
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <SwichBar setActive={setActive} active={active} />
      {active === 1 ? (
        <PanelContainer onSubmit={createLoan}>
          <Panel>
            <Title>Loan a book</Title>
            <FormGroup>
              <FormGroupRow>
                <InputContainer>
                  <Label htmlFor="fname">Member ID</Label>
                  <Input
                    id="fname"
                    type="text"
                    name="fname"
                    placeholder="Enter Member ID"
                    onChange={(e) => setMemberId(e.target.value)}
                  />
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="fname">Copy ID</Label>
                  <Input
                    id="fname"
                    type="number"
                    name="fname"
                    placeholder="Enter Copy ID"
                    onChange={(e) => setCopyId(e.target.value)}
                  />
                </InputContainer>
              </FormGroupRow>
            </FormGroup>
            <Button type="submit" bsStyle="primary">
              Create loan
            </Button>
          </Panel>
        </PanelContainer>
      ) : (
        <PanelContainer onSubmit={returnLoan}>
          <Panel>
            <Title>Return a book</Title>
            <FormGroup>
              <FormGroupRow>
                <InputContainer>
                  <Label htmlFor="fname">Member ID</Label>
                  <Input
                    id="fname"
                    type="text"
                    name="fname"
                    placeholder="Enter member ID"
                    onChange={(e) => setMemberId(e.target.value)}
                  />
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="fname">Copy ID</Label>
                  <Input
                    id="fname"
                    type="number"
                    name="fname"
                    placeholder="Enter copy ID"
                    onChange={(e) => setCopyId(e.target.value)}
                  />
                </InputContainer>
              </FormGroupRow>
              <FormGroupRow>
                <InputContainer>
                  <Label htmlFor="fname">Borrow date</Label>
                  <Input
                    id="fname"
                    type="text"
                    name="fname"
                    placeholder="Enter borrow date"
                    onChange={(e) => setBorrowDate(e.target.value)}
                  />
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="fname">Book condition</Label>
                  <Input
                    id="fname"
                    type="text"
                    name="fname"
                    placeholder="Enter book condition"
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </InputContainer>
              </FormGroupRow>
            </FormGroup>
            <Button type="submit" bsStyle="primary">
              Return
            </Button>
          </Panel>
        </PanelContainer>
      )}
    </Container>
  );
};

const SwichBar = (props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        direction: "flex-row",
        height: 50,
        marginBottom: 20,
      }}
    >
      <div
        className="hover-opacity"
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: props.active === 1 ? "#0e333e" : "#E6E6E6",
          color: props.active === 1 ? "white" : "#0e333e",
        }}
        onClick={() => {
          props.setActive(1);
        }}
      >
        Loan
      </div>
      <div
        className="hover-opacity"
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: props.active !== 1 ? "#0e333e" : "#E6E6E6",
          color: props.active !== 1 ? "white" : "#0e333e",
        }}
        onClick={() => {
          props.setActive(2);
        }}
      >
        Return
      </div>
    </div>
  );
};
