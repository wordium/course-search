#reads the courses.json file and outputs one file of results per search
#search 1: fall 2014 classes in the public health major
#search 2: all semesters L&S breadth reqs
#search 3: all semesters keyword "sustainability"
#search 4: fall 2014 MW before noon and anytime TuTh
#search 5: fall 2014 open seats

import json

all_courses = json.load(open('courses.json'))

courses_list = all_courses.items()
#for course in courses_list, course is a tuple and course[0] is the courseID from the old file  and course[1] is the dict of actual info

openseats1 = []
openseats2 = []

for course in courses_list:
    del course[1]["pubHealthMaj"]
    #handle search 5
    for item in course[1]["classInstance"]:
        if course not in openseats1:
            if item["seats"]["available"] > 0:
                openseats1.append(course)
        
for course in openseats1:
    for item in course[1]["classInstance"]:
        if item["seats"]["available"] == 0:
            course[1]["classInstance"].remove(item)
    openseats2.append(course)

file = open("s5_open.json", "w")
for course in openseats2:
    file.write('\"' + course[0] + '\":')
    file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
    file.write(", \n")
file.close()

