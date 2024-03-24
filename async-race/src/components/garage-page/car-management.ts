import { CarParams } from '../../types/types';

export default function getSvgCar(carParam: CarParams): string {
  return `
<fieldset class="car-managment">
    <legend>Car Managment</legend>
    <div class="car-create">
      <input type="text" name="" id="create-name" data-input-name="create-name" autocomplete="off" value="${carParam.name}">
      <input type="color" name="" id="create-color" data-input-name="create-color" value="${carParam.color}">
      <button class="create-btn" id="create-btn" data-btn-name="create-btn">Create</button>
    </div>
    <div class="car-update">
      <input type="text" name="" id="update-name" data-input-name="edit-name" autocomplete="off" disabled>
      <input type="color" name="" id="update-color" data-input-name="edit-color" disabled>
      <button class="update-btn" id="update-btn" data-btn-name="update-btn" disabled>Update</button>
    </div>
    <button class="generate-cars-btn" id="generate-cars" data-btn-name="generate-cars">Generate cars</button>
  </fieldset>
  `;
}
