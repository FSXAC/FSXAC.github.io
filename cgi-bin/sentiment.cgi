#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import cgitb
import os
import urllib.parse as up

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import tokenize

cgitb.enable()
print("Content-Type: text/html;charset=utf-8")
print()

def main():
    color = "#DECE2F"
    try:
        url = os.environ["REQUEST_URI"]
        o = up.urlparse(url)
        sentence = up.parse_qs(o.query)["sentence"][0]	# sentence = everything after "q="
    except:
        print(color)
        return
        
    if sentence:
        # processing the sentence to get the sentiment values
        sid = SentimentIntensityAnalyzer()
        score = sid.polarity_scores(sentence)["compound"]
        color = getColor(score)

    print(color)

def getColor(value):
    sections = [(-0.9,"#CF0F02"), (-0.8,"#D02706"), (-0.7,"#D23E0B"), (-0.6,"#D45410"), (-0.5,"#D56A15"), (-0.4,"#D77F1A"), (-0.3,"#D9941F"), (-0.2,"#DBA823"), (-0.1,"#DCBB29"), (0,"#DECE2F"), (0.1,"#E0E034"), (0.2,"#D2E23A"), (0.3,"#C5E33F"), (0.4,"#B8E545"), (0.5,"#ADE74B"), (0.6,"#A2E950"), (0.7,"#98EA56"), (0.8,"#8EEC5C"), (0.9,"#86EE62"), (1,"#7FEF68")]
    for item in sections:
        if value <= item[0]:
            color = item[1]
            return(color)
main()
