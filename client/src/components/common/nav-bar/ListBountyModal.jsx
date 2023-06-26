import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext.jsx';
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
  StyledLBDropDowns,
  StyledImagePreview,
} from './navbar.styled';

export default function ListBountyModal({ showListBountyModal, setAllBounties }) {
  const { userData } = useContext(GlobalContext);

  const [initialValues, setInitialValues] = useState({
    buyerID: userData.id,
    name: '',
    description: '',
    condition: '',
    category: '',
    city: '',
    state: '',
    price: '',
    deadline: '',
    preferred_payment: '',
    image: '',
    completed: false,
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [previewImage, setPreviewImage] = useState();

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
          setPreviewImage(data.secure_url);
        })
        .catch((err) => console.error(err));
    }
  };

  const submitBounty = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bounties', formValues);
      const { data } = await axios.get('/api/bounties', { params: { count: 10 } });
      setAllBounties(data);
      showListBountyModal();
    } catch (err) {
      console.error('There was an error:', err);
    }
  };

  return (
    <StyledListBountyContainer>
      <StyledListBountyOverlay onClick={() => showListBountyModal()} />
      <StyledListBountyBody>
        <StyledListBountyCloseBtn type="button" onClick={() => showListBountyModal()}>
          X
        </StyledListBountyCloseBtn>
        <h2>Bounty</h2>
        <form onSubmit={submitBounty}>
          <StyledListBountyContentContainer>
            <StyledListBountyContent>
              <StyledListBountyTitle>
                Bounty Title:
                <StyledListBountyTitleInput
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                />
              </StyledListBountyTitle>
              <StyledLBDropDowns>
                <select
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  required
                >
                  <option>Category</option>
                  <option>clothing</option>
                  <option>decor</option>
                  <option>furniture</option>
                  <option>gadgets</option>
                </select>
                <select
                  name="condition"
                  value={formValues.condition}
                  onChange={handleChange}
                  required
                >
                  <option>Condition</option>
                  <option>new</option>
                  <option>like new</option>
                  <option>good</option>
                  <option>fair</option>
                  <option>poor</option>
                </select>
                <select
                  name="preferred_payment"
                  value={formValues.preferred_payment}
                  onChange={handleChange}
                  required
                >
                  <option>Preferred Payment</option>
                  <option>cash</option>
                  <option>paypal</option>
                  <option>venmo</option>
                  <option>visa</option>
                  <option>zelle</option>
                </select>
              </StyledLBDropDowns>
              <div>
                Deadline:{' '}
                <input
                  type="date"
                  name="deadline"
                  value={formValues.deadline}
                  style={{ cursor: 'pointer' }}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                City:
                <input
                  style={{ width: '91%' }}
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
                  style={{ width: '90%' }}
                  type="text"
                  name="state"
                  value={formValues.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                Price:
                <input
                  style={{ width: '90%' }}
                  type="text"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                Upload An Image:{' '}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  name="image"
                  style={{ borderBottom: 'none' }}
                  onChange={(e) => getImageURL(e)}
                  required
                />
                {previewImage && <StyledImagePreview src={previewImage} alt="preview" />}
              </div>
              <div>
                Description:{' '}
                <textarea
                  type="text"
                  name="description"
                  rows="5"
                  cols="50"
                  placeholder="Describe what you're looking for..."
                  value={formValues.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledListBountyContent>
          </StyledListBountyContentContainer>
          <StyledSubmitListBounty className="list-bounty-btn" type="submit">
            List Bounty
          </StyledSubmitListBounty>
        </form>
      </StyledListBountyBody>
    </StyledListBountyContainer>
  );
}
