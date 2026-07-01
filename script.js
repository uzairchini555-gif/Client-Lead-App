const locationBtn = document.getElementById("locationBtn");
const locationStatus = document.getElementById("locationStatus");
const leadForm = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const notification = document.getElementById("notification");

let latitude = "";
let longitude = "";

// --------------------
// Notification
// --------------------

function showNotification(message, type) {

    notification.textContent = message;
    notification.className = type;

    setTimeout(() => {
        notification.className = "";
    }, 2500);

}

// --------------------
// Location Status
// --------------------

function updateLocationStatus(message, color) {

    locationStatus.textContent = message;
    locationStatus.style.color = color;

}

// Initial Status
updateLocationStatus("📍 Location Required", "red");

// --------------------
// Get Location
// --------------------

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        updateLocationStatus(
            "❌ Geolocation is not supported.",
            "red"
        );

        return;

    }

    updateLocationStatus(
        "📍 Getting location...",
        "#2563eb"
    );

    navigator.geolocation.getCurrentPosition(

        (position) => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            updateLocationStatus(
                "✅ Location Captured",
                "green"
            );

        },

        () => {

            updateLocationStatus(
                "❌ Location permission is required.",
                "red"
            );

        }

    );

});

// --------------------
// Submit Form
// --------------------

leadForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (latitude === "" || longitude === "") {

        showNotification(
            "Please capture your location first.",
            "error"
        );

        return;

    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "⏳ Saving...";

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

        showNotification(
            "✅ Client Saved Successfully!",
            "success"
        );

        leadForm.reset();

        latitude = "";
        longitude = "";

        updateLocationStatus(
            "📍 Location Required",
            "red"
        );

        document.getElementById("shopName").focus();

    }

    catch (error) {

        console.log(error);

        showNotification(
            "❌ Failed to save data.",
            "error"
        );

    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = "Submit Client";

});