import throttle from 'lodash.throttle';

const formRef = document.querySelector('form');
formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);
const formData = { email: '', message: '' };
const dataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));
if (dataFromLS) {
  formData.email = formRef.elements.email.value = dataFromLS.email || '';
  formData.message = formRef.elements.message.value = dataFromLS.message || '';
}

function onFormInput(event) {
  const key = event.target.name;
  formData[key] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (
    !event.target.elements.email.value ||
    !event.target.elements.message.value
  ) {
    alert('Please enter all fields');
    return;
  }

  console.log(formData);
  formData.email = '';
  formData.message = '';
  formRef.reset();
  localStorage.removeItem('feedback-form-state');
}
