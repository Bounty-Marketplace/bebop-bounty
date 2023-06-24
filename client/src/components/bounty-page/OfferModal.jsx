import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {
  StyledListBountyContainer,
  StyledListBountyOverlay,
  StyledListBountyBody,
  StyledListBountyContentContainer,
  StyledSubmitListBounty,
  StyledListBountyCloseBtn,
  StyledListBountyTitleInput,
  StyledListBountyTitle,
  StyledListBountyContent,
} from '../common/nav-bar/navbar.styled';
import { GlobalContext } from '../GlobalContext.jsx';

export default function ListBountyModal({ showOfferModal, setOfferModal, Bounty }) {
  const { userData } = useContext(GlobalContext);
  const [id, setID] = useState(userData.id);

  const initialValues = {
    bountyID: Bounty.id,
    sellerID: id,
    description: '',
    city: '',
    state: '',
    condition: '',
    image: Bounty.image,
    offerAmount: '',
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getImageURL = (e) => {
    const uploadedFile = e.target.files[0];
    if (/([^\s]+(\.(jpe?g|png)))/.test(uploadedFile.name) && uploadedFile.size < 10485760) {
      const form = new FormData();
      form.append('file', uploadedFile);
      axios
        .post('https://api.cloudinary.com/v1_1/dlbnwlpoq/image/upload', form, {
          params: {
            upload_preset: 'ulaqsdpl',
          },
        })
        .then(({ data }) => {
          console.log('data.secure', data.secure_url);
          setFormValues({ ...formValues, image: data.secure_url });
        })
        .catch((err) => console.error(err));
    }
  };

  const submitOffer = async () => {
    showOfferModal();
    console.log('Bounty>>>>', Bounty);

    console.log('Form Values', formValues);
    try {
      const response = await axios.post('/api/offers', formValues);
      console.log('Offer submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  return (
    <StyledListBountyContainer>
      <StyledListBountyOverlay onClick={showOfferModal} />
      <StyledListBountyBody>
        <StyledListBountyCloseBtn type="button" onClick={showOfferModal}>
          X
        </StyledListBountyCloseBtn>
        <h2>Offer</h2>
        <StyledListBountyContentContainer>
          <StyledListBountyContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              Description:{' '}
              <textarea
                type="text"
                name="description"
                rows="5"
                cols="40"
                placeholder="Describe the item you are providing"
                value={formValues.description}
                onChange={handleChange}
              />
            </div>
            <div>
              City
              <input
                style={{ width: '70%' }}
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleChange}
              />
            </div>
            <div>
              State
              <input
                style={{ width: '70%' }}
                type="text"
                name="state"
                value={formValues.state}
                onChange={handleChange}
              />
            </div>
            <select name="condition" value={formValues.condition} onChange={handleChange}>
              <option>-- Condition --</option>
              <option>new</option>
              <option>like new</option>
              <option>good</option>
              <option>fair</option>
              <option>poor</option>
            </select>
            <div>
              Upload An Image{' '}
              <input
                style={{ borderBottom: 'none' }}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="image"
                onChange={(e) => getImageURL(e)}
              />
            </div>
            <div>
              Requested Amount:
              <input
                style={{ width: '55%' }}
                type="text"
                name="offerAmount"
                value={formValues.offer_amount}
                onChange={handleChange}
              />
            </div>
          </StyledListBountyContent>
        </StyledListBountyContentContainer>
        <StyledSubmitListBounty className="list-bounty-btn" onClick={submitOffer} type="button">
          List Offer
        </StyledSubmitListBounty>
      </StyledListBountyBody>
    </StyledListBountyContainer>
  );
}
