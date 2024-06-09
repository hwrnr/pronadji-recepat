docker build -f Dockerfile.dev -t myapp .
docker run -it -v $(pwd):/app myapp python RecipeSearcher.py
