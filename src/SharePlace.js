import { Modal } from "./UI/Modal";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUsserBtn = document.getElementById("locate-btn");

    locateUsserBtn.addEventListener("click", this.locateUserHandler);
    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  locateUserHandler() {
    const modal = new Modal(
      "loading-modal-content",
      "Loading your location - please Wait."
    );
    modal.show();
    if (!navigator.geolocation) {
      alert("Location feature not supported for your browser!");
      return;
    }
    console.log("hi");
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        modal.hide();
        alert("Could not locate you. Please enter an address manually!");
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
