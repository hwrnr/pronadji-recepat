#ovo je zapravo indexer

import lucene
from java.io import File
import os
import csv

from org.apache.lucene.analysis.standard import StandardAnalyzer, StandardTokenizer
from org.apache.lucene.index import IndexWriterConfig, IndexWriter
from org.apache.lucene.store import FSDirectory
from org.apache.lucene.document import Document, TextField, StoredField, Field, IntField

class RecipeIndexer():
    def __init__(self, indexDirPath, createNewIndex=False):

        if not os.path.exists(indexDirPath):
            os.mkdir(indexDirPath)

        indexDir = FSDirectory.open(File(indexDirPath).toPath())
        analyzer = StandardAnalyzer()
        iwc = IndexWriterConfig(analyzer)

        if createNewIndex:
            iwc.setOpenMode(IndexWriterConfig.OpenMode.CREATE)
        else:
            iwc.setOpenMode(IndexWriterConfig.OpenMode.APPEND)

        self.indexer = IndexWriter(indexDir, iwc)

    def indexRecipes(self, fPath):
        file = open(fPath)
        csvreader = csv.reader(file)

        header = next(csvreader)

        for row in csvreader:
            self.indexRecipe(row[0], row[1], row[2], row[3], row[-1])

        file.close()


    def indexRecipe(self, id, title, ingredients, directions, NER):
        doc = Document()

        doc.add(TextField("id", id, Field.Store.YES))
        doc.add(TextField("title", title, Field.Store.YES))
        doc.add(TextField("NER", NER, Field.Store.NO))
        doc.add(StoredField("ingredients", ingredients))
        doc.add(StoredField("directions", directions))

        self.indexer.addDocument(doc)


    def finishIndexing(self):
        self.indexer.close()

if __name__ == '__main__':
    lucene.initVM(vmargs=['-Djava.awt.headless=true'])
    print('lucene', lucene.VERSION)

    ri = RecipeIndexer("./recipes_index", True)
    ri.indexRecipes("./res/RecipeNLG_dataset.csv")
    ri.finishIndexing()