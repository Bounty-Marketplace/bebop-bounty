import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  StyledListBountyContainer,
  StyledListBountyOverlay,
  StyledListBountyBody,
  StyledListBountyContentContainer,
  StyledSubmitListBounty,
  StyledListBountyCloseBtn,
  StyledListBountyContent,
} from '../common/nav-bar/navbar.styled';

export default function ListBountyModal({ showOfferModal, bounty }) {
  const { id: userID, profile: userProfile } = useSelector((state) => state.user);

  const initialValues = {
    bountyID: bounty.id,
    sellerID: userID,
    description: '',
    city: '',
    state: '',
    condition: '',
    image: bounty.image,
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

  const submitOffer = async (e) => {
    e.preventDefault();
    showOfferModal();
    try {
      const response1 = await axios.post('http://13.57.207.155:8080/api/offers', formValues);
      console.log('Offer submitted successfully:', response1.data);
      const response = await axios.get(
        `http://13.57.207.155:8080/api/users/${bounty.buyer_id}?auth=false`
      );
      const { email } = response.data[0];
      const data = {
        userEmail: email,
        subject: `Someone just made an offer of your bouny!`,
        message: `
        <h1>Hey ${bounty.buyer_name},</h1>
        <h2>${userProfile.username} just made an offer of your bounty "${bounty.name}".</h2>
        <p>Offer description: ${formValues.description}</p>
        <p>Offer state: ${formValues.state}</p>
        <p>Offer city: ${formValues.city}</p>
        <p>Offer condition: ${formValues.condition}</p>
        <p>Offer amount: ${formValues.offerAmount}</p>
        `,
      };
      console.log('email info', data);
      await axios.post('api/send_email', data);
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
        <form onSubmit={submitOffer}>
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
                  required
                />
              </div>
              <div>
                City:
                <input
                  style={{ width: '70%' }}
                  type="text"
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                State:
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
                  required
                />
              </div>
            </StyledListBountyContent>
          </StyledListBountyContentContainer>
          <StyledSubmitListBounty className="list-bounty-btn" type="submit">
            List Offer
          </StyledSubmitListBounty>
        </form>
      </StyledListBountyBody>
    </StyledListBountyContainer>
  );
}
