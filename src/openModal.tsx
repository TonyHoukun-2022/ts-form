import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface ModalProps {
    handleDialog: () => void
    openDialog: boolean
    formData: any
}

const OpenModal: React.FC<ModalProps> = ({ handleDialog, openDialog, formData }) => {
    return (
        <Dialog sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: '800px' } }} disableEscapeKeyDown open={openDialog} onClose={handleDialog} >
            <DialogTitle sx={{ display: 'flex' }}>Saved <CheckIcon sx={{ color: 'rgba(24,217,136,1)', marginLeft: '0.8em' }} /></DialogTitle>
            <DialogContent sx={{ position: 'relative' }}>
                <div className="dialogCloseIcon">
                    <ClearIcon
                        onClick={handleDialog}
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
                                {formData.emailOptOut ? 'yes' : 'no'}
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
    )
}

export default OpenModal
