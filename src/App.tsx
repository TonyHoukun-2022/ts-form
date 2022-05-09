import React, { useEffect, useState } from "react";
import logo from './lg.png';
import './App.css';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const inputStyleAutoWidth = { height: '3em', backgroundColor: 'rgba(255,255,255,1)', fontSize: '0.8em' }
const inputStyleHaveWidth = { height: '3em', backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em' }
const inputStyleNoHeight = { backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em' }
const errorOutlineIconStyle = { color: 'red', fontSize: '1em' };
const stateOptions = ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"]
const isEmail = (str: string): boolean => {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(str);
}

function App() {
  const [formData, setFormData] = useState({
    gender: '',
    firstName: '',
    lastName: '',
    accountName: '',
    companyName: '',
    phone: '',
    fax: '',
    title: '',
    email: '',
    emailOptOut: "no",
    streetNo: '',
    city: '',
    state: '',
    postcode: '',
    description: '',
  });
  const [phoneError, setPhoneError] = useState('')
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('')

  const [emailError, setEmailError] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')

  const [postCodeError, setPostCodeError] = useState('')
  const [postCodeErrorMsg, setPostCodeErrorMsg] = useState('')

  const [genderError, setGenderError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [accountNameError, setAccountNameError] = useState('')

  const [streetNoError, setStreetNoError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  const changeFiled = (fieldName: string, value: string) => {
    //change variables in state, force app to rerender when change Field
    const newFormData = JSON.parse(JSON.stringify(formData));
    type formDataKeyType = keyof typeof newFormData;
    let fieldNameKey = fieldName as formDataKeyType
    newFormData[fieldNameKey] = value;
    setFormData(newFormData)
  }
  const changeGender = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value) {
      setGenderError('')
    }
    changeFiled("gender", value)
  }
  const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setFirstNameError('')
    }
    changeFiled("firstName", value)
  }
  const changeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setLastNameError('')
    }
    changeFiled("lastName", value)
  }
  const changeAccountName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setAccountNameError('')
    }
    changeFiled("accountName", event.target.value)
  }
  const changeCompanyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFiled("companyName", event.target.value)
  }
  const changePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length !== 10 && value !== '') {
      setPhoneError('phone length must be 10!')
    } else {
      setPhoneError('')
      setPhoneErrorMsg('')
    }
    changeFiled("phone", value)
  }
  const changeFax = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFiled("fax", event.target.value)
  }
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFiled("title", event.target.value)
  }
  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isEmail(value) && value !== '') {
      setEmailError("pls input correct email")
    } else {
      setEmailError('')
      setEmailErrorMsg('')
    }
    changeFiled("email", value)
  }
  const emailOptOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      changeFiled("emailOptOut", 'yes')
    } else {
      changeFiled("emailOptOut", 'no')
    }
  }
  const changeStreetNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setStreetNoError('')
    }
    changeFiled("streetNo", event.target.value)
  }
  const changeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setCityError('')
    }
    changeFiled("city", event.target.value)
  }
  const changeState = (event: any, newValue: string | null) => {
    const value = newValue;
    if (value) {
      setStateError('')
    }
    changeFiled("state", value ? value : '')
  }
  const changePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    //matches all non digit character
    const value = event.target.value.replace(/\D/g, '');
    if (value.length !== 4 && value !== '') {
      setPostCodeError('post code length must be 4!')
    } else {
      setPostCodeError('')
      setPostCodeErrorMsg('')
    }
    changeFiled("postcode", value)
  }
  const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setDescriptionError('')
    }
    changeFiled("description", value)
  }
  const handDialog = () => {
    setOpenDialog(false)
  }
  const resetForm = () => {
    setFormData({
      gender: '',
      firstName: '',
      lastName: '',
      accountName: '',
      companyName: '',
      phone: '',
      fax: '',
      title: '',
      email: '',
      emailOptOut: "no",
      streetNo: '',
      city: '',
      state: '',
      postcode: '',
      description: '',
    });
    setPhoneError('')
    setPhoneErrorMsg('')
  }
  const doSave = () => {
    if (!formData.gender) {
      setGenderError('pls select gender!');
      return;
    }
    if (!formData.firstName) {
      setFirstNameError('pls input First Name!');
      return;
    }
    if (!formData.lastName) {
      setLastNameError('pls input Last Name!');
      return;
    }

    if (!formData.accountName) {
      setAccountNameError('pls input Account Name!');
      return;
    }

    if (!formData.phone) {
      setPhoneError('pls input phone!');
      return;
    }

    if (phoneError) {
      return;
    }

    if (!formData.email) {
      setEmailError('pls input email!');
      return;
    }

    if (emailError) {
      return;
    }

    if (!formData.streetNo) {
      setStreetNoError('pls input Street No. & Street!');
      return;
    }

    if (!formData.city) {
      setCityError('pls input City!');
      return;
    }

    if (!formData.state) {
      setStateError('pls select state!');
      return;
    }

    if (!formData.postcode) {
      setStreetNoError('pls input Postcode!');
      return;
    }

    if (!formData.description) {
      setDescriptionError('pls input Description!');
      return;
    }

    if (postCodeError) {
      return;
    }

    setOpenDialog(true)
  }
  return (
    <div className="myapp">
      <header className="header">
        <div className="header-logo"><img src={logo} className="logo" alt="logo" /></div>
        <section className="header-op">
          <div className="header-op-title">
            <h3>Create Contact</h3>
          </div>
          <div className="header-op-btns">
            <button className="cancel-btn btn"
              onClick={() => {
                resetForm()
              }}
            >Cancel</button>
            <button
              onClick={() => {
                doSave()
              }}
              className="save-btn btn">Save</button>
          </div>
        </section>
      </header>
      <main className="mainform">
        <form id="contact-form">
          <section>
            <div>
              <p>Contact Information</p>
            </div>
            <div className="form-row">
              <div className="form-half">
                <label>First Name</label>
                <div className="form-flex">
                  <Select
                    value={formData.gender}
                    sx={{ ...inputStyleAutoWidth, '& fieldSet': { borderWidth: '1px', borderColor: genderError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    onChange={changeGender}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      <em style={{ color: 'rgba(206,206,206,1.0)' }}>-None</em>
                    </MenuItem>
                    <MenuItem value={"Mr"}>Mr</MenuItem>
                    <MenuItem value={"Mrs"}>Mrs</MenuItem>
                  </Select>
                  <OutlinedInput
                    value={formData.firstName}
                    onChange={changeFirstName}
                    sx={{ ...inputStyleAutoWidth, flex: '2', '& fieldSet': { borderWidth: '1px', borderColor: firstNameError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>Last Name</label>
                <div>
                  <OutlinedInput
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: lastNameError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    value={formData.lastName}
                    onChange={changeLastName}
                    placeholder="Smith"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-half">
                <label>Account Name</label>
                <div>
                  <OutlinedInput
                    value={formData.accountName}
                    onChange={changeAccountName}
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: accountNameError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    placeholder="John's Joinery"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>Company Name(optional)</label>
                <div>
                  <OutlinedInput
                    value={formData.companyName}
                    onChange={changeCompanyName}
                    sx={inputStyleHaveWidth}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-half">
                <label>Phone</label>
                <div className="form-have-tips">
                  <TextField
                    label=""
                    value={formData.phone}
                    onChange={changePhone}
                    helperText={phoneErrorMsg}
                    sx={{ '& fieldSet': { borderWidth: '1px', borderColor: phoneError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' }, display: 'block', '& p': { lineHeight: '1em', color: 'red' }, '& .MuiOutlinedInput-root': { width: '100%', height: '3.8em', fontSize: '0.8em' }, height: '3em', backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em' }}
                    placeholder="02 123 456 78"
                    variant="outlined"
                    size="small"
                  />
                  {
                    phoneError ?
                      <div className="error-show-div">
                        <InputAdornment position="start">
                          <ErrorOutlineIcon
                            onClick={() => {
                              setPhoneErrorMsg(phoneError)
                            }}
                            sx={errorOutlineIconStyle} />
                        </InputAdornment>
                      </div> : null
                  }

                </div>
              </div>
              <div className="form-half">
                <label>Fax(optional)</label>
                <div>
                  <OutlinedInput
                    value={formData.fax}
                    onChange={changeFax}
                    sx={inputStyleHaveWidth}
                    placeholder="John's Joinery"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-half">
                <label>Title(optional)</label>
                <div>
                  <OutlinedInput
                    value={formData.title}
                    onChange={changeTitle}
                    sx={inputStyleHaveWidth}
                    placeholder="Owner"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>Email</label>
                <div className="form-have-tips">
                  <TextField
                    label=""
                    value={formData.email}
                    helperText={emailErrorMsg}
                    onChange={changeEmail}
                    sx={{ '& fieldSet': { borderWidth: '1px', borderColor: emailError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' }, display: 'block', '& p': { lineHeight: '1em', color: 'red' }, '& .MuiOutlinedInput-root': { width: '100%', height: '3.8em', fontSize: '0.8em' }, height: '3em', backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em' }}
                    placeholder="samle@email.com"
                  />
                  {
                    emailError ?
                      <div className="error-show-div">
                        <InputAdornment position="start">
                          <ErrorOutlineIcon
                            onClick={() => {
                              setEmailErrorMsg(emailError)
                            }}
                            sx={errorOutlineIconStyle} />
                        </InputAdornment>
                      </div> : null
                  }
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-half show-flex">
                <label className="inline">Email Opt Out</label>
                <Checkbox
                  value={formData.emailOptOut == 'yes' ? true : false}
                  onChange={emailOptOutChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>

          </section>

          <section>
            <div>
              <p>Address Information</p>
            </div>
            <div className="form-row">
              <div className="form-half">
                <label>Street No. & Street</label>
                <div>
                  <OutlinedInput
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: streetNoError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    value={formData.streetNo}
                    onChange={changeStreetNo}
                    placeholder="1, Elizabeth Street"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>City</label>
                <div>
                  <OutlinedInput
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: cityError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    value={formData.city}
                    onChange={changeCity}
                    placeholder="Sydney"
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-half">
                <label>State</label>
                <div>
                  <Autocomplete
                    value={formData.state}
                    sx={{ '& .MuiAutocomplete-endAdornment': { top: '0' }, '& .MuiOutlinedInput-root': { width: '100%', height: '3.8em', paddingTop: '0', paddingBottom: '0', lineHeight: '3.8em', fontSize: '0.8em' }, height: '3em', backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em' }}
                    onChange={changeState}
                    options={stateOptions}
                    renderInput={(params) => <TextField sx={{ '& fieldSet': { borderWidth: '1px', borderColor: stateError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }} placeholder="New South Wales" {...params} />}
                  />
                </div>
              </div>
              <div className="form-half">
                <label>Postcode</label>
                <div className="form-have-tips">
                  <TextField
                    label=""
                    helperText={postCodeErrorMsg}
                    sx={{ '& fieldSet': { borderWidth: '1px', borderColor: postCodeError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' }, display: 'block', '& p': { lineHeight: '1em', color: 'red' }, '& .MuiOutlinedInput-root': { width: '100%', height: '3.8em', fontSize: '0.8em' }, height: '3em', backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em' }}
                    value={formData.postcode}
                    onChange={changePostcode}
                    placeholder="2000"
                  />
                  {
                    postCodeError ?
                      <div className="error-show-div">
                        <InputAdornment position="start">
                          <ErrorOutlineIcon
                            onClick={() => {
                              setPostCodeErrorMsg(postCodeError)
                            }}
                            sx={errorOutlineIconStyle} />
                        </InputAdornment>
                      </div> : null
                  }
                </div>
              </div>
            </div>
          </section>

          <section>
            <div>
              <p>Description Information</p>
            </div>
            <div className="form-row">
              <div className="full-show">
                <label>Description</label>
                <div>
                  <OutlinedInput
                    multiline
                    value={formData.description}
                    rows={4}
                    onChange={changeDescription}
                    sx={{ ...inputStyleNoHeight, '& fieldSet': { borderWidth: '1px', borderColor: descriptionError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </section>
        </form>
      </main>

      <Dialog sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: '800px' } }} disableEscapeKeyDown open={openDialog} onClose={handDialog} >
        <DialogTitle sx={{ display: 'flex' }}>Saved <CheckIcon sx={{ color: 'rgba(24,217,136,1)', marginLeft: '0.8em' }} /></DialogTitle>
        <DialogContent sx={{ position: 'relative' }}>
          <div className="dialogCloseIcon">
            <ClearIcon
              onClick={handDialog}
            />
          </div>
          <section className="show-text-section">
            <div>
              <p>Contact Information</p>
            </div>
            <div className="row-text">
              <div className="row-text-half">
                <label>First Name</label>
                <div>
                  {formData.firstName}
                </div>
              </div>
              <div className="row-text-half">
                <label>Last Name</label>
                <div>
                  {formData.lastName}
                </div>
              </div>
            </div>

            <div className="row-text">
              <div className="row-text-half">
                <label>Account Name</label>
                <div>
                  {formData.accountName}
                </div>
              </div>
              <div className="row-text-half">
                <label>Company Name</label>
                <div>
                  {formData.companyName}
                </div>
              </div>
            </div>

            <div className="row-text">
              <div className="row-text-half">
                <label>Phone</label>
                <div>
                  {formData.phone}
                </div>
              </div>
              <div className="row-text-half">
                <label>Fax</label>
                <div>
                  {formData.fax}
                </div>
              </div>
            </div>

            <div className="row-text">
              <div className="row-text-half">
                <label>Title</label>
                <div>
                  {formData.title}
                </div>
              </div>
              <div className="row-text-half">
                <label>Email</label>
                <div>
                  {formData.email}
                </div>
              </div>
            </div>

            <div className="row-text">
              <div className="row-text-half">
                <label>Email Opt Out</label>
                <div>
                  {formData.emailOptOut == 'yes' ? 'yes' : ''}
                </div>
              </div>
            </div>
          </section>
          <section className="show-text-section">
            <div>
              <p>Address Information</p>
            </div>
            <div className="row-text">
              <div className="row-text-half">
                <label>Street No. & Street</label>
                <div>
                  {formData.streetNo}
                </div>
              </div>
              <div className="row-text-half">
                <label>City</label>
                <div>
                  {formData.city}
                </div>
              </div>
            </div>
            <div className="row-text">
              <div className="row-text-half">
                <label>State</label>
                <div>
                  {formData.state}
                </div>
              </div>
              <div className="row-text-half">
                <label>Postcode</label>
                <div>
                  {formData.postcode}
                </div>
              </div>
            </div>
          </section>
          <section className="show-text-section">
            <div>
              <p>Description Information</p>
            </div>
            <div className="row-text">
              <div className="row-text-full">
                <label>Description</label>
                <div>{formData.description}</div>
              </div>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
