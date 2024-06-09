import lucene

from Recipe import Recipe
from java.io import File

from org.apache.lucene.analysis.standard import StandardAnalyzer
from org.apache.lucene.index import DirectoryReader
from org.apache.lucene.store import FSDirectory
from org.apache.lucene.search import IndexSearcher
from org.apache.lucene.queryparser.classic import QueryParser, MultiFieldQueryParser



class RecipeSearcher():
    def __init__(self, indexDirPath):

        self.indexReader = DirectoryReader.open(FSDirectory.open(File(indexDirPath).toPath()))

        print(self.indexReader.getDocCount("title"))  # ne znam stace mi ovo
        self.indexSearcher = IndexSearcher(self.indexReader)
        self.analyzer = StandardAnalyzer()
        self.gueryParser = MultiFieldQueryParser(["title", "NER"], self.analyzer)

    def search(self, query):
        print("radi")
        q = self.gueryParser.parse([query, query], ["title", "NER"], self.analyzer)
        print(q)
        results = self.indexSearcher.search(q, 10) #ovo je malo fuj sto je 10
        hits = results.scoreDocs

        res = []

        for i in range(len(hits)):
            doc = self.indexSearcher.doc(hits[i].doc)

            r = Recipe(doc.get("id"), doc.get("title"), doc.get("ingredients"), doc.get("directions"))
            res.append(r)

        return res

    def finishSearching(self):
        self.indexReader.close()


if __name__ == '__main__':
    lucene.initVM(vmargs=['-Djava.awt.headless=true'])
    print('lucene', lucene.VERSION)

    rs = RecipeSearcher("./recipes_index")
    for r in rs.search("chocolate donut"):
        print(r)
    rs.finishSearching()
else:
    lucene.initVM(vmargs=['-Djava.awt.headless=true'])
