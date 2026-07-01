import joblib
import numpy as np
import os

''' ------------------------------------------
 Load trained model and scaler
 ------------------------------------------'''

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "model", "model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model", "scaler.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


'''------------------------------------------
 Prediction Function
 ------------------------------------------'''

def predict_price(features):

    features = np.array(features).reshape(1, -1)

    features_scaled = scaler.transform(features)

    prediction = model.predict(features_scaled)

    return round(prediction[0], 2)