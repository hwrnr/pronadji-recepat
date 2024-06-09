from flask import Flask, jsonify
from flask_cors import CORS

from RecipeSearcher import RecipeSearcher

app = Flask(__name__)
CORS(app)

recipeSearcher = RecipeSearcher("./recipes_index")

@app.route('/search/<query>')
def search(query):

    recipes = recipeSearcher.search(query)
    res = []

    for r in recipes:
        res.append({
            "id": r.id,
            "title": r.title,
            "ingredients": r.ingredients,
            "directions": r.directions
        })

    return jsonify(res)

@app.route('/recipe/<id>')
def recipe(id):
    # TODO: Implement get recipe functionality
    return jsonify({
        "id": id,
        "title": 'The Great Gatsby',
        "description": 'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.',
        })

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
