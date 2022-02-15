'use strict';

const inputBill = document.querySelector('.bill-input');
const inputPeople = document.querySelector('.input-number__people');
const tipContainer = document.querySelector('.tip-container');
const customTip = document.querySelector('.input-custom__tip');
const totalTip = document.querySelector('.amount-total');
const personTip = document.querySelector('.amount-person');
const btnReset = document.querySelector('.btn-reset');
const labelBill = document.querySelector('.label-bill');
const labelPeople = document.querySelector('.label-people');

const checkAndCalculate = function (percent) {
  //Check input bill
  if (!inputBill.value || +inputBill.value <= 0) {
    inputBill.style.border = '1px solid red';
    labelBill.classList.add('label-active_number');
    return;
  }

  // Check input people
  if (!inputPeople.value || +inputPeople.value <= 0) {
    inputPeople.style.border = '1px solid red';
    labelPeople.classList.add('label-active_number');
    return;
  }

  inputBill.style.border = 'none';
  labelBill.classList.remove('label-active_number');
  inputPeople.style.border = 'none';
  labelPeople.classList.remove('label-active_number');

  // Calculate
  const bill = +inputBill.value;
  const people = +inputPeople.value;
  const tipPerPerson = (bill * percent) / 100 / people;
  const totalPerPerson = bill / people + tipPerPerson;

  personTip.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalTip.textContent = `$${totalPerPerson.toFixed(2)}`;

  //Activate reset button
  btnReset.disabled = false;
  btnReset.style.backgroundColor = 'hsl(172, 67%, 45%)';
  btnReset.style.opacity = 1;

  return 1;
};

tipContainer.addEventListener('click', function (e) {
  //Get where the click happen
  const target = e.target.closest('.btn-tip');

  //Guard close
  if (!target) return;

  // Calculate
  const percent = +target.dataset.percent;
  if (!checkAndCalculate(percent)) return;

  //Change style
  customTip.value = '';
  this.querySelectorAll('.btn-tip').forEach((el) =>
    el.classList.remove('active')
  );
  target.classList.add('active');
});

customTip.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (!this.value || +this.value <= 0) return;

    tipContainer
      .querySelectorAll('.btn-tip')
      .forEach((el) => el.classList.remove('active'));

    const percent = this.value;
    checkAndCalculate(percent);
  }
});

btnReset.addEventListener('click', function () {
  personTip.textContent = `$0.00`;
  totalTip.textContent = `$0.00`;

  tipContainer
    .querySelectorAll('.btn-tip')
    .forEach((el) => el.classList.remove('active'));

  inputBill.value = '';
  inputPeople.value = '';
  customTip.value = '';

  //Activate reset button
  btnReset.disabled = true;
  btnReset.style.backgroundColor = 'hsl(189, 41%, 97%)';
  btnReset.style.opacity = 0.5;
});
