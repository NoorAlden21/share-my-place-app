import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUsserBtn = document.getElementById("locate-btn");

    locateUsserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    document.getElementById("map").querySelector("p").style.display = "none";
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
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
        this.selectPlace(coordinates);
      },
      (error) => {
        modal.hide();
        alert("Could not locate you. Please enter an address manually!");
      }
    );
  }

  async geocodeAddress(address) {
    // Free geocoding via Nominatim (OSM)
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", address);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    const res = await fetch(url.toString(), {
      headers: { "Accept-Language": "en" },
    });
    if (!res.ok) throw new Error("Geocoding failed");

    const data = await res.json();
    if (!data || !data.length) throw new Error("Address not found");

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }

  async findAddressHandler(e) {
    e.preventDefault();
    const modal = new Modal("loading-modal-content", "Finding address...");
    modal.show();

    try {
      const addressInput = e.target.querySelector("input");
      const address = (addressInput?.value || "").trim();
      if (!address) throw new Error("Empty address");

      const coords = await this.geocodeAddress(address);

      this.selectPlace(coords);
    } catch (err) {
      console.error(err);
      alert("Could not find that address. Please try another one.");
    } finally {
      modal.hide();
    }
  }
}

new PlaceFinder();
