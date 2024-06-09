class Recipe:
    def __init__(self, id, title, ingredients, directions):
        self.id = id
        self.title = title
        self.ingredients = self.format(ingredients, "\n")
        self.directions = self.format(directions, " ")

    def __str__(self):
        return self.id + " " + self.title + " " + self.ingredients + self.directions

    def format(self, ingredients, sep):
        s = ""
        ingredients = ingredients[1:-1].split(", ")

        for i in ingredients:
            s += i[1:-1] + sep
        return s