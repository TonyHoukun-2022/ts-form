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
  const [emailOptOut, setEmailOptOut] = useState(false)

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
    emailOptOut,
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



  const changeField = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    let name = event.target.name
    let val = event.target.value
    if (val) {
      if (name === 'gender') {
        setGenderError('')
      }

      if (name === 'firstName') {
        setFirstNameError('')
      }

      if (name === 'lastName') {
        setLastNameError('')
      }

      if (name === 'accountName') {
        setAccountNameError('')
      }

      if (name === 'email') {
        if (!isEmail(val) && val !== '') {
          setEmailError('Please input valid email')
        } else {
          setEmailError('')
          setEmailErrorMsg('')
        }
      }

      if (name === 'emailOptOut') {
        setEmailOptOut(!emailOptOut)
      }

      if (name === 'streetNo') {
        setStreetNoError('')
      }
    }

    setFormData({
      ...formData,
      [name]: val
    })
  }

  const changePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //avoid typing non-digit
    const val = e.target.value.replace(/\D/g, '')
    //valid AU numbers
    if (val.length !== 10 && val !== '') {
      setPhoneError('phone number length must be 10 digits')
    } else {
      setPhoneError('')
      setPhoneErrorMsg('')
    }

    setFormData({
      ...formData,
      [e.target.name]: val
    })
  }

  const changeStateHandler = (e: any, newValue: string | null) => {
    if (newValue) {
      setStateError('')
    }
    setFormData({
      ...formData,
      state: newValue || ''
    })
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
      emailOptOut: false,
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
      setGenderError('Please select gender!');
      return;
    }

    if (!formData.firstName) {
      setFirstNameError('Please input First Name!');
      return;
    }

    if (!formData.lastName) {
      setLastNameError('Please input Last Name!');
      return;
    }

    if (!formData.accountName) {
      setAccountNameError('Please input Account Name!');
      return;
    }

    if (!formData.phone) {
      setPhoneError('please input phone number!');
      return;
    }

    if (phoneError) {
      return;
    }

    if (!formData.email) {
      setEmailError('Please input email!');
      return;
    }

    if (emailError) {
      return;
    }

    if (!formData.streetNo) {
      setStreetNoError('Please input Street No. & Street!');
      return;
    }

    if (!formData.city) {
      setCityError('Please input City!');
      return;
    }

    if (!formData.state) {
      setStateError('Please select state!');
      return;
    }

    if (!formData.postcode) {
      setStreetNoError('Please input Postcode!');
      return;
    }

    if (!formData.description) {
      setDescriptionError('Please input Description!');
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
                    name='gender'
                    value={formData.gender}
                    sx={{ ...inputStyleAutoWidth, '& fieldSet': { borderWidth: '1px', borderColor: genderError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    onChange={changeField}
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
                    name='firstName'
                    value={formData.firstName}
                    onChange={changeField}
                    sx={{ ...inputStyleAutoWidth, flex: '2', '& fieldSet': { borderWidth: '1px', borderColor: firstNameError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>Last Name</label>
                <div>
                  <OutlinedInput
                    name='lastName'
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: lastNameError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    value={formData.lastName}
                    onChange={changeField}
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
                    name='accountName'
                    value={formData.accountName}
                    onChange={changeField}
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: accountNameError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    placeholder="John's Joinery"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>Company Name(optional)</label>
                <div>
                  <OutlinedInput
                    name='companyName'
                    value={formData.companyName}
                    onChange={changeField}
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
                    name='phone'
                    label=""
                    value={formData.phone}
                    onChange={changePhoneHandler}
                    helperText={phoneErrorMsg}
                    sx={{
                      '& fieldSet':
                      {
                        borderWidth: '1px',
                        borderColor: phoneError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);'
                      }, display: 'block', '& p': { lineHeight: '1em', color: 'red' }, '& .MuiOutlinedInput-root': { width: '100%', height: '3.8em', fontSize: '0.8em' }, height: '3em', backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em'
                    }}
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
                    name='fax'
                    value={formData.fax}
                    onChange={changeField}
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
                    name='title'
                    value={formData.title}
                    onChange={changeField}
                    sx={inputStyleHaveWidth}
                    placeholder="Owner"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>Email</label>
                <div className="form-have-tips">
                  <TextField
                    name='email'
                    label=""
                    value={formData.email}
                    helperText={emailErrorMsg}
                    onChange={changeField}
                    sx={{
                      '& fieldSet':
                      {
                        borderWidth: '1px',
                        borderColor: emailError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);'
                      }, display: 'block', '& p': { lineHeight: '1em', color: 'red' }, '& .MuiOutlinedInput-root': { width: '100%', height: '3.8em', fontSize: '0.8em' }, height: '3em', backgroundColor: 'rgba(255,255,255,1)', width: '100%', fontSize: '0.8em'
                    }}
                    placeholder="sample@email.com"
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
                  name='emailOptOut'
                  value={formData.emailOptOut}
                  onChange={changeField}
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
                    name='streetNo'
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: streetNoError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    value={formData.streetNo}
                    onChange={changeField}
                    placeholder="1, Elizabeth Street"
                  />
                </div>
              </div>
              <div className="form-half">
                <label>City</label>
                <div>
                  <OutlinedInput
                    name='city'
                    sx={{ ...inputStyleHaveWidth, '& fieldSet': { borderWidth: '1px', borderColor: cityError ? 'rgba(255,0,0,0.8) !important' : 'rgba(0, 0, 0, 0.23);' } }}
                    value={formData.city}
                    onChange={changeField}
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
                    onChange={changeStateHandler}
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
                    // onChange={changePostcode}
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
                    // onChange={changeDescription}
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
                  {formData.emailOptOut}
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
