from flask import Flask, render_template, request
from utils.predictor import predict_price
from traceback import format_exc

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():

    predicted_price = None

    # Default values
    area = bedrooms = bathrooms = stories = parking = None
    prefarea = None

    if request.method == "POST":

        try:

            print("Form Data Received:", request.form)

            # -----------------------------
            # Numerical Features
            # -----------------------------
            area = int(request.form["area"])
            bedrooms = int(request.form["bedrooms"])
            bathrooms = int(request.form["bathrooms"])
            stories = int(request.form["stories"])
            parking = int(request.form["parking"])

            # -----------------------------
            # Binary Features
            # -----------------------------
            mainroad = 1 if request.form["mainroad"] == "Yes" else 0
            guestroom = 1 if request.form["guestroom"] == "Yes" else 0
            basement = 1 if request.form["basement"] == "Yes" else 0
            hotwaterheating = 1 if request.form["hotwaterheating"] == "Yes" else 0
            airconditioning = 1 if request.form["airconditioning"] == "Yes" else 0
            prefarea = 1 if request.form["prefarea"] == "Yes" else 0

            # -----------------------------
            # Furnishing Status
            # -----------------------------
            furnishing = request.form["furnishingstatus"]

            semi_furnished = 1 if furnishing == "Semi-Furnished" else 0
            unfurnished = 1 if furnishing == "Unfurnished" else 0
            # -----------------------------
            # Feature Vector
            # -----------------------------
            features = [
                area,
                bedrooms,
                bathrooms,
                stories,
                mainroad,
                guestroom,
                basement,
                hotwaterheating,
                airconditioning,
                parking,
                prefarea,
                semi_furnished,
                unfurnished
            ]

            print("Features:", features)

            # -----------------------------
            # Prediction
            # -----------------------------
            prediction = predict_price(features)

            predicted_price = round(prediction)

            print("Prediction:", predicted_price)

        except Exception:

            print("========== ERROR ==========")
            print(format_exc())
            print("===========================")

            predicted_price = None

    return render_template(
        "index.html",
        predicted_price=predicted_price,
        area=area,
        bedrooms=bedrooms,
        bathrooms=bathrooms,
        stories=stories,
        parking=parking,
        prefarea=prefarea
    )


if __name__ == "__main__":
    app.run(debug=True)