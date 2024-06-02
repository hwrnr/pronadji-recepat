from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/search/<query>')
def search(query):
    # TODO: Implement search functionality
    return jsonify([
        {
            "id": 1,
            "title": 'The Great Gatsby - ' + query,
            "description": 'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.',
            },
        {
            "id": 2,
            "title": 'The Catcher in the Rye' + query,
            "description": 'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.',
            },
        ])

@app.route('/recipe/<id>')
def recipe(id):
    # TODO: Implement get recipe functionality
    return jsonify({
        "id": id,
        "title": 'The Great Gatsby',
        "description": 'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.',
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
