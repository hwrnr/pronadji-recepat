from os import environ
from flask import Flask, request, jsonify
import base64
from PIL import Image
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 MB

def recognize_image(image) -> str:
    # Convert image to pillow image
    image = Image.open(BytesIO(base64.b64decode(image)))

    # Ovde treba da se pozove model za prepoznavanje slike

    return 'krofna'

@app.route('/recognizeImage', methods=['POST'])
def recognize_image_api():
    if 'image' not in request.form:
        print('Not jupi')
        return jsonify({'error': 'No image provided'}), 400

    image = request.form['image']

    if not image:
        return jsonify({'error': 'No image provided'}), 400

    # Recognize image
    tag = recognize_image(image)

    return jsonify({'tag': tag}), 200

if __name__ == '__main__':
    app.run(debug=True, port=int(environ.get('PORT', 5000)), host='0.0.0.0')
