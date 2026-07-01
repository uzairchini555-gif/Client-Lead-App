const locationBtn = document.getElementById("locationBtn");
const locationStatus = document.getElementById("locationStatus");
const leadForm = document.getElementById("leadForm");

let latitude = "";
let longitude = "";

// Get Location
locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        locationStatus.innerHTML = "❌ Geolocation is not supported.";
        return;
    }

    locationStatus.innerHTML = "📍 Getting location...";

    navigator.geolocation.getCurrentPosition(

        (position) => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            locationStatus.innerHTML = "✅ Location Captured Successfully";

        },

        () => {

            locationStatus.innerHTML =
            "❌ Location permission is required.";

        }

    );

});


// Submit Form
leadForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (latitude === "" || longitude === "") {
        alert("Please capture your location first.");
        return;
    }

    const submitBtn = document.getElementById("submitBtn");

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Saving...";

    const formData = new FormData();

    formData.append("shopName", document.getElementById("shopName").value);
    formData.append("clientName", document.getElementById("clientName").value);
    formData.append("contact", document.getElementById("contact").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    try {

        await fetch(WEB_APP_URL, {
            method: "POST",
            body: formData
        });

        alert("✅ Client Saved Successfully!");

        leadForm.reset();

        latitude = "";
        longitude = "";

        locationStatus.innerHTML = "Location not captured";

    }

    catch (error) {

        alert("❌ Failed to save data.");

        console.log(error);

    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = "Submit Client";

});