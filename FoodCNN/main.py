from os import environ
from flask import Flask, request, jsonify
import base64
from PIL import Image
from io import BytesIO
from flask_cors import CORS
from tensorflow.keras.preprocessing import image as krsimg
import tensorflow as tf
from tensorflow import keras
import numpy as np
import json

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 MB

with open('labels', 'r') as file:
    labels = json.load(file)


model = keras.saving.load_model("Model/bestmodel-2")

def recognize_image(image) -> str:
    # Convert image to pillow image
    image = Image.open(BytesIO(base64.b64decode(image)))
    image = image.resize((224, 224))
    img_array = krsimg.img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    prediction = tf.nn.softmax(prediction).numpy()
    top_indices = np.argsort(prediction[0])[::-1][:5]
    top_classes = [index for index in top_indices]
    classes = []
    for i in top_classes:
        classes.append(labels[i])

    return classes[0].replace("_", " ")

@app.route('/recognizeImage', methods=['POST'])
def recognize_image_api():
    json_data = request.get_json()

    if 'image' not in json_data:
        print('Not jupi')
        return jsonify({'error': 'No image provided'}), 400

    image = json_data['image']

    if not image:
        return jsonify({'error': 'No image provided'}), 400

    # Recognize image
    tag = recognize_image(image)

    return jsonify({'tag': tag}), 200

if __name__ == '__main__':
    app.run(debug=False, port=int(environ.get('PORT', 5000)), host='0.0.0.0')
