class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUsserBtn = document.getElementById("locate-btn");

    locateUsserBtn.addEventListener("click", this.locateUserHandler);
    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Location feature not supported for your browser!");
      return;
    }
    console.log("hi");
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        alert("Could not locate you. Please enter an address manually!");
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
